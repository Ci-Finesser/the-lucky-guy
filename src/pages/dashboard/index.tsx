import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, CreditCard, FileText, Users, Wallet } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const dashboardHeaderVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } },
};

const tabUnderlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%', transition: { duration: 0.3 } },
};

const userNavItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Wallet', href: '/dashboard/wallet' },
  { label: 'Events', href: '/dashboard/events' },
  { label: 'Community', href: '/dashboard/community' },
];

const adminNavItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Members', href: '/dashboard/members' },
  { label: 'Funds', href: '/dashboard/funds' },
  { label: 'Messaging', href: '/dashboard/messaging' },
];

export default function Dashboard({ user = { role: 'user', name: 'John Doe', verificationStatus: 'pending', walletBalance: 0 } }) {
  const [activeTab, setActiveTab] = useState(0);
  const isAdmin = user.role === 'admin'

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="container mx-auto">
      <header className="w-full h-20 bg-white shadow flex items-center justify-between px-4">
        <motion.div
          variants={dashboardHeaderVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 px-1 py-2 bg-white rounded-full shadow border border-[#bde9f8]/95 flex-col justify-center items-center gap-2.5 inline-flex">
              <div>

              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={dashboardHeaderVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <div className="flex items-center space-x-[2rem] md:space-x-[9rem]">
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={tabVariants}
                  initial="hidden"
                  animate={activeTab === index ? 'visible' : 'visible'}
                  className={`cursor-pointer ${activeTab === index ? 'text-[#1b354f]' : 'text-black'
                    }`}
                  onClick={() => handleTabClick(index)}
                >
                  <div className="md:text-[25px] font-semibold font-['Urbanist'] capitalize">
                    {item.label}
                  </div>
                  <motion.div
                    variants={tabUnderlineVariants}
                    initial="hidden"
                    animate={activeTab === index ? 'visible' : 'hidden'}
                    className="absolute -bottom-5 left-0 w-full h-1 mt-12 my-border-radius bg-[#1b354f]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="md:flex items-center space-x-4 hidden">
            <Bell className="h-6 w-6 text-gray-500" />
            <Avatar>
              <AvatarImage
                src="https://via.placeholder.com/32x32"
                alt={user.name}
              />
              <AvatarFallback>
                {user.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
      </header>

      {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {isAdmin ? (
            <>
              <TabsTrigger value="verifications">Verifications</TabsTrigger>
              <TabsTrigger value="funds">Funds</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {isAdmin ? <AdminOverview /> : <UserOverview user={user} />}
        </TabsContent>

        {isAdmin && (
          <>
            <TabsContent value="verifications">
              <VerificationManagement />
            </TabsContent>
            <TabsContent value="funds">
              <FundManagement />
            </TabsContent>
          </>
        )}

        {!isAdmin && (
          <>
            <TabsContent value="wallet">
              <WalletView balance={user.walletBalance} />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileView user={user} />
            </TabsContent>
          </>
        )}
      </Tabs> */}
    </div>
  )
}

function AdminOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Supporters</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10,482</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">621</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Funds Disbursed</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦2,450,000</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserOverview({ user }: any) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Verification Status:
            <Badge variant={user.verificationStatus === 'verified' ? 'default' : 'secondary'} className="ml-2">
              {user.verificationStatus}
            </Badge>
          </p>
          <Progress value={user.verificationStatus === 'verified' ? 100 : 50} className="mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦{user.walletBalance.toFixed(2)}</div>
          {user.verificationStatus !== 'verified' && (
            <p className="text-sm text-muted-foreground mt-2">Complete verification to activate your wallet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function VerificationManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Verifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded">
              <div>
                <p className="font-medium">User {i}</p>
                <p className="text-sm text-muted-foreground">Submitted: 2023-07-{10 + i}</p>
              </div>
              <div>
                <Button variant="outline" className="mr-2">View</Button>
                <Button variant="default">Approve</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FundManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund Disbursement</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input id="amount" type="number" placeholder="Enter amount" />
          </div>
          <div>
            <Label htmlFor="recipients">Recipients</Label>
            <Input id="recipients" type="text" placeholder="Enter user IDs or select group" />
          </div>
          <Button type="submit">Disburse Funds</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function WalletView({ balance }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">₦{balance.toFixed(2)}</div>
        <div className="space-y-2">
          <Button className="w-full">Request Funds</Button>
          <Button variant="outline" className="w-full">View Transactions</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ProfileView({ user }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" defaultValue={user.occupation} />
          </div>
          <div>
            <Label htmlFor="local-government">Local Government</Label>
            <Input id="local-government" defaultValue={user.localGovernment} disabled />
          </div>
          <div>
            <Label htmlFor="ward">Ward</Label>
            <Input id="ward" defaultValue={user.ward} disabled />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  )
}