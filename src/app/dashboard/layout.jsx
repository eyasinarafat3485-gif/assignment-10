import DashboardSideBar from "@/components/dashboard/DashboardSideBar";

export default function DashboardLayout({ children }) {
  return (
     <div className="bg-zinc-950/70 text-white flex flex-col md:flex-row h-screen w-full overflow-hidden">
      
      {/* সাইডবার সেকশন */}
      <aside className="w-full md:w-40 md:flex-shrink-0 ">
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

// class="text-xl text-red-500 font-bold mt-0 mr-0
//  text-right uppercase"

// 'use client';

// import DashboardSideBar from "@/components/dashboard/DashboardSideBar";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-white">
      
//       {/* Sidebar */}
//       <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-white/10 bg-zinc-950">
//         <DashboardSideBar />
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
        
//         {/* Dashboard Top Bar */}
//         <header className="h-14 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between flex-shrink-0">
//           <div className="flex items-center gap-3">
//             <h1 className="text-xl font-semibold">Dashboard</h1>
//           </div>
//           <div className="text-sm text-zinc-400">
//             BloodBridge
//           </div>
//         </header>

//         {/* Scrollable Content */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-zinc-950/70">
//           {children}
//         </main>
//       </div>

//     </div>
//   );
// }