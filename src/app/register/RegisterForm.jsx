'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
    FiUser, FiMail, FiPhone, FiLock, FiMapPin,
    FiChevronDown, FiUploadCloud, FiTrash2
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const bdLocationData = {
    Dhaka: {
        Dhaka: ['Mirpur', 'Gulshan', 'Dhanmondi', 'Uttara', 'Savar', 'Motijheel', 'Paltan'],
        Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Kapasia', 'Sreepur', 'Kaliganj'],
        Narayanganj: ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'],
        Tangail: ['Tangail Sadar', 'Mirzapur', 'Ghatail', 'Basail', 'Kalihati', 'Madhupur'],
        Faridpur: ['Faridpur Sadar', 'Bhanga', 'Boalmari', 'Alfadanga', 'Madukhali'],
        Gopalganj: ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
        Kishoreganj: ['Kishoreganj Sadar', 'Bhairab', 'Bajitpur', 'Karimganj', 'Itna'],
        Madaripur: ['Madaripur Sadar', 'Kalkini', 'Rajoir', 'Shibchar'],
        Manikganj: ['Manikganj Sadar', 'Singair', 'Saturia', 'Gheor', 'Harirampur'],
        Munshiganj: ['Munshiganj Sadar', 'Sirajdikhan', 'Srinagar', 'Lohajang', 'Tongibari'],
        Narsingdi: ['Narsingdi Sadar', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'],
        Rajbari: ['Rajbari Sadar', 'Goalanda', 'Pangsha', 'Baliakandi', 'Kalukhali'],
        Shariatpur: ['Shariatpur Sadar', 'Damudya', 'Naria', 'Zajira', 'Bhedarganj']
    },
    Chittagong: {
        Chittagong: ['Panchlaish', 'Halishahar', 'Double Mooring', 'Hathazari', 'Sitakunda', 'Patiya'],
        CoxsBazar: ['Coxs Bazar Sadar', 'Ukhiya', 'Teknaf', 'Ramu', 'Chakaria', 'Peua'],
        Feni: ['Feni Sadar', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Sonavazi', 'Fulgazi'],
        Bandarban: ['Bandarban Sadar', 'Thanchi', 'Lama', 'Ruma', 'Alikadam', 'Rowangchhari'],
        Brahmanbaria: ['Brahmanbaria Sadar', 'Ashuganj', 'Akhaura', 'Kasba', 'Nabinagar'],
        Chandpur: ['Chandpur Sadar', 'Hajiganj', 'Haimchar', 'Kachua', 'Matlab North', 'Matlab South'],
        Comilla: ['Comilla Sadar', 'Barura', 'Chandina', 'Daudkandi', 'Laksam', 'Muradnagar'],
        Khagrachhari: ['Khagrachhari Sadar', 'Dighinala', 'Lakshmichhari', 'Mahalchhari', 'Panchhari'],
        Lakshmipur: ['Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati', 'Kamalnagar'],
        Noakhali: ['Noakhali Sadar', 'Begumganj', 'Chatkhil', 'Companyganj', 'Hatiya', 'Senbagh'],
        Rangamati: ['Rangamati Sadar', 'Kaptai', 'Kawkhali', 'Baghaichhari', 'Barkal', 'Langadu']
    },
    Sylhet: {
        Sylhet: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Fenchuganj', 'Balaganj', 'Biswanath'],
        Moulvibazar: ['Moulvibazar Sadar', 'Sreemangal', 'Kulaura', 'Rajnagar', 'Kamalganj', 'Juri'],
        Habiganj: ['Habiganj Sadar', 'Nabiganj', 'Madhabpur', 'Chunarughat', 'Bahubal', 'Baniachong'],
        Sunamganj: ['Sunamganj Sadar', 'Chhatak', 'Jagannathpur', 'Derai', 'Tahirpur', 'Doarabazar']
    },
    Rajshahi: {
        Rajshahi: ['Boalia', 'Matihar', 'Rajpara', 'Paba', 'Godagari', 'Bagha', 'Charghat'],
        Bogra: ['Bogra Sadar', 'Shajahanpur', 'Sherpur', 'Ghabtali', 'Kahaloo', 'Dhunat'],
        Joypurhat: ['Joypurhat Sadar', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
        Naogaon: ['Naogaon Sadar', 'Badalgachhi', 'Dhamoirhat', 'Manda', 'Niamatpur', 'Patnitala'],
        Natore: ['Natore Sadar', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Singra'],
        ChapaiNawabganj: ['Chapai Nawabganj Sadar', 'Bholahat', 'Gomastapur', 'Nachole', 'Shibganj'],
        Pabna: ['Pabna Sadar', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Ishwardi', 'Santhia'],
        Sirajganj: ['Sirajganj Sadar', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Shahjadpur']
    },
    Khulna: {
        Khulna: ['Khulna Sadar', 'Sonadanga', 'Daulatpur', 'Khalishpur', 'Rupsha', 'Dacope', 'Phultala'],
        Jessore: ['Jessore Sadar', 'Jhikargachha', 'Chougachha', 'Abhaynagar', 'Bagherpara', 'Keshabpur'],
        Bagerhat: ['Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj'],
        Chuadanga: ['Chuadanga Sadar', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
        Jhenaidah: ['Jhenaidah Sadar', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'],
        Kushtia: ['Kushtia Sadar', 'Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Mirpur'],
        Magura: ['Magura Sadar', 'Mohammadpur', 'Shlikha', 'Sreepur'],
        Meherpur: ['Meherpur Sadar', 'Gangni', 'Mujibnagar'],
        Narail: ['Narail Sadar', 'Kalia', 'Lohagara'],
        Satkhira: ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar']
    },
    Barisal: {
        Barisal: ['Barisal Sadar', 'Bakerganj', 'Gournadi', 'Wazirpur', 'Muladi', 'Babuganj', 'Banaripara'],
        Bhola: ['Bhola Sadar', 'Char Fasson', 'Lalmohan', 'Borhanuddin', 'Daulatkhan', 'Monpura'],
        Barguna: ['Barguna Sadar', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'],
        Jhalokati: ['Jhalokati Sadar', 'Kathalia', 'Nalchity', 'Rajapur'],
        Patuakhali: ['Patuakhali Sadar', 'Bauphal', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Dumki'],
        Pirojpur: ['Pirojpur Sadar', 'Bhandaria', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Kawkhali']
    },
    Rangpur: {
        Rangpur: ['Rangpur Sadar', 'Mithapukur', 'Pirganj', 'Badarganj', 'Kaunia', 'Gangachara', 'Taraganj'],
        Dinajpur: ['Dinajpur Sadar', 'Birganj', 'Biral', 'Parbatipur', 'Phulbari', 'Hakimpur', 'Nawabganj'],
        Gaibandha: ['Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'],
        Kurigram: ['Kurigram Sadar', 'Bhurungamari', 'Chilmari', 'Nageshwari', 'Phulbari', 'Ulipur'],
        Lalmonirhat: ['Lalmonirhat Sadar', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'],
        Nilphamari: ['Nilphamari Sadar', 'Saidpur', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Dimla'],
        Panchagarh: ['Panchagarh Sadar', 'Boda', 'Debiganj', 'Atwari', 'Tentulia'],
        Thakurgaon: ['Thakurgaon Sadar', 'Baliadangi', 'Haripur', 'Ranisankail', 'Pirganj']
    },
    Mymensingh: {
        Mymensingh: ['Mymensingh Sadar', 'Gaffargaon', 'Ishwarganj', 'Bhaluka', 'Muktagachha', 'Phulpur', 'Trishal'],
        Netrokona: ['Netrokona Sadar', 'Mohanganj', 'Kendua', 'Durgapur', 'Atpara', 'Kalmakanda', 'Purbadhala'],
        Jamalpur: ['Jamalpur Sadar', 'Bakshiganj', 'Dewanganj', 'Isampur', 'Madarganj', 'Melandaha', 'Sarishabari'],
        Sherpur: ['Sherpur Sadar', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi']
    }
};

export default function RegisterForm() {
    const router = useRouter();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '+880 ',
        gender: '',
        role: 'donor', 
        division: '',
        district: '',
        upazila: '',
        bloodGroup: '',
        password: '',
        confirmPassword: '',
        status: 'Active',
        profileImage: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [phoneError, setPhoneError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handlePhoneChange = (e) => {
        let input = e.target.value;
        if (!input.startsWith('+880 ')) input = '+880 ';
        const numberPart = input.slice(5).replace(/\D/g, '');
        const finalPhone = `+880 ${numberPart}`;

        if (numberPart.length <= 10) {
            setFormData({ ...formData, phone: finalPhone });
        }

        const bdMobileRegex = /^(?:\+880\s)1[3-9]\d{8}$/;
        if (numberPart.length > 0 && !bdMobileRegex.test(finalPhone)) {
            setPhoneError('Invalid Bangladeshi mobile number format.');
        } else {
            setPhoneError('');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size is too large! Maximum limit is 2MB.');
                return;
            }
            setFormData({ ...formData, profileImage: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setFormData({ ...formData, profileImage: null });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileImage) {
        toast.error('Profile photo is required to join the lifesaving community!');
        return;
    }

    if (formData.profileImage.size > 5 * 1024 * 1024) {
        toast.error('Image size must be up to 5MB');
        return;
    }

    if (phoneError) {
        toast.error('Please fix the phone number format before submitting.');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match.');
        return;
    }

    setIsSubmitting(true);

    try {
        // ImgBB Upload logic
        const IMGBBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
        console.log("My Key:", process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API)
        
        if (!IMGBBB_API_KEY) {
            toast.error('Image upload API key is missing in environment variables.');
            setIsSubmitting(false);
            return;
        }

        const imgbbFormData = new FormData();
        imgbbFormData.append('image', formData.profileImage);

        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`, {
            method: 'POST',
            body: imgbbFormData,
        });

        const imgbbData = await imgbbResponse.json();

        if (!imgbbResponse.ok || !imgbbData.success) {
            const errMsg = imgbbData.error?.message || 'Failed to upload profile image.';
            toast.error(`ImgBB Error: ${errMsg}`);
            setIsSubmitting(false);
            return;
        }

        const imageUrl = imgbbData.data.url;

        const { data, error } = await authClient.signUp.email({
            email: formData.email.trim(),
            password: formData.password,
            name: formData.fullName.trim(),
            image: imageUrl,
            phone: formData.phone,
            gender: formData.gender,
            role: formData.role,
            division: formData.division,
            district: formData.district,
            upazila: formData.upazila,
            status: formData.status,
            bloodGroup: formData.bloodGroup
        });

        console.log({ data, error });

        if (data) {
            toast.success('Registration successful! Welcome to the lifesaving community.');

            const role = formData.role;

            if (role === 'donor') {
                router.push('/dashboard/donor');
            } else if (role === 'volunteer') {
                router.push('/dashboard/volunteer');
            } else {
                router.push('/dashboard');
            }

            setFormData({
                fullName: '',
                email: '',
                phone: '+880 ',
                gender: '',
                role: 'donor',
                division: '',
                district: '',
                upazila: '',
                bloodGroup: '',
                password: '',
                confirmPassword: '',
                status: 'Active',
                profileImage: null
            });

            setImagePreview(null);
        }
        
        if (error) {
            toast.error(error.message);
        }

    } catch (err) {
        console.error(err);
        toast.error('Network error uploading image or registering. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Upload */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-zinc-950/40 border transition-all cursor-pointer group ${imagePreview ? 'border-red-500/40 bg-zinc-900/30' : 'border-zinc-900/60 hover:border-zinc-700'
                    }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />

                <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 overflow-hidden relative shrink-0 group-hover:border-red-500/50 transition-colors">
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <FiTrash2 size={16} className="text-red-500" onClick={removeImage} />
                            </div>
                        </>
                    ) : (
                        <FiUploadCloud size={22} className="group-hover:text-red-400 transition-colors" />
                    )}
                </div>
                <div className="text-center sm:text-left flex-1">
                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                        Donor Profile Avatar <span className="text-red-500 text-sm">*</span>
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                        {imagePreview ? 'Image loaded successfully. Click the trash icon to reset.' : 'Click to browse or drop an image. Max 2MB (Required).'}
                    </p>
                </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text" required placeholder="Eyasin Arafat"
                            className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-100 placeholder-zinc-700 font-medium"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="email" required placeholder="arafat@example.com"
                            className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-100 placeholder-zinc-700 font-medium"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Phone & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="tel" required
                            className={`w-full pl-11 pr-4 py-3 bg-zinc-950/50 border rounded-xl text-sm focus:outline-none focus:bg-zinc-900/80 transition-all text-zinc-100 font-medium tracking-wide ${phoneError ? 'border-red-500' : 'border-zinc-800 focus:border-red-500/50'
                                }`}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    {phoneError && <p className="text-[11px] text-red-500 font-semibold">{phoneError}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Gender</label>
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <select
                            required
                            className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-300 font-medium appearance-none cursor-pointer"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="" disabled className="bg-zinc-950 text-zinc-600">Select Gender</option>
                            <option value="male" className="bg-zinc-950 text-white">Male</option>
                            <option value="female" className="bg-zinc-950 text-white">Female</option>
                            <option value="other" className="bg-zinc-950 text-white">Other</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Role Selection */}
            <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="role"
                        value="donor"
                        checked={formData.role === "donor"}
                        onChange={(e) => setFormData({
                            ...formData,
                            role: e.target.value
                        })}
                    />
                    <span>Blood Donor</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="role"
                        value="volunteer"
                        checked={formData.role === "volunteer"}
                        onChange={(e) => setFormData({
                            ...formData,
                            role: e.target.value
                        })}
                    />
                    <span>Volunteer</span>
                </label>
            </div>

            {/* Dynamic Location Area */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Division Selector */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Division</label>
                    <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <select
                            required
                            className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-300 font-medium appearance-none cursor-pointer"
                            value={formData.division}
                            onChange={(e) => setFormData({ ...formData, division: e.target.value, district: '', upazila: '' })}
                        >
                            <option value="" disabled className="bg-zinc-950 text-zinc-600">Select Division</option>
                            {Object.keys(bdLocationData).map((div) => (
                                <option key={div} value={div} className="bg-zinc-950 text-white">{div}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* District Selector */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">District</label>
                    <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <select
                            required
                            disabled={!formData.division}
                            className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-300 font-medium appearance-none cursor-pointer disabled:opacity-40"
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value, upazila: '' })}
                        >
                            <option value="" disabled className="bg-zinc-950 text-zinc-600">
                                {formData.division ? 'Select District' : 'Choose Division First'}
                            </option>
                            {formData.division && Object.keys(bdLocationData[formData.division]).map((dist) => (
                                <option key={dist} value={dist} className="bg-zinc-950 text-white">{dist}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* Upazila Selector */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Upazila</label>
                    <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <select
                            required
                            disabled={!formData.district}
                            className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-300 font-medium appearance-none cursor-pointer disabled:opacity-40"
                            value={formData.upazila}
                            onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                        >
                            <option value="" disabled className="bg-zinc-950 text-zinc-600">
                                {formData.district ? 'Select Upazila' : 'Choose District First'}
                            </option>
                            {formData.district && bdLocationData[formData.division][formData.district].map((upz) => (
                                <option key={upz} value={upz} className="bg-zinc-950 text-white">{upz}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Blood Group Matrix */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Select Blood Group</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {bloodGroups.map((group) => (
                        <button
                            type="button" key={group}
                            onClick={() => setFormData({ ...formData, bloodGroup: group })}
                            className={`h-11 rounded-xl text-xs font-black transition-all border ${formData.bloodGroup === group
                                ? 'bg-gradient-to-b from-red-600 to-rose-600 text-white border-red-500 shadow-md shadow-red-950/50 scale-[1.03]'
                                : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 cursor-pointer'
                                }`}
                        >
                            {group}
                        </button>
                    ))}
                </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="password" required placeholder="••••••••"
                            className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-100 placeholder-zinc-700 font-medium"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="password" required placeholder="••••••••"
                            className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-red-500/50 focus:bg-zinc-900/80 transition-all text-zinc-100 placeholder-zinc-700 font-medium"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm uppercase tracking-wider rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-red-950/30 hover:scale-[1.01] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                </button>
                <p className="text-center text-xs text-zinc-500 font-medium">
                    Already have an active profile?{' '}
                    <Link href="/login" className="text-red-400 text-xl font-bold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </form>
    );
}