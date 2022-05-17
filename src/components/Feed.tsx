import React from "react"
import { useEffect, useState } from "react";
import "./CSS/PostInFeed.css";
import Post from "../content/Post"
import Sidebar from "../content/Sidebar"
import { ClipLoader } from "react-spinners";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Feed () {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState(<></>);

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
        LoadContent()
    }, [])

    async function LoadContent() {
        setFeed(
        <div className='p-5 flex flex-row  ml-[220px]'>
        <div className='w-full h-full flex flex-col p-5 space-y-3'>
            <Post profile={false} />
            <br/>
        </div>
        {sidebarVisible && <SidebarContent />}
    </div>)
        setLoading(false)
    }

    const SidebarContent = () => {
        return(
            <>
        <div className="flex auto flex-col pt-5 space-y-5 w-[300px]">
        <div className="flex-col space-y-3">
            <Sidebar />
            <Sidebar />
            <Sidebar />
            <Sidebar />
            <Sidebar />
            <Sidebar />
        </div>
        </div>
        </>
        )
    }

    return (
        <>
        {loading ? 
            <div className="justify-center items-center flex text-center w-full h-full ml-[220px]">
          <ClipLoader
          size={60}
          color={'#FFFFFF'}
          loading={loading}
          /> 
          </div> 
          :(
        <div>
            {feed}
        </div>)}
        </>
    )
}

export default Feed