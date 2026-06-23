'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { getAllUsers, updateUserStatus, updateUserRole } from '@/lib/api/allUsers';
import { toast } from 'react-toastify';

const AllUsersPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Block / Unblock
  const handleStatusChange = async (id, newStatus) => {
    if (actionLoadingId) return;
    setActionLoadingId(id);
    setOpenDropdownId(null);

    try {
      setUsers(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
      await updateUserStatus(id, newStatus);
      toast.warning("User status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
      fetchUsers(); // rollback
    } finally {
      setActionLoadingId(null);
    }
  };

  // ✅ Role Change
  const handleRoleChange = async (id, newRole) => {
    if (actionLoadingId) return;
    setActionLoadingId(id);
    setOpenDropdownId(null);

    try {
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
      await updateUserRole(id, newRole);
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Failed to update role:", error);
      fetchUsers(); // rollback
    } finally {
      setActionLoadingId(null);
    }
  };

  // ✅ Filtering — active/blocked
  const filteredUsers = users.filter(u => {
    const cleanStatus = u.status?.toLowerCase();
    if (filter === 'active') return cleanStatus === 'active';
    if (filter === 'blocked') return cleanStatus === 'blocked';
    return true;
  });

  // ✅ Status + Role onujai dynamic action menu return kora
  const getMenuActions = (row) => {
    const cleanStatus = row.status?.toLowerCase();
    const cleanRole = row.role?.toLowerCase();

    // Case 4: Blocked user (isRestricted true) — Unblock + Make Volunteer
    if (cleanStatus === 'blocked') {
      return [
        { label: '🛡️ Unblock User', onClick: () => handleStatusChange(row._id, 'active'), color: 'text-emerald-400 hover:bg-emerald-500/10' },
        { label: '🤝 Make Volunteer', onClick: () => handleRoleChange(row._id, 'volunteer'), color: 'text-blue-400 hover:bg-blue-500/10' },
      ];
    }

    // Case 1: Active + Donor — Block + Make Volunteer
    if (cleanStatus === 'active' && cleanRole === 'donor') {
      return [
        { label: '🚫 Block User', onClick: () => handleStatusChange(row._id, 'blocked'), color: 'text-rose-400 hover:bg-rose-500/10' },
        { label: '🤝 Make Volunteer', onClick: () => handleRoleChange(row._id, 'volunteer'), color: 'text-blue-400 hover:bg-blue-500/10' },
      ];
    }

    // Case 2: Active + Volunteer — Block + Make Donor + Make Admin
    if (cleanStatus === 'active' && cleanRole === 'volunteer') {
      return [
        { label: '🚫 Block User', onClick: () => handleStatusChange(row._id, 'blocked'), color: 'text-rose-400 hover:bg-rose-500/10' },
        { label: '👤 Make Donor', onClick: () => handleRoleChange(row._id, 'donor'), color: 'text-zinc-300 hover:bg-zinc-500/10' },
        { label: '⚡ Make Admin', onClick: () => handleRoleChange(row._id, 'admin'), color: 'text-purple-400 hover:bg-purple-500/10' },
      ];
    }

    // Case 3: Active + Admin — Block + Make Donor + Make Volunteer
    if (cleanStatus === 'active' && cleanRole === 'admin') {
      return [
        { label: '🚫 Block User', onClick: () => handleStatusChange(row._id, 'blocked'), color: 'text-rose-400 hover:bg-rose-500/10' },
        { label: '👤 Make Donor', onClick: () => handleRoleChange(row._id, 'donor'), color: 'text-zinc-300 hover:bg-zinc-500/10' },
        { label: '🤝 Make Volunteer', onClick: () => handleRoleChange(row._id, 'volunteer'), color: 'text-blue-400 hover:bg-blue-500/10' },
      ];
    }

    return [];
  };

  return (



    <div className='min-h-screen bg-zinc-600/40 text-zinc-100 md:ml-8'>
      <h2 className="text-xl text-red-500 font-bold text-right uppercase mb-2">
        {user?.role}
      </h2>

      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
            All Users <span className="text-red-500">Management Page</span>!
          </h1>
          <p className="text-zinc-300 mt-2 text-xs sm:text-sm md:text-base max-w-2xl">
            This page provides a comprehensive overview and management options for all registered users.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'active', 'blocked'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors ${filter === type
                ? 'bg-red-500 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-zinc-400">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
            <span className="ml-3">Loading users from database...</span>
          </div>
        ) : (
          <div onClick={() => setOpenDropdownId(null)}>
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-zinc-500">No users found.</div>
            ) : (
              <>
                <div className="block lg:hidden divide-y divide-zinc-800/60">
                  {filteredUsers.map((row) => {
                    const menuActions = getMenuActions(row);
                    const cleanRole = row.role?.toLowerCase();
                    const cleanStatus = row.status?.toLowerCase();

                    return (
                      <div key={row._id} className="p-4 space-y-3 hover:bg-zinc-800/20 transition-colors relative group">

                        
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            {row?.image ? (
                              <img
                                src={row?.image}
                                alt={row.name}
                                className="w-10 h-10 rounded-xl object-cover border border-zinc-700 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 border border-zinc-700 shrink-0">
                                {row.name?.charAt(0) || 'U'}
                              </div>
                            )}
                            <span className="font-semibold text-zinc-200 group-hover:text-white truncate">{row.name}</span>
                          </div>

                          <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setOpenDropdownId(openDropdownId === row._id ? null : row._id)}
                              disabled={actionLoadingId === row._id}
                              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors disabled:opacity-50 text-xl leading-none"
                            >
                              ⋮
                            </button>

                            {openDropdownId === row._id && (
                              <div className="absolute right-0 mt-1 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 py-1 text-left">
                                {menuActions.length === 0 ? (
                                  <span className="block px-4 py-2.5 text-sm text-zinc-500">No actions available</span>
                                ) : (
                                  menuActions.map((action, idx) => (
                                    <button
                                      key={idx}
                                      onClick={action.onClick}
                                      className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${action.color} ${idx > 0 ? 'border-t border-zinc-900' : ''}`}
                                    >
                                      {action.label}
                                    </button>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60">
                          <div className="text-zinc-400 truncate flex items-center gap-1">
                            📧 <span className="truncate">{row.email}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                            {/* রোল ব্যাজ */}
                            <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border uppercase ${cleanRole === 'admin' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                                cleanRole === 'volunteer' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                  'bg-zinc-700/30 border-zinc-600 text-zinc-400'
                              }`}>
                              {row.role}
                            </span>

                            {/* স্ট্যাটাস ব্যাজ */}
                            <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${cleanStatus === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}>
                              ● {row.status || 'unknown'}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 text-xs font-semibold tracking-wider uppercase">
                        <th className="p-4">User Profile</th>
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Current Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {filteredUsers.map((row) => {
                        const menuActions = getMenuActions(row);
                        const cleanRole = row.role?.toLowerCase();
                        const cleanStatus = row.status?.toLowerCase();

                        return (
                          <tr key={row._id} className="hover:bg-zinc-800/40 transition-colors group">
                            {/* Profile */}
                            <td className="p-4 flex items-center gap-3">
                              {row?.image ? (
                                <img
                                  src={row?.image}
                                  alt={row.name}
                                  className="w-10 h-10 rounded-xl object-cover border border-zinc-700"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 border border-zinc-700">
                                  {row.name?.charAt(0) || 'U'}
                                </div>
                              )}
                              <span className="font-semibold text-zinc-200 group-hover:text-white">{row.name}</span>
                            </td>

                            {/* Email */}
                            <td className="p-4 text-zinc-400 text-sm">
                              <span className="flex items-center gap-1">📧 {row.email}</span>
                            </td>

                            {/* Role */}
                            <td className="p-4">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full border uppercase ${cleanRole === 'admin' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                                  cleanRole === 'volunteer' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                    'bg-zinc-700/30 border-zinc-600 text-zinc-400'
                                }`}>
                                {row.role}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="p-4">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-md ${cleanStatus === 'active'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                }`}>
                                ● {row.status || 'unknown'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => setOpenDropdownId(openDropdownId === row._id ? null : row._id)}
                                disabled={actionLoadingId === row._id}
                                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                              >
                                ⋮
                              </button>

                              {openDropdownId === row._id && (
                                <div className="absolute right-4 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 py-1 text-left">
                                  {menuActions.length === 0 ? (
                                    <span className="block px-4 py-2.5 text-sm text-zinc-500">No actions available</span>
                                  ) : (
                                    menuActions.map((action, idx) => (
                                      <button
                                        key={idx}
                                        onClick={action.onClick}
                                        className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${action.color} ${idx > 0 ? 'border-t border-zinc-900' : ''}`}
                                      >
                                        {action.label}
                                      </button>
                                    ))
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;