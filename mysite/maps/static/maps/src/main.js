import 'leaflet';
import { Grid, Image, Segment, Button, Popup, Dimmer} from 'semantic-ui-react';
import {WasteInformationOptionsSelection} from './Components/Dropdown';
import {MinimumValueFilter} from './Components/Filter';
import {ButtonExampleIcon} from './Components/Button';
import React from 'react';
import  ReactDOM  from 'react-dom';
import { createStore, combineReducers } from 'redux';
import 'lodash';
import * as d3 from "d3";
import { legendColor } from 'd3-svg-legend';     
import {SegmentBarchartContainer1} from './Components/TopTwobarchartsContainer';
//import {SegmentBarchartContainer2} from './Components/LineChartBarChart';
import {MaterialMultipleSelection} from './Components/MaterialSelection';   
import {Table} from './Components/table';
import 'react-table/react-table.css';

var mymap;
var material;

var geojson;

var geojson1;
var geojsonlayer1;
var geojsonTopology1;

var geojson2;
var geojsonlayer2;
var geojsonTopology2;

var mouselayer;
var minimumValue=0;
var maximumValue=0;
var Q1, Q2, Q3, Q4, preAprilQ1, preAprilQ2, preAprilQ3, preAprilQ4;
var Q1r, Q2r, Q3r, Q4r, fullYearr; //these variables store the reprocessing data

var operators_data;

/*
var maxValuesForOptions = {
        'Total Local Authority Collected Waste': 1200000,
        'Household – Total Waste': 1100000,
        'Household - Waste not Sent for Recycling': 600000,
        'Non-household – Total Waste': 140000,
        'Non-household – Waste not Sent for Recycling': 120000,
        'Local Authority Collected Waste - Not Sent for Recycling': 700000 
}
*/


var optionsforMap1 = ['Total Local Authority Collected Waste', 'Household – Total Waste', 'Household - Waste not Sent for Recycling',
'Non-household – Total Waste', 'Non-household – Waste not Sent for Recycling', 'Local Authority Collected Waste - Not Sent for Recycling'];
var optionsforMap2 = ['Hazardous landfill', 'Non-hazardous landfill', 'Inert landfill', 'Incineration with energy recovery', 'Incineration without energy recovery'];


// for toggling display the filter button
const preferences = (state = {display: 'none', position: 'absolute', width: '100%', zIndex: 999}, action) => {
        switch (action.type) {
                case 'preferencesButtonClicked':
                     
                        return {display: 'block', position: 'absolute', width: '100%', zIndex: 999}
                case 'doneButtonClicked':
                        return {display: 'none', position: 'absolute', width: '100%', zIndex: 999}
                default:
                      
                        return state
        }
}

//for displaying filters 
const wasteInformationOptions = (
        state = {
        'Total Local Authority Collected Waste': { display: 'none', width: '100%'},
        'Household – Total Waste': { display: 'none', width: '100%'},
        'Household - Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Non-household – Total Waste': { display: 'none', width: '100%'},
        'Non-household – Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Local Authority Collected Waste - Not Sent for Recycling': { display: 'none', width: '100%'},
        'Hazardous landfill': {display: 'none', width: '100%'},
        'Non-hazardous landfill': {display: 'none', width: '100%'},
        'Inert landfill': {display: 'none', width: '100%'},
        'Incineration with energy recovery': {display: 'none', width: '100%'},
        'Incineration without energy recovery': {display: 'none', width: '100%'},
        donebutton: {display: 'none'},
        selectedOption: 'None Selected',
        materialsSelected: 'None Selected',
        buttonDisabled: true,
        }, action) => {
        // to reset the display of all filters, a has been defined
        let a = {

        'Total Local Authority Collected Waste': { display: 'none', width: '100%'},
        'Household – Total Waste': { display: 'none', width: '100%'},
        'Household - Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Non-household – Total Waste': { display: 'none', width: '100%'},
        'Non-household – Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Local Authority Collected Waste - Not Sent for Recycling': { display: 'none', width: '100%'},
        'Hazardous landfill': {display: 'none', width: '100%'},
        'Non-hazardous landfill': {display: 'none', width: '100%'},
        'Inert landfill': {display: 'none', width: '100%'},
        'Incineration with energy recovery': {display: 'none', width: '100%'},
        'Incineration without energy recovery': {display: 'none', width: '100%'},
        donebutton: {display: 'none'},
        selectedOption: 'None Selected',
        materialsSelected:'None Selected',
        current_layer: '',
        buttonDisabled: true,
        };

        switch (action.type) {
                case 'changeInOptions':

                        a[action.selectedOption] = {display: 'block', width: '90%', marginTop: '20px'};    
                        a.selectedOption = action.selectedOption;
                        a.donebutton = {display: 'block'};
                        a.buttonDisabled = false;
                        if (optionsforMap1.includes(action.selectedOption))// changing map depending on option selected
                        {
                                a.current_layer = geojsonlayer1;
                        }
                        else 
                        {       
                                a.current_layer = geojsonlayer2;
                        }
                        a.materialsSelected = state.materialsSelected;
                        return a;
                case 'changeInFeedstock':
                        state.materialsSelected = action.materials;
                        return state;

                default:
                        return state
        }
}


