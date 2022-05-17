import React from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import "./CSS/PostInFeed.css";
import Post from "../content/Post";
import Sidebar from "../content/Sidebar";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Feed () {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const queryCategories = useMoralisQuery("Categories");
    const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]));
    const {selectedCategory} = useMoralisDapp();
    let result = null;
    // console.log(fetchedCategories)

    // const { Moralis, account } = useMoralis();
    // Moralis.start({serverUrl, appId})
    // const user = Moralis.User.current();
    
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

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1300){
                setSidebarVisible(false);
            }
            if (window.innerWidth > 1300){
                setSidebarVisible(true);
            }
        }
    }, [])

    const SidebarContent = () => {
        return(
            <>
            <div className="flex auto flex-col pt-5 space-y-5 w-[300px]">
                <div className="flex-col space-y-3">
                    <Sidebar categories={fetchedCategories}/>
                </div>
            </div>
            </>
        )
    }

    return (
        <div className='p-5 flex flex-row  ml-[220px]'>
            <div className='w-full h-full flex flex-col p-5 space-y-2'>
                <h4 className="text-white">{selectedCategory["category"]}</h4>
                <Post profile={false} />
            </div>
            {sidebarVisible && <SidebarContent />}
        </div> 
    )
}

export default Feed