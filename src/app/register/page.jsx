// Parent Main Section Component

import { BiShieldQuarter } from "react-icons/bi";
import { FaDropbox } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import RegisterForm from "./RegisterForm";

// ==========================================
export default function RegisterSection() {
  return (
    <section className="w-full py-16 bg-zinc-950/70 backdrop-blur-md text-white font-sans flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-5 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#4A4A4A]/20 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl items-stretch">
          
          {/* Left Pane */}
          <div className="lg:col-span-4 bg-[#4A4A4A]/40 border-r border-zinc-800 p-8 flex flex-col justify-between hidden lg:flex">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-900/40 flex items-center justify-center text-red-500 shadow-inner">
                <FaDropbox size={26} className="animate-pulse" />
              </div>
              <h2 className="text-3xl font-black tracking-tight leading-none text-zinc-100">
                Join The <br />
                <span className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Lifesaving</span> <br />
                Elite.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                By creating a donor profile, you instantly sync with live hospital requests across Bangladesh. Your single decision can rewrite someone's story.
              </p>
            </div>

            <div className="space-y-4 my-8">
              {['Encrypted Health Records', 'Instant SOS Request Match', 'Verified Badge Status'].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300">
                  <FiCheckCircle className="text-red-500 flex-shrink-0" size={14} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 font-medium flex items-center gap-1.5">
              <BiShieldQuarter size={14} /> Secure & Compliant Infrastructure
            </div>
          </div>

          {/* Right Pane Form Container */}
          <div className="lg:col-span-8 p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-8 lg:mb-6 space-y-2">
              <h3 className="text-2xl font-black text-zinc-100 tracking-tight lg:hidden">
                Join the <span className="text-red-500">Lifesaving</span> Community
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm font-medium">
                Fill out the required credentials to launch your verified account.
              </p>
            </div>

            {/* আলাদা করা ফর্মটি এখানে রেন্ডার করা হয়েছে */}
            <RegisterForm />
          </div>

        </div>
      </div>
    </section>
  );
}