import React from 'react';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import {motion} from 'framer-motion'

function CategoryBar({categories}) {
  
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
    setSelectedCategory(selectedCategory[0]);
  }


  return (
    <div className="text bg-[#202020] rounded-sm h-auto p-4 flex outline outline-1 outline-[#343536] align-middle w-full">
            <div className='text-white text-xl flex flex-row space-x-24 justify-center mx-auto'>
                {categories.map((category) => (
                  <motion.button key={category.id} onClick={(e) => selectCategory(e)}>{category.attributes.category}</motion.button>
                ))}
            </div>
    </div>
  )
}
export default CategoryBar