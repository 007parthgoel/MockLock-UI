import React, {useState} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
// import {GoogleMap,withSciptjs,withGoogleMap} from 'react-google-maps';
import classes from './GoogleMaps.css';
import Image from '../../../../images/MapMarker.jpg';

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

    let marker=null;
    let map_center_lat=28.7041;
    let map_center_lng=77.1025;
    if (Object.keys(props.Mapcoordinates_Details).length > 0) {

        map_center_lat = props.Mapcoordinates_Details[0].Latitude  || props.Mapcoordinates_Details[0].latitude;
        map_center_lng = props.Mapcoordinates_Details[0].Longitude || props.Mapcoordinates_Details[0].longitude;
        console.log(map_center_lat+":::"+map_center_lng);

        marker = props.Mapcoordinates_Details.map(Mapcoordinates => (
            // <div key={Mapcoordinates.id}>
            <Marker
                key={Mapcoordinates.id}
                // icon={{
                //     url:Image,
                //     scaledSize: new props.google.maps.Size(20,40),
                //     shape:{
                //         coords: [1, 1, 1, 20, 18, 20, 18, 1],
                //         type: 'poly'
                //     }
                // }}
                onClick={onMarkerClick}
                title={'The marker`s title will appear as a tooltip.'}
                name={Mapcoordinates.PointName || Mapcoordinates.name}
                position={{lat: Mapcoordinates.Latitude || Mapcoordinates.latitude, lng: Mapcoordinates.Longitude || Mapcoordinates.longitude}}/>
        ))
    }

    return (
        <div className={classes.GoogleMaps}>

            <Map google={props.google}
                 onClick={onMapClicked}
                 zoom={10}
                 style={mapStyles}
                 initialCenter={{
                     lat: map_center_lat || 28.7041,
                     lng: map_center_lng || 77.1025,
                 }}
                 center={{
                     lat: map_center_lat,
                     lng: map_center_lng,
                 }}
                 onReady={(mapProps, map) => _mapLoaded(mapProps, map)}>

                {marker}


                {/*<Marker*/}
                {/*    // icon={{*/}
                {/*    //     url:Image,*/}
                {/*    //     scaledSize: new props.google.maps.Size(20,40),*/}
                {/*    //     shape:{*/}
                {/*    //         coords: [1, 1, 1, 20, 18, 20, 18, 1],*/}
                {/*    //         type: 'poly'*/}
                {/*    //     }*/}
                {/*    // }}*/}
                {/*    onClick={onMarkerClick}*/}
                {/*    title={'The marker`s title will appear as a tooltip.'}*/}
                {/*    name={stnPointDetails.name}*/}
                {/*    position={{lat: stnPointDetails.latitude, lng: stnPointDetails.longitude}}/>*/}
                <InfoWindow
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                    // icon={stnPointDetails.icon}
                    >
                    <div>
                        {/*<img src={stnPointDetails.icon} alt={"icon"} height={10} width={10}/>*/}
                        <h1>{state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
};

export default GoogleApiWrapper(
    {
        apiKey: (
            // "AIzaSyCxn3RTB50ex6uCNuIJKPkxfPmSFleNLuM"
            "AIzaSyAcOH5dM4A0S7p-pkUGjUnYVcC4emOzBQc")
    })(MapContainer);

