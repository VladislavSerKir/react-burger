import React from 'react';
import { closeAllModals } from '../../services/reducers/modalReducer';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const modalsContainer = document.querySelector('#modals');

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);
        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        }
    }, []);

    const handleEscKeydown = (e) => {
        e.key === 'Escape' && handleCloseModals(e);
    }

    const handleCloseModals = () => {
        dispatch(closeAllModals())
        history.push({
            pathname: '/',
        })
    }

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.modal}>
                <div
                    className={modalStyles.modal__closeButton}
                    onClick={handleCloseModals}
                >
                    <CloseIcon onClick={handleCloseModals} />
                </div>
                {children}
            </div>
            <ModalOverlay onClick={handleCloseModals} />
        </>,
        modalsContainer
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Modal;