import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { SendIcon } from './apc-flag';

export default function SubscriptionSection() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    // Handle form submission here (e.g., send data to an API)
    console.log(data);
    setIsSubscribed(true);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 flex flex-col justify-center items-center gap-10">
      {!isSubscribed && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-24 flex flex-col justify-start items-center gap-2.5">
            <div className="self-stretch text-center text-black text-2xl font-semibold capitalize">
              Subscribe to get updates
            </div>
            <div className="w-full text-center text-sm font-medium capitalize">
              Stay up to date with the latest events, features and important information from TLG
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Enter your email address"
              className="w-full rounded-md shadow border border-[#e8e8e8] px-4 py-3"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && <span className="text-red-500">{errors.root?.message}</span>}
            <Button type="submit" className="w-24 h-12 rounded-md bg-[#1277dd] text-white font-medium">
              <SendIcon />
            </Button>
          </div>
        </form>
      )}
      {isSubscribed && (
        <div className="text-center text-green-500 font-medium">
          You are now subscribed!
        </div>
      )}
    </div>
  );
}
