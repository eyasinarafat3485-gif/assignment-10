import DashboardSideBar from "@/components/dashboard/DashboardSideBar";

export default function DashboardLayout({ children }) {
  return (
     <div className="bg-zinc-950/70 text-white flex flex-col md:flex-row h-screen-[70vh] w-full overflow-hidden">
      
      <aside className="w-full  md:w-40 md:flex-shrink-0 ">
        <DashboardSideBar />
      </aside>

      <main className="flex-1 flex flex-col  min-w-0 overflow-y-auto">
        <div className="flex-1 p-4 sm:p-6  lg:p-6">
          {children}
        </div>
      </main>

    </div>
  )
}

