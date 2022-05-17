import '../index.css';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';

function Home() {  
  return (
    <div className='flex justify-center space-x-4'>
        <div className='mb-10 h-screen rounded-sm flex justify-center flex-row'>
            <Navbar />
            <Feed />
        </div>
    </div>
  )
}

export default Home