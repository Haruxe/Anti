import Post from "../content/Post"
import Sidebar from "../content/Sidebar"


function Feed() {

    const SidebarTitle = () => {
        return (<div className="text bg-[#1A1A1B] h-auto p-4 flex marker:justify-center">
        <h1 className='mx-auto text-lg'>
            Trending Content
        </h1>
        </div>) 
    }

  return (
    <div className='p-10 flex flex-row'>
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
        
        <div className="flex-col space-y-2">
            <Sidebar />
            <Sidebar />
            <Sidebar />
            <Sidebar />
            <Sidebar />
            <Sidebar />
        </div>
        </div>
    </div>
  )
}

export default Feed