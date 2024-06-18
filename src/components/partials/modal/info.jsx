import React from 'react';
import PropTypes from 'prop-types';
import * as BIcons from 'react-bootstrap-icons';

function Info({ status, message }) {
    return (
        <div>
            <div>
                {status === 'ok!' ? <BIcons.Check /> : <BIcons.X />}
            </div>
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}

Info.propTypes = {
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default Info;