const filterValues = (
        state = {
                'Total Local Authority Collected Waste': 0,
                'Household – Total Waste': 0,
                'Household - Waste not Sent for Recycling': 0,
                'Non-household – Total Waste': 0,
                'Non-household – Waste not Sent for Recycling': 0,
                'Local Authority Collected Waste - Not Sent for Recycling': 0,
                'Hazardous landfill': 0,
                'Non-hazardous landfill': 0,
                'Inert landfill': 0,
                'Incineration with energy recovery': 0,
                'Incineration without energy recovery': 0
}, action) => {
      
        let a = state;
        switch (action.type) {
                case 'Total Local Authority Collected WasteMinimumValueChanged':
                        a['Total Local Authority Collected Waste'] = action.value;
                        return a;

                case 'Local Authority Collected Waste - Not Sent for RecyclingMinimumValueChanged':
                        a['Local Authority Collected Waste - Not Sent for Recycling'] = action.value;
                        return a;

                case 'Household – Total WasteMinimumValueChanged':
                        a['Household – Total Waste'] = action.value;
                        return a;

                case 'Household - Waste not Sent for RecyclingMinimumValueChanged':
                        a['Household - Waste not Sent for Recycling'] = action.value;
                        return a;
                case 'Non-household – Waste not Sent for RecyclingMinimumValueChanged':
                        a['Non-household – Waste not Sent for Recycling'] = action.value;
                        return a;
                case 'Hazardous landfill':
                        a['Hazardous landfill'] = action.value;
                        return a;
                case 'Non-hazardous landfill':
                        a['Non-hazardous landfill'] = action.value;
                case 'Inert landfill':
                        a['Inert landill'] = action.value;
                case 'Incineration with energy recovery':
                        a['Incineration with energy recovery'] = action.value;
                case 'Incineration without energy recovery':
                        a['Incineration without energy recovery'] = action.value;
              
                default:
                        return a;
        }


}

const tableState = (
        state = {
                data: [ {'Facility Name' : '', 'Waste Stream Type': '', 'Facility Type': ''}]
        }, action ) => {

        switch (action.type) {
                case 'MapClicked':
                        let holder = []
                        let district = action.props.Name;
                        let a = operators_data[district];
                        _.forEach(a, function(value, key) {
                                holder.push(value);
                        });
                        state.data = holder;
                        console.log(state);
                        return state;
                default:
                        return state;

        }
}

function mapChange() {
        let {current_layer} = store.getState().wasteInformationOptions;// to get what the current layer should be
        mymap.removeLayer(geojson);
        geojson = current_layer.addTo(mymap);
        
}



var legendValues = {
        'Total Local Authority Collected Waste': [0, 100, 1000, 5000],
        'Household – Total Waste': [0, 100, 1000, 10000],
        'Household - Waste not Sent for Recycling': [0, 100, 1000, 5000],
        'Non-household – Total Waste': [0, 1000, 10000, 25000],
        'Non-household – Waste not Sent for Recycling': [0, 1000, 10000, 25000],
        'Local Authority Collected Waste - Not Sent for Recycling': [0, 100, 1000, 5000],     
        'Hazardous landfill': [0, 1000, 2500, 5000],
        'Non-hazardous landfill': [0, 50000, 100000, 200000],
        'Inert landfill': [0, 125000, 250000,375000],
        'Incineration with energy recovery': [0, 125000, 250000,375000],
        'Incineration without energy recovery': [0, 150000, 300000,450000]
}


