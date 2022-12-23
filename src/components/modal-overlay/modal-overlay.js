import PropTypes from 'prop-types';

export const ModalOverlay = ({ onClick }) => {
    return (
        <div className={`overlay`} onClick={onClick} />
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}