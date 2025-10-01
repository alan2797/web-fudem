// components/NavigationButton.tsx
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { ButtonCustomProps } from "../../interfaces/components.interface";

const ButtonCustom: React.FC<ButtonCustomProps> = ({ to, text, ...props }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };
  return (
    <Button
      {...props} 
      size="large"
    >
      {text}
    </Button>
  );
};

export default ButtonCustom;
