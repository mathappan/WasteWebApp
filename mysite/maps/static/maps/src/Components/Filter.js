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
                        'Glass': 0,
                        'PaperCard': 0,
                        Metal: 0,
                        Organic: 0,
                        Wood: 0,
                        WEEE: 0,
                        Batteries: 0,
                        Tyres: 0,
                        Soil: 0,
                        Plasterboard: 0,
                        Oil: 0,
                        'OtherMaterial': 0,
                        'Comingled': 0,
                        Textiles: 0,
                        Furniture: 0,
                        Composite: 0,
                        Plastic: 0,
                        Rubble: 0,
                        Paint: 0,
                        value: 0,

                };
        }



        handleChange(val){
              this.props.store.dispatch({ type: 'doneButtonClicked' });

        //this.props.changeMaterial(this.props.value);
        }

        filters() {

        }

        render() {
                  const props = this.props;
                  const {store} = props;
                  let state = store.getState();
                  let materials = state.feedstock;

               /*return (
                        <div style={{marginTop: '20px'}} >
                        <div >
                                <InputRange maxValue={this.props.maxValue} minValue={0} value={this.state.value} onChange={value => this.setState({ value })} onChangeComplete={this.handleChange}/>
                        </div>
                        </div>
                )
        }*/

                return (
                       <div style = {materials['donebutton']} >
                               <Segment>
                                <div style={{width: '90%'}}>
                                <div style={materials['Glass']}>
                                        <h5 style={{marginBottom: '25px'}}>Glass</h5>

                                        <InputRange formatLabel= {val => val + ' tonnes/year'} maxValue={13200} minValue={0} value={this.state.Glass} onChange={value => this.setState({ Glass: value })} onChangeComplete={value => store.dispatch({ type:'GlassMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>

                                </div>

                                <div style={materials['Paper & Card']}>
                                        <h5 style={{marginBottom: '25px'}}>Paper & Card</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={30000} minValue={0} value={this.state.PaperCard} onChange={value => this.setState({ PaperCard: value })} onChangeComplete={value => store.dispatch({ type:'Paper&CardMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Metal']}>
                                        <h5 style={{marginBottom: '25px'}}>Metal</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={14000} minValue={0} value={this.state.Metal} onChange={value => this.setState({ Metal: value })} onChangeComplete={value => store.dispatch({ type:'MetalMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Organic']}>
                                        <h5 style={{marginBottom: '25px'}}> Organic</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={55000} minValue={0} value={this.state.Organic} onChange={value => this.setState({ Organic: value })} onChangeComplete={value => store.dispatch({ type:'OrganicMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Wood']}>
                                        <h5 style={{marginBottom: '25px'}}>Wood</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={31000} minValue={0} value={this.state.Wood} onChange={value => this.setState({ Wood: value })} onChangeComplete={value => store.dispatch({ type:'WoodMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['WEEE']}>
                                        <h5 style={{marginBottom: '25px'}}>WEEE</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={12000} minValue={0} value={this.state.WEEE} onChange={value => this.setState({ WEEE: value })} onChangeComplete={value => store.dispatch({ type:'WEEEMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Batteries']}>
                                        <h5 style={{marginBottom: '25px'}}>Batteries</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={500} minValue={0} value={this.state.Batteries} onChange={value => this.setState({ Batteries: value })} onChangeComplete={value => store.dispatch({ type:'BatteriesMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Tyres']}>
                                        <h5 style={{marginBottom: '25px'}}>Tyres</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={650} minValue={0} value={this.state.Tyres} onChange={value => this.setState({ Tyres: value })} onChangeComplete={value => store.dispatch({ type:'TyresMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Soil']}>
                                        <h5 style={{marginBottom: '25px'}}>Soil</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={10000} minValue={0} value={this.state.Soil} onChange={value => this.setState({ Soil: value })} onChangeComplete={value => store.dispatch({ type:'SoilMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Plasterboard']}>
                                        <h5 style={{marginBottom: '25px'}}>Plasterboard</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={2600} minValue={0} value={this.state.Plasterboard} onChange={value => this.setState({ Plasterboard: value })} onChangeComplete={value => store.dispatch({ type:'PlasterboardMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Oil']}>
                                        <h5 style={{marginBottom: '25px'}}>Oil</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={250} minValue={0} value={this.state.Oil} onChange={value => this.setState({ Oil: value })} onChangeComplete={value => store.dispatch({ type:'OilMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Other Materials']}>
                                        <h5 style={{marginBottom: '25px'}}>Other Materials</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={6000} minValue={0} value={this.state.OtherMaterial} onChange={value => this.setState({ OtherMaterial: value })} onChangeComplete={value => store.dispatch({ type:'OtherMaterialMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Co-mingled']}>
                                        <h5 style={{marginBottom: '25px'}}>Co-mingled</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={40000} minValue={0} value={this.state.Comingled} onChange={value => this.setState({ Comingled: value })} onChangeComplete={value => store.dispatch({ type:'Co-mingledMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Textiles']}>
                                        <h5 style={{marginBottom: '25px'}}>Textiles</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={5500} minValue={0} value={this.state.Textiles} onChange={value => this.setState({ Textiles: value })} onChangeComplete={value => store.dispatch({ type:'TextilesMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Furniture']}>
                                        <h5 style={{marginBottom: '25px'}}>Furniture</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={1250} minValue={0} value={this.state.Furniture} onChange={value => this.setState({ Furniture: value })} onChangeComplete={value => store.dispatch({ type:'FurnitureMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Composite']}>
                                        <h5 style={{marginBottom: '25px'}}>Composite</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={2200} minValue={0} value={this.state.Composite} onChange={value => this.setState({ Composite: value })} onChangeComplete={value => store.dispatch({ type:'CompositeMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Plastic']}>
                                        <h5 style={{marginBottom: '25px'}}>Plastic</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={4200} minValue={0} value={this.state.Plastic} onChange={value => this.setState({ Plastic: value })} onChangeComplete={value => store.dispatch({ type:'PlasticMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Rubble']}>
                                        <h5 style={{marginBottom: '25px'}}>Rubble</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={50000} minValue={0} value={this.state.Rubble} onChange={value => this.setState({ Rubble: value })} onChangeComplete={value => store.dispatch({ type:'RubbleMinimumValueChanged', value: value })}/>
                                        <Divider hidden/>
                                </div>

                                <div style={materials['Paint']}>
                                        <h5 style={{marginBottom: '25px'}}>Paint</h5>
                                        <InputRange formatLabel= {value =>value + ' tonnes/year'} maxValue={600} minValue={0} value={this.state.Paint} onChange={value => this.setState({ Paint: value })} onChangeComplete={value => store.dispatch({ type:'PaintMinimumValueChanged', value: value })}/>
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