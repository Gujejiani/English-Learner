
import './App.css';
import Header from './components/header/header';
import {Route, Switch} from 'react-router-dom'
import FormPage from './pages/formPage';
import DashboardPage from './pages/vocabulary-page';

import AboutPage from './pages/about-page';

import HardWordsPage from './pages/hard-words-page';
function App() {

  return (
    <div className="App">
      <Header/>
      <Switch>
     
      <Route path="/dashboard" >
        <DashboardPage/>
        </Route >
        
      
        <Route path="/about" >
        <AboutPage/>
        </Route>
        <Route path="/hard-words" >
        <HardWordsPage/>
        </Route>
        <Route path="/" >
        <FormPage/>
        </Route>
      </Switch>
 
      
    </div>
  );
}

export default App;
