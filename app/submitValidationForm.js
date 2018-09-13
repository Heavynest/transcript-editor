import React from 'react'
import ContactForm from './simpleForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActionsFromOtherFile from './actions';

class ContactPage extends React.Component {
  constructor(){
    super();
    this.state = {id:"",status:"",setup:false};
    this.submit = this.submit.bind(this);
  }

   submit(values){
     let data = {'account':values.account, 'password':values.password};
     fetch('http://localhost:8000/api/user',{credential:'same-origin',method:'POST',body:JSON.stringify(data), headers:{'Content-Type':'application/json','Accept':'application/json'}})
     .then(response => response.json())
     .then((data)=>{this.setState({
       id: data.id,
       status:data.status
     })})
     .then(()=>{
       let temp = this.state.id;
       this.props.userInfoActions.update({
         account: temp,
         password: "hidden"
       })
     }
   )
  }

  render() {
    if(this.props.userinfo.account != 0){
      let address = 'classes';
      this.props.history.push(address);
    }
    return (
      <ContactForm onSubmit={this.submit} />
    )
  }
}

function mapStateToProps(state) {
    return {
      userinfo: state.userUpdate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactPage)
