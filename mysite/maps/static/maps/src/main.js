import 'leaflet';
import { Grid, Image} from 'semantic-ui-react';
import {MaterialMultipleSelection} from './Components/Dropdown';
import {MinimumValueFilter} from './Components/Filter';
import {ButtonExampleIcon} from './Components/Button';
import React from 'react';
import  ReactDOM  from 'react-dom';
import { createStore, combineReducers } from 'redux';
import 'lodash';


var mymap;
var geojson;
var material;
var geoJsonTopology;
var mouselayer;
var minimumValue=0;
var maximumValue=0;


var maxValuesForFeedstocks = {
        Glass: 3000,
        'Paper & Card': 5000,
        Metal: 1500,
        Organic: 6000,
        Wood: 3000,
        WEEE: 1000,
        Batteries: 50,
        Tyres: 45,
        Soil: 300,
        Plasterboard: 300,
        Oil:70,
        'Other Material': 400,
        'Co-mingled': 10000,
        Textiles: 400,
        Furniture: 200,
        Composite: 100,
        Plastic: 1000,
        Rubble: 3000,
        Paint: 100,
}


const preferences = (state = {display: 'none', position: 'absolute', width: '100%'}, action) => {
        switch (action.type) {
                case 'preferencesButtonClicked':
                       // console.log(state);
                        return {display: 'block', position: 'absolute', width: '100%'}
                case 'doneButtonClicked':
                        return {display: 'none', position: 'absolute', width: '100%'}
                default: 
                        //console.log(state);
                        return state
        }
}

const feedstock = (
        state = {
        Glass: { display: 'none', width: '100%'},
        'Paper & Card': { display: 'none', width: '100%'},
        Metal: { display: 'none', width: '100%'},
        Organic: { display: 'none', width: '100%'},
        Wood: { display: 'none', width: '100%'},
        WEEE: { display: 'none', width: '100%'},
        Batteries: { display: 'none', width: '100%'},
        Tyres: { display: 'none', width: '100%'},
        Soil: { display: 'none', width: '100%'},
        Plasterboard: { display: 'none', width: '100%'},
        Oil:{ display: 'none', width: '100%'},
        'Other Material': { display: 'none', width: '100%'},
        'Co-mingled': { display: 'none', width: '100%'},
        Textiles: { display: 'none', width: '100%'},
        Furniture: { display: 'none', width: '100%'},
        Composite: { display: 'none', width: '100%'},
        Plastic: { display: 'none', width: '100%'},
        Rubble: { display: 'none', width: '100%'},
        Paint: { display: 'none', width: '100%'},
        donebutton: {display: 'none'},
        materialsSelected: ['None Selected' ],
        buttonDisabled: true,
        }, action) => {
        
        let a = {
        Glass: { display: 'none', width: '100%'},
        'Paper & Card': { display: 'none', width: '100%'},
        Metal: { display: 'none', width: '100%'},
        Organic: { display: 'none', width: '100%'},
        Wood: { display: 'none', width: '100%'},
        WEEE: { display: 'none', width: '100%'},
        Batteries: { display: 'none', width: '100%'},
        Tyres: { display: 'none', width: '100%'},
        Soil: { display: 'none', width: '100%'},
        Plasterboard: { display: 'none', width: '100%'},
        Oil:{ display: 'none', width: '100%'},
        'Other Material': { display: 'none', width: '100%'},
        'Co-mingled': { display: 'none', width: '100%'},
        Textiles: { display: 'none', width: '100%'},
        Furniture: { display: 'none', width: '100%'},
        Composite: { display: 'none', width: '100%'},
        Plastic: { display: 'none', width: '100%'},
        Rubble: { display: 'none', width: '100%'},
        Paint: { display: 'none', width: '100%'},
        donebutton: {display: 'none'},
        materialsSelected: ['None Selected' ],
        buttonDisabled: true,
        };
        
      //  console.log('Materials selected ');
       // console.log(state.materialsSelected);
        switch (action.type) {
                case 'changeInFeedstock':
                        
                        _.forEach(action.materials, function(value) {
                                a[value] = {display: 'block', width: '90%', marginTop: '20px'};
                        });
                        a.materialsSelected = action.materials;               
                        a.donebutton = {display: 'block'};
                        a.buttonDisabled = false;
                        
                        
                        return a;                        
                default:
                        return state
        }
}

