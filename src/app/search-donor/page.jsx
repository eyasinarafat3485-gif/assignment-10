'use client';

import { useSession } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import { searchDonors } from '@/lib/api/donors';
import { CiMail } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';

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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonorPage = () => {
    const { data: session, isPending } = useSession();

    const [selectedBlood, setSelectedBlood] = useState("");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");

    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableUpazilas, setAvailableUpazilas] = useState([]);

    const [donors, setDonors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedDivision) {
            setAvailableDistricts(Object.keys(bdLocationData[selectedDivision]) || []);
        } else {
            setAvailableDistricts([]);
        }
        setSelectedDistrict("");
        setSelectedUpazila("");
        setAvailableUpazilas([]);
    }, [selectedDivision]);

    useEffect(() => {
        if (selectedDivision && selectedDistrict) {
            setAvailableUpazilas(bdLocationData[selectedDivision][selectedDistrict] || []);
        } else {
            setAvailableUpazilas([]);
        }
        setSelectedUpazila("");
    }, [selectedDistrict, selectedDivision]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setHasSearched(true);

        try {
            const result = await searchDonors({
                bloodGroup: selectedBlood,
                district: selectedDistrict,
                upazila: selectedUpazila
            });

            if (result?.success) {
                setDonors(result.data);
            } else {
                setDonors([]);
            }
        } catch (error) {
            console.error("Error searching donors:", error);
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-12 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Find a <span className="text-red-500">Blood Donor</span>
                </h1>
                <p className="text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
                    Connecting heroes with those in need. Search by group and location.
                </p>
            </div>

            {/* Dynamic Search Form Box */}
            <div className="max-w-6xl mx-auto bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl shadow-xl mb-12">
                <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">

                    {/* Blood Group */}
                    <div>
                        <label className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-2">Blood Group</label>
                        <select
                            value={selectedBlood}
                            onChange={(e) => setSelectedBlood(e.target.value)}
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition"
                        >
                            <option value="">Select Group</option>
                            {bloodGroups.map((group) => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>

                    {/* Division */}
                    <div>
                        <label className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-2">Division</label>
                        <select
                            value={selectedDivision}
                            onChange={(e) => setSelectedDivision(e.target.value)}
                            required
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition"
                        >
                            <option value="">Select Division</option>
                            {Object.keys(bdLocationData).map((div) => (
                                <option key={div} value={div}>{div}</option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-2">District</label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            required
                            disabled={!selectedDivision}
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-40"
                        >
                            <option value="">Select District</option>
                            {availableDistricts.map((dist) => (
                                <option key={dist} value={dist}>{dist}</option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-2">Upazila</label>
                        <select
                            value={selectedUpazila}
                            onChange={(e) => setSelectedUpazila(e.target.value)}
                            disabled={!selectedDistrict}
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition disabled:opacity-40"
                        >
                            <option value="">Select Upazila</option>
                            {availableUpazilas.map((upz) => (
                                <option key={upz} value={upz}>{upz}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl px-6 py-3 transition flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Result / Empty State Section */}
            <div className="max-w-6xl mx-auto">
                {!hasSearched ? (
                    <div className="text-center py-16 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-8">
                        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-5 relative animate-pulse">
                            <span className="text-red-500 text-3xl">🩸</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ready to find a hero?</h3>
                        <p className="text-zinc-400 max-w-sm mx-auto text-sm">
                            Select blood group, division, and location to see available donors.
                        </p>
                    </div>
                ) : loading ? (
                    <div className="text-center py-12 text-zinc-400">Searching for donors...</div>
                ) : donors.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
                        <p className="text-zinc-400">No active donors found matching your criteria.</p>
                    </div>
                ) : (
                    /* Donors Result List Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {donors.map((donor) => (
                            <div
                                key={donor._id || donor.id}
                                className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl hover:border-zinc-700/50 transition duration-300 relative group overflow-hidden"
                            >
                                <div className="relative mb-4 mt-2">
                                    <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
                                        {donor.image ? (
                                            <img
                                                src={donor.image}
                                                alt={donor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (

                                            <span className="text-3xl">🩸</span>
                                        )}
                                    </div>
                                    {/* Floating Blood Group Badge */}
                                    <span className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-lg border border-red-500 tracking-wider">
                                        {donor.bloodGroup}
                                    </span>
                                </div>

                                {/* Donor Identity */}
                                <div className="mb-5">
                                    <h4 className="text-xl font-bold text-white tracking-wide">{donor.name}</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mt-0.5">Active Donor</p>
                                </div>

                                {/* Info Fields Layout */}
                                <div className="w-full space-y-3 bg-zinc-950/40 border border-zinc-800/40 rounded-xl p-3.5 mb-6 text-left text-sm">
                                    {/* Location */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-zinc-800/60 flex items-center justify-center shrink-0 text-zinc-400 border border-zinc-800">
                                            <IoLocationOutline />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider leading-none mb-1">Location</p>
                                            <p className="text-zinc-300 font-medium text-xs truncate max-w-[180px]">
                                                {donor.upazila}, {donor.district}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email Address */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-zinc-800/60 flex items-center justify-center shrink-0 text-zinc-400 border border-zinc-800">
                                            <CiMail />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider leading-none mb-1">Email Address</p>
                                            <p className="text-zinc-300 font-medium text-xs truncate max-w-[180px]">
                                                {donor.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Action Button */}
                                <div className="w-full mt-auto">
                                    <a
                                        href={`mailto:${donor.email}`}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm block text-center py-3 rounded-xl transition duration-200 shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2"
                                    >
                                        <span>Contact Now</span>
                                        <span className="text-xs">❤️</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonorPage;