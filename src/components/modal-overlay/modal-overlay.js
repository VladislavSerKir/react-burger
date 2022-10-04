import modalOverlayStyles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick }) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onClick} />
    )
}