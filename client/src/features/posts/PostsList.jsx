import React, { useEffect, useState } from "react";
import { fetchAllPosts, deletePost as delePostService } from "../../services/postService";
import { Link } from "react-router-dom";


function PostsList() {

  const [posts, setPosts] = useState([])
  const [, setLoading] = useState(true)
  const [, setError] = useState(null)
  
  // fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const deletePost = async (id) => {
    try {
      await delePostService(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (e) {
      console.log("An error occurred", e)
    }
  }
  

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>
          <div className="post-link">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsList;
