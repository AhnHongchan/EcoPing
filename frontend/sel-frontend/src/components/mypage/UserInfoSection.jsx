import React from 'react';
import styles from './UserInfoSection.module.css';

const UserInfoSection = () => {
  return (
    <div className={styles.userInfoSection}>
      
      <div className={styles.buttonGroup}>
        <button className={styles.infoButton}>
          <i className={`bi bi-person ${styles.icon}`}></i>
          내 정보
        </button>
        <button className={styles.infoButton}>
          <i className={`bi bi-credit-card ${styles.icon}`}></i>
          등록된 카드
        </button>
        <button className={styles.infoButton}>
          <i className={`bi bi-archive ${styles.icon}`}></i>
          보관함
        </button>
        <button className={styles.infoButton}>
          <i className={`bi bi-question-circle ${styles.icon}`}></i>
          문의하기
        </button>
      </div>
    </div>
  );
};

export default UserInfoSection;