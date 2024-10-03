import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react'
import { ONDOLGA, Ward } from '@/types'

interface RegistrationFormData {
    email: string
    phone: string
    password: string
    name: string
    occupation: string
    lga: string
    ward: string
    passportPhoto: File | null
    votersCard: File | null
    nin: File | null
    selfie: File | null
}

export default function RegistrationFlow() {
    const [step, setStep] = useState(1)
    const [lgas, setLgas] = useState<ONDOLGA[]>([])
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        phone: '',
        password: '',
        name: '',
        occupation: '',
        lga: '',
        ward: '',
        passportPhoto: null,
        votersCard: null,
        nin: null,
        selfie: null
    })

    useEffect(() => {
        fetch('/api/ondoLga')
            .then(res => res.json())
            .then(data => setLgas(data.data))
    }, []);

    const totalSteps = 7
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
        setStep(prev => Math.min(prev + 1, totalSteps))
    }

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // Here you would typically send the formData to your backend
        console.log('Form submitted:', formData)
        // For demo purposes, we'll just move to the next step
        handleNext()
    }

    return (
        <div className="container mx-auto p-4 max-w-md">
            <Card>
                <CardHeader>
                    <CardTitle>Join Lucky Guy Youth Movement</CardTitle>
                    <CardDescription>Step {step} of {totalSteps}</CardDescription>
                    <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type="password" required value={formData.password} onChange={handleInputChange} />
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="occupation">Occupation</Label>
                                    <Input id="occupation" name="occupation" required value={formData.occupation} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lga">Local Government Area</Label>
                                    <Select name="lga" value={formData.lga} onValueChange={(value) => setFormData(prev => ({ ...prev, lga: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select LGA" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {lgas && Object.keys(lgas).map((lgaKey) => (
                                                <SelectItem key={lgas[Number(lgaKey)].id} value={lgas[Number(lgaKey)].name}>{lgas[Number(lgaKey)].name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ward">Ward</Label>
                                    <Select name="ward" value={formData.ward} onValueChange={(value) => setFormData(prev => ({ ...prev, ward: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Ward" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {lgas && formData.lga ? Object.values(lgas.find(lga => lga.name === formData.lga)?.wards || {}).map(ward => (
                                                <SelectItem key={ward?.id} value={ward?.name}>{ward.name}</SelectItem>
                                            )) : <SelectItem value="empty" disabled>Select an LGA first</SelectItem> }
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="space-y-4">
                                <Label>Upload Passport Photo</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="passportPhoto" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <Input id="passportPhoto" name="passportPhoto" type="file" className="hidden" onChange={handleFileUpload('passportPhoto')} />
                                    </label>
                                </div>
                                {formData.passportPhoto && (
                                    <div className="flex items-center mt-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        <span className="text-sm text-gray-500">File uploaded: {formData.passportPhoto.name}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {step === 4 && (
                            <div className="space-y-4">
                                <Label>Upload Voter's Card</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="votersCard" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG, JPG or PDF</p>
                                        </div>
                                        <Input id="votersCard" name="votersCard" type="file" className="hidden" onChange={handleFileUpload('votersCard')} />
                                    </label>
                                </div>
                                {formData.votersCard && (
                                    <div className="flex items-center mt-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        <span className="text-sm text-gray-500">File uploaded: {formData.votersCard.name}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {step === 5 && (
                            <div className="space-y-4">
                                <Label>Upload NIN</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="nin" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG, JPG or PDF</p>
                                        </div>
                                        <Input id="nin" name="nin" type="file" className="hidden" onChange={handleFileUpload('nin')} />
                                    </label>
                                </div>
                                {formData.nin && (
                                    <div className="flex items-center mt-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        <span className="text-sm text-gray-500">File uploaded: {formData.nin.name}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {step === 6 && (
                            <div className="space-y-4">
                                <Label>Take Selfie with Voter's Card</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="selfie" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG or JPG</p>
                                        </div>
                                        <Input id="selfie" name="selfie" type="file" accept="image/*" capture="user" className="hidden" onChange={handleFileUpload('selfie')} />
                                    </label>
                                </div>
                                {formData.selfie && (
                                    <div className="flex items-center mt-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                        <span className="text-sm text-gray-500">File uploaded: {formData.selfie.name}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {step === 7 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Verification Submitted</h3>
                                <p>Thank you for submitting your verification documents. Our team will review your submission and get back to you shortly.</p>
                                <div className="flex items-center space-x-2 text-yellow-600">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>Verification Status: Pending</span>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 && step < 7 && (
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    {step < 6 && (
                        <Button type="button" onClick={handleNext} className="ml-auto">
                            Next
                        </Button>
                    )}
                    {step === 6 && (
                        <Button type="submit" onClick={handleSubmit} className="ml-auto">
                            Submit
                        </Button>
                    )}
                    {step === 7 && (
                        <Button type="button" onClick={() => console.log("Redirect to dashboard")} className="ml-auto">
                            Go to Dashboard
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}