let reducers = combineReducers({
        wasteInformationOptions: wasteInformationOptions,
        preferences: preferences,
        filterValues: filterValues,
        tableState: tableState
});



const store=createStore(reducers);




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
            
                this.setState ({
                        dropdownPreferences: {display: 'block', position: 'absolute', width: '100%', zIndex: '1', backgroundColor: '#f9f9f9'},
                })
        }



                render() {

                  return (
                        <div style={{marginTop: '50px', marginLeft: '100px', marginRight:'50px'}}>
                        <Grid columns={1}>
                        <Grid.Row stretched>        
                        <Grid columns={2} divided>
                                <Grid.Row stretched>
                                        <Grid.Column>
                                                
                                        <Segment>
                                                <div id='mapid'  style={{margin: 'auto', width: '90%', borderRadius: '15px'}}></div>
                                        </Segment>
                                        </Grid.Column>
                                        <Grid.Column id='dashboard'>
	                                        
                                                        <div>
                                                                <div style={{width: '80%', display:'inline-block'}}>
                                                                <WasteInformationOptionsSelection store={this.props.store} changeMaterial={ this.changeMaterialOption}/>

                                                                </div>
                                                                <div style={{positon: 'relative', display:'inline-block'}}>
                                                                     <Popup
                                                                        trigger={<Button icon='help circle outline big' />}
                                                                        content="The map will display the quantity of feedstock being recycled/reused by each local authority. If multiple feedstocks are
                                                                        selected, the map will display those districts where the feedstocks selected are recycled/reused and not recycled/reused."
                                                                        basic
                                                                />    
                                                                <ButtonExampleIcon store={this.props.store} />
                                                                <div style={{positon: 'relative', display:'inline-block', float:'right' }}>
                                                                     
                                                                                <Popup
                                                                                trigger={<Button icon='help circle outline big' />}
                                                                                content="By clicking on the settings button, the local authorities can be filtered based on how many tonnes of feedstock are recycled/reused in a year."
                                                                                basic
                                                                                />    
                                                                        </div>
                                                                </div>
                                                                <div style={this.props.store.getState().preferences}>
                                                                        
                                                                        <MinimumValueFilter store={this.props.store} maxValue={this.state.maxValue}/>
                                                                </div>


                                                        </div>
                                                <MaterialMultipleSelection store={this.props.store} />
                                                <Segment.Group horizontal compact>
                                                                        <Segment>
                                                                        <svg className="chart1"></svg>
                                                                        
                                                                </Segment>
                                                               <Segment>
                                                                        <svg className="chart2"></svg>
                                                                        
                                                                </Segment>
                                                         
                                                </Segment.Group>
                                                <Segment.Group horizontal compact>
                                                        <Segment>
                                                                <svg className="linechart"></svg>
                                                                
                                                        </Segment>

                                                        <Segment>
                                                                <svg className="chart3"></svg>
                                                                
                                                        </Segment>
                                                </Segment.Group>
                                        </Grid.Column>
                                </Grid.Row>
                        </Grid>
                        </Grid.Row>
                        <Grid.Row>
                                <div style={{margin:'auto', width:'70%'}}>
                                        <Table store={this.props.store} />
                                </div>
                                
                        </Grid.Row>
                        </Grid>
                        </div>
                  )
                }
}




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

fetch('/maps/annualLAwithMap/').then(function(response) {
        response.json().then(function(response1) {
                geojsonTopology1 = topojson.feature(response1, response1.objects.annualLAwithMap);
                geojsonlayer1 =  L.geoJson(geojsonTopology1, {onEachFeature:onEachFeature})
                geojson1 = geojsonlayer1.addTo(mymap);
                //mymap.removeLayer(geojsonlayer1);
                //geojson = geojsonlayer1.addTo(mymap);
                 geojson =geojson1;
        });
});
fetch('/maps/cleanedDataCountyCouncilMix/').then(function(response) {
        response.json().then(function(response1) {
                geojsonTopology2 = topojson.feature(response1, response1.objects.cleanedDataCountyCouncilMix);
                geojsonlayer2 =  L.geoJson(geojsonTopology2, {onEachFeature:onEachFeature});
        });
});


