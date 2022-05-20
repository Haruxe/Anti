import React from "react";
import { useMoralisQuery } from "react-moralis";
import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import "./CSS/PostInFeed.css";
// import Post from "../content/Post";
import Posts from "../content/Posts";
import CategoryBar from "../content/CategoryBar";
import { ClipLoader } from "react-spinners";
import Moralis from "moralis";

function Feed () {
    const [categoryVisible, setSidebarVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const {selectedCategory} = useMoralisDapp();
    // const [categories, setCategories] = useState([]);
    let result = null;

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1300){
                setSidebarVisible(false);
            }
            if (window.innerWidth > 1300){
                setSidebarVisible(true);
            }
        }
        window.addEventListener('resize', handleResize)
    })

    const queryCategories = useMoralisQuery("CategoriesV");
    const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]));
    // console.log(fetchedCategories)

    // useEffect(() => {
    //     LoadContent()
    // }, [])

    // async function LoadContent() {
    //     const Category = await Moralis.Object.extend('Categories')
    //     const queryCategories = new Moralis.Query(Category)
    //     const catObj = await queryCategories.find()
    //     setCategories(catObj)
    //     setLoading(false)
    // }

    return (
        <>
        {/* {loading ? 
            <div className="justify-center items-center flex text-center w-full h-full ml-[220px]">
          <ClipLoader
          size={60}
          color={'#FFFFFF'}
          loading={loading}
          /> 
          </div> 
          :( */}
        <div>
            <div className='p-5 flex flex-row  ml-[220px]'>
            <div className='w-full h-full flex flex-col p-5 space-y-3'>
            <CategoryBar categories={fetchedCategories}/>
                <Posts selectedCategory={selectedCategory}/>
            </div>
        </div> 
        </div>
        </>
    )
}

export default Feed
