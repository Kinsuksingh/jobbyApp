import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const differentView = {
  success: 'SUCCESS',
  inProgress: 'PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: differentView.inProgress,
    jobData: {},
  }

  componentDidMount() {
    this.getPerticularJobData()
  }

  getPerticularJobData = async () => {
    this.setState({apiStatus: differentView.inProgress})
    const id = this.props.match.params.id
    const url = `https://apis.ccbp.in/jobs/${id}`
    const storedJwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${storedJwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const jobData = {
          jobDetails: {
            title: data.job_details.title,
            companyLogoUrl: data.job_details.company_logo_url,
            companyWebsiteUrl: data.job_details.company_website_url,
            employmentType: data.job_details.employment_type,
            id: data.job_details.id,
            jobDescription: data.job_details.job_description,
            skills: data.job_details.skills.map(skill => ({
              imageUrl: skill.image_url,
              name: skill.name,
            })),
            lifeAtCompany: {
              description: data.job_details.life_at_company.description,
              imageUrl: data.job_details.life_at_company.image_url,
            },
            location: data.job_details.location,
            packagePerAnnum: data.job_details.package_per_annum,
            rating: data.job_details.rating,
          },
          similarJobs: data.similar_jobs.map(simJob => ({
            id: simJob.id,
            title: simJob.title,
            jobDescription: simJob.job_description,
            companyLogoUrl: simJob.company_logo_url,
            location: simJob.location,
            employmentType: simJob.employment_type,
            rating: simJob.rating,
          })),
        }
        this.setState({apiStatus: differentView.success, jobData})
      } else {
        this.setState({apiStatus: differentView.failure})
      }
    } catch (error) {
      this.setState({apiStatus: differentView.failure})
      console.error('Error fetching job data:', error)
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state.jobData
    const {
      id,
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    return (
      <>
        <div className="job-details-container">
          <div className="job-details-employment-container">
            <img
              src={companyLogoUrl}
              className="job-details-companylogo-img"
              alt="job details company logo"
            />
            <div className="job-details-employment-details">
              <h1 className="job-details-employment-name">{title}</h1>
              <div className="job-details-rating-container">
                <FaStar className="job-details-star-icon" />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-location-container">
            <div className="job-details-location-employment-type">
              <div className="job-details-location">
                <MdLocationOn className="job-details-location-icon" />
                <p className="job-details-loca">{location}</p>
              </div>
              <div className="job-details-employment-type">
                <BsBriefcaseFill className="job-details-briefcase-icon" />
                <p className="job-details-emplo">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-salary">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-horizontal-lin" />
          <div className="job-details-description-container">
            <div className="description-link-container">
              <h1>Description</h1>
              <a
                className="visit-link"
                href={companyWebsiteUrl}
                target="_blank"
              >
                <span className="visit-text">Visit </span>
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>
            <p>{jobDescription}</p>
          </div>
          <div className="job-details-skills-container">
            <h1>Skills</h1>
            <ul className="skills-list">
              {skills.map(skill => (
                <li key={skill.name}>
                  <div className="skill-item">
                    <img
                      className="skill-img"
                      src={skill.imageUrl}
                      alt="skill"
                    />
                    <p className="skill-name">{skill.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-details-life-at-company-container">
            <h1>Life at Company</h1>
            <div className="life-at-company-description">
              <p>{lifeAtCompany.description}</p>
              <img
                className="life-at-company-img"
                src={lifeAtCompany.imageUrl}
                alt="lifeAtCompany"
              />
            </div>
          </div>
        </div>
        <div className="job-details-similar-jobs-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <SimilarJobsCard key={job.id} jobDt={job} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    return (
      <div className="api-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="api-failure-view-img"
        />
        <h1 className="api-failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="api-failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="api-retry-btn" onClick={this.getPerticularJobData}>
          Retry
        </button>
      </div>
    )
  }

  renderDifferentView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case differentView.inProgress:
        return this.renderLoader()
      case differentView.success:
        return this.renderSuccessView()
      case differentView.failure:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div className="job-item-detail-container">
        <Header />
        {this.renderDifferentView()}
      </div>
    )
  }
}
export default JobItemDetails
