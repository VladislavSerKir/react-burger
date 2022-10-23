import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, children }) => {
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    }, []);

    const handleEscKeydown = (e) => {
        e.key === 'Escape' && onOverlayClick(e);
    }

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.modal}>
                {children}
            </div>
            <ModalOverlay onClick={onOverlayClick} />
        </>,
        modalsContainer
    )
}

Modal.propTypes = {
    onOverlayClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;