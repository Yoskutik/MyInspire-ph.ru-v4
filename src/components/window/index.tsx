import React, { FC } from 'react';
import './style.scss';
import { CloseButton } from '../CloseButton';

interface WindowProps {
    title?: string;
    onClose: () => void;
}

export const Window: FC<WindowProps> = ({ children, title, onClose }) => <>
    <div className="window-background"/>
    <div className="window">
        <div className="window__window">
            <div className="window__header">
                <h3 className="window__title">{title}</h3>
                <CloseButton onClick={onClose}/>
            </div>
            {children}
        </div>
    </div>
</>;
