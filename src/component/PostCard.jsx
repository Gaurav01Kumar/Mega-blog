import React, { useEffect, useMemo, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
import { WaveSpinner} from "react-spinners-kit"
const PostCard = ({ $id, title, featuredImage, userId }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [postUser, setPostUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useMemo(async () => {
    const img = await appwriteService.getFilePreview(featuredImage);
    setImgSrc(img);
  }, [featuredImage]);
  const getUserDetails = async () => {
    const postUser = await authService.getCurrentUser(userId);
    setIsLoading(false);
    setPostUser(postUser);
  };
  useEffect(() => {
    getUserDetails();
  }, [userId]);

  return (
    <>
      {isLoading ? (
       <WaveSpinner size={200} className="mr-60" />
      ) : (
        <Link to={`/post/${$id}`}>
          <div className="w-full text-left bg-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-5">
              <i
                className="fa fa-user mt-1 text-2xl border
               
              "
              ></i>
              <div className="flex flex-col justify-center">
                <p className="hover:text-blue-500 hover:underline">
                  {postUser.name}{" "}
                </p>
                <span className="text-xs text-slate-600">
                  {" "}
                  Post at : {postUser.$createdAt.slice(0, 10)}
                </span>
              </div>
            </div>

            <h2 className="text-xl  px-2 py-2">{title}</h2>

            <div className="w-full  mb-4">
              <img
                src={imgSrc}
                alt={title}
                className="rounded-xl h-40 w-56 mx-3"
                height={100}
              />
            </div>
            <div className="flex align-center gap-5 text-xl">
              <div className="flex items-center">
                <div className="mx-3 ">
                  <i className="fa fa-heart-o "></i>
                  <span className="mx-3">1</span>
                </div>
                <div className="mx-3 ">
                  <i className="fa fa-comment-o "></i>
                  <span className="mx-3">1</span>
                </div>
                <div className="mx-3 ">
                  <i className="fa fa-share "></i>
                  <span className="mx-3">1</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default PostCard;
