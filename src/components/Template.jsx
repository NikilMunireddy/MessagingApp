import React from 'react'
import MessageBox from './MessageBox'
import MessageList from './MessageList'
import ReactDOM from 'react-dom'

class Template extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            group:'',
            groupname:''
        }
        this.List=this.List.bind(this);
       this.Group=this.Group.bind(this);
    }
    Group(event){
        this.setState({group:event.target.value});
    }
    List(){
       this.setState({groupname:this.state.group})
    }
    render(){
        //the group name
        let message="";
        return(
            <div className="bgcolor">
                <center><div className=" card card1 textcolor" >{message}            </div></center>
            <div className="control">
                <MessageList db={this.props.db} user={this.props.email} group={"thismessenger"} />
            </div>
            <div className="card card1">
                <MessageBox db={this.props.db} user={this.props.email} group={"thismessenger"}/>
          </div>
        </div>
        );
    }
}
export default Template;
