// import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
// import {Menu } from "antd"
// import glStyles from "./gstyles" 

const Categories = ({categories}) => {
    // const { setSelectedCategory } = useMoralisDapp();
    
    // function selectCategory(categoryId) {
    //     const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
    //     setSelectedCategory(selectedCategory[0]);
    // }
    
    return (
      <div className="text bg-[#0000003f] rounded-sm h-auto p-4 flex outline outline-1 outline-[#343536] align-middle">
        <h1 className='text-white my-auto'
        >
        </h1>
      </div>
        // <div className="col-lg-3">
        //     <Menu 
        //     onClick={(e) => selectCategory(e.key)}
        //     style={{ ...glStyles.card, padding: "10px 0" }} 
        //     mode="inline">
        //         <Menu.ItemGroup key="categories" title="Categories">
        //             {categories.map((category) => (
        //                 <Menu.Item key={category["categoryId"]}>{category["category"]}</Menu.Item>
        //             ))}
        //         </Menu.ItemGroup>
        //     </Menu>
        // </div>
    )
}

export default Categories