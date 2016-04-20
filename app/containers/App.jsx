import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

//自定义组件
import Header from '../common/Header';
import Footer from '../common/Footer';

//引入样式
// import styles from 'css/main';
// const cx = classNames.bind(styles);

import {initUser} from '../reducers/global-app/action';

import {getData} from '../api/user';


//模式：所有的router view都会有need来提前获取首屏数据。这时返回到前端的时候state中就是有数据的initial state
class App extends React.Component {
    static need = [
        initUser
    ];//这里的分号一定不要忘记！！！

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header user={this.props.user} />
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.app.user
    }
}

export default connect(mapStateToProps)(App);

