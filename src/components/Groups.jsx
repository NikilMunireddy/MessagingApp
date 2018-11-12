import React from 'react';

class Groups extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            groups:['b1','KSIT','7B','Placement','CODE'],
            value:''
        }
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(event){
        this.setState({value:event.target.value});
    }
    
render(){
    for(var j=0;j<this.state.groups.length;j++){
        return(
            <div>
               <p onClick={this.handleClick} value={this.state.groups[j]}> {this.state.groups[j]}</p>
            </div>
        );
    }
}
}
export default Groups;