fetch('/quarterly-data/Q1').then(function(response) {
        response.text().then(function(response1) {
                Q1 = d3.csvParse(response1);
        });
});


fetch('/quarterly-data/Q2').then(function(response) {
        response.text().then(function(response1) {
                Q2 = d3.csvParse(response1);
        });
});

fetch('/quarterly-data/Q3').then(function(response) {
        response.text().then(function(response1) {
                Q3 = d3.csvParse(response1);
              
        });
});

fetch('/quarterly-data/Q4').then(function(response) {
        response.text().then(function(response1) {
                Q4 = d3.csvParse(response1);
        });
});

fetch('/quarterly-data/preAprilQ1').then(function(response) {
        response.text().then(function(response1) {
                preAprilQ1 = d3.csvParse(response1);
        });
});

fetch('/quarterly-data/preAprilQ2').then(function(response) {
        response.text().then(function(response1) {
                preAprilQ2 = d3.csvParse(response1);
        });
});

fetch('/quarterly-data/preAprilQ3').then(function(response) {
        response.text().then(function(response1) {
                preAprilQ3 = d3.csvParse(response1);
              
        });
});

fetch('/quarterly-data/preAprilQ4').then(function(response) {
        response.text().then(function(response1) {
                preAprilQ4 = d3.csvParse(response1);
        });
});


fetch('/reprocessing-data/Q1').then(function(response) {
        response.json().then(function(response1) {
                Q1r = response1;
                
        });
});


fetch('/reprocessing-data/Q2').then(function(response) {
        response.json().then(function(response1) {
                Q2r = response1;
        });
});


fetch('/reprocessing-data/Q3').then(function(response) {
        response.json().then(function(response1) {
                Q3r = response1;
        });
});


fetch('/reprocessing-data/Q4').then(function(response) {
        response.json().then(function(response1) {
                Q4r = response1;
        });
});

fetch('/reprocessing-data/FullYear').then(function(response) {
        response.json().then(function(response1) {
                fullYearr = response1;
                     
        });
});

fetch('/operators-data/Jan17').then(function(response) {
        
        response.json().then(function(response1) {
                operators_data = response1;          
        })
})



var clicked = "";
function changeColoronClick(e) {
        
        var layer;
        if (clicked != "") {
                resetHighlight( clicked );}
        
        layer = e.target;
        clicked = e;
        layer.setStyle({
                weight: 5,
                color: '#9933FF',
                dashArray: '',
                fillOpacity:0.7
        })

}

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
        var layer = e.target;
        layer.setStyle({
                 weight: 0.75,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
        });
        
      
        //geojson.resetStyle(e.target);
        //geojson.setStyle(style);
        info.update();
}

function clickFeature(e) {
        var layer = e.target;
     //   chart3Update(layer.feature.properties);
        changeColoronClick(e);
        chart1Update(layer.feature.properties);
        chart2Update(layer.feature.properties);
        chart3Update(layer.feature.properties);
        linechartUpdate(layer.feature.properties);
        store.dispatch({ type: 'MapClicked',  props:layer.feature.properties});
        tableUpdate(layer.feature.properties);

}


function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: clickFeature,
        });
}


function getColor(d, thresholdValues, minimumValue = 0) {



        return  (d > thresholdValues[3] && d > minimumValue) ? '#006837' :
                (d > thresholdValues[2] && d > minimumValue) ? '#31a354' :
                (d > thresholdValues[1] && d > minimumValue) ? '#78c679' :
                (d > thresholdValues[0] && d > minimumValue)? '#c2e699' :
                '#ffffcc';
}


