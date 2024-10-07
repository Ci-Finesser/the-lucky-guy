import { Button } from "@/components/ui/button";
import TlgHero from "./tlg-hero";
import { ApcFlag, ArrowDown } from "./apc-flag";
import { motion } from "framer-motion";
import CtaImage from "@/assets/cta-image.png";
import Image from "next/image";

export default function CtaSectionImage() {
    return (
        <>
            <div className="container py-24 lg:py-32">
                <div className="grid md:grid-cols-2 gap-4 items-center md:gap-20 xl:gap-20 md:items-center">
                    <div>
                        <div className="mb-3 flex items-center">
                            <p className="mr-3">Take Action Today </p>
                            <ApcFlag />
                        </div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
                            Get Involved, Make An Impact
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground mb-3">
                            Sign up to become a registered supporter and receive updates on upcoming events, resources, and opportunities to get involved Join our growing network of volunteers and organizers who are taking action in their communities to engage more youth in this movement.
                        </p>
                        {/* Buttons */}
                        <Button onClick={() => {
                            window.open("/auth/register", "_blank");
                        }} className="my-button">Join The Movement</Button>
                    </div>
                    <div className="relative ms-4 md:justify-self-end">
                        <Image
                            src={CtaImage}
                            alt="Call to action image"
                            width={600}
                            height={300}
                            className="rounded-md"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