const filterValues = ( 
        state = {
                Glass: 0,
                'Paper & Card': 0,
                Metal: 0,
                Organic: 0,
                Wood: 0,
                WEEE: 0,
                Batteries: 0,
                Tyres: 0,
                Soil: 0,
                Plasterboard: 0,
                Oil: 0,
                'Other Material': 0,
                'Co-mingled': 0,
                Textiles: 0,
                Furniture: 0,
                Composite: 0,
                Plastic: 0,
                Rubble: 0,
                Paint: 0,
}, action) => {
        //console.log(state);
        let a = state;
        switch (action.type) {
                case 'GlassMinimumValueChanged':
                        a['Glass'] = action.value;
                        return a;

                case 'Paper&CardMinimumValueChanged':
                        a['Paper & Card'] = action.value;
                        return a;

                case 'MetalMinimumValueChanged':
                        a['Metal'] = action.value;
                        return a;
        
                case 'OrganicMinimumValueChanged':
                        a['Organic'] = action.value;
                        return a;
                case 'WoodMinimumValueChanged':
                        a['Wood'] = action.value;
                        return a;
        
                case 'WEEEMinimumValueChanged':
                        a['WEEE'] = action.value;
                        return a;
        
                case 'BatteriesMinimumValueChanged':
                        a['Batteries'] = action.value;
                        return a;
        
                case 'TyresMinimumValueChanged':
                        a['Tyres'] = action.value;
                        return a;
        
                case 'SoilMinimumValueChanged':
                        a['Soil'] = action.value;
                        return a;
        
                case 'PlasterboardMinimumValueChanged':
                        a['Plasterboard'] = action.value;
                        return a;
        
                case 'OilMinimumValueChanged':
                        a['Oil'] = action.value;
                        return a;
        
                case 'OtherMaterialMinimumValueChanged':
                        a['Other Material'] = action.value;
                        return a;
        
                case 'Co-mingledMinimumValueChanged':
                        a['Co-mingled'] = action.value;
                        return a;
        
                case 'TextilesMinimumValueChanged':
                        a['Textiles'] = action.value;
                        return a;
                case 'FurnitureMinimumValueChanged':
                        a['Furniture'] = action.value;
                        return a;
                case 'CompositeMinimumValueChanged':
                        a['Composite'] = action.value;
                        return a;
        
                case 'PlasticMinimumValueChanged':
                        a['Plastic'] = action.value;
                        return a;
        
                case 'RubbleMinimumValueChanged':
                        a['Rubble'] = action.value;
                        return a;
        
                case 'PaintMinimumValueChanged':
                        a['Paint'] = action.value;
                        return a;

                default:
                        return a;
        }


}



var legendValues = {
        Glass: [0, 100, 1000, 5000],
        'Paper & Card': [0, 100, 1000, 10000],
        'Metal': [0, 100, 1000, 5000],
        Organic: [0, 1000, 10000, 25000],
        Wood: [0, 1000, 10000, 25000],
        WEEE: [0, 100, 1000, 5000],
        Batteries: [0, 50 ,100, 250],
        Tyres: [0, 50, 100, 250],
        Soil: [0, 100, 500, 1000],
        Plasterboard: [0, 100, 500, 1000],
        Oil: [0, 10, 25, 100],
        'Other Material': [0, 100, 500, 1000],
        Textiles: [0, 100, 500, 1000],
        'Co-mingled': [0, 1000, 10000, 25000],
        'Plastic': [0, 100, 500, 1000],
        Furniture: [0, 50, 100, 500],
        Composite: [0, 50, 100,500],
        Rubble: [0, 1000, 10000, 25000],
        Paint: [0, 10, 50, 100]
}



