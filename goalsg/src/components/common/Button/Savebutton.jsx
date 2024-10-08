import React from 'react';
import { Button, notification } from 'antd';

const SaveButton = ({ saveOrUpdateGoalData }) => {
  return (
    <Button
      onClick={saveOrUpdateGoalData}
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
      Save
    </Button>
  );
};

export default SaveButton;
