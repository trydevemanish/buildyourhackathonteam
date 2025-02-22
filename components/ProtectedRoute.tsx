"use client"
import React from 'react'
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";

export default function ProtectedRoute({ children } : {children : React.ReactNode}) {
    const { isSignedIn } = useUser()

    return isSignedIn ? children : <RedirectToSignIn />
}
