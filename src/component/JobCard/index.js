import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'
const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <Link to={`/jobs/${id}`} className="link-style">
        <div className="job-details-card">
          <div className="employment-container">
            <img
              src={companyLogoUrl}
              className="companylogo-img"
              alt="company logo"
            />
            <div className="employment-details">
              <h1 className="employment-name">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-container">
            <div className="location-employment-type">
              <div className="location">
                <MdLocationOn className="location-icon" />
                <p className="loca">{location}</p>
              </div>
              <div className="employment-type">
                <BsBriefcaseFill className="briefcase-icon" />
                <p className="emplo">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-lin" />
          <div className="description-container">
            <h1 className="title">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
