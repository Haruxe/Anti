import React from 'react';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import {motion} from 'framer-motion';
import { Menu } from 'antd';

function CategoryBar({categories}) {
  // console.log(categories)
  
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
    console.log(selectedCategory)
    debugger
    setSelectedCategory(selectedCategory[0]);
    // console.log(setSelectedCategory)
  }

  return (
    <div className="text bg-[#202020] rounded-sm h-auto p-4 flex outline outline-1 outline-[#343536] align-middle w-full">
      <div className='text-white text-xl flex flex-row space-x-24 justify-center mx-auto'>
        <motion.nav >
          {categories.map((category) => (
            <motion.button key={category.id} onClick={(e) => selectCategory(e.key)}>{category.attributes.category}</motion.button>
          ))}
        </motion.nav>
      </div>
    </div>
  )
}
export default CategoryBar