
class Form extends React.Component {
    
    constructor(props) {
    super(props);
    this.state = {
        Glass: false,
        Plastic: false,
        }
    }
    handleMaterialOption(e) {
        console.log(e.target.value);
    }
    /*
    if (document.getElementById('Glass').checked) {
        this.setState({Glass: true});
        this.setState({Plastic: false});
    }
    else if (document.getElementById('Plastic').checked) {
        this.setState({Glass: false});
        this.setState({Plastic: false});
    }
*/
    render() {
        return (
            <form>
                <label><input type="radio"  name='material' value='Glass' onClick={this.handleMaterialOption}/>Glass</label>
                <label><input type="radio"  name='material' value='Plastic' onClick={this.handleMaterialOption} />Plastic</label>
            </form>
           /* <form>
                <input type="text" placeholder="cat photo URL" required></input>
                <button type="submit">Submit</button>
                <input type="radio" name="indoor-outdoor" value='Glass'/>asdad
                <input type="radio" name="indoor-outdoor" value='Plastic'></input>
            </form>
        */
        )
    }
}

class Map extends React.Component {
    
    componentDidMount() {
        var mymap = L.map('mapid').setView([54.36,-2.4],6 );
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
        {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.dark',
            accessToken: 'pk.eyJ1IjoibWF0aGV3cGsxMyIsImEiOiJjajR6YXBsZ3EwZTM2MndtZDFtcHN4ajBmIn0.3qQyNjJTtkkXr_pqLRp37g'
        }).addTo(mymap);
        
        fetch('/maps/EnglandDistrict/').then(function(response) {
            response.json().then(function(response1) {
            // console.log(response1.objects.MapWithData)
                let geoJsonTopology = topojson.feature(response1, response1.objects.MapWithData);
                let t = Date.now();
            //  L.geoJson(geoJsonTopology).addTo(mymap);
                let i = 0;
                for (i=0; i<326; i++) {
                    console.log(geoJsonTopology.features[i].properties.Glass);
                }
            // console.log(geoJsonTopology.features[100].properties);

                function getColor(d) {
                    return d > 50 ? '#006837' :
                            d >  10 ? '#31a354' :
                            d >  5 ? '#78c679' :
                            d > 2.5 ? '#c2e699' :
                            '#ffffcc';
                }
                function style(feature) {
                //  console.log(feature.properties.recyclin22);
                //   console.log(feature.properties.recycling22);
                    let a = feature.properties.Glass;
                    return {
                    fillColor:  getColor(a),
                    weight: 0.75,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                    }
                }
            //    console.log(geoJsonTopology.features[0].properties.recyclin22);
                //console.log(style(geoJsonTopology.features[0]));
                L.geoJson(geoJsonTopology, {style: style}).addTo(mymap);
                t = Date.now() - t;
            });
        }); 
    }
    
    render() {
        return (
                    <div>
                        <div id='mapid'></div>
                        <Form/>
                    </div>
        )
    }
}

ReactDOM.render(<Map />, document.getElementById('yoyo'));



/*

var mymap = L.map('mapid').setView([54.36,-2.4],6 );
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoibWF0aGV3cGsxMyIsImEiOiJjajR6YXBsZ3EwZTM2MndtZDFtcHN4ajBmIn0.3qQyNjJTtkkXr_pqLRp37g'
}).addTo(mymap);

fetch('/maps/EnglandDistrict/').then(function(response) {
    
            
    response.json().then(function(response1) {
       // console.log(response1.objects.MapWithData)
        let geoJsonTopology = topojson.feature(response1, response1.objects.MapWithData);
        let t = Date.now();
      //  L.geoJson(geoJsonTopology).addTo(mymap);
        let i = 0;
        for (i=0; i<326; i++) {
            console.log(geoJsonTopology.features[i].properties.Glass);
        }
       // console.log(geoJsonTopology.features[100].properties);

        function getColor(d) {
            return d > 50 ? '#006837' :
                    d >  10 ? '#31a354' :
                    d >  5 ? '#78c679' :
                    d > 2.5 ? '#c2e699' :
                    '#ffffcc';
        }
        function style(feature) {
        //  console.log(feature.properties.recyclin22);
        //   console.log(feature.properties.recycling22);
            let a = feature.properties.Glass;
            return {
            fillColor:  getColor(a),
            weight: 0.75,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
            }
        }
    //    console.log(geoJsonTopology.features[0].properties.recyclin22);
        //console.log(style(geoJsonTopology.features[0]));
        L.geoJson(geoJsonTopology, {style: style}).addTo(mymap);
        t = Date.now() - t;
     
    });
    
}); */