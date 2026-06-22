'use client';

export default function FundingTable({ fundings }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Donor Name</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {fundings?.map((f) => (
            <tr key={f.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{f.userName}</td>
              <td className="p-4 font-medium">${f.amount}</td>
              <td className="p-4">{new Date(f.createdAt).toLocaleDateString()}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${f.status === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {f.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}