function style(feature) {

        //make two functions, one for single selected value, one for multiple values

        let a = store.getState()
        let { selectedOption }= a.wasteInformationOptions;
        var b = feature.properties;
        return {
                fill: true,
                fillColor:  getColor(b[selectedOption], legendValues[selectedOption], a.filterValues[selectedOption]),
                weight: 0.75,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
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
    let state = store.getState().wasteInformationOptions.selectedOption;
    let inhtml = '';
  
    if (props) {
            inhtml += '<h5>' + props['Name'] + '</h5>';
            inhtml +=  state + " " + props[state] + ' tonnes/year' + '<br>';
            
            
    }
    else {
            inhtml = 'Hover over a district';
    }
    this._div.innerHTML = inhtml;
}




info.addTo(mymap);





var legendmap = L.control({position: 'bottomright'});

legendmap.onAdd = function (map) {



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

legendmap.update = function (props) {

        let option;
        if (props) {
    // loop through our density intervals and generate a label with a colored square for each interval
                option = store.getState().wasteInformationOptions.selectedOption;
                this.div.innerHTML = ''; 
                if (option != 'None Selected') {

                        let grades = legendValues[option];
                        for (var i = 0; i < grades.length; i++) {
                                this.div.innerHTML +=
                                '<i class="legendIcon" style="background:' + getColor(grades[i] + 1, grades) + '"></i> ' +
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                        }
                      
                
                }
              
                else {

                        this.div.innerHTML = 'Select Feedstock';
                }

        }
        else {
            

                this.div.innerHTML = 'Select Feedstock';
        }
             return this.div;

}



legendmap.addTo(mymap);



 
var data1 = [ {collected_source: 'Total Local Authority Collected Waste', val: 1}, {collected_source: 'Household – Total Waste', val: 3},
              {collected_source: 'Household - Waste not Sent for Recycling', val: 5}, {collected_source: 'Local Authority Collected Waste - Not Sent for Recycling', val: 8} ]
var margin = margin = {top: 20, right:50, bottom: 30, left: 50},
        width = 450 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
var chart1 = d3.select(".chart1")
        .attr("width", width +  margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var ychart1 = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

var xchart1 = d3.scaleBand()
        .domain(['Total Local Authority Collected Waste', 'Household – Total Waste', 'Household - Waste not Sent for Recycling',
        'Local Authority Collected Waste - Not Sent for Recycling'])
        .range([0, width-100])
        .paddingInner(0.1)
        .paddingOuter(0)
        .round(false);

var xAxis1 = d3.axisBottom()
        .scale(xchart1); 

chart1.append("g")
        .attr("class", "xAxis1")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis1)
        .selectAll(".tick text")
        .call(wrap, 60);

let yAxis1 = d3.axisLeft()
            .scale(ychart1);


chart1.append("g")
        .attr("class", "yAxis1")
        .call(yAxis1);


var barwidth1 = width / (data1.length);

var bar1 = chart1.selectAll(".bar1")
      .data(data1)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) {  return xchart1(d.collected_source)})
      .attr("y", function(d) { return ychart1(d.val); })
      .attr("height", function(d) { return height - ychart1(d.val); })
      .attr("width", xchart1.bandwidth())
      .attr("fill", "#c4dbe0");



// wrap function taken from https://bl.ocks.org/mbostock/7555321
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}




        chart1.append("text")
        .attr("class", "titlelinechart1")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("LA and Household Waste" );       

chart1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tonnes");      


function chart1Update(props) {

        let a = store.getState();
        let {selectedOption } = a.wasteInformationOptions;
       // let primaryMaterial = materialsSelected[0];
       // let district = props.Name;
        if (!(optionsforMap1.includes(selectedOption)))// checking if includes the relevant optoon to this chart has been selected
        {
                chart1.selectAll(".bar1")
                .attr("fill", "none");
                return;
        }

        data1 = [ {collected_source: 'Total Local Authority Collected Waste', val: props['Total Local Authority Collected Waste']},
                {collected_source: 'Household – Total Waste', val: props['Household – Total Waste']},
              {collected_source: 'Household - Waste not Sent for Recycling', val: props['Household - Waste not Sent for Recycling']}, 
              {collected_source: 'Local Authority Collected Waste - Not Sent for Recycling', val: props['Local Authority Collected Waste - Not Sent for Recycling']} ]

        let vals = [ data1[0].val, data1[1].val, data1[2].val, data1[3].val ];
        ychart1 = d3.scaleLinear()
        .domain([0, _.max(vals) * 1.3])
        .range([height, 0]);  

        yAxis1 = d3.axisLeft()
            .scale(ychart1);

        chart1.select(".yAxis1")
                .transition()
                .duration(1000)
                .call(yAxis1);

        chart1.selectAll(".bar1")
        .data(data1)
        .transition()
        .attr("x", function(d) {  return xchart1(d.collected_source)})
        .attr("y", function(d) { return ychart1(d.val); })
        .attr("height", function(d) { return height - ychart1(d.val); })
        .attr("width", xchart1.bandwidth()) 
        .attr("fill", "#c4dbe0");
}


