import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  renderHome = () => {
    return (
      <>
        <div className="home-container">
          <Header />
          <div className="content-section">
            <h1 className="home-title">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fit your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-jobs-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
  render() {
    return this.renderHome()
  }
}

export default Home
