// 주식 더미 데이터 타입 정의
export interface StockItem {
  stockId: string;
  stockName: string;
  currentPrice: number;
  priceDifference: string;
  rateDifference: number;
  isInterested: boolean;
}

// 20개의 더미 데이터 정의
export const investList: StockItem[] = [
  {
    stockId: "005930",
    stockName: "Samsung Electronics",
    currentPrice: 72100,
    priceDifference: "-200",
    rateDifference: -0.28,
    isInterested: true,
  },
  {
    stockId: "000660",
    stockName: "SK Hynix",
    currentPrice: 123000,
    priceDifference: "500",
    rateDifference: 0.41,
    isInterested: false,
  },
  {
    stockId: "035420",
    stockName: "NAVER",
    currentPrice: 350000,
    priceDifference: "1000",
    rateDifference: 0.29,
    isInterested: true,
  },
  {
    stockId: "051910",
    stockName: "LG Chem",
    currentPrice: 620000,
    priceDifference: "-1500",
    rateDifference: -0.24,
    isInterested: false,
  },
  {
    stockId: "207940",
    stockName: "Samsung Biologics",
    currentPrice: 800000,
    priceDifference: "2000",
    rateDifference: 0.25,
    isInterested: true,
  },
  {
    stockId: "005380",
    stockName: "Hyundai Motor",
    currentPrice: 210000,
    priceDifference: "-300",
    rateDifference: -0.14,
    isInterested: false,
  },
  {
    stockId: "000270",
    stockName: "Kia",
    currentPrice: 85000,
    priceDifference: "-50",
    rateDifference: -0.06,
    isInterested: true,
  },
  {
    stockId: "105560",
    stockName: "KB Financial Group",
    currentPrice: 60000,
    priceDifference: "100",
    rateDifference: 0.17,
    isInterested: false,
  },
  {
    stockId: "035720",
    stockName: "Kakao",
    currentPrice: 98000,
    priceDifference: "-120",
    rateDifference: -0.12,
    isInterested: true,
  },
  {
    stockId: "012330",
    stockName: "Hyundai Mobis",
    currentPrice: 250000,
    priceDifference: "-500",
    rateDifference: -0.2,
    isInterested: false,
  },
  {
    stockId: "066570",
    stockName: "LG Electronics",
    currentPrice: 145000,
    priceDifference: "300",
    rateDifference: 0.21,
    isInterested: true,
  },
  {
    stockId: "068270",
    stockName: "Celltrion",
    currentPrice: 175000,
    priceDifference: "-700",
    rateDifference: -0.4,
    isInterested: false,
  },
  {
    stockId: "096770",
    stockName: "SK Innovation",
    currentPrice: 180000,
    priceDifference: "400",
    rateDifference: 0.23,
    isInterested: true,
  },
  {
    stockId: "034730",
    stockName: "SK Holdings",
    currentPrice: 280000,
    priceDifference: "1500",
    rateDifference: 0.54,
    isInterested: false,
  },
  {
    stockId: "010950",
    stockName: "S-Oil",
    currentPrice: 90000,
    priceDifference: "-200",
    rateDifference: -0.22,
    isInterested: true,
  },
  {
    stockId: "028260",
    stockName: "Samsung C&T",
    currentPrice: 130000,
    priceDifference: "500",
    rateDifference: 0.38,
    isInterested: false,
  },
  {
    stockId: "011170",
    stockName: "Lotte Chemical",
    currentPrice: 220000,
    priceDifference: "-800",
    rateDifference: -0.36,
    isInterested: true,
  },
  {
    stockId: "003550",
    stockName: "LG",
    currentPrice: 90000,
    priceDifference: "100",
    rateDifference: 0.11,
    isInterested: false,
  },
  {
    stockId: "004020",
    stockName: "Hyundai Steel",
    currentPrice: 42000,
    priceDifference: "150",
    rateDifference: 0.36,
    isInterested: true,
  },
  {
    stockId: "005490",
    stockName: "POSCO Holdings",
    currentPrice: 300000,
    priceDifference: "-1200",
    rateDifference: -0.4,
    isInterested: false,
  }
];
