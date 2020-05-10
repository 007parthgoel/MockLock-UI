import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './StationaryPointer.css';
import StationaryPoinGrid from '../../../components/v1/StationaryPoint/StationaryPointGrid';
import Maps from '../../../components/v1/UI/GoogleMaps/GoogleMaps';
// import Maps from '../../../components/v1/UI/MapBox/MapBox';
import * as actions from "../../../store/actions/v1/Index";

class StationaryPointer extends Component {

    state = {
        stationaryPoint: {
            lat: null,
            lng: null,
        },
        _id: null,
    };

    componentDidMount() {
        this.props.onFetchAllStationaryPoints();
    };

    render() {

        const StationaryPointGrid = this.props.StationaryPoints.map(stationaryPoint => (
            <li>
                <StationaryPoinGrid
                    stationaryPoint={stationaryPoint}
                    clicked={(_id) => {
                        // this.setState({_id: _id});
                        // console.log(_id);
                        this.props.onStationaryPointSelected(_id);
                    }}/>

            </li>
        ));

        return (
            <div className={classes.StationPointerPage}>
                <div className={classes.Page_headings}>
                    <h1>History</h1>
                    <h1>Playlists</h1>
                    {/*<h1>Manual Itenaries</h1>*/}
                </div>

                <div className={classes.Page_subheadings}>
                    <div className={classes.Page_subheading_left}>
                        <h2>Recent Executed Itenaries</h2>
                    </div>
                    <div className={classes.Page_subheading_right}>
                        <h3>settings</h3>
                        <h3>Help and guidlines</h3>
                    </div>
                </div>
                <div className={classes.Grid_MapContainer}>
                    <div className={classes.Grid}>
                        <div className={classes.GridList}>
                            <ul className={classes.Lists}>
                                {StationaryPointGrid}
                            </ul>
                        </div>
                        <div className={classes.SubMenu}>
                            <p>submenu</p>
                        </div>
                    </div>
                    <div className={classes.googleMaps}>
                        <Maps
                            stationaryPointDetails={this.props.stationaryPointSelected}
                        />
                        console.log(this.props.stationaryPointSelected);
                    </div>
                </div>
            </div>
        );
    }
}

const
    mapStateToProps = state => {
        return {
            StationaryPoints: state.stationaryPointer.stationaryPoints,
            error: state.stationaryPointer.error,
            stationaryPointSelected:state.stationaryPointer.stationaryPointSelected
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            onFetchAllStationaryPoints: () => dispatch(actions.initStationaryPoints()),
            onStationaryPointSelected : (_id) => dispatch(actions.stationaryPointSelected(_id))
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(StationaryPointer);
