"use client";

import React, { useState } from "react";
import styles from "./toggleBox.module.css";

type Props = {
    children: React.ReactNode;
    className?: string;
  }


const ToggleBox = ({ children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles.faq_card} ${isOpen ? styles.open : ""} ${className}`}
      onClick={toggleFaq}
    >
      {children}
    </div>
  );
};

export default ToggleBox;