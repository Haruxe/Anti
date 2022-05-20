import { useMoralisDapp } from "../MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from './Post';

const Posts = ({selectedCategory}) => {
    const categoryId = selectedCategory.categoryId;
    // console.log(categoryId)
    
    const queryPost = useMoralisQuery(
        "PostsV",
        (query) => query.equalTo("postCategory", categoryId),
        [selectedCategory],
        { live: true }
    );
    // console.log(queryPost)

    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])).reverse();
    const havePosts = fetchedPosts.length > 0 ? true : false;
    console.log(fetchedPosts)

    const emptyResult = (
        <div>
            <h3 className="text-white">Be the first to post here for</h3>
            <h3>{selectedCategory["category"]} </h3>
        </div>
    );

    // function vote(input) {
    //     message.success("message")
    // }
    
    const postResult = (
        <div>
            {fetchedPosts.map((post) => (
                <Post key={post["postId"]} post={post} profile={false}/>
            ))}
        </div>        
    )
    
    return havePosts ? postResult : emptyResult;
}

export default Posts