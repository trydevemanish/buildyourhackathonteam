"use client"
import { SignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  if(isSignedIn){
    router.push('/dashboard')
  }
 
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignIn afterSignOutUrl={'/'} fallbackRedirectUrl={'/dashboard'} />
    </div>
  );
}