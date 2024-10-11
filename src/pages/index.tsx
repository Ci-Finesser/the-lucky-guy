import Image from "next/image";
import localFont from "next/font/local";
import HeroSectionImage from "@/components/hero";
import AboutSectionImage from "@/components/about";
import CtaSectionImage from "@/components/cta";
import SubscriptionSection from "@/components/subscribe";
import FooterSection from "@/components/footer";
import EligibilitySection from "@/components/eligibility";
import SEO from "@/components/seo";
import { TlgIcon } from "@/components/apc-flag";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import router from "next/router";

export default function Index() {
  return (
    <>
      <div
        className={`min-h-screen p-8 pb-20 gap-16 sm:p-20`}
      >
        <header className='w-full h-20 flex items-center justify-between px-2 md:px-8'>
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="rounded-full shadow">
                <TlgIcon />
              </div>
            </div>
          </motion.div>
          <Button onClick={() => {
            router.push("/auth/login");
          }} size={"lg"} className="my-button ">Sign In</Button>
        </header>
        <HeroSectionImage />
        <AboutSectionImage />
        <EligibilitySection />
        <CtaSectionImage />
        <SubscriptionSection />
        <FooterSection />
      </div>
    </>
  );
}
