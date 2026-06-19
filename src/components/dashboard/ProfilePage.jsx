'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { Card, Chip } from '@heroui/react';
import {
  FiMapPin,
  FiMail,
  FiUser,
  FiDroplet,
  FiShield,
  FiCheck,
  FiX,
  FiEdit3,
} from 'react-icons/fi';
import { updateUserInfo } from '@/lib/actions/users';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  // Edit Mode state tracking
  const [isEditing, setIsEditing] = useState(false);

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    email: '',
    image: '',
    status: 'Active',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || 'Donor Name',
        bloodGroup: session.user.bloodGroup || 'A+',
        district: session.user.district || 'Bandarban',
        upazila: session.user.upazila || 'Lama',
        email: session.user.email || 'donor@gmail.com',
        image: session.user.image || "",
        status: session.user.status || 'Active',
      });
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-8 w-56 rounded-xl bg-white/10" />
          <div className="h-4 w-96 rounded-xl bg-white/10" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-[420px] rounded-3xl bg-white/10 lg:col-span-2" />
            <div className="h-[420px] rounded-3xl bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔵 Form Submit / Save handler (API কল যুক্ত করা হয়েছে)
  const handleSave = async () => {
    try {
      if (!session?.user?.id) {
        alert("User ID missing");
        return;
      }

      const updateData = {
        id: session.user.id, // MUST
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        image: formData.image,
        status: formData.status,
      };

      const result = await updateUserInfo(updateData);

      if (result.success) {
        toast.success("Profile updated successfully!")
        // alert("Profile updated successfully!");

        setIsEditing(false);

        // 🔥 IMPORTANT: UI instantly update without reload
        setFormData((prev) => ({
          ...prev,
          ...updateData,
        }));

      } else {
        alert(result.message || "Update failed");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Cancel handler
  const handleCancel = () => {
    if (session?.user) {
      setFormData({
        name: session.user.name || 'Donor Name',
        bloodGroup: session.user.bloodGroup || 'A+',
        district: session.user.district || 'Bandarban',
        upazila: session.user.upazila || 'Lama',
        email: session.user.email || 'donor@gmail.com',
        image: session.user.image || null,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto ml-5">
        <h2 className="text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase">
          {formData.name}
        </h2>
        <div className="my-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Profile <span className="text-red-500">Settings</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
              Easily manage your personal details, donation preferences, and account settings all in one place on Blood Bridge.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition"
                >
                  <FiCheck /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-sm transition"
                >
                  <FiX /> Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition"
              >
                <FiEdit3 /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 bg-zinc-950/70 rounded-3xl">
          <Card className="overflow-hidden border rounded-md border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:col-span-2">
            <div className="relative h-40 bg-gradient-to-r rounded-md from-red-950 via-rose-900 to-red-600">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" />
              <div className="absolute -bottom-14 left-6">
                <img
                  src={formData.image || 'https://via.placeholder.com/150'}
                  alt={formData.name}
                  className="h-28 w-28 border-4 border-zinc-950 rounded-3xl bg-white text-2xl font-bold text-red-500 object-cover"
                />
              </div>

              <div className="absolute right-6 top-6 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-100/80">
                  Blood Group
                </p>
                {isEditing ? (
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="mt-1 bg-zinc-900 border border-white/20 text-white text-xl font-bold rounded-lg p-1 focus:outline-none focus:border-red-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                      <option key={group} value={group} className="bg-zinc-950">
                        {group}
                      </option>
                    ))}
                  </select>
                ) : (
                  <h3 className="text-3xl font-black text-white">{formData.bloodGroup}</h3>
                )}
              </div>
            </div>

            <div className="p-5 pt-20">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                  <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                    <FiMapPin className="text-red-400" />
                    <span>
                      {formData.upazila}, {formData.district}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <FiShield className="text-emerald-400" />

                    <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {formData.status}
                    </span>
                  </div>
                </div>

                <Chip variant="flat" className="border border-red-500/20 bg-red-500/10 text-red-400">
                  Verified Donor
                </Chip>
              </div>

              <div className="my-4 h-[1px] w-full bg-white/10" />

              {/* Editable Form Fields / InfoBox Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <InfoBox
                  icon={<FiUser />}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                {/* <InfoBox
                  icon={<FiMail />}
                  label="Email Address (Not Changeable)"
                  name="email"
                  value={formData.email}
                  isEditing={isEditing}
                  disabled={true}
                  onChange={handleChange}
                /> */}

                <InfoBox
                  icon={<FiMail />}
                  label="Email Address (Not Changeable)"
                  name="email"
                  value={formData.email}
                  isEditing={false}   // 👈 IMPORTANT (force disable edit)
                  disabled={true}
                />
                <InfoBox
                  icon={<FiMapPin />}
                  label="District"
                  name="district"
                  value={formData.district}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <InfoBox
                  icon={<FiMapPin />}
                  label="Upazila"
                  name="upazila"
                  value={formData.upazila}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>

          {/* Right Side Cards */}
          <div className="space-y-6">
            <Card className="border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-red-500/10 p-3 text-red-400">
                    <FiDroplet size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Medical Profile</h3>
                    <p className="text-sm text-zinc-400">Basic donor health information</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Blood Group</p>
                  <h2 className="mt-2 text-4xl font-black text-red-400">{formData.bloodGroup}</h2>
                </div>
              </div>
            </Card>

            <Card className="border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Donation Status</h3>
                    <p className="text-sm text-zinc-400">Current eligibility overview</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="font-semibold text-emerald-400">Eligible to Donate</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">
                    Your account is active and ready for donor activity.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modified InfoBox Component to support Inputs (Pure JS)
const InfoBox = ({ icon, label, name, value, isEditing, disabled = false, onChange }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-red-500/30 hover:bg-white/10">
      <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
        <span className="text-red-400">{icon}</span>
        <span>{label}</span>
      </div>

      {isEditing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full bg-zinc-900 border ${disabled ? 'border-zinc-800 text-zinc-500 cursor-not-allowed' : 'border-white/20 text-white focus:border-red-500'
            } rounded-xl px-3 py-1.5 text-base font-medium outline-none transition`}
        />
      ) : (
        <p className="text-base font-semibold text-white px-1 py-1.5">{value}</p>
      )}
    </div>
  );
};

export default ProfilePage;
