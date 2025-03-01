"use client";

import React, { ReactNode, useEffect, useRef, useCallback } from 'react';
import styles from './sidebar.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ children, isOpen, setIsOpen }) => {

  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const locale = pathname.split("/")[2];



  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOverlayClick = useCallback((e: MouseEvent) => {
    if (overlayRef.current && e.target === overlayRef.current) {
      closeSidebar();
    }
  }, [closeSidebar]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOverlayClick);
    } else {
      document.removeEventListener('click', handleOverlayClick);
    }

    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [isOpen, handleOverlayClick]);

  useEffect(() => {
    setIsOpen(false);
  }, [locale, setIsOpen]);

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
    >
      <div
        ref={sidebarRef}
        className={styles.sidebar}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['sidebar-content']}>
          <IoCloseOutline id='closeIcon' className={styles["close-icon"]} size={40} onClick={closeSidebar} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
