'use client'

import { User } from 'next-auth'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/Avatar'

import Image from 'next/image' 
import { Icons } from './Icons'
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvaterProps extends AvatarProps{
    user: Pick<User, 'name' | 'image'>
}
const UserAvater = ({user, ...props}: UserAvaterProps) => {
    return (
        <Avatar {...props}>
            {user.image ? 
                <div className='relative aspect-square h-full w-full'>
                    <Image
                        fill
                        src={user.image}
                        alt='Profile Image'
                        referrerPolicy='no-referrer'
                    />

                    
                </div>
            : 
                <AvatarFallback>
                    <span className='sr-only'>{user?.name}</span>
                    <Icons.user className='h-4 w-4'/>
                </AvatarFallback>
            }
        </Avatar>
    )
}

export default UserAvater