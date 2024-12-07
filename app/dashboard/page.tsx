import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import MaxWidthWrapper from '../components/common/maxWidthWrapper';
import DashboardPresentation from '../components/DashboardPresentation';

const page = async () => {
   const { getUser } = getKindeServerSession();
   const user = await getUser();
   if(!user) {
    redirect("/");
   }

   const presentations = await db.generatedPowerpoints.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
    
  return (
    <MaxWidthWrapper className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12'>
        <h1 className="text-4xl font-bold px-4 text-gray-800 mb-12">
          Your Presentations
        </h1>
        <DashboardPresentation presentations={presentations} />
    </MaxWidthWrapper>
  )
}

export default page