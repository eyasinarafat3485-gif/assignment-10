'use client';

export default function FundingTable({ fundings }) {
  if (!fundings || fundings.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-400">
        No funding history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 mt-10">
      <table className="w-full border-collapse">
        <thead className="bg-zinc-950 border-b border-zinc-800">
          <tr>
            <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-400">Donor</th>
            <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-400">Transaction ID</th>
            <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-400">Date</th>
            <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-400">Amount</th>
            <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-400">Status</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-zinc-800/60">
          {fundings.map((f) => (
            <tr key={f._id || f.id} className="hover:bg-zinc-900/80 transition-colors text-zinc-300">
              
              <td className="p-4 text-sm font-medium text-zinc-200">
                <div className="font-semibold text-zinc-100">
                  {f.userName || 'Anonymous'} 
                </div>
                <div className="text-xs text-zinc-500 font-normal mt-0.5">
                  {f.email || 'No Email'} 
                </div>
              </td>
              
              <td className="p-4 text-sm font-mono text-zinc-400">
                {f.transactionId || 'N/A'}
              </td>
              
              <td className="p-4 text-sm">
                {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : 'N/A'}
              </td>
              
              <td className="p-4 text-sm font-semibold text-emerald-400">
                ${f.amount}
              </td>
              
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-500/20`}>
                  {f.status || 'succeeded'}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


