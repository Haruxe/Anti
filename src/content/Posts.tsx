import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from './Post';

const Posts = ({selectedCategory}) => {
    const queryPost = useMoralisQuery(
        "Posts"
    );
    // console.log(queryPost)

    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])).reverse();
    const havePosts = fetchedPosts.length > 0 ? true : false;

    const emptyResult = (
        <div className="justify-center w-full p-4">
            <p className="text-white text-xl mx-auto">Nothing to see here!</p>
        </div>
    );

    // function vote(input) {
    //     message.success("message")
    // }
    
    const postResult = (
                <Post post={fetchedPosts} profile={false}/>     
    )
    
    return havePosts ? postResult : emptyResult;
}

export default Posts