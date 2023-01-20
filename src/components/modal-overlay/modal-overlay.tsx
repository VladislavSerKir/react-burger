import { FC } from "react";

interface IModalOverlay {
    onClick: () => void
}

export const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
    return (
        <div className={`overlay`} onClick={onClick} />
    )
}