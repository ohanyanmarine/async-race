import React from 'react';
import './InputComponent.css';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

const InputComponent: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}) => {
  return (
    <input
      className={type === 'text' ? 'input-outlined' : 'input-color'}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

export default InputComponent;
