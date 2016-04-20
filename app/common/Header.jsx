import React, {PropTypes} from 'react';

const Header = ({user}) => {
    return (
        <div>
            <h3>这是Header</h3>
            <h4>{user.name}</h4>
        </div>
    )
};

Header.propTypes = {
    user: PropTypes.object.isRequired
};

export default Header;

