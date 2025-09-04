import React from 'react';
import './ButtonComponent.css';

interface Props {
  label: string;
  onPress?: () => void;
  color?: 'blue' | 'pink' | 'green' | 'purple' | 'yellow';
  size?: 'large' | 'medium' | 'small';
  shape?: 'rect' | 'square';
  disabled?: boolean;
}

const ButtonComponent: React.FC<Props> = ({
  label,
  onPress,
  color = 'blue',
  size = 'large',
  shape = 'rect',
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`neon-button ${shape} ${color} ${size}`}
      onClick={onPress}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
