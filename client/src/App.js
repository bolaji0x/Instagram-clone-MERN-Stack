import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register, Error, ProtectedRoute } from './pages'
import { SharedLayout, AddPost, AllPost, AuthProfile, UnauthAccount, UpdateProfile, Discover, SinglePost, UpdatePost, Explore } from './pages/dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
          }
        >
          <Route index element={<Discover />} />
          <Route path='all-post' element={<AllPost />} />
          <Route path='add-post' element={<AddPost />} />
          <Route path='profile' element={<AuthProfile />} />
          <Route path='/profile/edit-profile' element={<UpdateProfile />} />
          <Route path='/post/:id' element={<SinglePost />} />
          <Route path='/:id/edit-post' element={<UpdatePost />} />
          <Route path='/explore' element={<Explore />} />
          
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/:id/user' element={<UnauthAccount />} />
        
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
