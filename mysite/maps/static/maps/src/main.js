import 'leaflet';
import { Grid, Image} from 'semantic-ui-react';
import {MaterialMultipleSelection} from './Components/Dropdown';
import {MinimumValueFilter} from './Components/Filter';
import React from 'react';
import  ReactDOM  from 'react-dom';

var mymap;
var geojson;
var material;
var geoJsonTopology;
var mouselayer;
var minimumValue=0;


class Parent extends React.Component {
            

        constructor(props) {
                super(props);
                this.changeMaterialOption = this.changeMaterialOption.bind(this);
                this.changeMinimumValue = this.changeMinimumValue.bind(this)     
                this.state = { 
                        material: 'Select Material',
                        minimumValue: 0,
                };
                
        }
        
        changeMaterialOption(changedMaterial) {
            
                this.setState ({
                    material: changedMaterial[0],
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



                render() {
                  return (
                        <Grid>
                                <Grid.Row>
                                        <Grid.Column width={2}>
                                                console.log(this.props.)
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                                <div id='mapid'  style={{margin: 'auto', width: '50%'}}></div>
                                        </Grid.Column>
                                        <Grid.Column width={4} id='dashboard'>
	                                        <div>
	                                                <MaterialMultipleSelection changeMaterial={this.changeMaterialOption}/>
	                                                <MinimumValueFilter />
	                                        </div>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                        </Grid.Column>
                                </Grid.Row>
                        </Grid>	    
                  )
                }  
}
ReactDOM.render(<Parent />, document.getElementById('app'));


mymap = L.map('mapid').setView([54.36,-2.4],6 );
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
{
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoibWF0aGV3cGsxMyIsImEiOiJjajR6YXBsZ3EwZTM2MndtZDFtcHN4ajBmIn0.3qQyNjJTtkkXr_pqLRp37g'
}).addTo(mymap);

fetch('/maps/EnglandDistrict/').then(function(response) {
        response.json().then(function(response1) {
                geoJsonTopology = topojson.feature(response1, response1.objects.MapWithData);                  
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



function getColor(d) {
        return  (d > 50 && d > minimumValue) ? '#006837' :
                (d >  10 && d > minimumValue) ? '#31a354' :
                (d > 5 && d > minimumValue) ? '#78c679' :
                (d > 0 && d > minimumValue)? '#c2e699' :
                '#ffffcc';
}

function style(feature) {
    
        let a = feature.properties[material];
        console.log(material)
        return {
                fillColor:  getColor(a),
                weight: 0.75,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
        }
}



var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props['Local Authority'] + '</b><br />' + props[material] + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(mymap);
