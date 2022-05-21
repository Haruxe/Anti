import React from 'react';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import {motion} from 'framer-motion';
import { Menu } from 'antd';

function CategoryBar({categories}) {
  
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
    console.log(selectedCategory)
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <div className="col-lg-3 bg-transparent " style={{ background: 'transparent' }} >
            <Menu 
            
            onClick={(e) => selectCategory(e.key)}
            style={{ background: 'transparent' }} 
            className='rounded-lg text-white bg-transparent'
            mode="inline">
                <Menu.ItemGroup key="categories" className='bg-transparent text-white' style={{ background: 'transparent' }} >
                    {categories.map((category) => (
                        <Menu.Item key={category["categoryId"]} className='text-white rounded-sm'><motion.div className='text-white'>{category["category"]}</motion.div></Menu.Item>
                    ))}
                    <Menu.Item  className='text-white rounded-sm bg-transparent' ><motion.div className='text-white text-xl'>NFTs</motion.div></Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        </div>
    // <div className="text bg-[#202020] rounded-sm h-auto p-4 flex outline outline-1 outline-[#343536] align-middle w-full">
    //   <div className='text-white text-xl flex flex-row space-x-24 justify-center mx-auto'>
    //   {categories.map((category) => (
    //     <motion.button key={category["categoryId"]} onClick={(e) => selectCategory(e.key)}>{category["category"]}</motion.button>
    //   ))}
    //   </div>
    // </div>
  )
}
export default CategoryBar