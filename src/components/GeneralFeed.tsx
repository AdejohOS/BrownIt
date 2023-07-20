import { INFINITE_SCROLLING_PAGINATION_RESULT } from '@/config'
import { db } from '@/lib/db'
import React from 'react'
import PostFeed from './PostFeed'

const GeneralFeed = async () => {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes: true,
            comments: true,
            author: true,
            subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULT
    })
  return (
    <PostFeed initialPosts={posts}/>
  )
}

export default GeneralFeed