//let store = createStore(preferences);
//let store1 = createStore(feedstock);

let reducers = combineReducers({
        feedstock: feedstock,
        preferences: preferences,
        filterValues: filterValues,
});

//const store = createStore(reducers);
class Parent extends React.Component {
            
        constructor(props) {
                super(props);
                this.changeMaterialOption = this.changeMaterialOption.bind(this);
                this.changeMinimumValue = this.changeMinimumValue.bind(this)     
                this.state = { 
                        material: 'Select Material',
                        minimumValue: 0,
                        dropdownPreferences: {display: 'none', position: 'absolute', width: '100%'},
                        maxValue: 1000,
                };
                this.showPreferences = this.showPreferences.bind(this);
                
        }
        
        changeMaterialOption(changedMaterial) {
            
                this.setState ({
                    material: changedMaterial[0],
                    preferenceVisible: {display: 'block'},
                });
                console.log(changedMaterial[0]);
                material = changedMaterial[0];
                geojson.setStyle(style); 
        }

        changeStyle() {
               
        }

        changeMinimumValue(newMinimumValue) {
                this.setState ({
                    minimumValue: newMinimumValue,
                })
                minimumValue = newMinimumValue;
                geojson.setStyle(style);

        }

        showPreferences() {
                console.log('ad');
                this.setState ({
                        dropdownPreferences: {display: 'block', position: 'absolute', width: '100%', zIndex: '1', backgroundColor: '#f9f9f9'},
                })
        }



                render() {
                        
                  return (
                          <div style={{marginTop: '50px'}}>
                        <Grid>
                                
                                <Grid.Row>
                                        <Grid.Column width={3}>
   
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                                <div id='mapid'  style={{margin: 'auto', width: '90%', borderRadius: '15px'}}></div>
                                        </Grid.Column>
                                        <Grid.Column width={4} id='dashboard'>
	                                        <div>   
                                                        <div style={{width: '90%', display:'inline-block'}}>
	                                                <MaterialMultipleSelection store={this.props.store} changeMaterial={ this.changeMaterialOption}/>
	                                                 
                                                        </div>
                                                        <div style={{positon: 'relative', display:'inline-block', float:'right' }}>
                                                         <ButtonExampleIcon store={this.props.store} />      
                                                        </div>
                                                        <div style={this.props.store.getState().preferences}>
                                                                <MinimumValueFilter store={this.props.store} maxValue={this.state.maxValue}/>
                                                        </div>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        <p> Am I going to be hidden? </p>
                                                        
	                                        </div>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                        </Grid.Column>
                                </Grid.Row>
                                
                        </Grid>	
                        </div>    
                  )
                }  
}


const store=createStore(reducers);

ReactDOM.render(<Parent store={store} />, document.getElementById('app'));

//ReactDOM.render(<Parent />, document.getElementById('app'));



mymap = L.map('mapid').setView([54.36,-2.4],6 );
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
{
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoibWF0aGV3cGsxMyIsImEiOiJjajR6YXBsZ3EwZTM2MndtZDFtcHN4ajBmIn0.3qQyNjJTtkkXr_pqLRp37g'
}).addTo(mymap);

fetch('/maps/EnglandYearly/').then(function(response) {
        response.json().then(function(response1) {
                geoJsonTopology = topojson.feature(response1, response1.objects.MapYearly);                  
                geojson =  L.geoJson(geoJsonTopology, {onEachFeature:onEachFeature}).addTo(mymap);
                   
        });
}); 

function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
            }

            info.update(layer.feature.properties);
}

function resetHighlight(e) {
        console.log(e.target);
        console.log(geojson);
        geojson.resetStyle(e.target);
        geojson.setStyle(style);
        info.update();    
}

function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
}


function getColor(d, thresholdValues, minimumValue = 0) {
        


        return  (d > thresholdValues[3] && d > minimumValue) ? '#006837' :
                (d > thresholdValues[2] && d > minimumValue) ? '#31a354' :
                (d > thresholdValues[1] && d > minimumValue) ? '#78c679' :
                (d > thresholdValues[0] && d > minimumValue)? '#c2e699' :
                '#ffffcc';
}

