import React, { useState, useEffect } from 'react'
import { Alert, Logo, FormRow } from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate, Navigate } from 'react-router-dom'

const initialState = {
  email: '',
  fullname: '',
  username: '',
  password: '',
  isMember: true
}

const Register = () => {
  const navigate = useNavigate()
  const { user, setupUser, showAlert, isLoading, displayAlert } = useAppContext()

  const [values, setValues] = useState(initialState)
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, fullname, username, password, isMember} = values

    if(!email || !password || (!isMember && !fullname && !username)) {
      displayAlert()
      return
    }
    const currentUser = new FormData();

    currentUser.set("email", values.email);
    currentUser.set("fullname", values.fullname);
    currentUser.set("username", values.username);
    currentUser.set("password", values.password);

    images.forEach((image) => {
      currentUser.append("images", image);
    });
    if (values.isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  };
  
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  }
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <section className='register-container'>
      <div>
        <form 
          encType="multipart/form-data"  className='register-section' 
          onSubmit={handleSubmit}
        >
        <Logo className='form-title' />
        {showAlert && <Alert />}
        {/* profile photo */}
        {!values.isMember && (
        <div>
            <img src={imagesPreview} className='img-prev' alt='preview' />
            <div className='cca'>
              <label className='upload-text' htmlFor='files'>Add profile photo</label>
              <input
              type="file"
              id='files'
              className='upload-btn'
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
              />
            </div>
            {/* username */}
            <FormRow
              type='text'
              name='username'
              placeholder='Username'
              value={values.username}
              handleChange={handleChange}
            />
            {/* fullname */}
            <FormRow
              type='text'
              name='fullname'
              placeholder='Full Name'
              value={values.fullname}
              handleChange={handleChange}
            />
        </div>
        )}
        {/* email */}
        <FormRow
          type='email'
          name='email'
          placeholder='Email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          handleChange={handleChange}
        />
        {/* btn container */}
        <button type='submit' className='btn login-btn' disabled={isLoading}>
          {values.isMember ? 'Login' : 'Register'}
        </button>
        <p className='enq-btn-section'>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
        </form>
      </div>
      </section>
    </React.Fragment>
      
  )
}
export default Register
