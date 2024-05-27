import { Button, Input } from "@chakra-ui/react";
import { useRef } from "react";

const FileInput = () => {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
  };

  return (
    <>
      <Button onClick={handleButtonClick} colorScheme="blue" mt={3}>
        Chọn file
      </Button>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        display="none" 
      />
    </>
  );
};

export default FileInput;
