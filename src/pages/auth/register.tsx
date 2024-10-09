import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle2, Eye, EyeOff, Upload } from 'lucide-react'
import { ONDOLGA, Ward } from '@/types'
import Link from 'next/link'
import { truncateString } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Tlg, TlgIcon } from '@/components/apc-flag'
import { useRouter } from 'next/router';
import { PiSpinner } from 'react-icons/pi'
interface RegistrationFormData {
    email: string
    phone: string
    password: string
    terms: boolean
    name: string
    occupation: string
    lga: string
    ward: string
    bank: string
    accountNumber: string
    poll_unit: string
    passportPhoto: File | null
    votersdiv: File | null
    nin: string
    vcn: string
    selfie: File | null
}

export default function RegistrationFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1)
    const [lgas, setLgas] = useState<ONDOLGA[]>([])
    const [errorMsg, setErrorMsg] = useState<string>()
    const [successMsg, setSuccessMsg] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        phone: '',
        password: '',
        terms: false,
        name: '',
        occupation: '',
        lga: '',
        ward: '',
        bank: '',
        accountNumber: '',
        poll_unit: '',
        passportPhoto: null,
        votersdiv: null,
        nin: '',
        vcn: '',
        selfie: null
    })

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetch('/api/ondoLga')
            .then(res => res.json())
            .then(data => setLgas(data.data))
    }, []);

    const totalSteps = 4
    const progress = (step / totalSteps) * 100

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileUpload = (name: any) => (e: any) => {
        const file = e.target.files[0]
        setFormData(prev => ({ ...prev, [name]: file }))
    }

    const handleNext = () => {
        if (step === 1) {
            const { email, password, terms, name, phone } = formData
            if (!email || !password || !name || !phone) {
                setErrorMsg('All fields are required!')
                return
            }

            if (!terms) {
                setErrorMsg('Please agree to the terms and conditions')
                return
            }
        }

        if (step === 2) {
            const { occupation, lga, ward, poll_unit } = formData

            if (!occupation || !lga || !ward || !poll_unit) {
                setErrorMsg('All fields are required!')
                return
            }

            if (!occupation) {
                setErrorMsg('Please enter your occupation')
                return
            }
        }
        if (step === 3) {

        }
        setErrorMsg(undefined)
        setStep(prev => Math.min(prev + 1, totalSteps))
    }

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const { nin, vcn } = formData
        if (!nin || !vcn) {
            setErrorMsg('NIN & VCN are required')
            return
        }
        setIsLoading(true)

        fetch('/api/auth/submitRegistrationData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then(data => {
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
                    handleNext()
                }, 3000);
            }
        })

    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const jj = truncateString(formData.poll_unit, 20)

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
                <Link href="/auth/login" className="my-button-nbg">
                    Sign In
                </Link>
            </header>
            <div className="w-full max-w-lg mx-auto mt-16 flex flex-col justify-center items-center gap-10 relative bg-white">
                <div className='px-4 md:px-0'>
                    <div className="text-center">
                        <div className="text-[#242424] text-3xl font-semibold capitalize mb-4">
                            Join the movement
                        </div>
                        <div className="text-neutral-500 text-sm font-medium capitalize">
                            sign in to your account to get involved and join the movement
                        </div>
                    </div>
                    <div className="mt-8 max-w-lg w-full">
                        <div className="w-full h-1.5 bg-[#1b354f]/20 relative my-border-radius">
                            <div className="h-full bg-[#1b354f] my-border-radius" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex justify-between mt-2">
                            <div className="text-[#5a5a5a] text-xs font-medium capitalize">
                                Step {step}
                            </div>
                            <div className="text-[#5a5a5a] text-xs font-medium capitalize">
                                {`${progress}%`}
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 w-full max-w-lg'>
                        {errorMsg && (
                            <div className="m-4 text-[#ff0000] text-sm font-semibold capitalize">
                                {errorMsg}
                            </div>
                        )}
                        {successMsg && (
                            <div className="m-4 text-green-500 text-center text-sm font-semibold capitalize">
                                {successMsg}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='max-w-md'>
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Input placeholder="Full name" id="name" name="name" type="text" className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 my-border-radius-input" required value={formData.name} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Email address" id="email" name="email" type="email" className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 my-border-radius-input" required value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Phone number" id="phone" name="phone" type="tel" className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 my-border-radius-input" required value={formData.phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative space-y-2">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Create a Password"
                                                required
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="bg-neutral-100 h-[4rem] rounded-lg px-5 py-5 my-border-radius-input"
                                            />
                                            <span
                                                className="absolute right-4 top-1/3 transform -translate-y-1/2 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <EyeOff size={20} color='#1B354F' /> : <Eye size={20} color='#1B354F' />}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-12">
                                        <input type="checkbox" id="terms" name='terms' checked={formData.terms} className="rounded-sm border border-[#1b354f]" onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))} />
                                        <label htmlFor="terms" className="text-[#110d0d] text-xs font-medium capitalize">
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
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <Input
                                        placeholder="Occupation"
                                        name='occupation'
                                        className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input"
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <Select
                                        name="lga"
                                        value={formData.lga}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, lga: value }))}
                                    >
                                        <SelectTrigger className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input w-full">
                                            <SelectValue placeholder="Select Local Government" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            {lgas &&
                                                Object.keys(lgas).map((lgaKey) => (
                                                    <SelectItem key={lgas[Number(lgaKey)].id} value={lgas[Number(lgaKey)].name}>
                                                        {truncateString(lgas[Number(lgaKey)].name, 20) ?? 'Select Local Government'}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        name="ward"
                                        value={formData.ward}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, ward: value }))}
                                    >
                                        <SelectTrigger className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input">
                                            <SelectValue placeholder="Select Ward" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            {lgas && formData.lga
                                                ? Object.values(lgas.find((lga) => lga.name === formData.lga)?.wards || {}).map((ward: Ward) => (
                                                    <SelectItem key={ward?.id} value={ward?.name}>
                                                        {truncateString(ward.name, 20) || 'Select Ward'}
                                                    </SelectItem>
                                                ))
                                                : <SelectItem value="empty" disabled>Select a LGA first</SelectItem>}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        name="poll_unit"
                                        value={formData.poll_unit}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, poll_unit: value }))}
                                    >
                                        <SelectTrigger className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input">
                                            <SelectValue placeholder="Polling Unit" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            {lgas && formData.ward
                                                ? Object.values(lgas.find((lga) => lga.name === formData.lga)?.wards.find((ward) => ward.name === formData.ward)?.units || {}).map((units: any) => (
                                                    <SelectItem key={units?.id} value={units?.name}>
                                                        {truncateString(units.name, 25)}
                                                    </SelectItem>
                                                ))
                                                : <SelectItem value="empty" disabled>Select a Ward first</SelectItem>}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <Input
                                        placeholder="Enter NIN"
                                        name='nin'
                                        type='number'
                                        className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input"
                                        value={formData.nin}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <Input
                                        placeholder="Voter's Card Number"
                                        name='vcn'
                                        type='number'
                                        className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input"
                                        value={formData.vcn}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Bank Name (optional)"
                                        className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input"
                                        value={formData.bank}
                                        type='text'
                                        name='bank'
                                        onChange={handleInputChange}
                                    />

                                    <Input
                                        placeholder="Account Number (optional)"
                                        className="bg-neutral-100/20 rounded-lg px-5 py-3.5 h-[4rem] my-border-radius-input"
                                        value={formData.accountNumber}
                                        type='number'
                                        name='accountNumber'
                                        onChange={handleInputChange}
                                        maxLength={11}
                                    />
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-4 px-4 md:px-0">
                                    <div className='w-full px-9 py-6 bg-[#e9e9e9]/30 my-border-radius'>
                                        <h3 className="text-lg font-semibold mb-6">Registration Completed</h3>
                                        <p className='mb-6'>Go to dashboard to navigate through your account, see upcoming campaigns and events.</p>
                                        <div className="flex items-center space-x-2 text-yellow-600">
                                            <AlertCircle className="w-5 h-5" />
                                            <span>Verification Status: Pending</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col justify-center mt-9 gap-3">
                                {step === (totalSteps) && (
                                    <Button type="button" onClick={() => router.push('/dashboard')} className="my-auth-button">
                                        Done
                                    </Button>
                                )}
                                {step === (totalSteps - 1) && (
                                    <Button disabled={isLoading} type="submit" onClick={handleSubmit} className="my-auth-button">
                                        {isLoading ? (
                                            <motion.span
                                                animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity } }}
                                                className="inline-block"
                                            >
                                                <PiSpinner className="animate-spin h-8 w-8 text-white" />
                                            </motion.span>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                )}
                                {step < (totalSteps - 1) && (
                                    <Button type="button" onClick={handleNext} className="my-auth-button">
                                        Continue
                                    </Button>
                                )}
                                {step > 1 && step < totalSteps && (
                                    <Button type="button" variant="outline" onClick={handleBack} className='my-button-nbg'>
                                        Previous
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}