import { useEffect } from "react";
import { useState } from "react";
import Post from "../content/Post";
import Sidebar from "../content/Sidebar";
import Categories from "../content/Categories";
import { useMoralisQuery } from "react-moralis";


function Feed() {
    const queryCategories = useMoralisQuery( "Categories" );
    const fetchedCategories = JSON.parse( JSON.stringify( queryCategories.data, ["categoryId", "category"] ) );
    // console.log( fetchedCategories );

    const [sidebarVisible, setSidebarVisible] = useState( false );

    const screenWidth = window.innerWidth;

    useEffect( () => {
        if ( screenWidth < 1600 ) {
            setSidebarVisible( false );
        }
        if ( screenWidth > 1600 ) {
            setSidebarVisible( true );
        }
    }, [screenWidth] )

    const SidebarContent = () => {
        return (
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
            <div className='w-3/4 h-full flex flex-col p-5 space-y-5'>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            <div className="flex w-1/4 auto mx-9 p-5 flex-col space-y-5">
                <h1 className='p-10 text-2xl text-white'>
                    Categories
                </h1>
                <div className="flex-col space-y-2">
                    <Categories />
                </div>
            </div>
            {sidebarVisible && <SidebarContent />}
        </div>
    )
}

export default Feed