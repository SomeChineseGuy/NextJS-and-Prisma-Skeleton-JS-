import { useRef, useState } from "react"
import axios from "axios";

export default function BlogSearch() {
  const inputRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchedBlogs, setSearchedBlogs] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = inputRef.current.value;
    console.log(userInput);
    axios.post('/api/blog', {userInput})
    .then(res => {
      console.log(res.data.blogs);
      setSearchedBlogs(res.data.blogs)
      setIsLoaded(true)
    })
  }

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <label>title</label>
        <input type="text" ref={inputRef} />
        <button>Search</button>
      </form>
      <div>
        {isLoaded && 
          <div>
            {searchedBlogs.map(blog => {
              return (
                <div key={blog.id}>
                  <h1>{blog.title}</h1>
                  <p>{blog.content}</p>
                </div>
            )})}
          </div>
        }
      </div>
    </div>
  )
};