'use client';

import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface CheckBoxProps {
    label: string;
    labelClassName?: string;
    isChecked?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, labelClassName, isChecked = false }) => {
    const [checked, setChecked] = useState(isChecked);

    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="hidden"
            />
            <div
                className={`size-5 flex items-center justify-center shrink-0 p-0.5 border-2 rounded-md ${checked ? 'border-primary' : 'border-gray-200'}`}
            >
                {checked && <FaCheck className="text-primary text-sm" />}
            </div>
            <span className={`text-gray-800 ${labelClassName}`}>{label}</span>
        </label>
    );
};

export default CheckBox;
