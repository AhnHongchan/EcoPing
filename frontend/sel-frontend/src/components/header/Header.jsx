import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
// 아이콘들
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventIcon from "@mui/icons-material/Event";
import CampaignIcon from "@mui/icons-material/Campaign";
import NatureIcon from "@mui/icons-material/Nature";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School"; // 추가한 아이콘

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.HeaderWrapper}>
      <div
        className={`${styles.HeaderBackground} ${
          isScrolled ? styles.scrolled : ""
        }`}
      />
      <div className={styles.HeaderMain}>
        <MenuIcon
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={toggleMenu}
        />
        <HomeIcon
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={goHome}
        />
      </div>

      {/* Slide Menu */}
      <div className={`${styles.SideMenu} ${showMenu ? styles.show : ""}`}>
        <div className={styles.MenuHeader}>
          <CloseIcon onClick={toggleMenu} className={styles.CloseIcon} />
        </div>
        <div className={styles.MenuContent}>
          {/* Home Section */}
          <div className={styles.SectionHeader}>홈</div>
          <Link to="/" className={styles.MenuItem} onClick={toggleMenu}>
            <HomeIcon className={styles.MenuIcon} /> 홈 화면
          </Link>

          {/* My Information Section */}
          <div className={styles.SectionHeader}>내 정보</div>
          <Link to="/mypage" className={styles.MenuItem} onClick={toggleMenu}>
            <AccountCircleIcon className={styles.MenuIcon} /> 내 정보
          </Link>
          <Link to="/mypoint" className={styles.MenuItem} onClick={toggleMenu}>
            <AttachMoneyIcon className={styles.MenuIcon} /> 내 포인트
          </Link>
          <Link to="/analytics" className={styles.MenuItem} onClick={toggleMenu}>
            <DashboardIcon className={styles.MenuIcon} /> 나의 에코 소비 분석
          </Link>

          {/* Point Earning Section */}
          <div className={styles.SectionHeader}>포인트 적립</div>
          <Link to="/campaignList" className={styles.MenuItem} onClick={toggleMenu}>
            <CampaignIcon className={styles.MenuIcon} /> 친환경 캠페인 보기
          </Link>
          <Link to="/calendar" className={styles.MenuItem} onClick={toggleMenu}>
            <EventIcon className={styles.MenuIcon} /> 출석체크 하기
          </Link>
          <Link to="/tree" className={styles.MenuItem} onClick={toggleMenu}>
            <NatureIcon className={styles.MenuIcon} /> 나무 키우기
          </Link>
          <Link to="/todayquiz" className={styles.MenuItem} onClick={toggleMenu}>
  <SchoolIcon className={styles.MenuIcon} /> 오늘의 퀴즈
</Link>
        </div>
      </div>

      {/* Overlay */}
      {showMenu && <div className={styles.Overlay} onClick={toggleMenu}></div>}
    </div>
  );
};

export default Header;
