import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appWriteService from "../appwrite/config";
import { Container, Button } from "../component";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then(async (post) => {
        if (post) {
          setPost(post);
          const img = await appWriteService.getFilePreview(post.featuredImage);
          setImgSrc(img);
        } else {
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);
  const deletPost = () => {
    appWriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appWriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const img = () => {
    setTimeout(async () => {}, 1000);
  };

  return post ? (
    <div className="py-8 mt-[10%] max-w-[80%] ml-[10%]">
      <Container>
        <div className="w-full mb-6  flex   items-start">
          <div
            className="mt-5 mr-10 border 
          rounded-full w-[60px] h-[60px] 
           flex items-center justify-center hover:bg-sky-300"
          >
            <FiUser className="text-[40px] " />
          </div>
          <div className="mt-2">
            <h1
              className="text-4xl 
            max-w-[600px] text-left font-semibold"
            >
              {post.title}
            </h1>
            <div className="flex gap-5 mt-">
              <p className="text-slate-200 font-sans font-normal">
                {" "}
                Author : {userData.name}
              </p>
              <span className="text-slate-200">
                {" "}
                Post at : {post.$createdAt.slice(0, 10)}
              </span>
            </div>
          </div>
        </div>
        <div
          className="w-full flex justify-center
            mb-4 relative  rounded-xl p-2  "
        >
          <img
            src={imgSrc}
            alt={post.title}
            className="rounded-xl h-[40%] w-[100%]"
          />
          {/* {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-red-500" onClick={deletPost}>
                  Delete
                </Button>
              </Link>
            </div>
          )} */}
        </div>

        <div
          className="browser-css text-left
         text-stone-800 text-[20px] min-w-[80%]"
        >
          {parse(post.content)}
        </div>
        <hr />
      </Container>
    </div>
  ) : null;
}