//Barchar 2

 
var data2 = [ {collected_source: 'Non-household – Total Waste', val: 7}, 
              {collected_source: 'Non-household – Waste not Sent for Recycling', val: 4} ]
var chart2 = d3.select(".chart2")
        .attr("width", width +  margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var ychart2 = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

var xchart2 = d3.scaleBand()
        .domain(['Non-household – Total Waste',
         'Non-household – Waste not Sent for Recycling'])
        .range([0, width-100])
        .paddingInner(0.1)
        .paddingOuter(0)
        .round(false);

var xAxis2 = d3.axisBottom()
        .scale(xchart2); 

chart2.append("g")
        .attr("class", "xAxis2")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis2)
        .selectAll(".tick text")
        .call(wrap, 60);

let yAxis2 = d3.axisLeft()
            .scale(ychart2);


chart2.append("g")
        .attr("class", "yAxis2")
        .call(yAxis2);


var barwidth2 = width / (2*data2.length);

var bar2 = chart2.selectAll(".bar2")
      .data(data2)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) {  return 34 + xchart2(d.collected_source)})
      .attr("y", function(d) { return ychart2(d.val); })
      .attr("height", function(d) { return height - ychart2(d.val); })
      .attr("width", (xchart2.bandwidth()/2))
      .attr("fill", "#00a8a8");


        chart2.append("text")
        .attr("class", "titlelinechart2")
        .text("Non-household Waste" )
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline");

chart2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tonnes");      


function chart2Update(props) {


        let a = store.getState();
        let {selectedOption } = a.wasteInformationOptions;
       // let primaryMaterial = materialsSelected[0];
       // let district = props.Name;

         if (!(optionsforMap1.includes(selectedOption)))// checking if includes the relevant optoon to this chart has been selected
        {
                chart2.selectAll(".bar2")
                .attr("fill", "none");
                return;
        }


        data2 = [ {collected_source: 'Non-household – Total Waste', val: props['Non-household – Total Waste']}, 
              {collected_source: 'Non-household – Waste not Sent for Recycling', val: props['Non-household – Waste not Sent for Recycling']} 
               ]

        let vals = [ data2[0].val, data2[1].val ];
        ychart2 = d3.scaleLinear()
        .domain([0,_.max(vals) * 1.3])
        .range([height, 0]);  

        yAxis2 = d3.axisLeft()
            .scale(ychart2);

        chart2.select(".yAxis2")
                .transition()
                .duration(1000)
                .call(yAxis2);

                chart2.selectAll(".bar2")
                .data(data2)
                .transition()
      .attr("x", function(d) {  return xchart2(d.collected_source)})
      .attr("y", function(d) { return ychart2(d.val); })
      .attr("height", function(d) { return height - ychart2(d.val); })
      .attr("width", xchart2.bandwidth()/2);

     
  
}



var data = [ {period: "Apr14 - Jun14", val: 1}, {period: "Jul14 - Sep14", val: 3}, {period: "Oct14 - Dec14", val: 5}, {period: "Jan15 - Mar15", val: 7}, {period: "Apr15 - Jun15", val: 4}, {period: "Jul15 - Sep15", val: 8}, {period: "Oct15 - Dec15", val: 12}, {period: "Jan16 - Mar16", val: 16} ];


var linechart = d3.select(".linechart")
        .attr("width", width +  margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var yline = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

var xline = d3.scaleOrdinal()
        .domain(["","Apr14 - Jun14", "Jul14 - Sep14", "Oct14 - Dec14", "Jan15 - Mar15", "Apr15 - Jun15", "Jul15 - Sep15", "Oct15 - Dec15", "Jan16 - Mar16",""])
        .range([0, 1*width/10, 2*width/10, 3*width/10, 4*width/10, 5*width/10, 6*width/10, 7*width/10, 8*width/10, 9*width/10]);


var line = d3.line()
            .x( function(d) { return xline(d.period); } )
            .y( function(d) { return yline(d.val); });
            
linechart.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
  // .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("fill", "none");

// wrap function taken from https://bl.ocks.org/mbostock/7555321
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

var xAxisline = d3.axisBottom()
        .scale(xline); 
linechart.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisline)
        .selectAll(".tick text")
        .call(wrap, 60);

let yAxisline = d3.axisLeft()
            .scale(yline);


