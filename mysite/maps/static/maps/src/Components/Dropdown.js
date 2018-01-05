import React from 'react';
import  ReactDOM  from 'react-dom';
import { Dropdown, Divider } from 'semantic-ui-react';


const options = [
        {key: 'Total Local Authority Collected Waste', text:'Total Local Authority Collected Waste', value: 'Total Local Authority Collected Waste'},
        {key: 'Local Authority Collected Waste - Not Sent for Recycling', text: 'Local Authority Collected Waste - Not Sent for Recycling', value: 'Local Authority Collected Waste - Not Sent for Recycling'},
        {key: 'Household – Total Waste', text: 'Household – Total Waste', value: 'Household – Total Waste'},
        {key: 'Household - Waste not Sent for Recycling', text:'Household - Waste not Sent for Recycling', value:'Household - Waste not Sent for Recycling'},
        {key: 'Non-household – Total Waste', text: 'Non-household – Total Waste', value: 'Non-household – Total Waste'},
        {key: 'Non-household – Waste not Sent for Recycling', text: 'Non-household – Waste not Sent for Recycling', value: 'Non-household – Waste not Sent for Recycling'},
        {key: 'Hazardous landfill', text: 'Hazardous landfill', value: 'Hazardous landfill'},
        {key: 'Non-hazardous landfill', text:'Non-hazardous landfill', value:'Non-hazardous landfill'},
        {key: 'Inert landfill', text: 'Inert landfill', value:'Inert landfill'},
        {key: 'Incineration with energy recovery', text: 'Incineration with energy recovery', value:'Incineration with energy recovery'},
        {key: 'Incineration without energy recovery', text: 'Incineration without energy recovery', value: 'Incineration without energy recovery'},
]


export class WasteInformationOptionsSelection extends React.Component {
  
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e, data){
                this.props.store.dispatch({ type: 'changeInOptions', selectedOption: data.value }); 
                // store is passed down to child as a prop
        }

        render () {
                return (
                      <Dropdown onChange={this.handleChange} placeholder='Waste Information Options' selection options={options} pointing style={{display: 'inline-block', width: '95%'}} />
                )
        }
}



