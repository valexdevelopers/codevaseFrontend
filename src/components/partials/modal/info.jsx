import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as BIcons from 'react-bootstrap-icons';
import '../../../assets/styles/modal.css';

function Info({ status, message }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 6000); // Info message will be visible for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`info-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <div className="info-icon">
                {status === 'ok!' ? <BIcons.Check className="successIcon" /> : <BIcons.X className="errorIcon" />}
            </div>
            <div className="info-message">
                <p className="infoMessage">{message}</p>
            </div>
        </div>
    );
}

Info.propTypes = {
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default Info;
