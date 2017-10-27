import 'leaflet';
import { Grid, Image, Segment, Button, Popup} from 'semantic-ui-react';
import {MaterialMultipleSelection} from './Components/Dropdown';
import {MinimumValueFilter} from './Components/Filter';
import {ButtonExampleIcon} from './Components/Button';
import React from 'react';
import  ReactDOM  from 'react-dom';
import { createStore, combineReducers } from 'redux';
import 'lodash';
import * as d3 from "d3";
 import { legendColor } from 'd3-svg-legend';            

var mymap;
var geojson;
var material;
var geoJsonTopology;
var mouselayer;
var minimumValue=0;
var maximumValue=0;
var Q1, Q2, Q3, Q4, preAprilQ1, preAprilQ2, preAprilQ3, preAprilQ4;
var Q1r, Q2r, Q3r, Q4r, fullYearr; //these variables store the reprocessing data

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
        'Other Materials': 400,
        'Co-mingled': 10000,
        Textiles: 400,
        Furniture: 200,
        Composite: 100,
        Plastic: 1000,
        Rubble: 3000,
        Paint: 100,
}


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
        'Other Materials': { display: 'none', width: '100%'},
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
        'Other Materials': { display: 'none', width: '100%'},
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
                'Other Materials': 0,
                'Co-mingled': 0,
                Textiles: 0,
                Furniture: 0,
                Composite: 0,
                Plastic: 0,
                Rubble: 0,
                Paint: 0,
}, action) => {
      
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
                        a['Other Materials'] = action.value;
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
        'Other Materials': [0, 100, 500, 1000],
        Textiles: [0, 100, 500, 1000],
        'Co-mingled': [0, 1000, 10000, 25000],
        'Plastic': [0, 100, 500, 1000],
        Furniture: [0, 50, 100, 500],
        Composite: [0, 50, 100,500],
        Rubble: [0, 1000, 10000, 25000],
        Paint: [0, 10, 50, 100]
}

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
                        <Grid columns={2} divided>
                                <Grid.Row stretched>
                                        <Grid.Column>
                                        <Segment>
                                                <div id='mapid'  style={{margin: 'auto', width: '90%', borderRadius: '15px'}}></div>
                                        </Segment>
                                        </Grid.Column>
                                        <Grid.Column id='dashboard'>
	                                        
                                                        <div>
                                                                <div style={{width: '90%', display:'inline-block'}}>
                                                                <MaterialMultipleSelection store={this.props.store} changeMaterial={ this.changeMaterialOption}/>

                                                                </div>
                                                                <div style={{positon: 'relative', display:'inline-block', float:'right' }}>
                                                                     <Popup
                                                                        trigger={<Button icon='help circle outline' />}
                                                                        content="The map will display the quantity of feedstock being collected by each local authority. If multiple feedstocks are
                                                                        selected, the map will display those districts where the feedstocks selected are collected and not collected."
                                                                        basic
                                                                />    
                                                                <ButtonExampleIcon store={this.props.store} />
                                                                </div>
                                                                <div style={this.props.store.getState().preferences}>
                                                                        <MinimumValueFilter store={this.props.store} maxValue={this.state.maxValue}/>
                                                                        <Popup
                                                                        trigger={<Button icon='help circle outline' />}
                                                                        content="The local authorities can be filtered based on how many tonnes of feedstock are required in a year. If only one feedstock is selected,
                                                                        the local authorities not meeting the criteria are represented by the color showing the material is not collected."
                                                                        basic
                                                                />    
                                                                </div>


                                                        </div>
                                                
                                                <Segment> 
                                                        <svg className="linechart"></svg>
                                                        <div style={{positon: 'relative', display:'inline-block', float:'right' }}>
                                                                <Popup
                                                                        trigger={<Button icon='help circle outline' />}
                                                                        content="The line chart will show data for the first material selected."
                                                                        basic
                                                                />
                                                        </div>

                                                </Segment>
                                                <Segment>
                                                          <div style={{positon: 'relative', display:'inline-block', float:'right' }}>
                                                                <Popup
                                                                        trigger={<Button icon='help circle outline' />}
                                                                        content="The bar chart will show data for the first material selected."
                                                                        basic
                                                                />
                                                        </div>
                                                        <svg className="barchart"></svg>
                                                     
                                                </Segment>
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

