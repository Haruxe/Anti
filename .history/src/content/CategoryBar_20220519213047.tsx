import React from 'react';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import {motion} from 'framer-motion';
import { Menu } from 'antd';
import { Category } from '@styled-icons/boxicons-regular';

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
      {categories.map((category) => (
        <motion.ul variants={category.id} onClick={(e) => selectCategory(e.key)}>
            <motion.button key={category["categoryId"]}>{category.attributes.category}</motion.button> 
        </motion.ul>
          ))}
      </div>
    </div>
  )
}
export default CategoryBar