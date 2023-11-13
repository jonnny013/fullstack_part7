import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'

export const Blogs = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
  })
  const blogs = result.data
  return (
    <>
      {result.isLoading ? (
        <div>Loading blogs...</div>
      ) : (
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} />)
      )}
    </>
  )
}

export default Blogs