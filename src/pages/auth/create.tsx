import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const urbanist = {
    fontFamily: 'Urbanist',
};

export default function CreateAccountSection() {
    const [step, setStep] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        // Handle form submission here (e.g., send data to an API)
        console.log(data);
        setStep(2); // Move to the next step
    };

    const totalSteps = 5
    const progress = (step / totalSteps) * 100

    return (
        <div className="w-full max-w-lg mx-auto mt-16 flex flex-col justify-center items-center gap-10 relative bg-white">
            <div className="text-center">
                <div className="text-[#242424] text-3xl font-semibold capitalize mb-4" style={urbanist}>
                    Join the movement
                </div>
                <div className="text-neutral-500 text-sm font-medium capitalize" style={urbanist}>
                    Create your account to get involved and join the movement
                </div>
            </div>

            <div className="mt-8 max-w-md w-full">
                <div className="w-full h-1.5 bg-[#1b354f]/20 rounded-lg relative my-border-radius">
                    <div className="h-full bg-[#1b354f] rounded-lg" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between mt-2">
                    <div className="text-[#5a5a5a] text-xs font-medium capitalize" style={urbanist}>
                        Step {step}
                    </div>
                    <div className="text-[#5a5a5a] text-xs font-medium capitalize" style={urbanist}>
                        {`${progress}%`}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md">
                {step === 1 && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <Input
                                placeholder="Full Name"
                                className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 border-none"
                                {...register('fullName', { required: 'Full name is required' })}
                            />
                            {/* {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>} */}

                            <Input
                                placeholder="Email Address"
                                className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 border-none"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                            />
                            {errors.email && <span className="text-red-500">{errors.root?.message}</span>}

                            <Input
                                placeholder="Create a Password"
                                className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 border-none"
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {/* {errors.password && <span className="text-red-500">{errors.password.message}</span>} */}

                            <div className="flex items-center gap-2 mt-4">
                                <input type="checkbox" id="terms" className="rounded-sm border border-[#1b354f]" />
                                <label htmlFor="terms" className="text-[#110d0d] text-xs font-medium capitalize" style={urbanist}>
                                    I agree to the{' '}
                                    <Link href="#" className="text-[#1b354f]">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="#" className="text-[#1b354f]">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            
                            <Button type="submit" className="w-full bg-[#1b354f] rounded-lg px-56 py-4 text-white font-semibold">
                                Continue
                            </Button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div className="text-center">
                        <div className="text-[#242424] text-lg font-semibold capitalize mb-4" style={urbanist}>
                            Sign In
                        </div>
                        {/* Add your sign-in form or content here */}
                    </div>
                )}

                <div className="flex items-center justify-center gap-4 mt-8">
                    <div className="w-14 h-12 rounded-lg border border-[#a39f9f]/40 bg-neutral-100/60 flex items-center justify-center">
                        {/* Add your social icon here */}
                    </div>
                    <div className="w-14 h-12 rounded-lg border border-[#a39f9f]/40 bg-neutral-100/60 flex items-center justify-center">
                        {/* Add your social icon here */}
                    </div>
                </div>


            </div>
        </div>
    );
}
