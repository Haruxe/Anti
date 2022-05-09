import '../index.css';
import Feed from '../components/Feed';
import FeedTitle from '../content/FeedTitle';
import AddPost from '../components/AddPost';

function Home() {
  return (
    <div className='flex justify-center my-12 space-x-4 px-4'>
        <div className='mt-5'>
            <AddPost />
        </div>
        <div className='bg-[#00000016] w-[1200px] h-auto rounded-sm flex justify-center flex-col'>
            <FeedTitle />
            <Feed />
        </div>
    </div>
  )
}

export default Home