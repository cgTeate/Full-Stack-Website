import "./post.css"
import {MoreVert} from "@mui/icons-material"
import { useEffect, useState, useContext} from "react"
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    const text = "https://media.istockphoto.com/photos/white-broken-heart-shape-over-red-background-picture-id1200080248?b=1&k=20&m=1200080248&s=170667a&w=0&h=kI3kNRaw0EF5S_mri6-5ujlQjk1_O0lDcK61MRGUfqo="

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data)
           
        }
        fetchUser();
       
    },[post.userId])


    const likeHandler =()=>{
        try{
            axios.put("/posts/" + post._id + "/like", {userId: currentUser._id})
        }catch(err){
            
        }
        setLike(isLiked ? like-1 : like+1) 
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}   alt="" />
                        </Link>
                        <span className="postUsername">{user?.username}</span>
                        <span className="postDate">{format(post?.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post?.img || PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`}onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`}onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
