import React from 'react';

import styles from './textinput.module.css';

interface ITextInputProps {
    label: string;
    name: string;
    id: string;
    placeHolder: string;
    type: string;
    inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
}

export default function TextInput({ label, name, id, placeHolder, type, inputMode = "text" }: ITextInputProps) {
  return (
    <div className='block w-full mb-6'>
      <label className={styles.lable} htmlFor=""> {label} </label>
      <input type={type} inputMode={inputMode} className={styles.input} name={name} id={id} placeholder={placeHolder} />
    </div>
  )
}
