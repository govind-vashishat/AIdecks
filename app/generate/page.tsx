import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import GenerateForm from '../components/GenerateForm';

const page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) {
        redirect("/auth-callback");
    }
  return <GenerateForm />
}

export default page