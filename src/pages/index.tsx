import Image from "next/image";
import localFont from "next/font/local";
import HeroSectionImage from "@/components/hero";
import AboutSectionImage from "@/components/about";
import CtaSectionImage from "@/components/cta";
import SubscriptionSection from "@/components/subscribe";
import FooterSection from "@/components/footer";
import EligibilitySection from "@/components/eligibility";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Index() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
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
