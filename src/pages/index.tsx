import Image from "next/image";
import localFont from "next/font/local";
import HeroSectionImage from "@/components/hero";
import AboutSectionImage from "@/components/about";
import CtaSectionImage from "@/components/cta";
import SubscriptionSection from "@/components/subscribe";
import FooterSection from "@/components/footer";
import EligibilitySection from "@/components/eligibility";

export default function Index() {
  return (
    <div
      className={` min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <HeroSectionImage />
      <AboutSectionImage />
      <EligibilitySection />
      <CtaSectionImage />
      <SubscriptionSection />
      <FooterSection />
    </div>
  );
}
