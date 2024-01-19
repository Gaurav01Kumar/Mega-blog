import React, { useEffect, useState } from 'react'
import appWriteService from "../appwrite/config";
import { Container, PostCard } from '../component';

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appWriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
     }, []);
   console.log(posts)
    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-48 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className="text-2xl
                            font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return(
        <div className='w-full py-8 mt-40'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post)=>(
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post}/>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home