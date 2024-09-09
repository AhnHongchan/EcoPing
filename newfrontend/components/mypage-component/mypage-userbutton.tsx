import React from 'react';
import Link from 'next/link'; 
import styles from './mypage-userbutton.module.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const MypageUserButton = () => {
  return (
    <div className={styles.userInfoSection}>
      <div className={styles.buttonGroup}>
        <Link href="/profile" className={styles.infoButton}>
          <i className={`bi bi-person ${styles.icon}`}></i>
          내 정보
        </Link>
        <Link href="/cards" className={styles.infoButton}>
          <i className={`bi bi-credit-card ${styles.icon}`}></i>
          등록된 카드
        </Link>
        <Link href="/archive" className={styles.infoButton}>
          <i className={`bi bi-archive ${styles.icon}`}></i>
          보관함
        </Link>
        <Link href="/qna" className={styles.infoButton}>
          <i className={`bi bi-question-circle ${styles.icon}`}></i>
          문의하기
        </Link>
      </div>
    </div>
  );
};

export default MypageUserButton;
