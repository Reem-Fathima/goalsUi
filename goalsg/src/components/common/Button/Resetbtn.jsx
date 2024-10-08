import React from 'react';
import { Button } from 'antd';

function Resetbtn({ resetGoals }) {
  return (
    <div>
      <Button 
        onClick={resetGoals}
        style={{
          backgroundColor: '#2C5778', 
          borderColor: '#2C5778',
          color: 'white', 
          borderRadius: '10px',
          height:'30px',
          width:'87px' 
        }}
        type="default" 
      >
        Reset
      </Button>
    </div>
  );
}

export default Resetbtn;
