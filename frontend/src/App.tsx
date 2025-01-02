import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Blog } from './pages/Blog'
// import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
// import { Publish } from './pages/Publish'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

// Import the single blog component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blogs" element={<Blogs />} />  {/* Add route for all blogs */}
          <Route path="/blog/:id" element={<Blog/>} />    {/*Use Blog component for single blog*/}
          <Route path='/publish' element={<Publish />}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App