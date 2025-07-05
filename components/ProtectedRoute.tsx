"use client"
import React from 'react'
import { useUser,RedirectToSignIn } from "@clerk/clerk-react";

export default function ProtectedRoute({ children } : {children : React.ReactNode}) {
    const { isSignedIn } = useUser()

    return isSignedIn ? children : <RedirectToSignIn />
    // return isSignedIn ? children : router.push('/sign-in')
}
