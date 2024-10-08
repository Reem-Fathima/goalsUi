import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

function Addbtn({ onClick }) {
  return (
    <div>
      <Button 
        onClick={onClick} 
        style={{
            
          border: 'none',
          height: '27px',
          width: '65px',
          fontSize: '10px', 
          fontWeight: 'bold',
          text:'10px',
        }} 
        type="text"
      >
        <PlusCircleOutlined className='text-[#014D4E] text-[15px]' /> Add
      </Button>
    </div>
  );
}

export default Addbtn;
