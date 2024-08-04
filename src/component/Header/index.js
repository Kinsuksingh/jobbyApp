import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'
const Header = props => {
  const handleLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-section">
      <Link to="/">
        <img
          className="logo-img"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="header-link">
        <li>
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/" className="icon-link">
            <AiFillHome />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            Jobs
          </Link>
          <Link to="/jobs" className="icon-link">
            <BsBriefcaseFill />
          </Link>
        </li>
        <li>
          <button type='buttton' className="icon-logout-btn" onClick={handleLogout}>
            <FiLogOut />
          </button>
        </li>
      </ul>
      <button type='buttton' className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
