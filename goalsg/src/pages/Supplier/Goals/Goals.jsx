import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Tabs, Button } from "antd"; // Import Button from antd
import GenerateTabContent from "./GenerateTabContent";
import SaveButton from "../../../components/common/Button/Savebutton";
import NextButton from "../../../components/common/Button/Nextbutton";
import { apiRequest } from "../../../services/apiService";
import { setActiveTabKey, setgoalsData, setIsSaved, setPillarsData } from "../../../redux/slices/goalsSlice";
import Resetbtn from "../../../components/common/Button/Resetbtn";
import axios from "axios";
import "./Goals.css";
import StyledCard from "../../../components/common/StyledCard";

const Goals = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { activeTabKey, goalsData, isSaved, pillarsData } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const result = await apiRequest("GET", "/api/goalsData");
        dispatch(setgoalsData(result));
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    const fetchPillarData = async () => {
      try {
        const result = await apiRequest("GET", "/api/102/2024") || [];
        dispatch(setPillarsData(result));
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };
    fetchPageData();
    fetchPillarData();
  }, [dispatch, loading]);

  function resetGoals(supplierId, pillarName, year) {
    const url = `http://localhost:8080/api/resetGoals?supplierId=${supplierId}&pillarName=${pillarName}&year=${year}`;
    setLoading(true);
    axios.delete(url)
      .then(response => {
        console.log('Success:', response.data); // Assuming a JSON response
        setLoading(!loading);
      })
      .catch(error => {
        console.error('Error deleting goals:', error.response ? error.response.data : error.message);
      });
  }

  const saveOrUpdateGoalData = useCallback(async (pillarName) => {
    const pillar = pillarsData.find(item => item.pillarName === pillarName);
    if (!pillar) {
      console.error(`Pillar "${pillarName}" not found.`);
      return;
    }
    const url = 'http://localhost:8080/api/addOrUpdateGoalData';

    try {
      const response = await axios.post(url, pillar);
      console.log('Data saved/updated successfully:', response.data);
      console.log(activeTabKey);
      setLoading(!loading);
      dispatch(setIsSaved(true));
    } catch (error) {
      console.error('Error saving/updating data:', error.response ? error.response.data : error.message);
    }
  }, [dispatch, pillarsData]);

  const handleNextClick = useCallback(() => {
    const currentIndex = goalsData.findIndex(
      (item) => item.pillarName === activeTabKey
    );
    const nextIndex = (currentIndex + 1) % goalsData.length;
    dispatch(setActiveTabKey(goalsData[nextIndex].pillarName));
    dispatch(setIsSaved(false));
  }, [dispatch, goalsData, activeTabKey]);

  const items = goalsData.map((goals) => ({
    key: goals.pillarName,
    label: goals.pillarName,
    children: <GenerateTabContent Data={goals} />,
  }));

  // Function to download the PDF
  const downloadPDF = async () => {
    const url = `http://localhost:8080/api/downloadGoalsPdf`; 
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'goals.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      {/* PDF Download Button */}
      <div className="flex justify-end mr-[50px] mb-2">
        <Button
          onClick={downloadPDF}
          style={{
            backgroundColor: "#2C5778",
            color: "white",
            borderColor: "#2C5778",
            height: "30px",
            borderRadius: "10px",
            marginRight: "10px", 
          }}
        >
          PDF Download
        </Button>
      </div>

      <Tabs
        activeKey={activeTabKey}
        items={items}
        onChange={(key) => dispatch(setActiveTabKey(key))}
        tabBarStyle={{
          backgroundColor: "#2C5778",
          height: "45px",
          marginBottom: 0,
        }}
        className="custom-tabs ml-[10px] bg-white mb-[17px] rounded-t-[20px] rounded-b-[20px] w-auto h-auto shadow-md"
        tabBarGutter={0}
      />

      <br />
      <div className="w-auto flex justify-end mr-[50px] gap-2.5">
        <Resetbtn resetGoals={() => resetGoals(102, activeTabKey, 2024)} />
        <SaveButton saveOrUpdateGoalData={() => saveOrUpdateGoalData(activeTabKey)} />
        <NextButton isSaved={isSaved} onClick={handleNextClick} />
      </div>
      <br />
    </div>
  );
};

export default React.memo(Goals);
