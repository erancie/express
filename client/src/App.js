import './App.css';
import Landing from './Landing';
import Newtask from './Newtask'
import Findtask from './Findtask';
import Taskitem from './Taskitem';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams

} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Landing}/>
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

