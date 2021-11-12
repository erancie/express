import './App.css'; 
import Landing from './Landing';
import Newtask from './Newtask'
import Findtask from './Findtask';
import Taskitem from './Comps/Taskitem';
import Register from './Register';
import Login from './Login';
import Experts from './Comps/Experts';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/ourexperts" component={Experts}/>
            <Route path="/newtask" component={Newtask}/>
            <Route path="/findtask/:id" component={Taskitem}/>
            <Route path="/findtask" exact component={Findtask}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

