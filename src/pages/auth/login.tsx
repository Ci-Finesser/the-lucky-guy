import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Icons } from "@/components/ui/icons"
import { PiSpinner } from 'react-icons/pi'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { EyeOff, Eye } from 'lucide-react'
import { AppleIcon, GoogleIcon, Tlg, TlgIcon } from '@/components/apc-flag'
import { useRouter } from 'next/router';
import { SessionData, sessionOptions } from '@/lib/session'
import { getIronSession } from 'iron-session'
import { GetServerSidePropsContext } from 'next'
interface SignInFormData {
  email: string
  password: string
}


export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>()
  const [successMsg, setSuccessMsg] = useState<string>()
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    fetch('/api/auth/submitLoginData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => {
      if (!data.status) {
        setIsLoading(false)
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg(undefined);
        }, 2000);
      } else {
        setIsLoading(false)
        setSuccessMsg(data.message);
        console.log('Form submitted:', JSON.stringify(data));
        setTimeout(() => {
          setSuccessMsg(undefined);
        }, 2000);
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <header className='w-full h-20 flex items-center justify-between p-12'>
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
        <Link href="/auth/register" className="my-button-nbg">
          Sign Up
        </Link>
      </header>
      <div className="w-full max-w-lg mx-auto mt-16 flex flex-col justify-center items-center gap-10 relative bg-white">
        <div>
          <div className="text-center">
            <div className="text-[#242424] text-3xl font-semibold capitalize mb-4">
              Welcome Back
            </div>
            <div className="text-neutral-500 font-medium capitalize">
              Create your account to get involved and join the movement
            </div>
          </div>

          <div className='mt-12 w-full max-w-md px-4 md:px-0'>
            {errorMsg && (
              <div className="m-4 text-[#ff0000] text-center text-sm font-semibold capitalize">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="m-4 text-green-500 text-center text-sm font-semibold capitalize">
                {successMsg}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Email address" id="email" name="email" type="email" className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 my-border-radius-input-login text-lg font-medium" required value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <div className="relative space-y-2">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 my-border-radius-input-login text-lg font-medium"
                    />
                    <span
                      className="absolute right-4 top-1/3 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={20} color='#1B354F' /> : <Eye size={20} color='#1B354F' />}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href={''} className='capitalize underline font-semibold'>
                    Forgot Password ?
                  </Link>
                </div>
              </div>

              <Button disabled={isLoading} type="submit" onClick={handleSubmit} className="my-auth-button w-full mt-9">
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity } }}
                    className="inline-block"
                  >
                    <PiSpinner className="animate-spin h-8 w-8 text-white" />
                  </motion.span>
                ) : (
                  "Sign In"
                )}
              </Button>
              {/* <div className='text-center font-bold my-5'>
                Or
              </div>
              <div className="socials flex flex-col items-center justify-center">
                <p className='mb-5 font-semibold text-lg'>Continue using your socials</p>
                <div className="flex items-center gap-3">
                  <div className="p-5 bg-neutral-100 border-radius shadow border flex-col justify-center items-center gap-2.5 inline-flex">
                    <GoogleIcon />
                  </div>
                  <div className="p-5 bg-neutral-100 border-radius shadow border flex-col justify-center items-center gap-2.5 inline-flex">
                    <AppleIcon />
                  </div>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  try {
    const session = await getIronSession<SessionData>(
      context.req,
      context.res,
      sessionOptions,
    );

    if (!session.isLoggedIn) {
      return {props: { data: null }};
    }

    const sessionUser = session.user;
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };

  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { data: null } };
  }
});