fetch('/maps/EnglandApr15Jan16/').then(function(response) {
        response.json().then(function(response1) {
                geoJsonTopology = topojson.feature(response1, response1.objects.yearlydataappendedtomap);
                geojson =  L.geoJson(geoJsonTopology, {onEachFeature:onEachFeature}).addTo(mymap);
        });
});

/*
fetch('/maps/EnglandYearly/').then(function(response) {
        response.json().then(function(response1) {
                geoJsonTopology = topojson.feature(response1, response1.objects.MapYearly);
                console.log(geoJsonTopology);
                geojson =  L.geoJson(geoJsonTopology, {onEachFeature:onEachFeature}).addTo(mymap);
        });
});
*/
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
        changeColoronClick(e);
        linechartUpdate(layer.feature.properties);
        barchartUpdate(layer.feature.properties);
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

function getColorFilter(d, a, materialsSelected) {

        let x = [];
       _.forEach(materialsSelected, function(value) {
                if ( d[value] > a[value]) {
                        x.push(true);
                }
                else {
                        x.push(false);
                }
       });

       let y = _.reduce(x, function(accumulator, n) {
               return accumulator && n;
       }, true);

        if (y) {
                return '#1b9e77';
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
                        fillColor: getColorFilter(b, a.filterValues, materialsSelected),
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

        let state;

        if (props) {
    // loop through our density intervals and generate a label with a colored square for each interval
                state = store.getState().feedstock.materialsSelected;
              
                if (state.length == 1) {

                        let grades = legendValues[state[0]];
                        this.div.innerHTML = '<i style="background:' + '#ffffcc' + '"></i>' + state[0] + ' Not collected' +'<br>';


                        for (var i = 0; i < grades.length; i++) {
                                this.div.innerHTML +=
                                '<i class="legendIcon" style="background:' + getColor(grades[i] + 1, grades) + '"></i> ' +
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                        }
                      
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
            

                this.div.innerHTML = 'Select Feedstock';
        }

}



legendmap.addTo(mymap);



 
var data = [ {period: "Apr14 - Jun14", val: 1}, {period: "Jul14 - Sep14", val: 3}, {period: "Oct14 - Dec14", val: 5}, {period: "Jan15 - Mar15", val: 7}, {period: "Apr15 - Jun15", val: 4}, {period: "Jul15 - Sep15", val: 8}, {period: "Oct15 - Dec15", val: 12}, {period: "Jan16 - Mar16", val: 16} ];

var margin = {top: 20, right:40, bottom: 30, left: 70},
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
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
    .attr("class", "circle");
    //.attr("cx", function(d) { return xline(d.period); })
    //.attr("cy", function(d) { return yline(d.val); })
    //.attr("r", 4);
    //.attr("fill", "steelblue");

        linechart.append("text")
        .attr("class", "titlelinechart")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Quarterly Variation in Material Collected" );

linechart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tonnes");      


function linechartUpdate(props) {


        let a = store.getState();
        let { materialsSelected } = a.feedstock;
        let primaryMaterial = materialsSelected[0];
        let district = props.Name;
        let q1 = _.find(Q1, function(o) { return o.Name == district; });
        let q2 = _.find(Q2, function(o) { return o.Name == district; });
        let q3 = _.find(Q3, function(o) { return o.Name == district; });
        let q4 = _.find(Q4, function(o) { return o.Name == district; });

        let preAprilq1 = _.find(preAprilQ1, function(o) { return o.Name == district; });
        let preAprilq2 = _.find(preAprilQ2, function(o) { return o.Name == district; });
        let preAprilq3 = _.find(preAprilQ3, function(o) { return o.Name == district; });
        let preAprilq4 = _.find(preAprilQ4, function(o) { return o.Name == district; });
        console.log(preAprilq1);
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


        console.log(arrayofquarterlydata + "\n" + quarterlydata);

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




margin = {top: 20, right:230, bottom: 30, left: 70},
width = 900 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

var barchart = d3.select(".barchart")
                .attr("width", width +  margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var ybar = d3.scaleLinear()
        .domain([0,20])
        .range([height, 0]);


var data = [ {period: "Apr15 - Jun15", val: 4},{period: "Jul15 - Sep15", val: 8}, {period: "Oct15 - Dec15", val: 12}, {period: "Jan16 - Mar16", val: 16} ];

var xbar = d3.scaleBand()
        .domain(["Apr15 - Jun15", "Jul15 - Sep15", "Oct15 - Dec15", "Jan16 - Mar16"])
        .range([0, width-100])
        .paddingInner(0.1)
        .paddingOuter(0)
        .round(false);

var newxbar =  d3.scaleBand()
        .domain([0, 1, 2, 3])
        .range([0, width-100])
        .paddingInner(0.1)
        .paddingOuter(0)
        .round(false);
/*
barchart.selectAll(".bar1")
      .data(data1)
      .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return xbar(d.period); })
      .attr("y", function(d) { return ybar(d.val); })
      .attr("height", function(d) { return height - ybar(d.val); })
      .attr("width", xbar.bandwidth());
    //  .attr("fill", "steelblue");
*/

let yAxisbar = d3.axisLeft()
            .scale(ybar);

var xAxisbar = d3.axisBottom()
        .scale(xbar); 

var z = d3.scaleOrdinal()
    .domain(["Recycling", "Reuse", "Windrow or other composting", "In vessel composting", "Anaerobic or Aerobic Digestion Segregated", "Exported (Recycling)", "Exported (Reuse)"])
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);



barchart.append("g")
        .attr("class", "yaxisbar")
        .call(yAxisbar);

barchart.append("g")
        .attr("class", "xaxisbar")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisbar);

  barchart.append("g")
        .attr("class", "stackedgroups")

          
var ordinal = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e"])
  .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)", "rgb(223, 199, 31)", "rgb(234, 118, 47)"]);


var secondchart = d3.select(".barchart")
        .append("g")
  .attr("class", "legendOrdinal")
  .attr("transform", "translate(600,20)");

var legendOrdinal = legendColor()
  //d3 symbol creates a path-string, for example
  //"M0,-8.059274488676564L9.306048591020996,
  //8.059274488676564 -9.306048591020996,8.059274488676564Z"
  .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
  .shapePadding(10)
  //use cellFilter to hide the "e" cell
  .cellFilter(function(d){ return d.label !== "e" })
  .scale(z)
  .labelWrap(150);

d3.select(".legendOrdinal")
  .call(legendOrdinal);
  
barchart.append("text")
        .attr("class", "titlebarchart")
        .attr("x", (width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Primary Reprocessing" );


barchart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tonnes");      




function barchartUpdate(props) {
       
                let a = store.getState();
                let { materialsSelected } = a.feedstock;
                let primaryMaterial = materialsSelected[0];
                let district = props.Name;
                let data123 = fullYearr[district][primaryMaterial];
               
                let facilities =  _.sortBy (_.drop( _.union(_.keys(fullYearr[district][primaryMaterial][0]), _.keys(fullYearr[district][primaryMaterial][1]), _.keys(fullYearr[district][primaryMaterial][2]),
                _.keys(fullYearr[district][primaryMaterial][3]), 'quarter') ));
                var stack = d3.stack()
                        .keys(facilities)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetNone);
                var stackeddata = stack(data123);
                _.forEach(stackeddata, function(val1, index1) {
                        _.forEach(val1, function(val2, index2) {
                                _.forEach(val2, function(val3, index3) {
                                        if (_.isNaN(val3)) {
                                                stackeddata[index1][index2][index3] = 0;
                                        }
                                })
                        }
                )});
                ybar = d3.scaleLinear()
                .domain([0, _.max(_.flattenDepth(stackeddata[stackeddata.length - 1],2 )) * 1.3])
                .range([height,0])
                .nice();
                yAxisbar = d3.axisLeft()
                        .scale(ybar);

                barchart.select(".stackedgroups")
                        .remove();
                barchart.append("g")
        .attr("class", "stackedgroups")
                .selectAll("g")
                .data(stackeddata)
                .enter().append("g")
                .attr("fill", function(d) { return z(d.key); })
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d,i) { return newxbar(i); })
                .attr("y", function(d) { return ybar(d[1]); })
                .attr("height", function(d) { return ybar(d[0]) - ybar(d[1]); })
                .attr("width", xbar.bandwidth());


                 barchart.select(".titlebarchart")   
        .transition()      
        .text("Primary Reprocessing for " + primaryMaterial + " in " + props.Name );


                barchart.select(".yaxisbar")
                .transition()
                .duration(1000)
                .call(yAxisbar);
       
}




const render= () => {
        ReactDOM.render(<Parent store={store} />, document.getElementById('app'));
        geojson.setStyle(style);
        legendmap.update('Test');

}
store.subscribe(render);