import React from 'react';
import {Link} from 'react-router-dom';

class Item extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    let transcript_id = this.props.tid;
    let class_id = this.props.cid;
    let route = '/classes/transcript/' + transcript_id.valueOf();
    return(
      <Link to={route}>{this.props.time}</Link>
    )
  }
}

export default Item;
