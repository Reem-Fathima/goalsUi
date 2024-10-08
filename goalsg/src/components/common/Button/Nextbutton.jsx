import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;

const NextButton = ({ isSaved, onClick }) => {
  const handleClick = () => {
    if (isSaved) {
      confirm({
        title: 'Are you sure you want to move to the next page?',
        onOk() {
          onClick();
        },
      });
    } else {
      Modal.error({
        title: 'Save Required',
        content: 'Please save your changes before proceeding.',
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      style={{
        backgroundColor: '#2C5778', 
        borderColor: '#2C5778', 
        color: 'white', 
        height: '30px', 
        width: '87px', 
        borderRadius: '10px', 
      }}
      type="default" 
    >
      Next
    </Button>
  );
};

export default NextButton;
