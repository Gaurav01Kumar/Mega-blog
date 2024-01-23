import React from "react";
import { Button, Container, Input, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiPlus,
  FiSearch,
  FiUser,
  FiUserPlus,
  FiChevronsUp,
} from "react-icons/fi";

import "./Header.css"
const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const user=useSelector((state)=>state.auth.userData["name"])
  console.log(user)
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: <FiHome />,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <FiChevronsUp />,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
      icon: <FiPlus />,
    },
  ];

  return (
    <header className="py-3 shadow-xl bg-white rounded fixed w-[90%] z-10 left-10">
      <Container>
        <nav className="w-full flex justify-around align-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto align-center gap-x-10  text-center">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className=" px-5 py-2 duration-200  text-2xl mt-3
                     hover:bg-blue-100 rounded-full flex items-center gap-5"
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            <li
              className=" flex items-center h-10 w-[230px] shadow-2xl bg-black
             border rounded-2xl gap-5 mt-5"
            >
              <input
                type="text"
                placeholder="Search"
                className="border-none outline-none 
                    rounded bg-transparent text-white 
                     px-4 w-[180px] "
              />
              <FiSearch className="font-bold text-white text-2xl " />
            </li>
            {authStatus && (
              <div className="relative">
                <li
                  className="text-3xl flex items-center gap-0
                  mt-7  user-btn-hover"
                >
                  {/* <LogoutBtn className="text-2xl mt-3 p-4 hover:bg-blue-400 rounded-full" /> */}

                  <FiUser className=" cursor-pointer" />
                </li>

                <div
                  className=" p-5 bg-white text-black  w-[200px]
                 absolute  rounded-md shadow-2xl t-15 sidedrop -left-14 "
                >
                  <ul>
                  <li>
                      <Link
                        to=""
                        className=" flex items-center gap-3
                          mt-5 text-sky-500 text-[16px]"
                      >
                        <FiUserPlus /> Hi, {user}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/profile/:2`}
                        className=" flex items-center gap-3
                          mt-5 hover:text-sky-500 text-[19px]"
                      >
                        <FiUserPlus /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className=" flex items-center gap-3
                          mt-5  hover:text-sky-500 text-[19px]"
                      >
                        <FiLogOut /> Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
