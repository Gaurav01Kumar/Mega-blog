import React, { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { Container, PostCard } from "../component";
import { category } from "../constants";
import { FiArrowDown } from "react-icons/fi";
import { Link } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryName, setCategoryname] = useState([]);
  const [filterItem,setFilterItem]=useState("")
  useEffect(() => {
    appWriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const filterCategory = (categoryN) => {
    setCategoryOpen(!categoryOpen);
    // Filter the categories array based on the provided category name
    const res = category.filter((curr) => curr.name === categoryN);
    setCategoryname(res[0].subcategories);
  };

  //console.log(posts)
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-48 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1
                className="text-2xl
                            font-bold hover:text-gray-500"
              >
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full flex items-start py-8 mt-40">
      <Container>
        <div className="bg-white shadow-orange-50 min-w-[220px] p-5">
          <h3>Category</h3>
          <ul>
         
            {category &&
              category.map((cat) => (
                <li
                  className="w-full bg-slate-500
                     mt-5  cursor-pointer text-[20px]
                     text-white font-bold hover:bg-gray-950
                      flex flex-col  p-1"
                  key={cat.id}
                >
                  <span
                    onClick={() => filterCategory(cat.name)}
                    className="flex items-center justify-between"
                  >
                    {cat.name} <FiArrowDown />
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </Container>
      <Container>
        <ul
          className={` flex bg-white p-4 gap-10`}
        >
          {categoryName.map((val) => (
            <li
              key={val.name}
              className="border px-6 py-2
              hover:scale-110 gradient-custom-2 cursor-pointer"
              onClick={()=>setFilterItem(val.name)}
            >
              {val.name}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-10 mt-10 justify-around  ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
