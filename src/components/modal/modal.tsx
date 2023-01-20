import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalsContainer = document.querySelector('#modals') as HTMLElement;

interface IModalProps {
    children: React.ReactNode,
    onClose: () => void
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    }, []);

    const handleEscKeydown = (e: { key: string }) => {
        e.key === 'Escape' && onClose();
    }

    return ReactDOM.createPortal(
        <>
            <div className={`modal`}>
                <div className={`modal__button_type_close`}>
                    <CloseIcon type="primary" onClick={onClose} />
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