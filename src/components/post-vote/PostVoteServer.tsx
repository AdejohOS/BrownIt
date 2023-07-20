import { Post, Vote, VoteType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'
import PostVoteClient from './PostVoteClient'

interface PostVoteServerProps {
    postId: string,
    initialVoteAmt?: number,
    initialVote?: VoteType | null,
    getData: () => Promise<(Post & {votes: Vote[]}) | null>,
}

const PostVoteServer = async ({
    postId,
    initialVote,
    initialVoteAmt,
    getData,
}: PostVoteServerProps) => {

    const session = await getServerSession()

    let _votesAmt: number = 0;
    let _curentVote: VoteType | null | undefined = undefined

    if (getData) {
        const post = await getData()
        if (!post) return notFound()

        _votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type === 'UP') return acc + 1
            if (vote.type === 'DOWN') return acc - 1
            return acc
        }, 0)

        _curentVote = post.votes.find((vote) => vote.userId === session?.user.id)?.type
    } else {
        _votesAmt = initialVoteAmt!
        _curentVote = initialVote
    }

  return (
    <PostVoteClient 
        postId={postId}
        initialVotesAmt={_votesAmt}
        initialVote={_curentVote}
    />
  )
}

export default PostVoteServer