'use client';

import DonationRequestForm from '@/components/dashboard/DonationRequestForm';
import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { createBloodRequests } from '@/lib/actions/allBloods';

const initialForm = {
  name: '',
  email: '',
  recipientName: '',
  bloodGroup: '',
  division: '',
  district: '',
  upazila: '',
  hospitalName: '',
  fullAddress: '',
  requiredDate: '',
  requiredTime: '',
  message: '',
};

const DonationRequestFormContainer = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { data: session } = useSession();
  const user = session?.user;

  // Auto-fill user info
  useEffect(() => {
    if (user?.name && user?.email) {
      setForm((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== BLOOD DONATION REQUEST SUBMITTED ===");
    console.log("Form State:", form);

    const newErrors = {};

    if (!form.name?.trim()) newErrors.name = "Name is required";
    if (!form.email?.trim()) newErrors.email = "Email is required";
    if (!form.recipientName?.trim()) newErrors.recipientName = "Recipient name is required";
    if (!form.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!form.hospitalName?.trim()) newErrors.hospitalName = "Hospital name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const payload = {
      ...form,
      userId: user?._id || user?.id,
      requesterName: user?.name,
      requesterEmail: user?.email,
      role: user?.role,
      status: "Pending",         // Default Status Fixed
      createdAt: new Date().toISOString(),
    };

    console.log("Final Payload:", payload);

    const result = await createBloodRequests(payload);
    console.log("API Response:", result);

    if (result?.insertedId) {
      setForm({
        ...initialForm,
        name: user?.name || "",
        email: user?.email || "",
      });
    }

    setSubmitting(false);
  };

  return (
    <DonationRequestForm
      form={form}
      setForm={setForm}
      errors={errors}
      submitting={submitting}
      onSubmit={handleSubmit}
    />
  );
};

export default DonationRequestFormContainer;