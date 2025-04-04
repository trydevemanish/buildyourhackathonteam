import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn afterSignOutUrl={'/'} fallbackRedirectUrl={'/dashboard'} />;
}