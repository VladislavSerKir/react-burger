import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {
    React.useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);
        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        }
    }, []);

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
    title: PropTypes.string.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    onEscKeydown: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;