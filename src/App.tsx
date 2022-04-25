
import './App.css';
import Header from './components/header/header';
import {Route, Switch} from 'react-router-dom'
import FormPage from './pages/formPage';
import DashboardPage from './pages/dashboard-page';

import AboutPage from './pages/about-page';
function App() {

  return (
    <div className="App">
      <Header/>
      <Switch>
     
      <Route path="/dashboard" >
        <DashboardPage/>
        </Route >
        
        <Route path="/form" >
        <FormPage/>
        </Route>
        <Route path="/about" >
        <AboutPage/>
        </Route>
     
      </Switch>
 
      
    </div>
  );
}

export default App;
