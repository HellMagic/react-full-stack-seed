import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/*
如何使用className的demo:
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox'; //自己的样式文件，注意css下也按照view来建立文件目录
const cx = classNames.bind(styles); //然后bind一起，实现conditions的效果

className={cx('styleOneContainer')}
*/

var One = ({data1, data2, onSomeChange, isOk}) => {
    return (
        <div>
            <h3>HomeOne</h3>
            <h4>Data1 Msg: {data1.msg}</h4>
            <h4>Data2.length: {data2.length}</h4>
            <h4>isOk : {isOk}</h4>
            <button onClick={onSomeChange}>点我</button>
        </div>
    )
};

One.propTypes = {
    data1: PropTypes.object.isRequired,
    data2: PropTypes.array.isRequired,
    onSomeChange: PropTypes.func.isRequired,
    isOk: PropTypes.bool.isRequired
};

export default One;


