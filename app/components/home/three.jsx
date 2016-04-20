import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

var Three = ({data1, data2}) => {
    return (
        <div>
            <h3>HomeThree</h3>
            <h4>Data1 Msg: {data1.msg}</h4>
            <h4>Data2.length: {data2.length}</h4>
        </div>
    )
};

Three.propTypes = {
    data1: PropTypes.object.isRequired,
    data2: PropTypes.array.isRequired
};

export default Three;
