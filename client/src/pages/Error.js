import { Link } from 'react-router-dom'
import { Navbar } from '../components'
const Error = () => {
  return (
    <div>
      <title>Rayuiuct App</title>
      <Navbar />
      <div className='error-content'>
        <h3 className='error-title'>Sorry, this page isn't available.</h3>
        <p className='error-desc'>The link you followed may be broken, or the page may have been removed.<Link className='error-link' to='/'>Go back to Instagram.</Link></p>
      </div>
    </div>
  )
}

export default Error
