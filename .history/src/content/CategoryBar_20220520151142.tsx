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
    <div className="col-lg-3">
            <Menu 
            onClick={(e) => selectCategory(e.key)}
            // style={{ ...glStyles.card, padding: "10px 0" }} 
            mode="inline">
                <Menu.ItemGroup key="categories" title="Categories">
                    {categories.map((category) => (
                        <Menu.Item key={category["categoryId"]}>{category["category"]}</Menu.Item>
                    ))}
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