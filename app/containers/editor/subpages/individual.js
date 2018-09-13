import React from 'react';
import AutosizeInput from 'react-input-autosize';

class Individual extends React.Component{
  constructor(props){
    super(props);
    this.state = {lists:[], userid:0,tid:0};
    this.state.userid = this.props.uid;
    this.state.tid = this.props.tid;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:8000/api/selfvtt', {credential:'same-origin',method:'POST',body:JSON.stringify({usage:'read',user_id:this.state.userid,trans_id:this.state.tid}), headers:{'Content-Type':'application/json','Accept':'application/json'} })
    .then(response=>response.json())
    .then(data=>{
      let temp = this.state.lists;
      temp = data.info;
      this.setState({
        lists: temp
      })
    })
  }

  handleChange(i,e){
    event.preventDefault();
    let temp = this.state.lists;
    temp[i].content = e.target.value;
    this.setState({
      lists:temp
    })

  }

  handleSubmit(){
    fetch('http://localhost:8000/api/selfvtt', {credential:'same-origin',method:'POST',body:JSON.stringify({usage:'write',user_id:this.state.userid,trans_id:this.state.tid,tran:this.state.lists}),headers:{'Content-Type':'application/json','Accept':'application/json'}})
    .then(response=>response.json())
    .then(data=>{()=>console.log(data)})
    console.log("hello world");
    window.location.reload();
  }

  render(){
    let rows = [];
    for(let i = 0; i < this.state.lists.length; ++i){
      rows.push(<AutosizeInput type="text" value={this.state.lists[i].content} onChange={(e)=>this.handleChange(i,e)}/>);
    }
    return(
      <div>
      <ul  style={{position:'absolute',top:'500px',left:'1000px',height:'250px',width:'800px',overflow:'auto'}}>
      {this.state.lists.map((item,i)=>{
        return <li><AutosizeInput style={{border:'0px'}} type="text" value={this.state.lists[i].content} onChange={(e)=>this.handleChange(i,e)}/></li>
      })}
      </ul>
      <button style={{position:'absolute',top:'480px',left:'1700px'}}onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

}

export default Individual;
