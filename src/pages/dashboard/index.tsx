import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, BellDotIcon, Box, CalendarRange, CreditCard, Eye, EyeOff, FileText, Users, Wallet, WalletIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Int32 } from 'mongodb'
import { PiBellFill, PiBellZFill, PiBroadcastBold, PiCallBellFill, PiNotificationBold, PiNotificationFill, PiSpinner } from 'react-icons/pi'
import { GetServerSidePropsContext, NextApiRequest } from 'next'
import { getIronSession, IronSession } from 'iron-session'
import { getIronSessionData, SessionData, sessionOptions } from '@/lib/session'
import { Tlg, TlgIcon } from '@/components/apc-flag'
import MongoDbConnection from "@/lib/database";
import { ObjectId } from 'mongodb';
import { formateUserId, truncateString } from '@/lib/utils'
import { useRouter } from 'next/router'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Box as TableBox,
  TableCaption
} from '@chakra-ui/react';
import { auth } from 'google-auth-library'

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



export default function Dashboard({ user, allUsers, allEvents }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  console.log('Client User: ', user);

  console.log('All users count: ', allUsers.length);
  console.log('All events count: ', allEvents.length);

  const isAdmin = user.role === 'admin'

  const handleTabClick = (index: string) => {
    setActiveTab(Number(index));
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 10000);
    return () => clearInterval(interval);
  }, []);

  const userNavItems = [
    { label: 'Dashboard', content: <UserOverview user={user} events={allEvents} /> },
    { label: 'Wallet', content: <WalletView balance={user.walletBalance} /> }, // Pass balance here
    { label: 'Events', content: <UserEvents events={allEvents} user={user} /> }, // Replace with actual content
    {
      label: 'Community', content: <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-semibold text-gray-600">Coming Soon</h2>
      </div>
    }, // Replace with actual content
  ];

  const adminNavItems = [
    { label: 'Dashboard', content: <AdminOverview user={user} users={allUsers} events={allEvents} /> },
    { label: 'Members', content: <AdminMembers user={user} users={allUsers} /> },
    { label: 'Funds', content: <FundManagement /> },
    { label: 'Messaging', content: <div>Messaging Content</div> },
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
          <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsUserModalOpen(true)}>
            <Avatar className='w-12 h-12 '>
              <AvatarFallback className="rounded-full bg-gray-100 font-bold">
                {user.name.split(' ').map((n: any) => n[0]).join('')}
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
        </div>
      </header>
      <main className="mt-10 flex justify-center items-center">
        <AnimatePresence>
          {isUserModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
              <ProfileView user={user} onClose={() => setIsUserModalOpen(false)} />
            </div>
          )}
          {navItems[activeTab].content}
        </AnimatePresence>
      </main>
    </div>
  )
}

