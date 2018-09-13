import React from 'react';
import ListItem from './subpages/ListItem';
import { connect } from 'react-redux';

class classes extends React.Component{
  constructor(props){
    super(props);
    this.state = {checklist:[],id:0};
    const userinfo = this.props.userinfo;
    this.state.id = userinfo.account;
    console.log(userinfo);
  }

  componentDidMount(props){
    let message = {'id': this.state.id};
    fetch('http://localhost:8000/api/enrollment', {credential:'same-origin', method:'POST', body:JSON.stringify(message), headers:{'Content-Type':'application/json','Accept':'application/json'}})
    .then(response=>response.json())
    .then(data=>{
      let temp = this.state.checklist;
      temp = data.class_list;
      this.setState({
        checklist: temp
      })
    })
  }

  render(){
    const rows = [];
    for(let i = 0; i < this.state.checklist.length; ++i){
      rows.push(<ListItem cid={this.state.id} id={this.state.checklist[i]['id']} name={this.state.checklist[i]['className']} session={this.state.checklist[i]['sessionName']} />)
    }
    return(
      <div>
      {rows}
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userUpdate
    }
}

export default connect(
    mapStateToProps,
)(classes)
