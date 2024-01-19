import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appWriteService from "../appwrite/config";
import { Container, Button } from '../component';
import parse from "html-react-parser";
import { useSelector } from 'react-redux';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState("")
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false
    useEffect( () => {
        if (slug) {
            appWriteService.getPost(slug).then(async(post) => {
                if (post) {
                    setPost(post)
                    const img = await appWriteService.getFilePreview(post.featuredImage)
                    setImgSrc(img)
                }
                else {
                navigate("/") 
                }
            })
        } else navigate("/");
    }, [slug, navigate])
    const deletPost = () => {
        appWriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appWriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }
    
    const img = () => {
        setTimeout(async () => {

        }, 1000)

    }

    return post ? (
        <div className='py-8'>
            <Container>
                <div className='w-full flex justify-center
            mb-4 relative border rounded-xl p-2'>
                    <img src={imgSrc} alt={post.title} className='rounded-xl' />
                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-red-500" onClick={deletPost}>Delete</Button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className='w-full mb-6' >
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

