import React, {useState} from 'react'
import { Alert } from '../../components'
import { useAppContext } from '../../context/appContext'

const AddPost = () => {
  const {
    isLoading,
    showAlert,
    createPost,
  } = useAppContext()

    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
      const myForm = new FormData();  
      myForm.set("description", description);
    
      images.forEach((image) => {
        myForm.append("images", image);
      });
      createPost(myForm);
  }
  
  const createPostImagesChange = (e) => {
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
    <form onSubmit={handleSubmit} encType='multipart/form-data' className='create-form create-container'>
      {showAlert && <Alert />}
      <div className="create-head">
          <i className='bx bx-arrow-back post-bck'></i>
          <h4 className="create-title">Create new post</h4>
          <button disabled={isLoading} type="submit" className="create-btn">Share</button>
      </div>
      <div className='create-inputs'>
        <textarea
          type="text"
          className='caption-input'
          required
          placeholder="Write a caption...."
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className='create-flex'>
          <img className='create-img' src={imagesPreview} alt='failed to load' />
          <label className='fi-btn' htmlFor='files'>Select image</label>
          <input 
            className='file-input'
            type="file"
            id='files' 
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={createPostImagesChange}
            multiple
          />
        </div>
      </div>
    </form>
);
}

export default AddPost