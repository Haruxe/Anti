import { useEffect } from "react";
import { useState } from "react";
import Post from "../content/Post"
import Sidebar from "../content/Sidebar"


function Feed() {

    const [sidebarVisible, setSidebarVisible] = useState(false);
    
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1600){
                setSidebarVisible(false);
            }
            if (window.innerWidth > 1600){
                setSidebarVisible(true);
            }
        }
        window.addEventListener('resize', handleResize)
    })

    const SidebarContent = () => {
        return(
            <>
        <div className="flex auto flex-col pt-5 space-y-5 w-1/4">
        <div className="flex-col space-y-2">
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
    <div className='p-5 flex flex-row'>
        <div className='w-full h-full flex flex-col p-5 space-y-5'>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
        {sidebarVisible && <SidebarContent />}
    </div>
  )
}

export default Feed