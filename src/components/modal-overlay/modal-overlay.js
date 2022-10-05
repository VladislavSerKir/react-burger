import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick }) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClick} />
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}