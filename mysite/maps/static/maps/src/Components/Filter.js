import React from 'react';
import  ReactDOM  from 'react-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import 'lodash';
import { Segment, Divider } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'



export class MinimumValueFilter extends React.Component {
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
                this.state = {
                        materials: {none: 0},
                        'Total Local Authority Collected Waste': 0,
                        'Local Authority Collected Waste - Not Sent for Recycling': 0,
                        'Household – Total Waste': 0,
                        'Household - Waste not Sent for Recycling': 0,
                        'Non-household – Total Waste': 0,
                        'Non-household – Waste not Sent for Recycling': 0,
                        'Hazardous landfill' :0,
                        'Non-hazardous landfill': 0,
                        'Inert landfill': 0,
                        'Incineration with energy recovery': 0,
                        'Incineration without energy recovery': 0,
                        value: 0,

                };
        }



        handleChange(val){
              this.props.store.dispatch({ type: 'doneButtonClicked' });
        }

        filters() {

        }

        render() {
                  const props = this.props;
                  const {store} = props;
                  let state = store.getState();
                  let optionState = state.wasteInformationOptions;
                return (
                       <div style = {optionState['donebutton']} >
                               <Segment>
                                <div style={{width: '90%'}}>
                                <div style={optionState['Total Local Authority Collected Waste']}>
                                        <h5 style={{marginBottom: '25px'}}>Total Local Authority Collected Waste</h5>

                                        <InputRange formatLabel= {val => val + ' tonnes/year'} maxValue={1200000} minValue={0} value={this.state['Total Local Authority Collected Waste']} onChange={value => this.setState({ 'Total Local Authority Collected Waste': value })} onChangeComplete={value => store.dispatch({ type:'Total Local Authority Collected Waste MinimumValueChanged', value: value })}/>
                                        <Divider hidden/>

                                </div>

                                <div style={optionState['Local Authority Collected Waste - Not Sent for Recycling']}>
                                        <h5 style={{marginBottom: '25px'}}>Local Authority Collected Waste - Not Sent for Recycling</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={700000} minValue={0} value={this.state['Local Authority Collected Waste - Not Sent for Recycling']} onChange={value => this.setState({ 'Local Authority Collected Waste - Not Sent for Recycling': value })} onChangeComplete={value => store.dispatch({ type:'Local Authority Collected Waste - Not Sent for RecyclingMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={optionState['Household – Total Waste']}>
                                        <h5 style={{marginBottom: '25px'}}>Household – Total Waste</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={1100000} minValue={0} value={this.state['Household – Total Waste']} onChange={value => this.setState({ 'Household – Total Waste': value })} onChangeComplete={value => store.dispatch({ type:'Household – Total WasteMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={optionState['Household - Waste not Sent for Recycling']}>
                                        <h5 style={{marginBottom: '25px'}}>Household - Waste not Sent for Recycling</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={600000} minValue={0} value={this.state['Household - Waste not Sent for Recycling']} onChange={value => this.setState({ 'Household - Waste not Sent for Recycling': value })} onChangeComplete={value => store.dispatch({ type:'Household - Waste not Sent for RecyclingMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={optionState['Non-household – Total Waste']}>
                                        <h5 style={{marginBottom: '25px'}}>Non-household – Total Waste</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={140000} minValue={0} value={this.state['Non-household – Total Waste']} onChange={value => this.setState({ 'Non-household – Total Waste': value })} onChangeComplete={value => store.dispatch({ type:'Non-household – Total WasteMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={optionState['Non-household – Waste not Sent for Recycling']}>
                                        <h5 style={{marginBottom: '25px'}}>Non-household – Waste not Sent for Recycling</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={120000} minValue={0} value={this.state['Non-household – Waste not Sent for Recycling']} onChange={value => this.setState({ 'Non-household – Waste not Sent for Recycling': value })} onChangeComplete={value => store.dispatch({ type:'Non-household – Waste not Sent for RecyclingMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={optionState['Hazardous landfill']}>
                                        <h5 style={{marginBottom: '25px'}}>Hazardous landfill</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={8500} minValue={0} value={this.state['Hazardous landfill']} onChange={value => this.setState({ 'Hazardous landfill': value })} onChangeComplete={value => store.dispatch({ type:'Hazardous landfill', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={optionState['Non-hazardous landfill']}>
                                        <h5 style={{marginBottom: '25px'}}>Non-hazardous landfill</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={300000} minValue={0} value={this.state['Non-hazardous landfill']} onChange={value => this.setState({ 'Non-hazardous landfill': value })} onChangeComplete={value => store.dispatch({ type:'Non-hazardous landfill', value: value })}/>
                                        <Divider hidden/>
                                </div>
                                
                                <div style={optionState['Inert landfill']}>
                                        <h5 style={{marginBottom: '25px'}}>Inert landfill</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={500000} minValue={0} value={this.state['Inert landfill']} onChange={value => this.setState({ 'Inert landfill': value })} onChangeComplete={value => store.dispatch({ type:'Inert landfill', value: value })}/>
                                        <Divider hidden/>
                                </div>
                               

                                <div style={optionState['Incineration with energy recovery']}>
                                        <h5 style={{marginBottom: '25px'}}>Incineration with energy recovery</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={500000} minValue={0} value={this.state['Incineration with energy recovery']} onChange={value => this.setState({ 'Incineration with energy recovery': value })} onChangeComplete={value => store.dispatch({ type:'Incineration with energy recovery', value: value })}/>
                                        <Divider hidden/>
                                </div>
                               
                                <div style={optionState['Incineration without energy recovery']}>
                                        <h5 style={{marginBottom: '25px'}}>Incineration without energy recovery</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={650000} minValue={0} value={this.state['Incineration without energy recovery']} onChange={value => this.setState({ 'Incineration without energy recovery': value })} onChangeComplete={value => store.dispatch({ type:'Incineration without energy recovery', value: value })}/>
                                        <Divider hidden/>
                                </div>
                               
                                </div>

                                <div>
                                <Button floated='right' primary onClick = {this.handleChange}>Done</Button>
                                <Divider hidden/>
                                 <Divider hidden/>
                                 <Divider hidden/>
                                </div>
                                </Segment>

                        </div>
                )
}
}