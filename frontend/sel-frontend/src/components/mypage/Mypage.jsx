import React from "react";
import styles from "./Mypage.module.css";
import MyPointHeader from "../mypoint/MyPointHeader";
import MyPageSlide from "./MyPageSlide";
import UserInfoSection from "./UserInfoSection";

const MyPage = () => {
  const userPoints = 1251; // This should come from your state or props

  return (
    <div className={styles.fullBackGroundColor}>
      <div className={styles.myPage}>
        <div className={styles.header}>
          <div className={styles.headerTop}>마이페이지</div>
          <MyPointHeader />
        </div>
        <UserInfoSection />
        <MyPageSlide />
      </div>
    </div>
  );
};

export default MyPage;
