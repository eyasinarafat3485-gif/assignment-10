'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import {
  Card,
  Chip,
  Avatar,
//   Button,
} from '@heroui/react'; // Divider-ও এখান থেকে বাদ দেওয়া হয়েছে
import {
  FiMapPin,
  FiMail,
  FiUser,
  FiDroplet,
  FiShield,
  FiHeart,
  FiEdit3,
} from 'react-icons/fi';

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

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

  const user = session?.user;

  const profile = {
    name: user?.name || 'Donor Name',
    email: user?.email || 'donor@gmail.com',
    district: user?.district || 'Bandarban',
    upazila: user?.upazila || 'Lama',
    bloodGroup: user?.bloodGroup || 'A+',
    status: user?.status || 'Active Donor',
  };

  return (
    <div className="min-h-screen  ">
      <div className="mx-auto ml-5 ">
        <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
                {user?.name}
            </h2>
        <div className="my-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            {/* <p className="mb-2 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              Account Overview
            </p> */}
            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Profile <span className="text-red-500">Settings</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
              Manage your personal details, donor identity, and account
              preferences from one dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            {/* <Chip
              variant="flat"
              className="border border-emerald-500/20 bg-emerald-500/10 px-3 text-emerald-400"
            >
              {profile.status}
            </Chip> */}

            <button
              color="danger"
              variant="shadow"
            //   startContent={}
              className="font-semibold"
            >
              Edit Profile
            </button>
          </div>
          <div>

          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 bg-zinc-950/70 rounded-3xl">
          <Card className="overflow-hidden border rounded-md border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:col-span-2">
            <div className="relative h-40 bg-gradient-to-r rounded-md from-red-950 via-rose-900 to-red-600">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" />
              <div className="absolute -bottom-14 left-6">
                <Avatar
                  name={profile?.name}
                  className="h-28 w-28 border-4 border-zinc-950 bg-white text-2xl font-bold text-red-500"
                />
              </div>

              <div className="absolute right-6 top-6 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-100/80">
                  Blood Group
                </p>
                <h3 className="text-3xl font-black text-white">
                  {profile.bloodGroup}
                </h3>
              </div>
            </div>

            <div className="p-5 pt-20">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {profile.name}
                  </h2>
                  <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                    <FiMapPin className="text-red-400" />
                    <span>
                      {profile.upazila}, {profile.district}
                    </span>
                  </div>
                </div>

              <Chip
  // startContent={<FiHeart className="ml-1" />} // সরিয়ে দিন বা comment করুন
  variant="flat"
  className="border border-red-500/20 bg-red-500/10 text-red-400"
>
  Verified Donor
</Chip>
              </div>

              {/* Divider-এর বদলে Tailwind বর্ডার ব্যবহার করা হয়েছে */}
              <div className="my-4 h-[1px] w-full bg-white/10" />

              <div className="grid gap-4 md:grid-cols-2">
                <InfoBox
                  icon={<FiUser />}
                  label="Full Name"
                  value={profile.name}
                />
                <InfoBox
                  icon={<FiMail />}
                  label="Email Address"
                  value={profile.email}
                />
                <InfoBox
                  icon={<FiMapPin />}
                  label="District"
                  value={profile.district}
                />
                <InfoBox
                  icon={<FiMapPin />}
                  label="Upazila"
                  value={profile.upazila}
                />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-red-500/10 p-3 text-red-400">
                    <FiDroplet size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Medical Profile
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Basic donor health information
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Blood Group
                  </p>
                  <h2 className="mt-2 text-4xl font-black text-red-400">
                    {profile.bloodGroup}
                  </h2>
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
                    <h3 className="text-lg font-bold text-white">
                      Donation Status
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Current eligibility overview
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="font-semibold text-emerald-400">
                    Eligible to Donate
                  </p>
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

const InfoBox = ({ icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-red-500/30 hover:bg-white/10">
      <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
        <span className="text-red-400">{icon}</span>
        <span>{label}</span>
      </div>
      <p className="text-base font-semibold text-white">{value}</p>
    </div>
  );
};

export default ProfilePage;