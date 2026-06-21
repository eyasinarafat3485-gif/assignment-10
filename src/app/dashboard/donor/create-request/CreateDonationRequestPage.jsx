// 'use client';

// import DonationRequestForm from '@/components/dashboard/DonationRequestForm';
// import { useSession } from '@/lib/auth-client';
// import React, { useState, useEffect } from 'react';
// import { createBloodRequests } from '@/lib/actions/allBloods';

// const initialForm = {
//   name: '',
//   email: '',
//   recipientName: '',
//   bloodGroup: '',
//   division: '',
//   district: '',
//   upazila: '',
//   hospitalName: '',
//   fullAddress: '',
//   requiredDate: '',
//   requiredTime: '',
//   status: 'Pending ',
//   message: '',
// };

// const CreateDonationRequestPage = () => {
//   const [form, setForm] = useState(initialForm);
//   const [submitting, setSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   const { data: session } = useSession();
//   const user = session?.user;

//   useEffect(() => {
//     if (user?.name && user?.email) {
//       setForm((prev) => ({
//         ...prev,
//         name: user.name,
//         email: user.email,
//       }));
//     }
//   }, [user]);


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("=== BLOOD DONATION REQUEST SUBMITTED ===");
//   console.log("Form State:", form);

//   const newErrors = {};

//   if (!form.name?.trim()) {
//     newErrors.name = "Name is required";
//   }

//   if (!form.email?.trim()) {
//     newErrors.email = "Email is required";
//   }

//   if (!form.recipientName?.trim()) {
//     newErrors.recipientName = "Recipient name is required";
//   }

//   if (!form.bloodGroup) {
//     newErrors.bloodGroup = "Blood group is required";
//   }

//   if (!form.hospitalName?.trim()) {
//     newErrors.hospitalName = "Hospital name is required";
//   }

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }

//   setErrors({});
//   setSubmitting(true);

//   const payload = {
//     ...form,

//     // logged in user data
//     userId: user?._id || user?.id,
//     requesterName: user?.name,
//     requesterEmail: user?.email,
//     role: user?.role,
//     status: "Pending",
//     createdAt: new Date(),
//   };

//   console.log("Final Payload:", payload);

//   const result = await createBloodRequests(payload);
//   console.log("API Response:", result);

//   if (result.insertedId) {
//     setForm({
//       ...initialForm,
//       name: user?.name || "",
//       email: user?.email || "",
//     });

//   }
//   setSubmitting(false);

// };

//   return (
//     <div className="min-h-screen px-4 py-10 md:px-8">
//       <h2 className="text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase">
//         {form.name || 'Loading...'}
//       </h2>

//       <div className="mx-auto max-w-3xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
//             New <span className="text-red-500">Donation Request</span>
//           </h1>
//           <p className="mt-2 text-sm text-white">
//             Complete the form below to broadcast an urgent request to the donor community.
//           </p>
//         </div>

//         <DonationRequestForm
//           form={form}
//           setForm={setForm}
//           errors={errors}
//           submitting={submitting}
//           onSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default CreateDonationRequestPage;


// 'use client'
// import { useSession } from '@/lib/auth-client';
// import React from 'react';
// import DonationRequestFormContainer from '@/components/dashboard/DonationRequestFormContainer';
// // import DonationRequestFormContainer from './DonationRequestFormContainer';

// const CreateDonationRequestPage = () => {
//   const { data: session, isPending } = useSession();
//   const user = session?.user;
//   console.log(user, isPending);
//   return (
//     <div className="min-h-screen ">
//       <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
//         {user?.role}
//       </h2>

//       <div className="mx-auto  ml-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
//             New <span className="text-red-500">Donation Request</span>
//           </h1>
//           <p className="mt-2 text-sm text-white">
//             Complete the form below to broadcast an urgent request to the donor community.
//           </p>
//         </div>

//         {/* Reusable Sub Component */}
//         <DonationRequestFormContainer />
//       </div>
//     </div>
//   );
// };

// export default CreateDonationRequestPage;

'use client'
import { useSession } from '@/lib/auth-client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import DonationRequestFormContainer from '@/components/dashboard/DonationRequestFormContainer';

const CreateDonationRequestPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log(user, isPending);

  // ✅ Blocked user-ke form theke dure rakha, dashboard home e pathiye deya
 useEffect(() => {
    if (isPending) return; // session load hocche, wait koro
    if (user?.status?.toLowerCase() === 'blocked') {
      toast.error("Your account is blocked. You cannot create a blood request.");

      // ✅ Toast valo vabe dekhar jonno redirect ta 2 second delay kora hocche
      const timer = setTimeout(() => {
        router.replace(`/dashboard/${user?.role}`);
      }, 2000);

      return () => clearTimeout(timer); // cleanup, jate component unmount hole timer na cholte thake
    }
}, [user, isPending, router]);

// ✅ blocked obostay form flash howa thekate
if (!isPending && user?.status?.toLowerCase() === 'blocked') {
    return null;
}

  return (
    <div className="min-h-screen ">
      <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
        {user?.role}
      </h2>

      <div className="mx-auto  ml-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
            New <span className="text-red-500">Donation Request</span>
          </h1>
          <p className="mt-2 text-sm text-white">
            Complete the form below to broadcast an urgent request to the donor community.
          </p>
        </div>

        {/* Reusable Sub Component */}
        <DonationRequestFormContainer />
      </div>
    </div>
  );
};

export default CreateDonationRequestPage;