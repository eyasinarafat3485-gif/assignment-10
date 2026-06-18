import DashboardSideBar from "@/components/dashboard/DashboardSideBar";

export default function DashboardLayout({ children }) {
  return (
     <div className="bg-zinc-950/70 text-white flex flex-col md:flex-row h-screen w-full overflow-hidden">
      
      {/* সাইডবার সেকশন */}
      <aside className="w-full md:w-40 md:flex-shrink-0 border-b md:border-b-0  border-white/10">
        <DashboardSideBar />
      </aside>

      {/* মেইন কনটেন্ট এরিয়া (আলাদাভাবে স্ক্রল হবে, মেইন বডি ফিক্সড থাকবে) */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  )
}