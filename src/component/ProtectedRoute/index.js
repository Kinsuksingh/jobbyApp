import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwtToken')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <Switch>
      <Route {...props} />
    </Switch>
  )
}

export default ProtectedRoute
