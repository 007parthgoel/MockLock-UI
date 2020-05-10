import React, {useState} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
// import {GoogleMap,withSciptjs,withGoogleMap} from 'react-google-maps';
import classes from './GoogleMaps.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const MapContainer = (props) => {

    const [state, setState] = useState({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    });

    const stnPointDetails = props.stationaryPointDetails;

    const mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1b1b1b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#2c2c2c"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#373737"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3c3c3c"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#3d3d3d"
                }
            ]
        }
    ]

    const _mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapStyle
        })
    };

    const onMarkerClick = (props, marker, e) =>
        setState(prev => ({
            ...prev,
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        }));

    const onMapClicked = (props) => {
        if (state.showingInfoWindow) {
            setState(prev => ({
                ...prev,
                showingInfoWindow: false,
                activeMarker: null
            }));
        }
    };

    return (
        <div className={classes.GoogleMaps}>
            <Map google={props.google}
                 onClick={onMapClicked}
                 zoom={16}
                 style={mapStyles}
                 initialCenter={{
                     lat: 29.764060,
                     lng: 77.182293
                 }}
                 center={{
                     lat: stnPointDetails.latitude,
                     lng: stnPointDetails.longitude,
                 }}
                 onReady={(mapProps, map) => _mapLoaded(mapProps, map)}>
                <Marker
                    onClick={onMarkerClick}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={stnPointDetails.name}
                    position={{lat: stnPointDetails.latitude, lng: stnPointDetails.longitude}}/>
                <InfoWindow
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                    icon={stnPointDetails.icon}>
                    <div>
                        <img src={stnPointDetails.icon} alt={"icon"} height={10} width={10}/>
                        <h1>{state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
                {/*<Marker*/}
                {/*    title={'The marker`s title will appear as a tooltip.'}*/}
                {/*    name={'SOMA'}*/}
                {/*    position={{lat: 29.764260, lng: 77.182293}} />*/}

                {/*<InfoWindow onClose={onInfoWindowClose}>*/}
                {/*    <div>*/}
                {/*        /!*<h1>{this.state.selectedPlace.name}</h1>*!/*/}
                {/*    </div>*/}
                {/*</InfoWindow>*/}
            </Map>
        </div>
    );
};

export default GoogleApiWrapper(
    {
    apiKey: ("AIzaSyCxn3RTB50ex6uCNuIJKPkxfPmSFleNLuM")
    // https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCxn3RTB50ex6uCNuIJKPkxfPmSFleNLuM&center=47.66122791060189,-122.4698357135342&zoom=15&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360
}
)(MapContainer);

