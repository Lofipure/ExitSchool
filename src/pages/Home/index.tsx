import React, { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtToast } from "taro-ui";
import "./index.less";
import { getUserInfo } from "@/utils";

const Home = () => {
  const [toast, setToast] = useState<boolean>(false);

  const handleGotoVacation = () => {
    Taro.navigateTo({
      url: "/pages/VacationList/index"
    });
  };

  const handleLogin = () => {
    setToast(false);
    Taro.switchTab({
      url: "/pages/Mine/index"
    });
  };

  const mounted = async () => {
    const userInfo = await getUserInfo();
    if (!userInfo) {
      setToast(true);
    }
  };

  useDidShow(() => {
    mounted();
  });

  return (
    <View className="home">
      <AtToast
        isOpened={toast}
        duration={1000}
        onClose={handleLogin}
        hasMask
        status="error"
        text="请先登录"
      />
      <AtList>
        <AtListItem
          title="请假"
          iconInfo={{
            value: "map-pin"
          }}
          onClick={handleGotoVacation}
        ></AtListItem>
      </AtList>
    </View>
  );
};

export default Home;
