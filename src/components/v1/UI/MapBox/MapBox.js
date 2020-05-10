import React, {Component} from 'react';
import ReactMapGL from 'react-mapbox-gl';
import classes from './MapBox.css';

class MapBox extends Component {

    state = {
        viewport: {
            latitude: 45.4211,
            longitude: -75.6983,
            width: '100%',
            height: '100%',
            zoom: 10,
        },
    }

    render() {
        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    accessToken='pk.eyJ1IjoicGFydGhnb2VsIiwiYSI6ImNrOXNsZmVmMjBheHkzZXBjaHhsampqdHQifQ.3UiKdKCEO8CckncIlKY0aQ'
                    // mapStyle="mapbox://styles/parthgoel/ck9vm6er60fk41ip8m651pjhi"
                    onViewportChange={viewport => {
                        this.setState({viewport: viewport});
                    }}
                >
                    markers here
                </ReactMapGL>
            </div>
        )
    }
}

export default MapBox;