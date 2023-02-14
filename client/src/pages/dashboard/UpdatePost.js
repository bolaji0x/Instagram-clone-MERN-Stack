import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { Alert } from '../../components'

const UpdatePost = () => {
    const {id} = useParams()
    const { showAlert, isLoading, updatePost } = useAppContext()

    const [description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`/api/v1/posts/${id}`)
            const {post} = data
            console.log(post)
            setDescription(post.description)
            setImagesPreview(post.images[0].url)
          } catch (error) {
            console.log(error)
          }
        };
        fetchData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set('description', description);;
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        updatePost(id, myForm);
    };

    const updatePostImagesChange = (e) => {
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
    <form onSubmit={handleSubmit} encType='multipart/form-data' className='create-forzm create-container'>
      {showAlert && <Alert />}
      <div className="create-head">
          <i className='bx bx-arrow-back'></i>
          <h4 className="create-title">Update post</h4>
          <button disabled={isLoading} type="submit" className="create-btn">Update</button>
      </div>
      <div className='create-inputs'>
        <input 
          type="text"
          className='caption-input'
          required
          placeholder="Write a caption...."
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        <input 
          className='file-input'
          type="file" 
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={updatePostImagesChange}
          multiple
        />
        <div className='create-flex'>
          <img className='create-img' src={imagesPreview} alt='failed to load' />
          <label className='fi-btn' htmlFor='files'>Update image</label>
          <input 
            className='file-input'
            type="file"
            id='files' 
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={updatePostImagesChange}
            multiple
          />
        </div>
      </div>
    </form>
  )
}

export default UpdatePost