function ProfileView({ user, onClose }: any) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const onEditDetails = () => { }
  const isAdmin = user.role === 'admin'
  const isVerified = user.verificationStatus === 'verified'
  const onLogout = () => {
    fetch('/api/auth/logOut').then(response => response.json()).then((resData: any) => {
      if (resData.status) {
        refreshData();
      }
    })
  }
  return (
    <div className="relative bg-white my-border-radius shadow-lg border border-[#e2e2e2] p-8 flex flex-col items-center max-w-md w-full">
      {/* Close Button (Optional) */}
      <button
        className="absolute top-4 right-4 text-white text-bold w-6 h-6 p-0.5 justify-center rounded-full items-center inline-flex bg-[#1b354f]"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mb-6 w-full flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-3 text-center">
          <AvatarFallback className="rounded-full bg-gray-100 text-3xl font-bold">
            {user.name.split(' ').map((n: any) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold text-center">{user.name}</h2>
        <p className="text-sm text-gray-600 text-center">TLG {isAdmin ? 'Administrator' : 'Member'}</p>
        <div className={`mt-2 px-4 py-2  ${ isVerified ? 'bg-[#1b354f]' : 'bg-[#ff9d00]'} rounded-2xl text-white text-center text-xs font-semibold`}>
          {isVerified ? 'Verified' : 'Not verified'}
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-4 w-full">
        <div>
          <p className="text-md font-semibold text-[#1b354f] capitalize">Local Government Area</p>
          <p className="text-sm text-center font-medium bg-neutral-50 border border-[#dfdfdf] rounded p-3">
            {user.localGovernment}
          </p>
        </div>
        <div className='flex justify-between gap-4'>
          <div className='max-w-sm'>
            <p className="text-md font-semibold text-[#1b354f] capitalize">Ward</p>
            <p className="text-sm text-center w-full font-medium bg-neutral-50 border border-[#dfdfdf] rounded p-3">
              {user.ward}
            </p>
          </div>
          <div className='w-full max-w-[70%]'>
            <p className="text-md font-semibold text-[#1b354f] capitalize">Polling Unit</p>
            <p className="text-sm text-center font-medium bg-neutral-50 border border-[#dfdfdf] rounded p-3">
              {truncateString(user.poll_unit, 25)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-md font-semibold text-[#1b354f] capitalize">
            Voter Registration Number
          </p>
          <p className="text-sm text-center font-medium bg-neutral-50 border border-[#dfdfdf] rounded p-3">
            {user.vcn}
          </p>
        </div>
        <div>
          <p className="text-md font-semibold text-[#1b354f] capitalize">NIN</p>
          <p className="text-sm text-center font-medium bg-neutral-50 border border-[#dfdfdf] rounded p-3">
            {user.nin}
          </p>
        </div>
        <div>
          <p className="text-md font-semibold text-[#1b354f] capitalize">Account Details</p>
          <div className="bg-neutral-50 border border-[#dfdfdf] rounded p-3 flex justify-between gap-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-sm font-medium">{user.bank}</p>
            <p className="text-sm font-medium">
              {truncateString(user.accountNumber, 10)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between w-full">
        {onEditDetails && (
          <button
            className="text-sm font-medium text-[#1b354f] underline"
            onClick={onEditDetails}
          >
            Edit Details
          </button>
        )}
        {onLogout && (
          <button
            className="text-sm font-medium text-[#fd2104] underline"
            onClick={onLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

function AdminOverview({ user, users, events }: any) {
  const criteria = [
    {
      title: 'Total Members',
      description: 'Number of registered members',
      value: users.length,
    },
    {
      title: 'Pending Verifications',
      description: 'Number of pending member verifications',
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
      value: events.filter((event: { status: string }) => event.status === 'active').length,
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
            <div key={index} className={`w-full flex flex-col my-border-radius p-9 justify-center text-center items-center shadow-lg`}>
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

function AdminMembers({ user, users }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const criteria = [
    {
      title: 'Total Members',
      description: 'Number of registered members',
      value: users.length,
      content: <TotalMembersTable users={users} />
    },
    {
      title: 'Pending Verifications',
      description: 'Number of pending member verifications',
      value: users.filter((userData: any) => userData.verificationStatus === 'pending').length,
      content: <PendingRequestsTable users={users} />
    },
  ];
  return (
    <>
      <div className='flex flex-col justify-start items-end px-4 md:px-0'>
        <div
          className="gap-9 flex flex-col md:flex-row justify-center items-center"
          style={{ width: '100%' }}
        >
          {criteria.map((criterion, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer flex md:w-[25rem] flex-col my-border-radius p-9 justify-center text-center items-center shadow-lg ${activeTab === index ? 'bg-[#EDF6FF]' : 'text-yellow'}`}
              onClick={() => setActiveTab(index)}
              style={{ height: '15rem', flexGrow: 1, }}
            >
              <p className='text-xl md:text-2xl font-semibold'>{criterion.title}</p>
              <p className='stretch w-full text-md md:text-lg'>{criterion.description}</p>
              <p className="text-3xl flex items-center font-semibold capitalize mt-8">
                {criterion.value}
              </p>
            </div>
          ))}
        </div>
        <div className='mt-10 overflow-x-auto overflow-y-auto'>
          <AnimatePresence>
            {criteria[activeTab].content}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

function TotalMembersTable({ users }: any) {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setFilteredUsers(
      filteredUsers.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      })
    );
  };

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] w-full shadow-lg">
      {/* <TableContainer className=''> */}
      <table className="w-full table-auto text-sm md:text-base">
        <thead>
          <tr className="text-left sticky fixed text-lg">
            <th
              onClick={() => handleSort('name')}
              className="cursor-pointer px-4 py-2 font-bold"
            >
              Name <span className='text-xs'>{sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}</span>
            </th>
            <th
              onClick={() => handleSort('email')}
              className="cursor-pointer px-4 py-2 font-bold"
            >
              Email <span className='text-xs'>{sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}</span>
            </th>
            <th
              className="cursor-pointer px-4 py-2 font-bold"
            >
              NIN Number
            </th>
            <th
              className="cursor-pointer px-4 py-2 font-bold"
            >
              {`Status`}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .filter((user: { verificationStatus: string | null }) => user.verificationStatus === statusFilter || !statusFilter)
            .filter((user: { name: string; email: string }) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; email: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; nin: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
              <tr key={index} className={`h-[5rem] font-semibold ${index as any % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-2 justify-self-left whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.nin}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className='my-border-radius p-2 shadow-lg text-white bg-[#1B354F] hover:bg-[#1B354F] capitalize font-bold'>
                    Approved
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* </TableContainer> */}
    </div>
  );
}
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  lga: string;
  ward: string;
  poll_unit: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  [key: string]: any
}



function PendingRequestsTable({ users }: any) {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }

    setFilteredUsers(
      filteredUsers.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      })
    );
  };

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] shadow-lg">
      {/* <TableContainer className=''> */}
      <table className="w-full table-auto text-sm md:text-base">
        <thead className=''>
          <tr className="text-left sticky fixed text-lg">
            <th
              onClick={() => handleSort('name')}
              className="cursor-pointer px-4 py-2 font-semibold"
            >
              Name <span className='text-xs'>{sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}</span>
            </th>
            <th
              onClick={() => handleSort('email')}
              className="cursor-pointer px-4 py-2 font-semibold"
            >
              Email <span className='text-xs'>{sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}</span>
            </th>
            <th
              className="cursor-pointer px-4 py-2 font-semibold"
            >
              NIN Number
            </th>
            <th
              className="cursor-pointer px-4 py-2 font-semibold"
            >
              {`Details (Action)`}
            </th>
            <th
              className="cursor-pointer px-4 py-2 font-semibold"
            >
              {`Status (Action)`}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .filter((user: { verificationStatus: string | null }) => user.verificationStatus === statusFilter || !statusFilter)
            .filter((user: { name: string; email: string }) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; email: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; nin: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
              <tr key={index} className={`h-[5rem] font-semibold ${index as any % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.nin}</td>
                <td className="px-4 py-2 text-center">
                  <Button className='my-border-radius shadow-lg capitalize font-semibold'>view</Button>
                </td>
                <td className="px-4 py-2 text-center">
                  <Button className='my-border-radius shadow-lg text-white bg-[#ff9d00] hover:bg-[#ff9d00] capitalize font-bold'>
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* </TableContainer> */}
    </div>
  );
}

function UserOverview({ user, events }: any) {
  const [showFundsData, setShowFundsData] = useState(false);

  const criteria = [
    {
      title: 'Campaigns',
      icon: <PiBroadcastBold color='white' size={24} />,
      color: 'criterion-1',
      description: 'Number of campaigns participating in',
      value: events.filter((event: { attendies: any[] }) => event.attendies.includes(user._id)).length,
    },
    {
      title: 'Events',
      icon: <CalendarRange color='white' size={24} />,
      color: 'criterion-2',
      description: 'Ongoing events',
      value: events.filter((event: { status: string }) => event.status === 'active').length,
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
    <div className="space-y-4 mt-12 md:mt-20 px-4 md:px-0 mb-20">
      <div className="welcome mb-20">
        <h1 className='font-semibold text-2xl md:text-3xl mb-6'>{`Welcome ${user.name},`}</h1>
        <p className='max-w-lg text-lg md:text-2xl'>Here’s a quick snapshot of campaign activity, use the menu above to navigate through your account, see upcoming events and engagements.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mb-20">
        {criteria.map((criterion, index) => (
          <div key={index} className={`w-full flex flex-col my-border-radius shadow-lg p-5 justify-center items-start ${criterion.color}`}>
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
interface EventsData {
  _id: string;
  title: string;
  host: string;
  venue: string;
  time: string;
  date: string;
  attendies: [];
  status: string;
  createdAt: string;
  updatedAt: string;
}

function UserEvents({ events, user }: { events: EventsData[], user: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const criteria = [
    {
      title: 'Active Events',
      description: 'ongoing campaign events',
      value: events.filter(event => event.status === 'active').length,
      content: <UserEventsComponent events={events.filter(event => event.status === 'active')} user={user} />
    },

    {
      title: 'concluded events',
      description: 'ended campaign events',
      value: events.filter(event => event.status === 'ended').length,
      content: <UserEventsComponent events={events.filter(event => event.status === 'ended')} user={user} />
    },
  ];
  return (
    <div className=''>
      <div className="welcome mb-20 px-4 md:px-0">
        <h1 className='font-semibold text-2xl md:text-3xl mb-6'>Events</h1>
        <p className='max-w-lg text-lg md:text-2xl'>Manage all events and activities</p>
      </div>

      <div className='flex flex-col justify-center items-center px-4 md:px-0'>
        <div
          className="gap-9 flex flex-col md:flex-row justify-center items-center md:px-12"
          style={{ width: '90%' }}
        >
          {criteria.map((criterion, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer flex flex-col my-border-radius p-9 justify-center text-center items-center shadow-lg ${activeTab === index ? 'bg-[#FFECF5]' : 'text-yellow'}`}
              onClick={() => setActiveTab(index)}
              style={{ height: '15rem', flexGrow: 1, }}
            >
              <p className='text-xl md:text-2xl font-semibold capitalize'>{criterion.title}</p>
              <p className='stretch w-full text-md md:text-lg capitalize'>{criterion.description}</p>
              <p className="text-3xl flex items-center font-semibold capitalize mt-8">
                {criterion.value}
              </p>
              {activeTab === index ? null : <p className='text-[#DE1978] underline mt-4 font-medium'>click to view</p>}
            </div>
          ))}
        </div>
        <div className='mt-10'>
          <AnimatePresence>
            {criteria[activeTab].content}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function UserEventsComponent({ events, user }: { events: any[], user: any }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const handleAttendEvent = async (event_id: string) => {
    setIsLoading(true)
    fetch('/api/attendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_id: event_id, user_id: user._id }),
    }).then(response => response.json()).then(resData => {
      refreshData();
      setIsLoading(false)
      if (resData.status) {
        alert('You have successfully attended the event')
      } else {
        alert(resData.message)
      }
    })
  };

  const handleNotAttendingEvent = async (event_id: string) => {
    setIsLoading2(true)
    fetch('/api/notAttendingEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_id: event_id, user_id: user._id }),
    }).then(response => response.json()).then(resData => {
      refreshData();
      setIsLoading2(false)
      if (resData.status) {
        alert(resData.message)
      } else {
        alert(resData.message)
      }
    })
  };

  const isUserAttendEvent = (event: any) => {
    return event.attendies.includes(user._id)
  }

  return (
    <div className='gap-9 flex flex-col md:flex-row justify-center items-center'>
      {events.length ? events.map((event, index) => (

        <div key={index} className='bg-white my-border-radius shadow-lg shadow-[#ffecf5] p-8 flex flex-col'>
          <div className="flex justify-between items-center">
            <p className="font-bold max-w-[70%]">{event.title}</p>
            <div className="shadow-lg p-3 my-border-radius">
              <p className="text-md text-normal font-semibold uppercase">{event.time}</p>
            </div>
          </div>
          <div className="border-b border-gray-500 border-dashed my-6"></div>
          <div className="capitalized font-semibold">Host: <span className='font-medium capitalized'> {event.host}</span></div>
          <div className="capitalized font-semibold my-4">Venue: <span className='font-medium capitalized'> {event.venue}</span></div>
          <div className="capitalized font-semibold">Date: <span className='font-medium capitalized'> {event.date}</span></div>
          <div className="capitalized font-semibold my-4">Attendees: <span className='font-medium capitalized'> {event.attendies.length}</span></div>
          {event.status === 'active' && (
            <div className="flex mt-8 gap-2.5">
              <Button
                disabled={isLoading || isUserAttendEvent(event)}
                className="px-6 py-2.5 mr-4 my-border-radius text-md text-white bg-[#de1878] font-semibold hover:bg-[#de1878]"
                onClick={() => handleAttendEvent(event._id)}
              >
                {
                  isLoading ? (
                    <motion.span
                      animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity } }}
                      className="inline-block"
                    >
                      <PiSpinner className="animate-spin h-8 w-8 text-white" />
                    </motion.span>
                  ) : (
                    <>
                      {!isUserAttendEvent(event) ? <>Attend</> : <>Attending</>}
                    </>
                  )
                }
              </Button>
              <Button
                disabled={isLoading2 || !isUserAttendEvent(event)}
                className='px-6 py-2.5 my-border-radius text-md font-semibold'
                onClick={() => {
                  handleNotAttendingEvent(event._id)
                  !isUserAttendEvent(event)
                }}
              >
                Not attending
              </Button>
            </div>
          )}
        </div>
      )) : <>
        <div className="flex justify-center items-center h-full">
          <h2 className="text-2xl font-semibold text-gray-600 capitalize">{`No events`}</h2>
        </div>
      </>}
    </div>
  );
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
    <div className="flex justify-center items-center h-full">
      <h2 className="text-2xl font-semibold text-gray-600">Coming Soon</h2>
    </div>
  )
}

interface ExtendedRequest extends GetServerSidePropsContext {
  req: GetServerSidePropsContext['req'] & {
    session: IronSession<SessionData>;
  };
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  let userData = null;
  let eventsData = null;
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
    const eventsCollection = await MongoDbConnection.getCollection('events');
    const walletsCollection = await MongoDbConnection.getCollection('wallets');
    const user = await usersCollection.findOne({ _id: new ObjectId(sessionUser.id) });
    const allUsers = await usersCollection.find().toArray();
    const allEvents = await eventsCollection.find().toArray();

    if (user && allUsers && allEvents) {
      userData = user;
      userData._id = userData._id.toString() as any;
      for (let r in allUsers) {
        allUsers[r]._id = allUsers[r]._id.toString() as any;
      }

      for (let r in allEvents) {
        allEvents[r]._id = allEvents[r]._id.toString() as any;
      }

      // console.log('User: ', userData);
      return { props: { user: userData, allUsers: allUsers, allEvents: allEvents } };
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
