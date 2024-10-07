import { Button } from "@/components/ui/button";
import TlgHero from "./tlg-hero";
import { ApcFlag, ArrowDown, Tlg } from "./apc-flag";
import { motion } from "framer-motion";

export default function HeroSectionImage() {
    return (
        <>
            <div className="container py-24 lg:py-32">
                <div className="grid md:grid-cols-2 gap-4 items-center md:gap-20 xl:gap-20 md:items-center">
                    <div>
                        <div className="mb-8 flex items-center">
                            <p className="mr-3 capitalize font-semibold">The Lucky Guy Youth Movement</p>
                            <Tlg />
                        </div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 capitalize">
                            Empowering Ondo’s Youth For A Brighter Future
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground mb-8">
                            Join us in supporting Governor Lucky Orimisan Aiyedatiwa’s vision for progress and development in Ondo State
                        </p>
                        {/* Buttons */}
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                            <Button onClick={() => {
                                window.open("/auth/register", "_blank");
                            }} size={"lg"} className="my-button ">Join The Movement</Button>
                            <Button variant={"ghost"} size={"lg"} className="my-button-nbg">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="relative ms-4 md:justify-self-end">
                        <TlgHero />
                    </div>
                </div>
                <div className="flex justify-center mt-12">
                    <motion.div
                        animate={{ y: ["0px", "10px", "0px"] }} // Bouncing animation
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown />
                    </motion.div>
                </div>
            </div>
        </>
    );
};
