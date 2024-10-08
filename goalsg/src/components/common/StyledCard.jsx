import React from "react";
import { Card } from "antd";

const StyledCard = ({ children }) => {
  return (
    <Card
      style={{
        backgroundColor: "#E6F4F1", 
        borderRadius: "20px",
        // padding: "20px", // Adjust this padding as per your requirement
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "auto", // Set width to auto to fit content
        marginBottom: "30px", // Add gap between cards
        margin: "30px",
        height: "100px",
      }}
    >
      {children}
    </Card>
  );
};

export default StyledCard;
