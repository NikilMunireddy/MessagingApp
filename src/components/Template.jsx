import React from 'react'
import MessageBox from './MessageBox'
import MessageList from './MessageList'
import ReactDOM from 'react-dom'

class Template extends React.Component{
    constructor(props) {
        super(props);
       this.state={
           group:'thismessenger'
       }
       this.GroupName=this.GroupName.bind(this)
    }
    GroupName(event){
        this.setState({group:event.target.value});
    }
    render(){
        //the group name
        let message="";
        return(
        <div>
            

            <div class="main">
                <div className="bgcolor">
                    <center><div className=" card card1 textcolor" >{message}</div></center>
                    <div className="control">
                        <MessageList db={this.props.db} user={this.props.email} group={this.state.group} />
                    </div>
                    <div className="card card1">
                        <MessageBox db={this.props.db} user={this.props.email} group={this.state.group}/>
                    </div>
                </div>
            </div>
        </div>
            
        );
    }
}
export default Template;
