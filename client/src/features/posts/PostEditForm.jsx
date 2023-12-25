import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../constants';

function PostEditForm() {

  const [post, setPost] = useState(null);
  const {id} = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json)
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred. Awkward ...")
        console.log("An error occurred", e)
      } finally {
        setLoading(false);
      }
    }
  
    fetchCurrentPost();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body
        }),
      })
      if (response.ok) {
        const { id } = await response.json()
        navigate(`/posts/${id}`)
      } else {
        throw response
      }
    } catch (e) {
      console.log("An error occurred", e);
    }
  }

  if (!post) return <h2>Loading ...</h2>
  
  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title:</label>
          <input
            id="post-title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="titleInput">Body:</label>
          <input
            id="bodyInput"
            type="text"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value})}
            required
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  
  );
}

export default PostEditForm;
