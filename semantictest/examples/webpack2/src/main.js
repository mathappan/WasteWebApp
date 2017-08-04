import React from 'react';
import  ReactDOM  from 'react-dom';
import { Dropdown } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'; 
import { Grid, Image} from 'semantic-ui-react'


const options = [
        { key: 'Batteries', text: 'Batteries', value: 'Batteries' },
        { key: 'Co-mingled', text: 'Co-mingled', value: 'Co-mingled' },
        { key: 'Composite', text: 'Composite', value: 'Composite' },
        { key: 'Furniture', text: 'Furniture', value: 'Furniture' },
        { key: 'Glass', text: 'Glass', value: 'Glass' },
        { key: 'Metal', text: 'Metal', value: 'Metal' },
        { key: 'Oil', text: 'Oil', value: 'Oil' },
        { key: 'Organic', text: 'Organic', value: 'Organic' },
        { key: 'Other Materials', text: 'Other Materials', value: 'Other Materials' },
        { key: 'Paint', text: 'Paint', value: 'Paint' },
        { key: 'Paper & Card', text: 'Paper & Card', value: 'Paper & Card' },
        { key: 'Plasterboard', text: 'Plasterboard', value: 'Plasterboard' },
        { key: 'Plastic', text: 'Plastic', value: 'Plastic' },
        { key: 'Rubble', text: 'Rubble', value: 'Rubble' },
        { key: 'Soil', text: 'Soil', value: 'Soil' },
        { key: 'Textiles', text: 'Textiles', value: 'Textiles' },
        { key: 'Tyres', text: 'Tyres', value: 'Tyres' },
        { key: 'WEEE', text: 'WEEE', value: 'WEEE' },
        { key: 'Wood', text: 'Wood', value: 'Wood'},
]


class DropdownExampleMultipleSelection extends React.Component {
  
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e,data){
                console.log(data.value);
        }

        render () {
                return (
                      <Dropdown onChange={this.handleChange} placeholder='Skills' fluid multiple selection options={options} />
                )
        }
}



class MinimumValueFilter extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: { min: 2, max: 10 },
    };
  }
 
  render() {
    return (
      <div style={{marginTop: '20px'}} >
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
      </div>
    );
  }
}




class Parent extends React.Component {
            
                render() {
                  return (
                    
	<Grid>
    <Grid.Row>
    <Grid.Column width={2}>
      console.log(this.props.)
    </Grid.Column>
    <Grid.Column width={8}>
      <div id='mapid' ></div>
    </Grid.Column>
    <Grid.Column width={4}>
	    <div>
	      <DropdownExampleMultipleSelection />

	    </div>
    </Grid.Column>
    <Grid.Column width={2}>
      
    </Grid.Column>
    </Grid.Row>
  </Grid>	    
                  )
                }  
}
ReactDOM.render(<Parent />, document.getElementById('root'));

