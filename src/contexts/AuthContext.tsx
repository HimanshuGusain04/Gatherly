"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface User {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}

interface AuthContextType {
  user: User | undefined
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  register: (email: string, name: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const user = session?.user

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      return result?.ok || false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await signIn('google', { callbackUrl: '/' })
      return true
    } catch (error) {
      console.error('Google login error:', error)
      return false
    }
  }

  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Auto login after successful registration
        return await login(email, password)
      } else {
        return false
      }
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 