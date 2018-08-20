import React, {Component} from 'react';
import Message from './Message';
import './Messagebox.css'


import _ from 'lodash';

class MessageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      name:'',
      userName:'',
      groupName:'',
      try:''
    };
    let group=this.props.group
    let app = this.props.db.database().ref(group);
    app.on('value', snapshot => {

      this.getData(snapshot.val());
    });
  }
  method(values){

  }
  
  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }
  

  render() {
   let mailid=this.props.user;
   console.log('mailid',mailid)

    let messageNodes = this.state.messages.map((message) => {
      let emailid=message.message.split("++??*:;:;*??++")[0]
      console.log(emailid);
      let mess=message.message.split("++??*:;:;*??++")[1]
      
        if(emailid!==this.props.user){
          return (
                    <div className="field">
                    
                        <div class="triangle-isosceles left ">
                   <a> <Message message = {message.message.split("++??*:;:;*??++")[0]} /></a>
                     <Message message = {message.message.split("++??*:;:;*??++")[1]} />
                        </div>
                        
                       
                    </div>
          )
        }
        else{
          return (
                    <div className="field">
                        <div class="triangle-isosceles right"> 
                     <Message message = {message.message.split("++??*:;:;*??++")[1]} />
                        </div>
                    </div>
          )
        }
    });
    return (
      <div >
        <div>
          <div >
        {messageNodes}
        </div>
        </div>  
      </div>
    );
  }
}

export default MessageList

     