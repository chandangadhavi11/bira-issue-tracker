import './App.css';
import { DashboardPage, LandingPage } from "./pages"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// const Home = () => {
//   return (
//     <h1>
//     </h1>
//   )
// }
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact></Route>
          <Route path="/login" component={LandingPage} exact></Route>
          <Route path="/signup" component={LandingPage} exact></Route>
          <Route path="/dashboard" component={DashboardPage} exact></Route>
          <Route path="/issues" component={DashboardPage} exact></Route>
          <Route path="/issues/:id" component={DashboardPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
