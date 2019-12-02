import React, { Component } from 'react';
import ENDPOINT from '../../tools/api';

export default class Data extends Component{
    componentDidMount () {
        this.props.fetchData(ENDPOINT);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
};
