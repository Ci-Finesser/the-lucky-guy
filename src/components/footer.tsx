import Link from "next/link";

export default function FooterSection() {
    return (
        <footer className="flex justify-between items-center px-4 mt-16">
            <div className="text-[#474747] text-md font-medium capitalize">
                Copyright © 2024 The Lucky Guy Youth Movement - All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
                <Link href="#" className="text-md font-medium capitalize">
                    Terms of Service
                </Link>
                |
                <Link href="#" className=" text-md font-medium capitalize">
                    Privacy Policy
                </Link>

            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black" />
                <div className="w-4 h-4 rounded-full bg-black" />
                <div className="w-4 h-4 rounded-full bg-black" />
            </div>
        </footer>
    );
}