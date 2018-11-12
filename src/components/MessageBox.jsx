import React, {Component} from 'react';
import trim from 'trim';
import './Messagebox.css';

var Sentiment = require('sentiment');
var sentiment = new Sentiment();
class MessageBox extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.setName=this.setName.bind(this);
    this.Outbox=this.Outbox.bind(this);

    this.state = {
      message: '',
      name1:'',
      userName:'',
      topic:'',
      outbox:'',
      outmessage:''
    };
  }
  onChange(e){
   
      this.setState({
        message: e.target.value
      });
  }
  handleChange(event){
    this.setState({name1:this.props.user})
  }

  setName(event){
    this.setState({userName:this.state.name1})
  }
  Outbox(event){
    this.setState({name1:this.props.user})
    this.setState({outmessage:event.target.value})
  }
   
  onKeyup(e){
    
    if(trim(this.state.outmessage) !== ''){
      e.preventDefault();
      // ie /thismessenger
      let dbCon = this.props.db.database().ref('/'+this.props.group);
      var date=new Date();
      var Timestamp="🕐 "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" 🗓"+date.toJSON().slice(0,10)
      var result = sentiment.analyze(this.state.outmessage);
        dbCon.push({
          message: this.state.name1+"++??*:;:;*??++"+trim(this.state.outmessage)+"++??*:;:;*??++"+Timestamp+"++??*:;:;*??++"+result.score+"++??*:;:;*??++"+result.comparative
        });
        this.setState({outmessage:''})
        document.getElementById('message').value=''
      
      this.setState({
        message: ''
      });
    }
    else{
      console.log('no click')
    }
  }
  
  render() {
    return (
      <form >
        <div> 
          <div className="fix">
            
              <input className="input is-primary is-rounded w" type="text" placeholder="Write a message" id="message" value={this.state.value} onChange={this.Outbox}/>
              <input className="button is-primary is-rounded size" type="submit" value="send" onClick={this.onKeyup}/>
           
          </div>
        </div>
      </form>
    )
  }
}

export default MessageBox
