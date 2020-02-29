import React from 'react';
import styled from 'styled-components';

interface ModalProps {
    children?: React.ReactNode;
    className?: string;
}

const Modal: React.FC = ({ children, className }: ModalProps) => {

    return (
        <ModalWrapper className={className}>
            {children}
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    
`;

export default Modal;