linechart.append("g")
        .attr("class", "yaxisline")
        .call(yAxisline);

linechart.selectAll("circle")
    .data(data)
  .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", function(d) { return xline(d.period); })
    .attr("cy", function(d) {  return yline(d.val); })
    .attr("r", 4);
   // .attr("fill", "steelblue")

        linechart.append("text")
        .attr("class", "titlelinechart")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Quarterly Variation in Material Recycled" );

linechart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tonnes");      


 


function linechartUpdate(props) {

    

        let a = store.getState();
        let { materialsSelected } = a.wasteInformationOptions;
         let {selectedOption } = a.wasteInformationOptions;

             if (!(optionsforMap1.includes(selectedOption)))// checking if includes the relevant optoon to this chart has been selected
        {
                linechart.selectAll("path")
                .attr("stroke", "none");
                return;
        }


        let primaryMaterial = materialsSelected;
        let district = props.Name;
        let q1 = _.find(Q1, function(o) { return o.Name == district; });
        let q2 = _.find(Q2, function(o) { return o.Name == district; });
        let q3 = _.find(Q3, function(o) { return o.Name == district; });
        let q4 = _.find(Q4, function(o) { return o.Name == district; });

        let preAprilq1 = _.find(preAprilQ1, function(o) { return o.Name == district; });
        let preAprilq2 = _.find(preAprilQ2, function(o) { return o.Name == district; });
        let preAprilq3 = _.find(preAprilQ3, function(o) { return o.Name == district; });
        let preAprilq4 = _.find(preAprilQ4, function(o) { return o.Name == district; });

        let arrayofquarterlydata = [parseFloat(q1[primaryMaterial]), parseFloat(q2[primaryMaterial]), parseFloat(q3[primaryMaterial]), parseFloat(q4[primaryMaterial]),
                                        parseFloat(preAprilq1[primaryMaterial]), parseFloat(preAprilq2[primaryMaterial]), parseFloat(preAprilq3[primaryMaterial]), parseFloat(preAprilq4[primaryMaterial])];
        let quarterlydata = [ { period: "Apr14 - Jun14", val: preAprilq1[primaryMaterial]}, { period: "Jul14 - Sep14", val: preAprilq2[primaryMaterial]}, 
                                { period: "Oct14 - Dec14", val: preAprilq3[primaryMaterial]}, {period: "Jan15 - Mar15", val: preAprilq4[primaryMaterial]},
                                  { period: "Apr15 - Jun15", val: q1[primaryMaterial]}, { period: "Jul15 - Sep15", val: q2[primaryMaterial]}, 
                                    { period: "Oct15 - Dec15", val: q3[primaryMaterial]}, {period: "Jan16 - Mar16", val: q4[primaryMaterial]}
                            ];  

        linechart.select(".titlelinechart")   
        .transition()      
        .text("Quarterly Variation in " + primaryMaterial + " Collected in " + props.Name );


       
        yline = d3.scaleLinear()
            .domain([0, _.max(arrayofquarterlydata) * 1.3])
            .range([height,0])
            .nice();
        
        yAxisline = d3.axisLeft()
                    .scale(yline);

        linechart.select(".line")
            .datum(quarterlydata)
            .transition()
            .duration(1000)
            .attr("d", line)
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("fill", "none");

     //  console.log(arrayofquarterlydata);
      //  console.log(_.max(arrayofquarterlydata));
        linechart.selectAll("circle")
            .data(quarterlydata)
            .transition()
            .duration(1000)
            .attr("cx", function(d) { return xline(d.period); })
            .attr("cy", function(d) { return yline(d.val); })
            .attr("r", 4)
            .attr("fill", "steelblue");

        linechart.select(".yaxisline")
            .transition()
            .duration(1000)
            .call(yAxisline);
     
  
}


var data3 = [ {collected_source: 'Hazardous landfill', val: 7}, 
              {collected_source: 'Non-hazardous landfill', val: 4},
              {collected_source: 'Inert landfill', val:3},
              {collected_source: 'Incineration with energy recovery', val: 7}, 
              {collected_source: 'Incineration without energy recovery', val: 4}
            ]
