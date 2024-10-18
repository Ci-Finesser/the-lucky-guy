import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SendIcon } from './apc-flag';
import { motion } from 'framer-motion';
import { PiSpinner } from 'react-icons/pi';

export default function SubscriptionSection() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        fetch('/api/emailSubscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => {
            if (!data.status) {
                setIsLoading(false)
                console.log(JSON.stringify(data));
            } else {
                setIsLoading(false)
                console.log(JSON.stringify(data));
                setIsSubscribed(true);
            }
        })
    };

    return (
        <div className="w-full max-w-md mx-auto mt-16 flex flex-col justify-center items-center gap-10">
            {!isSubscribed && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="h-24 flex flex-col justify-start items-center gap-2.5 mb-6">
                        <div className="self-stretch text-center text-black text-2xl font-semibold capitalize">
                            Subscribe to get updates
                        </div>
                        <div className="w-full text-center text-lg font-medium text-muted-foreground capitalize">
                            Stay up to date with the latest events, features and important information from TLG
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <Input
                            placeholder="Enter your email address"
                            className="w-full mt-4 shadow rounded-lg px-5 py-3.5 h-[3.5rem] my-border-radius-input text-lg font-medium"
                            required
                            type='email'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                        />
                        {errors.email && <span className="text-red-500">{errors.root?.message}</span>}
                        <button type="submit" className="subscribe-button h-[3.5rem] mt-4" disabled={isLoading}>
                            {isLoading ? <motion.span
                                animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity } }}
                                className="inline-block"
                            >
                                <PiSpinner className="animate-spin h-8 w-8 text-white" />
                            </motion.span> : <SendIcon color='white' />}
                        </button>
                    </div>
                </form>
            )}
            {isSubscribed && (
                <div className="text-center text-green-500 font-bold">
                    You are now subscribed!
                </div>
            )}
        </div>
    );
}
