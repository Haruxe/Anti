import React from 'react';
import { useMoralisDapp } from '../MoralisDappProvider/MoralisDappProvider';
import { Menu } from "antd"

function Sidebar({categories}) {
  
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <div className="text bg-[#202020] rounded-sm h-auto p-4 flex outline outline-1 outline-[#343536] align-middle">
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
  )
}
export default Sidebar