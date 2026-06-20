export default function Loading() {
  return (
    <div className=" inset-0 z-50 min-h-screen flex flex-col items-center justify-center bg-zinc-950/70 ">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    
      <p className="mt-4 text-xl font-semibold text-red-500 dark:text-gray-200 animate-pulse">
        Loading....
      </p>
    </div>
  );
}