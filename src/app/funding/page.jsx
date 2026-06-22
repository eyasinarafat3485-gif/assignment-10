'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react';

const FundingHistoryPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user, isPending);

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-8 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    All Funding <span className="text-red-500">History</span>
                </h1>
                <p className="text-white mt-3 text-lg">
                    The funding history of NEA reflects its ongoing support for arts and culture through various grants and programs over the years.
                </p>
            </div>
        </div>
    );
};

export default FundingHistoryPage;



// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// // import GiveFundButton from "@/components/GiveFundButton";
// import { prisma } from "@/lib/prisma";
// // import SuccessMessage from "@/components/SuccessMessage";
// import FundingTable from "./FundingTable";
// import GiveFundButton from "./GiveFundButton";
// import SuccessMessage from "./SuccessMessage";

// export default async function FundingPage({ searchParams }) {
//   // Promise resolve korar jonno searchParams ke await korte hobe (Next.js 14+/15 er rules onujayi)
//   const params = await searchParams; 
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return <p>Access Denied. Please login.</p>;
//   }

//   const fundings = await prisma.funding.findMany({
//     orderBy: { createdAt: "desc" },
//     include: { user: true },
//   });

//   const totalFunds = fundings
//     .filter(f => f.status === "succeeded")
//     .reduce((sum, f) => sum + f.amount, 0);

//   const isSuccess = params?.success === "true";
//   const isCanceled = params?.canceled === "true";

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Success / Cancel Message */}
//       {isSuccess && <SuccessMessage message="✅ Thank you! Your payment was successful." type="success" />}
//       {isCanceled && <SuccessMessage message="❌ Payment was canceled." type="error" />}

//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Funding History</h1>
//           <p className="text-gray-600 mt-1">
//             Total Funds Raised: <span className="font-semibold text-green-600">${totalFunds.toFixed(2)}</span>
//           </p>
//         </div>
//         <GiveFundButton />
//       </div>

//       <FundingTable fundings={fundings} />
//     </div>
//   );
// }



// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import FundingTable from "./FundingTable";
// import GiveFundButton from "./GiveFundButton";
// import SuccessMessage from "./Message"; // আপনার ফাইল নাম অনুযায়ী পাথ ঠিক করে নিবেন
// import clientPromise from "@/lib/db"; // MongoDB কানেকশন ইম্পোর্ট

// export default async function FundingPage({ searchParams }) {
//   const params = await searchParams; 
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-red-500 font-medium">Access Denied. Please login.</p>
//       </div>
//     );
//   }

//   // ১. সরাসরি MongoDB থেকে Data Fetch করা
//   const client = await clientPromise;
//   const db = client.db();
  
//   const rawFundings = await db
//     .collection("fundings")
//     .find({})
//     .sort({ createdAt: -1 }) // রিসেন্ট ডেটা সবার আগে দেখানোর জন্য (-1)
//     .toArray();

//   // ২. MongoDB ObjectId এবং Date-কে Client Component এর জন্য Serialize করা
//   const fundings = rawFundings.map((f) => ({
//     id: f._id.toString(),
//     userName: f.userName,
//     amount: f.amount,
//     status: f.status,
//     createdAt: f.createdAt ? f.createdAt.toISOString() : new Date().toISOString(),
//   }));

//   // ৩. শুধুমাত্র 'succeeded' ফান্ডগুলোর টোটাল হিসাব করা
//   const totalFunds = fundings
//     .filter(f => f.status === "succeeded")
//     .reduce((sum, f) => sum + f.amount, 0);

//   const isSuccess = params?.success === "true";
//   const isCanceled = params?.canceled === "true";

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Success / Cancel Message */}
//       {isSuccess && <SuccessMessage message="✅ Thank you! Your payment was successful." type="success" />}
//       {isCanceled && <SuccessMessage message="❌ Payment was canceled." type="error" />}

//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Funding History</h1>
//           <p className="text-gray-600 mt-1">
//             Total Funds Raised: <span className="font-semibold text-green-600">${totalFunds.toFixed(2)}</span>
//           </p>
//         </div>
//         <GiveFundButton />
//       </div>

//       <FundingTable fundings={fundings} />
//     </div>
//   );
// }