import { useState } from 'react'
import { Alert } from '../../components'
import { useAppContext } from '../../context/appContext'


const Update = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

  const [email, setEmail] = useState(user?.email)
  const [fullname, setFullname] = useState(user?.fullname)
  const [username, setUsername] = useState(user?.username)
  const [location, setLocation] = useState(user?.location)
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(user?.images[0].url);

  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email || !fullname || !username || !location) {
      displayAlert()
      return
    }
    const formData = new FormData();
    formData.set('email', email);
    formData.set('fullname', fullname);
    formData.set('username', username);
    formData.set('location', location);
    images.forEach((image) => {
      formData.append("images", image);
    });
    
    updateUser(formData)
  }

  const updateUserImagesChange = (e) => {
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

  return (
      <form encType='multipart/form-data' className='update-form' onSubmit={handleSubmit}>
        <h2 className='update-title'>Edit Profile</h2>
        {showAlert && <Alert />}
          <div className='form-center'>
            <span className='pic-text'>
              <img src={imagesPreview} alt={username} className='profile-pics' />
              <div className='name-input'>
              <label className='cp-btn' htmlFor='files'>Change profile photo</label>
                <input 
                  type="file"
                  className='file-input'
                  id='files'
                  name="avatar"
                  accept="image/*"
                  onChange={updateUserImagesChange}
                  multiple
                />
              </div>
            </span>
            <div className='each-input'>
              <div>
                <label className='label-name'>Name</label>
              </div>
              
              <input
                type='text'
                className='update-input'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              />
              
            </div>
            <div className='each-input'>
              <div>
                <label className='label-name'>Username</label>
              </div>
              <input
                type='text'
                className='update-input'
                name='fullname'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className='each-input'>
              <div>
                <label className='label-name'>Email</label>
              </div>
              <input
                type='text'
                className='update-input'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> 
            <div className='each-input'>
              <div>
                <label className='label-name'>Location</label>
              </div>
              <input
                type='text'
                className='update-input'
                name='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>         
            <button className='profile-submit' type='submit' disabled={isLoading}>
              {isLoading ? 'Please Wait...' : 'Save Changes'}
            </button>
        </div>
      </form>
  )
}

export default Update
