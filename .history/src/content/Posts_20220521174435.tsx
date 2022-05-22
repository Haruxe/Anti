import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from './Post';

const Posts = () => {
    // const categoryId = selectedCategory.categoryId;
    // console.log(categoryId)
    
    const queryPost = useMoralisQuery(
        "Posts"
    );
    // console.log(queryPost)

    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])).reverse();
    const havePosts = fetchedPosts.length > 0 ? true : false;
    // console.log(fetchedPosts)

    const emptyResult = (
        <div className="justify-center w-full p-4">
            <p className="text-white text-xl mx-auto">Nothing to see here!</p>
        </div>
    );

    // function vote(input) {
    //     message.success("message")
    // }
    
    const postResult = (
        <div className="space-y-3">
            <Post  post={fetchedPosts} profile={false}/>
        </div>        
    )
    
    return havePosts ? postResult : emptyResult;
}

export default Posts