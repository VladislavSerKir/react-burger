import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalsContainer = document.querySelector('#modals');

const Modal = ({ children, onClose }) => {

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    }, []);

    const handleEscKeydown = (e) => {
        e.key === 'Escape' && onClose(e);
    }

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal__closeButton}>
                    <CloseIcon onClick={onClose} />
                </div>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>,
        modalsContainer
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Modal;