var chart3 = d3.select(".chart3")
        .attr("width", width +  margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var ychart3 = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

var xchart3 = d3.scaleBand()
        .domain(['Hazardous landfill',
          'Non-hazardous landfill', 'Inert landfill',  'Incineration with energy recovery',  'Incineration without energy recovery'])
        .range([0, width-100])
        .paddingInner(0.1)
        .paddingOuter(0)
        .round(false);

var xAxis3 = d3.axisBottom()
        .scale(xchart3); 

chart3.append("g")
        .attr("class", "xAxis3")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis3)
        .selectAll(".tick text")
        .call(wrap, 60);

let yAxis3 = d3.axisLeft()
            .scale(ychart3);


chart3.append("g")
        .attr("class", "yAxis3")
        .call(yAxis3);


var barwidth3 = width / data3.length;

var bar3 = chart3.selectAll(".bar3")
      .data(data3)
      .enter().append("rect")
      .attr("class", "bar3")
      .attr("x", function(d) {  return xchart3(d.collected_source)})
      .attr("y", function(d) { return ychart3(d.val); })
      .attr("height", function(d) { return height - ychart3(d.val); })
      .attr("width", xchart3.bandwidth())
      .attr("fill", "#0c6980");


        chart3.append("text")
        .attr("class", "titlelinechart2")
        .text("Waste Disposal" )
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline");

chart3.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tonnes");      



function chart3Update(props) {

         if ((optionsforMap1.includes(selectedOption)))// checking if includes the relevant optoon to this chart has been selected
        {
                chart3.selectAll(".bar3")
                .attr("fill", "none");
                return;
        }
        let a = store.getState();
        let {selectedOption } = a.wasteInformationOptions;
       // let primaryMaterial = materialsSelected[0];
       // let district = props.Name;


        data3 = [ {collected_source: 'Hazardous landfill', val: props['Hazardous landfill']}, 
              {collected_source: 'Non-hazardous landfill', val: props['Non-hazardous landfill']},
               {collected_source:  'Inert landfill', val: props[ 'Inert landfill']}, 
              {collected_source:'Incineration with energy recovery', val: props['Incineration with energy recovery']},
              {collected_source: 'Incineration without energy recovery', val: props['Incineration without energy recovery']}
               ]
    
        let vals = [ data3[0].val, data3[1].val, data3[2].val, data3[3].val,data3[4].val ];
        ychart3 = d3.scaleLinear()
        .domain([0,_.max(vals) * 1.3])
        .range([height, 0]);  

        yAxis3 = d3.axisLeft()
            .scale(ychart3);

        chart3.select(".yAxis3")
                .transition()
                .duration(1000)
                .call(yAxis3);

                chart3.selectAll(".bar3")
                .data(data3)
                .attr("x", function(d) {  return xchart3(d.collected_source)})
                .attr("y", function(d) { return ychart3(d.val); })
                .attr("height", function(d) { return height - ychart3(d.val); })
                .attr("width", xchart3.bandwidth());

     
  
}





/*

var table = d3.select('body').append('table')
var thead = table.append('thead')
var tbody = table.append('tbody');

function tableUpdate(props) {
        let holder = []
        let district = props.Name;
        let a = operators_data[district];
        _.forEach(a, function(value, key) {
        holder.push(value);
        });
        function tabulate(holder, columns) {
                        table = d3.select('table');
                        thead = table.select('thead')
                        tbody = table.select('tbody');

                        // append the header row
                        thead.selectAll('tr').remove();
                        tbody.selectAll('tr').remove();
                        thead.append('tr')
                        .selectAll('th')
                        .data(columns).enter()
                        .append('th')
                        .text(function (column) { return column; });

                        // create a row for each object in the data
                        var rows = tbody.selectAll('tr')
                        .data(holder)
                        .enter()
                        .append('tr');

                        // create a cell in each row for each column
                        var cells = rows.selectAll('td')
                        .data(function (row) {
                        return columns.map(function (column) {
                        return {column: column, value: row[column]};
                        });
                        })
                        .enter()
                        .append('td')
                        .text(function (d) { return d.value; });

                return table;
                }

                // render the table(s)


        tabulate(holder, ['Facility Name', 'Waste Stream Type', 'Facility Type']); // 2 column table


}

*/










const render= () => {
        mapChange();
        ReactDOM.render(<Parent store={store} />, document.getElementById('app'));
        geojson.setStyle(style);
        legendmap.update('Test');

}
store.subscribe(render);