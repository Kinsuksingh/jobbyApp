import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsCard = props => {
  const {jobDt} = props
  const {
    title,
    companyLogoUrl,
    jobDescription,
    location,
    employmentType,
    rating,
  } = jobDt
  return (
    <li>
      <div className="similar-job-details-card">
        <div className="employment-container">
          <img src={companyLogoUrl} className="companylogo-img" alt='similar job company logo'/>
          <div className="employment-details">
            <h1 className="employment-name">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="description-container">
          <h1 className="title">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
        <div className="location-employment-type-container">
          <div className="location">
            <MdLocationOn className="location-icon" />
            <p className="loca">{location}</p>
          </div>
          <div className="employment-type">
            <BsBriefcaseFill className="briefcase-icon" />
            <p className="emplo">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
