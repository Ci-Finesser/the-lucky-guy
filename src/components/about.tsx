import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutSectionImage() {
    return (
        <>
            <div className="container flex justify-center">
                <div className="grid md:grid-cols-2 gap-4 md:gap-20 xl:gap-20 md:items-center justify-center">
                    <div className="first">
                        <Card className="mb-4 max-w-md">
                            <CardHeader className="flex justify-between">
                                <CardTitle className="font-bold">About The Movement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Our vision is to give young people the platform they deserve in shaping the political landscape, this campaign is more than just an election - it’s a movement for the future. by mobilizing the youth, we aim to create a government that listens, represents, and empowers the next generation
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="max-w-md">
                            <CardHeader className="flex justify-between">
                                <CardTitle className="font-bold">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-black mr-2"></span>
                                        Ignite Youth Empowerment
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-black mr-2"></span>
                                        Build a Powerful Coalition
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-black mr-2"></span>
                                        Drive Accountability and Progress
                                    </li>

                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="second">
                        <Card className="mb-4 max-w-md">
                            <CardContent>
                                <Image
                                    src="/" // Replace with your image path
                                    alt="About The Movement"
                                    width={300} // Adjust width as needed
                                    height={190} // Adjust height as needed
                                    className="rounded-md" // Add optional styling
                                />
                            </CardContent>
                        </Card>
                        <Card className="max-w-md">
                            <CardHeader className="flex justify-between">
                                <CardTitle className="font-bold">Our Vison</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    To create a future where young people are at the forefront of positive political change, shaping the leadership of tomorrow, with our key focus on having youths lead political change, inspiring them and making room for long term social and democratic impact.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}