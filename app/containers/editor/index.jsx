import React from 'react';
import ReactDom from 'react-dom';
import Lecture from './subpages/lecture';
import Individual from './subpages/individual';
import propTypes from 'prop-types';
import {Player,ControlBar} from 'video-react';
import ReactPlayer from 'react-player';
import {ProgressBar} from 'react-player-controls';
import { connect } from 'react-redux';

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {userid:0,transid:0,videofile:'',vttfile:'',selfvtt:'',seconds:0};
    this.state.userid = this.props.userinfo.account;
    console.log(this.state.userid);
    this.state.transid = this.props.match.params.topicid;
    console.log(this.state.transid);
  }

  tick(){
    let second = document.getElementById("video").currentTime;
    this.setState({
      seconds: second
    })
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/lecture',{credential:'same-origin',method:'POST',body:JSON.stringify({user_id:this.state.userid,trans_id:this.state.transid}), headers:{'Content-Type':'application/json','Accept':'application/json'} })
    .then(response=> response.json())
    .then(data=>{
      this.setState({
        videofile:data.media,
        vttfile: data.subtitle,
        selfvtt: data.selfsubtitle
      })
    })
    this.interval = setInterval(()=>this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    return(
      <div>
      <video id="video" autoplay controls style={{position:'absolute',left:'600px'}}>
      <source src={this.state.videofile} type="video/mp4" />
      </video>
      <Lecture name={this.state.transid} timer={this.state.seconds} />
      <Individual uid={this.state.userid} tid={this.state.transid} timer={this.state.seconds} />
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
)(Editor)
