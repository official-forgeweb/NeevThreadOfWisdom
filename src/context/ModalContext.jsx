import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

    const openEnquiryModal = () => setIsEnquiryModalOpen(true);
    const closeEnquiryModal = () => setIsEnquiryModalOpen(false);

    return (
        <ModalContext.Provider value={{ isEnquiryModalOpen, openEnquiryModal, closeEnquiryModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
