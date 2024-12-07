"use client";

import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils';
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { MenuIcon } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import React, { useState } from 'react'

interface MobileLinkProps extends LinkProps{
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string
}

function MobileLink({
    href, 
    onOpenChange, 
    className, 
    children, 
    ...props}: MobileLinkProps) {
        return <Link href={href} onClick={() => onOpenChange?.(false)} className={cn(className)} 
        {...props} >{children}</Link>
    }

const NavbarMobile = ({ user }: { user: KindeUser<object> | null }) => { 
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild className='flex md:hidden' >
          <Button className={buttonVariants({ variant: "outline" })}>
            <MenuIcon className='h-6 w-6 text-gray-900'/>
            <span className='sr-only text-gray-900'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className='pr-0' >
            <SheetTitle>
                AIdecks
            </SheetTitle>
            <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pr-10'>
             <div className='flex flex-col space-y-3'>
             <MobileLink href="/generate" onOpenChange={setOpen} className='text-normal font-semibold'>
                Generate
            </MobileLink>   
             <MobileLink href="/pricing" onOpenChange={setOpen} className='text-normal font-semibold flex gap-2 items-center' >
                Pricing
             </MobileLink>
                {user ? (
                    <div className='flex flex-col space-y-3'>
                        <MobileLink href="/dashboard" className='text-normal font-semibold'>Dashboard</MobileLink>
                        <LogoutLink className={buttonVariants()}>Logout</LogoutLink>
                    </div>
                ) : (
                    <div className='flex flex-col space-y-3'>
                        <LoginLink className={buttonVariants({ variant: "secondary" })} >Login</LoginLink>
                        <RegisterLink className={buttonVariants()} >Sign Up</RegisterLink>
                    </div>
                )}
            </div>
            </ScrollArea>
        </SheetContent>
    </Sheet>
  )
}

export default NavbarMobile