var mymap;
var geojson;
var material;
var geoJsonTopology;
var mouselayer;

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
}

function resetHighlight(e) {
        geojson.resetStyle(e.target);
        geojson.setStyle(style);    
}

function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
}



function getColor(d) {
        return  d > 50 ? '#006837' :
                d >  10 ? '#31a354' :
                d >  5 ? '#78c679' :
                d > 0 ? '#c2e699' :
                '#ffffcc';
}

function style(feature) {
    
        let a = feature.properties[material];
        return {
                fillColor:  getColor(a),
                weight: 0.75,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
        }
}





class SelectionForm extends React.Component {
        constructor(props) {
            super(props);
            this.handleChangeMaterialOption = this.handleChangeMaterialOption.bind(this);
        }

        handleChangeMaterialOption(e) {
            let name = e.target.value;
            this.props.changeMaterialOption(name);
        }

        render() {
            return (
                <form onChange={this.handleChangeMaterialOption} id='MaterialForm'>
                    <select>
                        <option value='Glass' >Glass</option>
                        <option value='Plastic' >Plastic</option>
                    </select>
                </form>
            )                                                   	
        }
}

class Map extends React.Component {
    
        constructor(props) {
                super(props);
                this.changeMaterialOption = this.changeMaterialOption.bind(this);
                this.changeStyle = this.changeStyle.bind(this);     
                this.state = { material: 'Select Material',
                };
                
        }
        
        changeMaterialOption(changedMaterial) {
            
            this.setState ({
                material: changedMaterial,
            });
             console.log('asd');
            material = changedMaterial;
            geojson.setStyle(style); 
        }

        changeStyle() {
               
        }

        render() {
            return (
                        <div>
                            <SelectionForm changeMaterialOption = {this.changeMaterialOption} changeStyle = {this.changeStyle} />
                            <p>{this.state.material}</p>
                        </div>
            )
        }
}

ReactDOM.render(<Map />, document.getElementById('yoyo'));