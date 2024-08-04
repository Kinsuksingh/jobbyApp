import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const renderDiffView = {
  successView: 'SUCCESS',
  inProgress: 'PROGRESS',
  failureView: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileApiStatus: renderDiffView.inProgress,
    jobApiStatus: renderDiffView.inProgress,
    profileData: '',
    jobData: [],
    searchVal: '',
    employmentTypes: [],
    miniPacakage: '',
  }
  onSearch = event => {
    this.setState({searchVal: event.target.value})
  }

  onSelect = event => {
    this.setState({miniPacakage: event.target.value}, this.getJobsData)
  }

  handleEmploymentType = event => {
    const {checked, value} = event.target
    this.setState(
      prevState => ({
        employmentTypes: checked
          ? [...prevState.employmentTypes, event.target.value]
          : prevState.employmentTypes.filter(type => type !== value),
      }),
      this.getJobsData,
    )
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({profileApiStatus: renderDiffView.inProgress})
    const storedJwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${storedJwtToken}`,
      },
      method: 'GET',
    }
    const urlForProfile = 'https://apis.ccbp.in/profile'
    try {
      const respose = await fetch(urlForProfile, options)
      if (respose.ok) {
        const data = await respose.json()
        const profileDetails = data.profile_details
        const formatdata = {
          name: profileDetails.name,
          profileImageUrl: profileDetails.profile_image_url,
          shortBio: profileDetails.short_bio,
        }
        this.setState({
          profileData: formatdata,
          profileApiStatus: renderDiffView.successView,
        })
      }
    } catch (error) {
      this.setState({profileApiStatus: renderDiffView.failureView})
    }
  }

  getJobsData = async () => {
    const {searchVal, employmentTypes, miniPacakage} = this.state
    let employment = ''
    if (employmentTypes.length !== 0) {
      employment = employmentTypes.join(',')
    }
    this.setState({jobApiStatus: renderDiffView.inProgress})
    const storedJwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${storedJwtToken}`,
      },
      method: 'GET',
    }
    const urlForJobsData = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${miniPacakage}&search=${searchVal}`
    try {
      const respose = await fetch(urlForJobsData, options)
      if (respose.ok) {
        const data = await respose.json()
        const formatJobData = data.jobs.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }))
        this.setState({
          jobData: formatJobData,
          jobApiStatus: renderDiffView.successView,
        })
      }
    } catch (error) {
      this.setState({jobApiStatus: renderDiffView.failureView})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileData, profileApiStatus} = this.state
    const {name, shortBio} = profileData
    switch (profileApiStatus) {
      case renderDiffView.inProgress:
        return this.renderLoader()
      case renderDiffView.successView:
        return (
          <div className="profile-container">
            <img
              className="profile-img"
              src={profileData.profileImageUrl}
              alt="profile"
            />
            <h1 className="profile-name">{name}</h1>
            <p className="short-bio">{shortBio}</p>
          </div>
        )
      case renderDiffView.failureView:
        return (
          <div className="failed-in-fetching-container">
            <button className="retry-btn" onClick={this.getProfileData}>
              Retry
            </button>
          </div>
        )
    }
  }

  renderEmploymentType = () => {
    return (
      <>
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(employmentType => (
            <li
              key={employmentType.employmentTypeId}
              className="employment-type-item"
            >
              <input
                className="checkbox-ele"
                type="checkbox"
                name="employmentType"
                value={employmentType.employmentTypeId}
                onClick={this.handleEmploymentType}
              />
              <p className="employment-type-label">{employmentType.label}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSalaryRange = () => {
    return (
      <>
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list">
          {salaryRangesList.map(salaryRange => (
            <li key={salaryRange.salaryRangeId} className="salary-range-item">
              <input
                className="radio-ele"
                type="radio"
                name="salaryRange"
                value={salaryRange.salaryRangeId}
                onClick={this.onSelect}
              />
              <p className="salary-range-label">{salaryRange.label}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSearchELement = () => {
    const {searchVal} = this.state
    return (
      <>
        <input
          type="search"
          className="search-input-ele"
          placeholder="Search"
          onChange={this.onSearch}
          value={searchVal}
        />
        <button
          className="search-btn"
          type="button"
          data-testid="searchButton"
          onClick={this.getJobsData}
        >
          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  renderFilterOrProfileView = () => {
    return (
      <div className="filters-or-profile-view">
        <div className="profile-search-container">
          {this.renderSearchELement()}
        </div>
        {this.renderProfile()}
        <hr className="hr-line" />
        {this.renderEmploymentType()}
        <hr className="hr-line" />
        {this.renderSalaryRange()}
      </div>
    )
  }

  displayFailureView = () => {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-img"
        />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-btn" onClick={this.getJobsData}>
          Retry
        </button>
      </div>
    )
  }

  displayNoJobView = () => {
    return (
      <div className="no-job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  displayAllJobs = () => {
    const {jobApiStatus, jobData} = this.state
    switch (jobApiStatus) {
      case renderDiffView.inProgress:
        return this.renderLoader()
      case renderDiffView.successView:
        if (jobData.length !== 0) {
          return (
            <ul className="jobs-list">
              {jobData.map(job => (
                <JobCard key={job.id} jobDetails={job} />
              ))}
            </ul>
          )
        } else {
          return this.displayNoJobView()
        }
      case renderDiffView.failureView:
        return this.displayFailureView()
    }
  }

  renderJobsView = () => {
    return (
      <div className="jobs-view-container">
        <div className="jobs-search-container">
          {this.renderSearchELement()}
        </div>
        {this.displayAllJobs()}
      </div>
    )
  }

  renderJobsPage = () => {
    return (
      <div className="jobs-container">
        <Header />
        <div className="Jobs-and-filters">
          {this.renderFilterOrProfileView()}
          {this.renderJobsView()}
        </div>
      </div>
    )
  }
  render() {
    return this.renderJobsPage()
  }
}
export default Jobs
