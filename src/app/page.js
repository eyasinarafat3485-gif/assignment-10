import BloodDonationBanner from "@/components/homepage/BloodDonationBanner";
import BloodStockRadar from "@/components/homepage/BloodStockRadar";
import CompatibilitySection from "@/components/homepage/CompatibilitySection";
import ContactSection from "@/components/homepage/ContactSection";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <BloodDonationBanner />
      <FeaturedSection />
      <BloodStockRadar />
      <CompatibilitySection />
      <ContactSection />
    </div>
  );
}
