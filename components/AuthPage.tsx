"use client"
import React from 'react'
import { SignIn,SignUp } from '@clerk/nextjs'

export default function AuthPage() {
  return (
    <div>
    <h1>Sign In</h1>
    <SignIn />
    <h1>Sign Up</h1>
    <SignUp />
  </div>
  )
}
