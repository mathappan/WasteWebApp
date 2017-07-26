var mymap;
var layer1;
var material;


class SelectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeMaterialOption = this.handleChangeMaterialOption.bind(this);
    }
    handleChangeMaterialOption(e) {
        let name = e.target.value;
        this.props.changeMaterialOption(name);
     //   this.props.changeStyle();
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
     
    
        this.state = { material: 'asdasda',
           };
        
    }

    componentDidMount() {
        console.log(this.state.material);
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
            
                let geoJsonTopology = topojson.feature(response1, response1.objects.MapWithData);
    
               // L.geoJson(geoJsonTopology, {style: style}).addTo(mymap);
               
           
           
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
                    layer1.resetStyle(e.target);
                }
            
                function onEachFeature(feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                    });
                }
           
                layer1 =  L.geoJson(geoJsonTopology, {onEachFeature: onEachFeature}).addTo(mymap);
             //   t = Date.now() - t;
            });
        }); 
    }
    
    changeMaterialOption(changedMaterial) {
        this.setState ({
            material: changedMaterial,
        });
        function getColor(d) {
            return d > 50 ? '#006837' :
                    d >  10 ? '#31a354' :
                    d >  5 ? '#78c679' :
                    d > 0 ? '#c2e699' :
                    '#ffffcc';
        }
        function style(feature) {
            
            let a = feature.properties[changedMaterial];
            return {
            fillColor:  getColor(a),
            weight: 0.75,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
            }
        }
           material = this.state.material;
                              layer.setStyle(style);
    }

    componentWillReceiveProps(nextProps) {}
    changeStyle() {
              
       
                    
            
            
    }

   



    render() {
        return (
                    <div>
                        <div id='mapid'></div>
                        <SelectionForm changeMaterialOption = {this.changeMaterialOption} changeStyle = {this.changeStyle} />
                        <p>{this.state.material}</p>
                    </div>
        )
    }
}

ReactDOM.render(<Map />, document.getElementById('yoyo'));