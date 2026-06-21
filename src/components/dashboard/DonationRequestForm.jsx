'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import {
  FiUser,
  FiMail,
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiHome,
  FiFileText,
  FiAlertCircle,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

// Full Bangladesh Location Data: Division -> District -> Upazilas 
const bdLocationData = {
  Dhaka: {
    Dhaka: ['Dhamrai', 'Dohar', 'Keraniganj', 'Nawabganj', 'Savar'],
    Faridpur: [
      'Faridpur Sadar', 'Alfadanga', 'Bhanga', 'Boalmari', 'Charbhadrasan',
      'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha',
    ],
    Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'],
    Gopalganj: ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
    Kishoreganj: [
      'Kishoreganj Sadar', 'Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur',
      'Itna', 'Karimganj', 'Katiadi', 'Kuliarchar', 'Mithamain', 'Nikli',
      'Pakundia', 'Tarail',
    ],
    Madaripur: ['Madaripur Sadar', 'Kalkini', 'Rajoir', 'Shibchar'],
    Manikganj: [
      'Manikganj Sadar', 'Daulatpur', 'Ghior', 'Harirampur', 'Shibalaya',
      'Singair', 'Saturia',
    ],
    Munshiganj: [
      'Munshiganj Sadar', 'Gazaria', 'Lohajang', 'Sirajdikhan', 'Sreenagar', 'Tongibari',
    ],
    Narayanganj: ['Araihazar', 'Bandar', 'Narayanganj Sadar', 'Rupganj', 'Sonargaon'],
    Narsingdi: ['Narsingdi Sadar', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'],
    Rajbari: ['Rajbari Sadar', 'Baliakandi', 'Goalandaghat', 'Kalukhali', 'Pangsha'],
    Shariatpur: ['Shariatpur Sadar', 'Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Zajira'],
    Tangail: [
      'Tangail Sadar', 'Basail', 'Bhuapur', 'Delduar', 'Dhanbari', 'Ghatail',
      'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur',
    ],
  },

  Chattogram: {
    Bandarban: [
      'Bandarban Sadar', 'Alikadam', 'Lama', 'Naikhongchhari', 'Rowangchhari', 'Ruma', 'Thanchi',
    ],
    Brahmanbaria: [
      'Brahmanbaria Sadar', 'Akhaura', 'Ashuganj', 'Bancharampur', 'Bijoynagar',
      'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail',
    ],
    Chandpur: [
      'Chandpur Sadar', 'Faridganj', 'Haimchar', 'Hajiganj', 'Kachua',
      'Matlab Dakshin', 'Matlab Uttar', 'Shahrasti',
    ],
    Chattogram: [
      'Anwara', 'Banshkhali', 'Boalkhali', 'Chandanaish', 'Fatikchhari',
      'Hathazari', 'Lohagara', 'Mirsharai', 'Patiya', 'Rangunia', 'Raozan',
      'Sandwip', 'Satkania', 'Sitakunda',
    ],
    Cumilla: [
      'Cumilla Sadar', 'Barura', 'Brahmanpara', 'Burichang', 'Chandina',
      'Chauddagram', 'Daudkandi', 'Debidwar', 'Homna', 'Laksam', 'Lalmai',
      'Manoharganj', 'Meghna', 'Muradnagar', 'Nangalkot', 'Titas',
    ],
    "Cox's Bazar": [
      "Cox's Bazar Sadar", 'Chakaria', 'Kutubdia', 'Maheshkhali', 'Pekua',
      'Ramu', 'Teknaf', 'Ukhia',
    ],
    Feni: ['Feni Sadar', 'Chhagalnaiya', 'Daganbhuiyan', 'Fulgazi', 'Parshuram', 'Sonagazi'],
    Khagrachhari: [
      'Khagrachhari Sadar', 'Dighinala', 'Lakshmichhari', 'Mahalchhari',
      'Manikchhari', 'Matiranga', 'Panchhari', 'Ramgarh',
    ],
    Lakshmipur: ['Lakshmipur Sadar', 'Kamalnagar', 'Raipur', 'Ramganj', 'Ramgati'],
    Noakhali: [
      'Noakhali Sadar', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya',
      'Kabirhat', 'Senbagh', 'Sonaimuri', 'Subarnachar',
    ],
    Rangamati: [
      'Rangamati Sadar', 'Bagaichhari', 'Barkal', 'Belaichhari', 'Juraichhari',
      'Kaptai', 'Kawkhali', 'Langadu', 'Naniarchar', 'Rajasthali',
    ],
  },

  Rajshahi: {
    Bogura: [
      'Bogura Sadar', 'Adamdighi', 'Dhunat', 'Dhupchanchia', 'Gabtali',
      'Kahaloo', 'Nandigram', 'Sariakandi', 'Shajahanpur', 'Sherpur',
      'Shibganj', 'Sonatola',
    ],
    Joypurhat: ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
    Naogaon: [
      'Naogaon Sadar', 'Atrai', 'Badalgachhi', 'Dhamoirhat', 'Manda',
      'Mohadebpur', 'Niamatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar',
    ],
    Natore: ['Natore Sadar', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Singra'],
    Chapainawabganj: ['Chapainawabganj Sadar', 'Bholahat', 'Gomastapur', 'Nachole', 'Shibganj'],
    Pabna: [
      'Pabna Sadar', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur',
      'Ishwardi', 'Santhia', 'Sujanagar',
    ],
    Rajshahi: [
      'Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur',
      'Paba', 'Puthia', 'Tanore',
    ],
    Sirajganj: [
      'Sirajganj Sadar', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur',
      'Raiganj', 'Shahjadpur', 'Tarash', 'Ullahpara',
    ],
  },

  Khulna: {
    Bagerhat: [
      'Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat',
      'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola',
    ],
    Chuadanga: ['Chuadanga Sadar', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
    Jashore: [
      'Jashore Sadar', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha',
      'Keshabpur', 'Manirampur', 'Sharsha',
    ],
    Jhenaidah: [
      'Jhenaidah Sadar', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa',
    ],
    Khulna: [
      'Batiaghata', 'Dacope', 'Dighalia', 'Dumuria', 'Koyra', 'Paikgachha',
      'Phultala', 'Rupsa', 'Terokhada',
    ],
    Kushtia: ['Kushtia Sadar', 'Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Mirpur'],
    Magura: ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'],
    Meherpur: ['Meherpur Sadar', 'Gangni', 'Mujibnagar'],
    Narail: ['Narail Sadar', 'Kalia', 'Lohagara'],
    Satkhira: [
      'Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj',
      'Shyamnagar', 'Tala',
    ],
  },

  Barishal: {
    Barguna: ['Barguna Sadar', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'],
    Barishal: [
      'Barishal Sadar', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara',
      'Gournadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur',
    ],
    Bhola: [
      'Bhola Sadar', 'Borhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan',
      'Manpura', 'Tazumuddin',
    ],
    Jhalokati: ['Jhalokati Sadar', 'Kathalia', 'Nalchity', 'Rajapur'],
    Patuakhali: [
      'Patuakhali Sadar', 'Bauphal', 'Dashmina', 'Dumki', 'Galachipa',
      'Kalapara', 'Mirzaganj', 'Rangabali',
    ],
    Pirojpur: [
      'Pirojpur Sadar', 'Bhandaria', 'Kawkhali', 'Mathbaria', 'Nazirpur',
      'Nesarabad', 'Zianagar',
    ],
  },

  Sylhet: {
    Habiganj: [
      'Habiganj Sadar', 'Ajmiriganj', 'Bahubal', 'Baniyachong', 'Chunarughat',
      'Lakhai', 'Madhabpur', 'Nabiganj', 'Shayestaganj',
    ],
    Moulvibazar: [
      'Moulvibazar Sadar', 'Barlekha', 'Juri', 'Kamalganj', 'Kulaura',
      'Rajnagar', 'Sreemangal',
    ],
    Sunamganj: [
      'Sunamganj Sadar', 'Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha',
      'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Shantiganj', 'Sullah', 'Tahirpur',
    ],
    Sylhet: [
      'Balaganj', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Dakshin Surma',
      'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat',
      'Osmani Nagar', 'Zakiganj',
    ],
  },

  Rangpur: {
    Dinajpur: [
      'Dinajpur Sadar', 'Birampur', 'Birganj', 'Biral', 'Bochaganj',
      'Chirirbandar', 'Fulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole',
      'Khansama', 'Nawabganj', 'Parbatipur',
    ],
    Gaibandha: [
      'Gaibandha Sadar', 'Fulchhari', 'Gobindaganj', 'Palashbari',
      'Sadullapur', 'Saghata', 'Sundarganj',
    ],
    Kurigram: [
      'Kurigram Sadar', 'Bhurungamari', 'Char Rajibpur', 'Chilmari',
      'Nageshwari', 'Phulbari', 'Rajarhat', 'Raomari', 'Ulipur',
    ],
    Lalmonirhat: ['Lalmonirhat Sadar', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'],
    Nilphamari: ['Nilphamari Sadar', 'Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Saidpur'],
    Panchagarh: ['Panchagarh Sadar', 'Atwari', 'Boda', 'Debiganj', 'Tetulia'],
    Rangpur: ['Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj', 'Taraganj'],
    Thakurgaon: ['Thakurgaon Sadar', 'Baliadangi', 'Haripur', 'Pirganj', 'Ranisankail'],
  },

  Mymensingh: {
    Jamalpur: [
      'Jamalpur Sadar', 'Bakshiganj', 'Dewanganj', 'Islampur', 'Madarganj',
      'Melandaha', 'Sarishabari',
    ],
    Mymensingh: [
      'Mymensingh Sadar', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon',
      'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail',
      'Phulpur', 'Trishal',
    ],
    Netrokona: [
      'Netrokona Sadar', 'Atpara', 'Barhatta', 'Durgapur', 'Kalmakanda',
      'Kendua', 'Khaliajuri', 'Madan', 'Mohanganj', 'Purbadhala',
    ],
    Sherpur: ['Sherpur Sadar', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi'],
  },
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SectionHeader = ({ icon, title }) => (
  <div className="mb-5 flex items-center gap-2">
    <span className="text-red-500">{icon}</span>
    <h2 className="text-base font-bold text-zinc-100">{title}</h2>
  </div>
);

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
      {label}
    </span>
    {children}
    {error && <p className="text-[11px] text-red-500 font-semibold">{error}</p>}
  </div>
);

const inputBase = 'w-full pl-11 pr-4 py-3 bg-zinc-950/50 border rounded-xl text-sm focus:outline-none focus:bg-zinc-900/80 transition-all text-zinc-100 placeholder-zinc-700 font-medium';
const selectBase = 'w-full pl-11 pr-10 py-3 bg-zinc-950/50 border rounded-xl text-sm focus:outline-none focus:bg-zinc-900/80 transition-all text-zinc-300 font-medium appearance-none cursor-pointer';
const borderOk = 'border-zinc-800 focus:border-red-500/50';
const borderErr = 'border-red-500';

const IconField = ({ icon, children }) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
      {icon}
    </span>
    {children}
  </div>
);

const DonationRequestForm = ({ form, setForm, errors, submitting, onSubmit }) => {
  const districtOptions = useMemo(
    () => (form.division ? Object.keys(bdLocationData[form.division] || {}) : []),
    [form.division]
  );

  const upazilaOptions = useMemo(
    () =>
      form.division && form.district
        ? bdLocationData[form.division]?.[form.district] || []
        : [],
    [form.division, form.district]
  );

  const update = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleInput = (field) => (e) => update(field)(e.target.value);

  const handleDivisionChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      division: value,
      district: '',
      upazila: '',
    }));
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, district: value, upazila: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name?.trim()) next.name = 'Your name is required';
    if (!form.email?.trim()) next.email = 'Your email is required';
    if (!form.recipientName?.trim()) next.recipientName = 'Recipient name is required';
    if (!form.bloodGroup) next.bloodGroup = 'Select the blood group needed';
    if (!form.division) next.division = 'Select a division';
    if (!form.district) next.district = 'Select a district';
    if (!form.upazila) next.upazila = 'Select an upazila';
    if (!form.hospitalName?.trim()) next.hospitalName = 'Hospital name is required';
    if (!form.fullAddress?.trim()) next.fullAddress = 'Full address is required';
    if (!form.requiredDate) next.requiredDate = 'Required date is needed';
    if (!form.requiredTime) next.requiredTime = 'Required time is needed';

    return Object.keys(next).length === 0;
  };

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const result = await onSubmit(e, form);

      if (result?.insertedId) {
        toast.success('Blood Donation Request Successfully created!', {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          const role = user?.role || 'donor';
          router.push(`/dashboard/${role}/my-requests`);
        }, 1000);

      } else {
        throw new Error("Request creation failed");
      }

    } catch (error) {
      console.error("Submit Error:", error);

      toast.error('Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Requester Info */}
      <div className="rounded-2xl border border-zinc-900/60 bg-zinc-950/40 p-6">
        <SectionHeader icon={<FiAlertCircle size={18} />} title="Requester Info" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your Name" error={errors.name}>
            <IconField icon={<FiUser size={16} />}>
              <input
                placeholder="Loading name..."
                value={form.name}
                readOnly
                className={`${inputBase} ${errors.name ? borderErr : borderOk} opacity-70 cursor-not-allowed`}
              />
            </IconField>
          </Field>
          <Field label="Your Email" error={errors.email}>
            <IconField icon={<FiMail size={16} />}>
              <input
                type="email"
                placeholder="Loading email..."
                value={form.email}
                readOnly
                className={`${inputBase} ${errors.email ? borderErr : borderOk} opacity-70 cursor-not-allowed`}
              />
            </IconField>
          </Field>
        </div>
      </div>

      {/* Patient Details */}
      <div className="rounded-2xl border border-zinc-900/60 bg-zinc-950/40 p-6">
        <SectionHeader icon={<FiDroplet size={18} />} title="Patient Details" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Recipient Name" error={errors.recipientName}>
            <IconField icon={<FiUser size={16} />}>
              <input
                placeholder="Enter full name"
                value={form.recipientName}
                required
                onChange={handleInput('recipientName')}
                className={`${inputBase} ${errors.recipientName ? borderErr : borderOk}`}
              />
            </IconField>
          </Field>

          <Field label="Blood Group Needed" error={errors.bloodGroup}>
            <IconField icon={<FiDroplet size={16} />}>
              <select
                value={form.bloodGroup}
                onChange={handleInput('bloodGroup')}
                required
                className={`${selectBase} ${errors.bloodGroup ? borderErr : borderOk}`}
              >
                <option value="" disabled>Select Group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </IconField>
          </Field>

          <Field label="Division" error={errors.division}>
            <IconField icon={<FiMapPin size={16} />}>
              <select
                value={form.division}
                required
                onChange={handleDivisionChange}
                className={`${selectBase} ${errors.division ? borderErr : borderOk}`}
              >
                <option value="" disabled>Select Division</option>
                {Object.keys(bdLocationData).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </IconField>
          </Field>

          <Field label="District" error={errors.district}>
            <IconField icon={<FiMapPin size={16} />}>
              <select
                value={form.district}
                required
                onChange={handleDistrictChange}
                disabled={!form.division}
                className={`${selectBase} ${errors.district ? borderErr : borderOk} disabled:opacity-40`}
              >
                <option value="" disabled>
                  {form.division ? 'Select District' : 'Choose Division First'}
                </option>
                {districtOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </IconField>
          </Field>

          <Field label="Upazila" error={errors.upazila}>
            <IconField icon={<FiMapPin size={16} />}>
              <select
                value={form.upazila}
                required
                onChange={handleInput('upazila')}
                disabled={!form.district}
                className={`${selectBase} ${errors.upazila ? borderErr : borderOk} disabled:opacity-40`}
              >
                <option value="" disabled>
                  {form.district ? 'Select Upazila' : 'Choose District First'}
                </option>
                {upazilaOptions.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </IconField>
          </Field>
        </div>
      </div>

      {/* Hospital & Timing */}
      <div className="rounded-2xl border border-zinc-900/60 bg-zinc-950/40 p-6">
        <SectionHeader icon={<FiCalendar size={18} />} title="Hospital & Timing" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hospital Name" error={errors.hospitalName}>
            <IconField icon={<FiHome size={16} />}>
              <input
                placeholder="Enter hospital name"
                value={form.hospitalName}
                required
                onChange={handleInput('hospitalName')}
                className={`${inputBase} ${errors.hospitalName ? borderErr : borderOk}`}
              />
            </IconField>
          </Field>

          <Field label="Full Address" error={errors.fullAddress}>
            <IconField icon={<FiMapPin size={16} />}>
              <input
                placeholder="Street / Ward / Area"
                value={form.fullAddress}
                required
                onChange={handleInput('fullAddress')}
                className={`${inputBase} ${errors.fullAddress ? borderErr : borderOk}`}
              />
            </IconField>
          </Field>

          <Field label="Required Date" error={errors.requiredDate}>
            <IconField icon={<FiCalendar size={16} />}>
              <input
                type="date"
                value={form.requiredDate}
                required
                onChange={handleInput('requiredDate')}
                className={`${inputBase} ${errors.requiredDate ? borderErr : borderOk}`}
              />
            </IconField>
          </Field>

          <Field label="Required Time" error={errors.requiredTime}>
            <IconField icon={<FiClock size={16} />}>
              <input
                type="time"
                value={form.requiredTime}
                required
                onChange={handleInput('requiredTime')}
                className={`${inputBase} ${errors.requiredTime ? borderErr : borderOk}`}
              />
            </IconField>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Request Message">
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-zinc-500 pointer-events-none">
                  <FiFileText size={16} />
                </span>
                <textarea
                  placeholder="Explain why the blood is needed..."
                  value={form.message}
                  onChange={handleInput('message')}
                  rows={3}
                  className="w-full resize-none pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-100 placeholder-zinc-700 font-medium"
                />
              </div>
            </Field>
          </div>
        </div>

        {errors.submit && (
          <p className="mt-4 text-[11px] text-red-500 font-semibold">{errors.submit}</p>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm uppercase tracking-wider rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-red-950/30 hover:scale-[1.01] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating...' : 'Create Donation Request'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DonationRequestForm;