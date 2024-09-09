import React from "react";
import styles from "./Mypage.module.css";
import MypagePoint from "@/components/mypage-component/mypage-point";
import MyPageSlide from "@/components/mypage-component/mypage-slide";
import MypageUserButton from "@/components/mypage-component/mypage-userbutton";

const MyPage = () => {
  const userPoints: number = 1251;

  return (
    <div className={styles.fullBackGroundColor}>
      <div className={styles.myPage}>
        <div className={styles.header}>
          <div className={styles.headerTop}>마이페이지</div>
          <MypagePoint/>
        </div>
        <MypageUserButton />
        <MyPageSlide />
      </div>
    </div>
  );
};

export default MyPage;
