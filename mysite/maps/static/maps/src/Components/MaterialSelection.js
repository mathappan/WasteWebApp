import React from 'react';
import  ReactDOM  from 'react-dom';
import { Dropdown } from 'semantic-ui-react';


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


export class MaterialMultipleSelection extends React.Component {
  
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e, data){
                this.props.store.dispatch({ type: 'changeInFeedstock', materials: data.value });
        }

        render () {
                return (
                      <Dropdown onChange={this.handleChange} placeholder='Feedstock' multiple selection options={options} pointing style={{display: 'inline-block', width: '95%'}} />
                )
        }
}
