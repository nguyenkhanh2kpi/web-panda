// src/components/ColorPicker.js
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CirclePicker, TwitterPicker } from 'react-color';

const ColorPicker = ({ initialColor, onChangeComplete }) => {
  const [color, setColor] = useState(initialColor || '#fff');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    if (onChangeComplete) {
      onChangeComplete(color);
    }
  };

  return (
    <Box>
      <Button 
        onClick={handleClick} 
        bg={color} 
        color="white" 
        borderRadius="50%" 
        width="40px" 
        height="40px"
      >
      </Button>
      {displayColorPicker ? (
        <Box position="absolute" zIndex="2">
          <Box position="fixed" top="0" right="0" bottom="0" left="0" onClick={handleClose} />
          <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
        </Box>
      ) : null}
    </Box>
  );
};

export default ColorPicker;
