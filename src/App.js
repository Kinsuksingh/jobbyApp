import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './component/LoginForm'
import ProtectedRoute from './component/ProtectedRoute'
import Home from './component/Home'
import Jobs from './component/Jobs'
import JobItemDetails from './component/JobItemDetails'
import NotFound from './component/NotFound'
import './App.css'

// Replace your code here
const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default App
