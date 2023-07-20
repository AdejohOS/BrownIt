'use client'

import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"
import { useState } from "react"

import { signIn } from 'next-auth/react'
import { Icons } from "./Icons"
import { useToast } from "@/hooks/use-toast"

interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement>{}

const UserAuthForm = ({className, ...props}: UserAuthFormProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { toast } = useToast()

  const logInWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
        toast({
          title: 'There was an error',
          description: 'There was an error logging in with google',
          variant: 'destructive'
        })
    } 
     finally {
      setIsLoading(false)
    }
  }


  return (
    <div
      className={cn('flex justify-center', className)} {...props}
    >
      <Button
        onClick={logInWithGoogle} 
        isLoading={isLoading}
        size='sm'
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2"/>}
        Google
      </Button>
    </div>
      
  )
}

export default UserAuthForm