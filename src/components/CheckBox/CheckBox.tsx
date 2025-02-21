'use client';

import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface CheckBoxProps {
    label: string;
    isChecked?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, isChecked = false }) => {
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
                className={`w-5 h-5 flex items-center justify-center border-2 rounded-sm ${checked ? 'border-primary' : 'border-primary'
                    }`}
            >
                {checked && <FaCheck className="text-primary text-sm" />}
            </div>
            <span className="text-gray-800">{label}</span>
        </label>
    );
};

export default CheckBox;
