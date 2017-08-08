import React from 'react';
import  ReactDOM  from 'react-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'; 



export class MinimumValueFilter extends React.Component {
  constructor(props) {
    super(props);
   this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 0,
    };
  }
  
  handleChange(val){
	//this.setState ({
	  //  value = this.props.value;
//	)}
	console.log(val);
	//this.props.changeMaterial(this.props.value);
  }
  
  render() {
    return (
      <div style={{marginTop: '20px'}} >
      <InputRange
        maxValue={this.props.maxValue}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} 
	onChangeComplete={this.handleChange}/>  
</div>
    );
  }
}


