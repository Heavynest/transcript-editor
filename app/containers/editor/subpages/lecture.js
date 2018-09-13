import React from 'react';
import styles from './style.css';

class Lecture extends React.Component{
  constructor(props){
    super(props);
    this.state = {transcript:[], time:""};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id,event){
    var temp = document.getElementById("video");
    let startting = this.state.transcript[id]['start'];
    temp.currentTime = startting;
  }

  tick(){
    for(let i = 0; i < this.state.transcript.length; ++i){
      if(this.state.transcript[i].showing === true){
        if(this.state.transcript[i].end < this.state.time || this.state.transcript[i].start > this.state.time){
          this.state.transcript[i].showing = false;
        }
      }
      if(this.state.transcript[i].start < this.state.time && this.state.transcript[i].end > this.state.time){
        this.state.transcript[i].showing = true;

      }
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/vtt',{credential:'same-origin', method:'POST',body:JSON.stringify({path:this.props.name}),headers:{'Content-Type':'application/json','Accept':'application/json'}})
    .then(response=>response.json())
    .then(data=>{
      let temp = this.state.transcript;
      temp = data.info;
      this.setState({
        transcript: temp
      })
    })
    this.interval = setInterval(()=>this.tick(),1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.timer != this.props.timer){
      this.setState({
        time:nextProps.timer
      })
    }
  }

  render(){
    return(
      <div>
      <ul style={{overflow:'auto',height:'250px',width:'800px',position:'absolute',top:'500px'}}>
      {this.state.transcript.map((item,i)=>{
        if(item['showing'] === true){
          return <li onClick={(e)=>this.handleClick(i,e)} style={{fontWeight:'bold'}} ref={i}>{item['content']}</li>
        }else{
          return <li onClick={(e)=>this.handleClick(i,e)} ref={i}>{item['content']}</li>
        }
      })}
      </ul>
      </div>
    )
  }
}


export default Lecture;
