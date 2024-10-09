import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, BellDotIcon, CalendarRange, CreditCard, Eye, EyeOff, FileText, Users, Wallet, WalletIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Int32 } from 'mongodb'
import { PiBellFill, PiBellZFill, PiBroadcastBold, PiCallBellFill, PiNotificationBold, PiNotificationFill } from 'react-icons/pi'
import { GetServerSidePropsContext, NextApiRequest } from 'next'
import { getIronSession, IronSession } from 'iron-session'
import { getIronSessionData, SessionData, sessionOptions } from '@/lib/session'
import { Tlg, TlgIcon } from '@/components/apc-flag'
import MongoDbConnection from "@/lib/database";
import { ObjectId } from 'mongodb';
import { truncateString } from '@/lib/utils'

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



export default function Dashboard({ user, allUsers }: any) {
  const [activeTab, setActiveTab] = useState(0);

  console.log('Client User: ', user);

  console.log('All users count: ', allUsers.length);

  const isAdmin = user.role === 'admin'

  const handleTabClick = (index: string) => {
    setActiveTab(Number(index));
  };

  const userNavItems = [
    { label: 'Dashboard', content: <UserOverview user={user} /> },
    { label: 'Wallet', content: <WalletView balance={user.walletBalance} /> }, // Pass balance here
    { label: 'Events', content: <div>Events Content</div> }, // Replace with actual content
    { label: 'Community', content: <div>Community Content</div> }, // Replace with actual content
  ];


  const adminNavItems = [
    { label: 'Dashboard', content: <AdminOverview user={user} users={allUsers} /> },
    { label: 'Members', content: <div>Members Content</div> },
    { label: 'Funds', content: <FundManagement /> },
    { label: 'Messaging', content: <><div>Messaging Content</div></> },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="container mx-auto">
      <header className="w-full h-20 bg-white flex items-center justify-between px-4">
        <motion.div
          variants={dashboardHeaderVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <div className="flex items-center md:space-x-4">
            <div className="rounded-full shadow">
              <TlgIcon />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={dashboardHeaderVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <div className="flex items-center space-x-[2rem] md:space-x-[9rem] bg-none">
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={tabVariants}
                  initial="hidden"
                  animate={activeTab === index ? 'visible' : 'visible'}
                  className={`cursor-pointer ${activeTab === index ? 'text-[#1b354f]' : 'text-yellow'}
                    }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="md:text-[25px] font-semibold capitalize">
                    {item.label}
                  </div>
                  {activeTab === index && (
                    <motion.div
                      variants={tabUnderlineVariants}
                      initial="hidden"
                      animate={'visible'}
                      className="absolute -bottom-5 left-0 w-full h-1 mt-12 my-border-radius bg-[#1b354f]"
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="md:flex items-center space-x-4 hidden">
          <span className="p-3 rounded-full flex items-center justify-center bg-gray-100 mx-4">
            <PiBellFill color='black' size={24} />
          </span>
          <Avatar>
            <AvatarImage
              src="https://via.placeholder.com/32x32"
              alt={user.name}
            />
            <AvatarFallback>
              {user.name.split('').map((n: any) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 font-semibold">
              {user.name}
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              {isAdmin ? user.email : 'TLG Member'}
            </div>
          </div>
        </div>
      </header>
      <main className="mt-10 flex justify-center items-start">
        <AnimatePresence>
          {navItems[activeTab].content}
        </AnimatePresence>
      </main>
    </div>
  )
}

function AdminOverview({ user, users }: any) {
  const criteria = [
    {
      title: 'Total Members',
      description: 'Number of registered members',
      value: users.length,
    },
    {
      title: 'Pending Requests',
      description: 'Number of pending members',
      value: users.filter((userData: any) => userData.verificationStatus === 'pending').length,
    },
    {
      title: 'Funds Disbursed',
      description: 'Total funds released',
      value: `₦ ${user.walletBalance.toFixed(2)}`
    },
    {
      title: 'Active Campaign',
      description: 'ongoing campaign events',
      value: `0`
    },
  ];
  return (
    <div className="space-y-4 mt-20 px-4 md:px-0">
      <div className="welcome mb-20">
        <h1 className='font-semibold text-2xl md:text-3xl mb-6'>{`Welcome ${user.name},`}</h1>
        <p className='max-w-lg text-lg md:text-2xl'>Here’s a quick snapshot of campaign activity, use the menu above to navigate through supporters, events and messaging</p>
      </div>
      <div className='flex justify-center items-center'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 flex justify-center items-center">
          {criteria.map((criterion, index) => (
            <div key={index} className={`w-full flex flex-col my-border-radius p-9 justify-center text-center items-center shadow`}>
              <p className='text-xl md:text-2xl font-semibold'>{criterion.title}</p>
              <p className='text-md md:text-lg'>{criterion.description}</p>
              <p className="text-3xl flex items-center font-semibold capitalize mt-8">
                {criterion.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

function UserOverview({ user }: any) {
  const [showFundsData, setShowFundsData] = useState(false);
  const criteria = [
    {
      title: 'Campaigns',
      icon: <PiBroadcastBold color='white' size={24} />,
      color: 'criterion-1',
      description: 'Number of campaigns participating in',
      value: 0,
    },
    {
      title: 'Events',
      icon: <CalendarRange color='white' size={24} />,
      color: 'criterion-2',
      description: 'Ongoing events',
      value: 0,
    },
    {
      title: 'Funds In Wallet',
      icon: <WalletIcon color='white' size={24} />,
      color: 'criterion-3',
      description: 'Total funds received',
      value: `₦ ${user.walletBalance.toFixed(2)}`
    },
  ];

  const toggleFundsDataVisibility = () => {
    setShowFundsData(!showFundsData);
  };

  return (
    <div className="space-y-4 mt-20 px-4 md:px-0">
      <div className="welcome mb-20">
        <h1 className='font-semibold text-2xl md:text-3xl mb-6'>{`Welcome ${user.name},`}</h1>
        <p className='max-w-lg text-lg md:text-2xl'>Here’s a quick snapshot of campaign activity, use the menu above to navigate through your account, see upcoming events and engagements.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
        {criteria.map((criterion, index) => (
          <div key={index} className={`w-full flex flex-col my-border-radius p-5 justify-center items-start ${criterion.color}`}>
            <div className="w-full flex items-start justify-between justified-element">
              <p className='text-xl text-white md:text-2xl font-semibold'>{criterion.title}</p>
              <div className=''>
                {criterion.icon}
              </div>
            </div>
            <p className="text-md text-white md:text-lg">{criterion.description}</p>

            <div className="w-full flex items-start justify-between justified-element mt-8">
              <p className="text-white text-3xl flex items-center font-semibold capitalize">

                {criterion.title == "Funds In Wallet" ? (
                  <>
                    {showFundsData ? criterion.value : '******'}
                    <span
                      className="ml-3"
                      onClick={toggleFundsDataVisibility}
                    >
                      {showFundsData ? <EyeOff size={20} color='white' /> : <Eye size={20} color='white' />}
                    </span>
                  </>
                ) : <>{criterion.value}</>}

              </p>
              {criterion.title == "Funds In Wallet" && (
                <div className="flex flex-col items-end">
                  <p className='text-white'>{showFundsData ? truncateString(user.accountNumber, 10) ?? '' : '******'}</p>
                  <p className='text-white'>Bank: <span className='uppercase'>{showFundsData ? truncateString(user.bank, 10) ?? '' : '******'}</span></p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
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
interface ExtendedRequest extends GetServerSidePropsContext {
  req: GetServerSidePropsContext['req'] & {
    session: IronSession<SessionData>;
  };
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  let userData = null;
  try {
    const session = await getIronSession<SessionData>(
      context.req,
      context.res,
      sessionOptions,
    );

    if (!session.isLoggedIn) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }


    const sessionUser = session.user;
    // console.log('Session User: ', sessionUser);

    await MongoDbConnection.connect();
    const usersCollection = await MongoDbConnection.getCollection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(sessionUser.id) });
    const allUsers = await usersCollection.find().toArray();

    if (user && allUsers) {
      userData = user;
      userData._id = userData._id.toString() as any;
      for (let r in allUsers) {
        allUsers[r]._id = allUsers[r]._id.toString() as any;
      }
      // console.log('User: ', userData);
      return { props: { user: userData, allUsers: allUsers } };
    }

    console.error('User not found in database:', sessionUser.id);
    return {
      redirect: {
        destination: '/auth/login', // Or a suitable error page
        permanent: false,
      },
    };

  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { user: userData, allUsers: [] },
    };
  }
});
