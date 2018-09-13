import React from 'react';
import Item from './Item';

class ListItem extends React.Component{
  constructor(props){
    super(props);
    this.state ={lists:[],id:0,name:"",session:"", showing:false};
    this.state.id = this.props.id;
    this.state.name = this.props.name;
    this.state.session = this.props.session;
    this.click = this.click.bind(this);
    this.close = this.close.bind(this);

  }

  componentDidMount(props){
    fetch('http://localhost:8000/api/transcript',{credential:'same-origin',method:'POST', body:JSON.stringify({classid:this.state.id}), headers:{'Content-Type':'application/json','Accept':'application/json'}})
    .then(response=>response.json())
    .then(data=>{
      let temp = this.state.lists;
      temp = data.transcript_list;
      this.setState({
        lists: temp
      })
    })
    .then(()=>{console.log(this.state.lists)})
  }

  click(){
    console.log("clicked");
    this.setState({
      showing:true
    })
  }

  close(){
    this.setState({
      showing:false
    })
  }

  render(){
    const rows = [];
    for(let i = 0; i < this.state.lists.length; ++i){
      rows.push(<div><Item cid={this.props.cid} tid={this.state.lists[i]['tid']} time={this.state.lists[i]['date']} /></div>);
    }
    return(
      <div>
      <button onClick={this.click}>{this.props.name}</button>
      {this.state.showing? rows :null}
      <button onClick={this.close}>Close</button>
      </div>
    )
  }
}

export default ListItem;
