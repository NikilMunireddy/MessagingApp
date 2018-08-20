import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../App.css'

import Template from './Template'
import firebase from 'firebase';


class App extends Component {

constructor(props){
  super(props);
  
  var config = {
    apiKey: "AIzaSyCDllKEFPWA5RxgnDY6iL8oT_wqzdfqeVE",
    authDomain: "auth-9cc6f.firebaseapp.com",
    databaseURL: "https://auth-9cc6f.firebaseio.com",
    projectId: "auth-9cc6f",
    storageBucket: "auth-9cc6f.appspot.com",
    messagingSenderId: "599904133990"
  };
  this.state={
    valid:'',
    emailid:'-',
    password:'',
    confirm:'',
    confirmEmail:''
  }
  this.SignIn=this.SignIn.bind(this);
  this.Signup=this.Signup.bind(this);
  this.setVal=this.setVal.bind(this);
  this.emailChange=this.emailChange.bind(this);
  this.ResetPassword=this.ResetPassword.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.handleChangeName=this.handleChangeName.bind(this);
  this.handleChangePasswd=this.handleChangePasswd.bind(this);
  firebase.initializeApp(config);
  
}
emailChange(event){
  this.setState({confirm:event.target.value})
  }
  handleSubmit(event){
    this.setState({confirmEmail:this.state.confirm})
  }
Signup(){
  let emil=this.state.emailid;
  let pass=this.state.password;
  if(emil!==''&&pass!==''){
  firebase.auth().createUserWithEmailAndPassword(this.state.emailid, this.state.password).catch(function(error) {

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    
    const begin= <div>
                    <Template db={firebase} email={this.state.emailid}/>
                </div>
    ReactDOM.render(begin,document.getElementById('root'))
  });
}
else{
  console.log('no tok')
}

}

SignIn(){
  let emil=this.state.emailid;
  let pass=this.state.password;
  if(emil!==''&&pass!=='' && emil!="@gmail.com" && emil.length<30){
  
  firebase.auth().signInWithEmailAndPassword(this.state.emailid, this.state.password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    ReactDOM.render('Error in signin',document.getElementById('root'));
  });
  
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = user.email;
      
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log('email,isAnonymous,uid,providerData:',email,isAnonymous,uid,providerData);
      
      const begin= <div>
  
      <div className="control">
      <Template db={firebase} email={email}/>
    </div>
  </div>
      console.log(email)

      if(email!==null && isAnonymous===false ){
        console.log('ok')
        console.log(isAnonymous);

        ReactDOM.render(begin,document.getElementById('root'))
      }
    } else {
     console.log('could not signin/signup')
    }
  }); 
}
}


ResetPassword(){
  var auth = firebase.auth();

const cred=<div>
  {this.state.confirm}
 
  </div>
ReactDOM.render(cred,document.getElementById('root'));

auth.sendPasswordResetEmail(this.state.confirm).then(function() {
  ReactDOM.render(<h1>Please check your mail box</h1>,document.getElementById('root'))
}).catch(function(error) {
 console.log(error)
});
}
setVal(email){
this.setState({valid:email})
}

handleChangeName(e){
  this.setState({emailid:e.target.value})
}
handleChangePasswd(e){
  this.setState({password:e.target.value})
}

  render() {
    
      return (

        <div className="main-card">

<div class="card">
<center>

<div class="card-content login">
  
<center>

<p class="title">
      this.Messenger
      
  </p>
 
 
</center>
  <div class="field">
      
      <div class="control">
      <label class="label">Email</label>
      <input className="input is-danger is-rounded" type="email" value={this.state.value} onChange={this.handleChangeName} placeholder="Email"/>

      </div>
  </div>
  <div class="field">
    
      <div class="control">
      <label class="label">Password</label>
      <input className="input is-danger is-rounded" type="password" value={this.state.value} onChange={this.handleChangePasswd} placeholder="Passsword"/><br/>
      </div>
  </div>
 
  <h6 class="subtitle is-6 has-text-centered"></h6>
  <div class="has-text-centered">
  <input className="button is-danger is-rounded" type="submit" value="SignIn" onClick={this.SignIn}/>
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
  <input className="button is-danger is-rounded" type="submit" value="SignUp" onClick={this.Signup}/> &nbsp;
  <div class="field">
  <h6 class="subtitle is-6 has-text-centered"></h6>
      <label class="label">Forgot password</label>
      <div class="control">
      <div class="card-content">
      
      <input className="input is-danger is-rounded"  type="email" value={this.state.value} onChange={this.emailChange}  placeholder="Enter email id to which reset link to be sent"/>
      <h6 class="subtitle is-6 has-text-centered"></h6>
        <center>
            <input className="button is-danger is-rounded " type="submit" value="Confirm" onClick={this.ResetPassword}/>
       </center>

     </div>
      </div>
  </div>
  </div>
</div>
</center>
<footer class="card-footer">

</footer>
</div>

</div>

);
   
  }
  
}
export default App;
