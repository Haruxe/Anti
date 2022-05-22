import '../index.css';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

function Home() {  
  return (
    <div className='flex justify-center space-x-4' id='page'>
        <div className='mb-10 h-screen rounded-sm flex justify-center flex-row'>
            <Navbar />
            <Feed />
            <Search />
        </div>
    </div>
  )
}

export default Home