import Moralis from 'moralis';
import { useEffect, useState } from "react";
import Post from "../content/Post"
// import Sidebar from "../content/Sidebar"

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

function Feed() {
    // const [sidebarVisible, setSidebarVisible] = useState(false);

    Moralis.start({serverUrl, appId})
    const user = Moralis.User.current();
    
    useEffect(() => {
     FetchFeed();
    }, [user]);

    // useEffect(() => {
    //     function handleResize() {
    //         if (window.innerWidth < 1300){
    //             setSidebarVisible(false);
    //         }
    //         if (window.innerWidth > 1300){
    //             setSidebarVisible(true);
    //         }
    //     }
    //     window.addEventListener('resize', handleResize)
    // })

    // const SidebarContent = () => {
    //     return(
    //         <>
    //     <div className="flex auto flex-col pt-5 space-y-5 w-1/4">
    //     <div className="flex-col space-y-2">
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //         <Sidebar />
    //     </div>
    //     </div>
    //     </>
    //     )
    // }

    async function FetchFeed(){
        const Posts = await Moralis.Object.extend('Posts')
        const Users = await Moralis.Object.extend('_User')
        const queryUser = new Moralis.Query(Users)
        queryUser.equalTo('accounts', user.attributes.ethAddress)
        let usersFollowing = await queryUser.find();
        let totalPosts;
        for (let i = 0; i < usersFollowing.length; i++){
            const query = new Moralis.Query(Posts);
            query.equalTo('user', usersFollowing[i]);
            totalPosts.push(query.find());
        }
    }

    return (
       
    <div className='p-5 flex flex-row ml-[250px]'>
        <div className='w-full h-full flex flex-col p-5 space-y-5'>
            <Post />
        </div>
        {/* {sidebarVisible && <SidebarContent />} */}
    </div>
  )
}

export default Feed