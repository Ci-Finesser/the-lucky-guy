import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function SupporterProfile() {
    const  [lgas, setLgas] = useState(null)
    const [wards, setWards] = useState(null)
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Supporter Profile</CardTitle>
          <CardDescription>Complete your profile to join the campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="trader">Trader</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="localGovernment">Local Government</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select local government" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lg1">Local Government 1</SelectItem>
                  <SelectItem value="lg2">Local Government 2</SelectItem>
                  <SelectItem value="lg3">Local Government 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ward">Ward</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ward1">Ward 1</SelectItem>
                  <SelectItem value="ward2">Ward 2</SelectItem>
                  <SelectItem value="ward3">Ward 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" placeholder="+1234567890" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Passport Photograph</Label>
            <div className="flex items-center space-x-4">
              <img src="/placeholder.svg?height=100&width=100" alt="Passport" className="w-24 h-24 rounded-full object-cover" />
              <Input id="photo" type="file" accept="image/jpeg,image/png" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Profile</Button>
        </CardFooter>
      </Card>
    </div>
  )
}