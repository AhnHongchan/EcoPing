import React from "react";

import MypagePoint from "@/components/mypage-component/mypage-point";
import MyPageSlide from "@/components/mypage-component/mypage-slide";
import MypageUserButton from "@/components/mypage-component/mypage-userbutton";

const MyPage = () => {

  return (
    <div>
      <div>
        <div>
          <div>마이페이지</div>
          <MypagePoint showHistoryButton={true} />
        </div>
        <MypageUserButton />
        <MyPageSlide />
      </div>
    </div>
  );
};

export default MyPage;