function getColorFilter(d, a) {
         
      
        
        if ( d['Glass']>=a['Glass'] 
             && d['Paper & Card']>=a['Paper & Card']
             && d['Metal']>=a['Metal']
             && d['Organic']>=a['Organic']
             && d['Wood']>=a['Wood']
             && d['WEEE']>=a['WEEE']
             && d['Batteries']>=a['Batteries']
             && d['Tyres']>=a['Tyres']
             && d['Soil']>=a['Soil']
             && d['Plasterboard']>=a['Plasterboard']
             && d['Oil']>=a['Oil']
             && d['Other Materials']>=a['Other Material']
             && d['Co-mingled']>=a['Co-mingled']
             && d['Textiles']>=a['Textiles']
             && d['Furniture']>=a['Furniture']
             && d['Composite']>=a['Composite']
             && d['Plastic']>=a['Plastic']
             && d['Rubble']>=a['Rubble']
             && d['Paint']>=a['Paint'] ) {
                return '#1b9e77'
             }
        else {
                return '#7570b3';
        }
             
}

function style(feature) {
        
        //make two functions, one for single selected value, one for multiple values
       
        let a = store.getState()
        let { materialsSelected }= a.feedstock;
        var b = feature.properties;
        if (materialsSelected.length == 1) {
                
                return {
                        fill: true,
                        fillColor:  getColor(b[materialsSelected[0]], legendValues[materialsSelected[0]], a.filterValues[materialsSelected[0]]),
                        weight: 0.75,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                }        
        }

        else if (materialsSelected.length > 1) {
                return{
                        fill: true,
                        fillColor: getColorFilter(b, a.filterValues),
                        weight: 0.75,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7

                }
        }

        else {
                return {
                        fill: false,
                        weight: 0.75,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                }
        }

}



var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info infowidth'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    let state = store.getState().feedstock.materialsSelected;
    let inhtml = '';
   // console.log(props);
    if (props) {
            inhtml += '<h5>' + props['Name'] + '</h5>'; 
            _.forEach(state, function(value) {
                inhtml +=  value + " " + props[value] + ' tonnes/year' + '<br>';
            }
            )
    }
    else {
            inhtml = 'Hover over a district';
    }
    this._div.innerHTML = inhtml;
}




info.addTo(mymap);





var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

   

    this.div = L.DomUtil.create('div', 'info legend legendwidth');
   /*     grades = legendValues[state[0]],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;*/
   this.update();
  // this.div.innerHTML = 'Select Feedstock';
   return this.div;
};

legend.update = function (props) {

        let state;
 
        if (props) {
    // loop through our density intervals and generate a label with a colored square for each interval
                state = store.getState().feedstock.materialsSelected;
                console.log(state.length)
                if (state.length == 1) {
                        
                        let grades = legendValues[state[0]];
                        this.div.innerHTML = '<i style="background:' + '#ffffcc' + '"></i>' + state[0] + ' Not collected' +'<br>';
                        
                
                        for (var i = 0; i < grades.length; i++) {
                                this.div.innerHTML +=
                                '<i class="legendIcon" style="background:' + getColor(grades[i] + 1, grades) + '"></i> ' +
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                        }
                        console.log('Legend update entered');
                //     return this.div;
                }
                else if (state.length > 1) {
                        this.div.innerHTML = '<i style="background:#1b9e77"></i>' + 'Meets criteria' + '<br>' + '<i style="background:#7570b3"></i>' + 'Does not meet criteria'; 
                }
                else {
                       
                        this.div.innerHTML = 'Select Feedstock';
                }

        }
        else {
                console.log('Legend added');
             
                this.div.innerHTML = 'Select Feedstock';
        }

}



legend.addTo(mymap);


const render= () => {
        ReactDOM.render(<Parent store={store} />, document.getElementById('app'));
        geojson.setStyle(style);
        legend.update('Test');
   

}
//render();
store.subscribe(render);
