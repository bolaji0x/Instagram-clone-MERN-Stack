import { AcctPostContainer, Navbar } from '../../components'
import UnAuthProfile from './UnauthProfile'
const UnauthAccount = () => {
  return (
    <div className='post-content section picture-section bd-container'>
      <Navbar />
      <UnAuthProfile />
      <AcctPostContainer />
    </div>
  )
}

export default UnauthAccount