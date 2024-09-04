import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { CheckCircle, ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [myPoint, setMypoint] = useState();
  const [statistics, setStatistics] = useState({
    totalSpend: 0,
    ecoSpend: 0,
    previousMonthCompare: 0,
    averageCompare: 0,
    campaignPoint: 0,
  });

  const [selectedButton, setSelectedButton] = useState("월간"); // Default selection
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      text: "출석체크 하기(100p)",
      completed: false,
      route: "/calendar",
    },
    { id: 2, text: "나무 키우기", completed: false, route: "/tree" },
    {
      id: 3,
      text: "친환경 캠페인 참여하기",
      completed: false,
      route: "/campaignList",
    },
    { id: 4, text: "친환경 퀴즈 참여하기", completed: false, route: "/quiz" },
    { id: 5, text: "친환경 기부하기", completed: false, route: "/campaign" },
    { id: 6, text: "6000보 걷기(100p)", completed: false, route: "/item6" },
    { id: 7, text: "영수증 인증하기(100p)", completed: false, route: "/item7" },
  ]);

  const [showSavedCostList, setShowSavedCostList] = useState(false);
  const navigate = useNavigate();

  const toggleTodo = (id) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleSavedCostList = () => {
    setShowSavedCostList(!showSavedCostList);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleParticipateClick = (route) => {
    navigate(route); // Navigate to the specified route
  };

  // Data for Line Chart (7 days consumption)
  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Last 7 Days Consumption",
        data: [30, 45, 60, 50, 70, 90, 100], // Example data
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4, // Smoother line
      },
    ],
  };

  // Data for Bar Chart (Footsteps)
  const barChartData = {
    labels: ["월", "화", "수", "목", "금"],
    datasets: [
      {
        label: "Footsteps",
        data: [3000, 5000, 7000, 6000, 8000],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };

  // Data for Doughnut Chart (Eco vs Normal Consumption)
  const doughnutChartData = {
    labels: ["에코", "일반"],
    datasets: [
      {
        label: "에코 : 일반",
        data: [
          Math.round(statistics.ecoSpend),
          Math.round(statistics.totalSpend - statistics.ecoSpend),
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  // Options for Line Chart (Hide All Axes and Grid Lines)
  const lineChartOptions = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Options for Bar Chart (Hide Y Axis, Keep Small X Axis Labels)
  const barChartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "black",
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Options for Doughnut (원 그래프 옵션)
  const doughnutChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("/api/statistics", {
        headers: { userId: 11 },
      });

      setStatistics(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating statistics:", error);
    }
  };

  const fetchStatistics30 = async () => {
    try {
      const response = await axios.get("/api/statistics/30", {
        headers: { userId: 11 },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating statistics for 30:", error);
    }
  };

  const fetchMypoint = async () => {
    try {
      const response = await axios.get("/api/points/mypoint", {
        headers: { userId: 5 },
      });
      setMypoint(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating statistics for 30:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchStatistics30();
    fetchMypoint();
  }, []);

  return (
    <div style={styles.fullWidthBackground}>
      <div style={styles.background}>
        <div style={styles.topContent}>
          {/* Example of an analytics icon or logo */}
          <div style={styles.topText}>내 소비 보기</div>
          <img
            src="/assets/icon/analyticsMain_icon.png" // Replace this with the actual path to your logo or icon
            alt="Analytics Logo"
            style={styles.analyticsLogo}
          />
        </div>

        <div style={styles.Main}>
          <div style={styles.MonthButtonSection}>
            <button
              style={{
                ...styles.MonthButton,
                backgroundColor:
                  selectedButton === "일간" ? "#FF5733" : "#4CAF50",
                color: selectedButton === "일간" ? "white" : "white",
              }}
              onClick={() => handleButtonClick("일간")}
            >
              일간
            </button>
            <button
              style={{
                ...styles.MonthButton,
                backgroundColor:
                  selectedButton === "주간" ? "#FF5733" : "#4CAF50",
                color: selectedButton === "주간" ? "white" : "white",
              }}
              onClick={() => handleButtonClick("주간")}
            >
              주간
            </button>
            <button
              style={{
                ...styles.MonthButton,
                backgroundColor:
                  selectedButton === "월간" ? "#FF5733" : "#4CAF50",
                color: selectedButton === "월간" ? "white" : "white",
              }}
              onClick={() => handleButtonClick("월간")}
            >
              월간
            </button>
          </div>

          <div style={styles.subgraphSection}>
            <div style={styles.subgraph1}>
              <h4 style={styles.topLeftText}>6787 걸음</h4>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <div style={styles.subgraph1}>
              <h4 style={styles.topLeftText}>내 에코 소비 비율</h4>
              <Doughnut
                data={doughnutChartData}
                options={doughnutChartOptions}
              />
              <div style={styles.doughnutLegend}>
                <div>
                  <span style={styles.ecoBox}></span> 에코
                </div>
                <div>
                  <span style={styles.normalBox}></span> 일반
                </div>
              </div>
            </div>
          </div>

          {/* Compare Section */}
          <div style={styles.compare}>
            <div style={styles.compareGraph}>
              <div style={styles.iconCircle}>
                <CheckCircle style={{ color: "#4CAF50", fontSize: "32px" }} />
              </div>
              <div style={styles.textSection}>
                <p style={styles.transparentText}>또래보다 친환경적이에요.</p>
                <p style={styles.boldText}>
                  <span
                    style={{
                      color:
                        statistics.averageCompare > 0 ? "#4CAF50" : "#FF5733",
                    }}
                  >
                    {statistics.averageCompare > 0
                      ? `+${statistics.averageCompare.toFixed(0)}`
                      : `${statistics.averageCompare.toFixed(0)}`}
                  </span>{" "}
                  %의 친환경 소비
                </p>
              </div>
            </div>
            <div style={styles.compareGraph}>
              <div style={styles.iconCircle}>
                <ArrowDownward style={{ color: "#FF5733", fontSize: "32px" }} />
              </div>
              <div style={styles.textSection}>
                <p style={styles.transparentText}>지난 달보다 줄었어요.</p>
                <p style={styles.boldText}>
                  <span
                    style={{
                      color:
                        statistics.previousMonthCompare > 0
                          ? "#4CAF50"
                          : "#FF5733",
                    }}
                  >
                    {statistics.previousMonthCompare > 0
                      ? `+${statistics.previousMonthCompare}`
                      : `${statistics.previousMonthCompare}`}
                  </span>{" "}
                  % 전달 대비
                </p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div style={styles.payment}>
            <div style={styles.paymentGraph}>
              <div style={styles.donateText}>
                <div>
                  <p style={styles.transparentText}>기부포인트 총액</p>
                  <p style={styles.boldBigText}>{myPoint}P 기부</p>
                  <p style={styles.greenText}>+23% 지난 주 대비</p>
                </div>
              </div>
            </div>

            <div style={styles.paymentGraph}>
              <div style={styles.saveTheEarth}>
                <div style={styles.savingText}>
                  <p style={styles.transparentText}>절약한 환경 비용</p>
                  <p style={styles.boldBigText}>2,390만원</p>
                </div>
                <img
                  src="/assets/icon/tree.png"
                  alt="Tree Icon"
                  style={styles.treeIcon}
                />
                <IconButton
                  onClick={toggleSavedCostList}
                  style={styles.expandButton}
                >
                  {showSavedCostList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
              <ul
                style={{
                  ...styles.savedCostList,
                  ...(showSavedCostList ? styles.savedCostListOpen : {}),
                }}
              >
                <li>절약한 물 사용량: 120L</li>
                <li>절약한 전기 사용량: 100kWh</li>
                <li>절약한 CO2 배출량: 30kg</li>
              </ul>
            </div>
          </div>

          <div style={styles.pointEarning}>
            <div style={styles.pointEarningHeader}>
              <h3 style={styles.pointEarningtitle}>포인트 적립하기</h3>
              <button style={styles.pointEarningDetail}>:</button>
            </div>
            <div style={styles.pointEarningList}>
              {todoItems.map((item) => (
                <div key={item.id} style={styles.pointEarningItem}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTodo(item.id)}
                  />
                  <div style={styles.insideOfItem}>
                    <label style={styles.itemText}>{item.text}</label>
                    <button
                      style={styles.detButton}
                      onClick={() => handleParticipateClick(item.route)}
                    >
                      참여하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  fullWidthBackground: {
    width: "100%",
    background: `linear-gradient(to bottom, #009CF4 200px, #F4F7FE 200px)`,
    display: "flex",
    justifyContent: "center",
  },
  background: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "390px",
    height: "844px",
  },

  // New styles for the topContent section
  topContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #F4F7FE", // Add a subtle divider below the top section
  },

  topText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)", // Add a subtle text shadow for better readability
  },

  analyticsLogo: {
    height: "140px",
    marginTop: "0px",
    borderRadius: "50%", // Make the logo circular
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add some depth with a shadow
  },

  Main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginTop: "25px",
  },

  topLeftText: {
    position: "absolute",
    top: "10px",
    left: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },

  MonthButtonSection: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },

  MonthButton: {
    flex: 1,
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 5px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease", // Smooth transition for hover
    outline: "none",
  },

  MonthButtonHover: {
    backgroundColor: "#FF5733", // Change color on hover
  },

  subgraphSection: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },

  subgraph1: {
    height: "160px",
    backgroundColor: "white",
    borderRadius: "10px",
    position: "relative",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    width: "35%",
  },

  doughnutLegend: {
    position: "absolute",
    bottom: "10px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
  },

  ecoBox: {
    width: "15px",
    height: "15px",
    backgroundColor: "#36A2EB",
    display: "inline-block",
    marginRight: "5px",
  },

  normalBox: {
    width: "15px",
    height: "15px",
    backgroundColor: "#FF6384",
    display: "inline-block",
    marginRight: "5px",
  },

  compare: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },

  compareGraph: {
    width: "41%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  iconCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#E0E0E0",
    marginRight: "10px",
  },

  textSection: {
    display: "flex",
    flexDirection: "column",
  },

  transparentText: {
    fontSize: "8px",
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.4)",
    margin: "0",
  },

  boldText: {
    margin: "0",
    fontSize: "10px",
    fontWeight: "bold",
  },

  boldBigText: {
    margin: "0",
    fontSize: "14px",
    fontWeight: "bold",
  },

  greenText: {
    color: "#4CAF50",
    fontSize: "10px",
    margin: "0",
  },

  redText: {
    color: "#FF5733",
    fontSize: "10px",
  },

  payment: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },

  paymentGraph: {
    width: "41%",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    padding: "10px",
  },

  donateText: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginLeft: "10px",
  },

  savingText: {},

  saveTheEarth: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: "10px",
  },

  treeIcon: {
    margin: "0 0 0 0px",
    width: "30px",
    height: "30px",
  },

  expandButton: {
    margin: "0 10px 0 0",
    padding: "0",
  },

  savedCostList: {
    listStyleType: "none",
    paddingLeft: "10px",
    marginTop: "10px",
    fontSize: "12px",
    position: "absolute",
    top: "100%",
    left: "10px",
    right: "10px",
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    transition: "max-height 0.3s ease, opacity 0.3s ease",
    overflow: "hidden",
    maxHeight: "0",
    opacity: 0,
    visibility: "hidden",
  },

  savedCostListOpen: {
    maxHeight: "200px",
    opacity: 1,
    visibility: "visible",
  },

  pointEarning: {
    width: "100%",
  },

  pointEarningHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  pointEarningtitle: {
    margin: 0,
    textAlign: "left",
  },

  pointEarningDetail: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  pointEarningList: {
    paddingTop: "10px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
  },

  pointEarningItem: {
    margin: "10px 20px",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  insideOfItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginLeft: "15px",
  },

  itemText: {
    flexGrow: 1,
  },

  centerContent: {
    textAlign: "center",
  },

  detButton: {
    padding: "5px 10px",
    backgroundColor: "#FF5733",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default Analytics;
