import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from './Queries.css';
import QueryGrid from '../../../components/v1/Queries/QueryGrid/QueryGrid';
import QuerySelected from '../../../components/v1/Queries/querySelected/QuerySelected';
import * as actions from '../../../store/actions/v1/Index';
// import DataSelect from '../../components/UI/DateSelect/DateSelect';

class Queries extends Component {

    state = {
        startDate: new Date()
    };

    componentDidMount() {
        this.props.onFetchAllQueries();
    };

    render() {

        let queryGrid = this.props.queries.map(query => (
            <li>
                <QueryGrid
                    query={query}
                    clicked={(_id) => this.props.onQuerySelected(_id)} />
            </li>
        ));

        let queryGridResult = (!this.props.error) ? queryGrid : <p>Data can't be displayed</p>



        return (
            <div className={classes.QueriesPage}>
                {/* <h1>This is query page </h1> */}
                <div className={classes.QueriesPage_Left}>
                    <div className={classes.Filters}>
                        <div className={classes.Filters_top}>
                            <div className={classes.Filters_DateFrom}>
                                <p>From</p>
                                {/* <DataSelect/>                                 */}
                                <DatePicker
                                    className={classes.Filters_DatePicker}
                                    selected={this.state.startDate}
                                />
                            </div>
                            <div className={classes.Filters_DateTo}>
                                <p>To</p>
                                <DatePicker
                                    className={classes.Filters_DatePicker}
                                    selected={this.state.startDate}
                                />                             
                            </div>
                            <div className={classes.Filters_Status}>
                                <select defaultValue="0"
                                    onChange={(e) => this.handleChange(e.target.value)}>
                                    <option>0</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.Filters_bottom}>
                            <div className={classes.Filters_SearchInput}>
                                <input placeholder="Search here with some text as per selection"/>
                            </div>
                            <div className={classes.Filters_SearchSelect}>
                                <select defaultValue="EMAIL"
                                    onChange={(e) => this.handleChange(e.target.value)}>
                                    <option>EMAIL</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={classes.GridLists}>
                        <ul className={classes.Lists}>
                            {queryGridResult}
                        </ul>
                    </div>
                </div>

                <div className={classes.QueriesPage_Right}>
                    <div className={classes.UserDetail_Panel}>

                        <QuerySelected
                            queryDetails={this.props.querySelected} />
                        <div className={classes.UserDetail_Panel_middle}>
                            <textarea
                                className={classes.UserDetail_Panel_input}
                                placeholder="Here the admin will right reply to user" />
                        </div>
                        <div className={classes.UserDetail_Panel_bottom}>
                            <button className={classes.UserDetail_Panel_bottom_button}>Send Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        queries: state.query.queries,
        error: state.query.error,
        querySelected: state.query.querySelected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllQueries: () => dispatch(actions.initQueries()),
        onQuerySelected: (_id) => dispatch(actions.querySelected(_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Queries);
