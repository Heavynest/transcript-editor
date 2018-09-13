import React from 'react';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
import ContactPage from '../submitValidationForm';
import classes from '../containers/classes';
import Editor from '../containers/editor';

class RouteMap extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router history={this.props.history}>
        <div>
           <Route exact path='/' component={ContactPage} />
           <Route path='/classes' component={classes} />
           <Route path='/classes/transcript/:topicid' component={Editor} />
       </div>
     </Router>
    )
  }
}

export default RouteMap;
