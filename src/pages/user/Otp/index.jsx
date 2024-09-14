import React, { useRef } from 'react';
import { Input } from 'antd';
import './otp.css'; // Import CSS file for styling

const OtpInput = ({ value, onChange }) => {
    const inputs = useRef([]);

    const handleChange = (event, index) => {
        const newValue = event.target.value;
        let otpArray = value.split('');
        otpArray[index] = newValue;
        onChange(otpArray.join(''));
        // Move focus to the next input if the current input is filled
        if (newValue && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (event, index) => {
        const key = event.key;
        if (key === 'Backspace' && !value[index]) {
            // Move focus to the previous input when backspace is pressed
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        } else if (key === 'ArrowRight') {
            // Move focus to the next input when right arrow is pressed
            if (index < inputs.current.length - 1) {
                inputs.current[index + 1].focus();
            }
        } else if (key === 'ArrowLeft') {
            // Move focus to the previous input when left arrow is pressed
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    };

    return (
        <div className="otp-container">
            {Array.from({ length: 6 }).map((_, index) => (
                <Input
                    key={index}
                    value={value[index] || ''}
                    onChange={(event) => handleChange(event, index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    maxLength={1}
                    ref={(el) => (inputs.current[index] = el)}
                    className="otp-input"
                    style={{ width: '40px', textAlign: 'center' }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
