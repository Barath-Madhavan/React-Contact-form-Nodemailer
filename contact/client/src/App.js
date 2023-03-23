import React from 'react';
import { BrowserRouter ,Router ,Route } from 'react-router-dom';
import Contact from './components/contact';

class App extends React.Component{
  render(){
    return(

        <Route exact path='/'><Contact/></Route>
        
    )
  }
}

export default App;
