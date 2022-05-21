import React, { ElementRef, FC, useRef, useState } from "react";
import { View, Text } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { AtAvatar, AtButton, AtIcon, AtToast } from "taro-ui";
import Form from "@/components/Form";
import { IUserInfo } from "@/types";
import { clearUserInfo, getUserInfo, updateUserInfo } from "@/utils";
import { userInfoCollectFormConfig } from "./config";
import "./index.less";

const Mine: FC = () => {
  const formRef = useRef<ElementRef<typeof Form>>(null);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [updateUserInfoToast, setUpdateUserInfoToast] = useState<boolean>(
    false
  );
  const [clearUserInfoToast, setClearUserInfoToast] = useState<boolean>(false);

  const handleSaveInfo = async () => {
    const userInfo = formRef.current?.getFieldsValue<IUserInfo>();
    if (userInfo) {
      const saveResult = await updateUserInfo(userInfo);
      if (saveResult) {
        setUpdateUserInfoToast(true);
        setUserInfo(userInfo);
        setTimeout(() => {
          setUpdateUserInfoToast(false);
        });
      }
    }
  };

  const resetUserInfo = async () => {
    if (await clearUserInfo()) {
      setUserInfo(undefined);
      setClearUserInfoToast(true);
      setTimeout(() => {
        setClearUserInfoToast(false);
      });
    }
  };

  const mounted = async () => {
    const userInfo = await getUserInfo();
    if (userInfo && typeof userInfo == "object") {
      setUserInfo(userInfo);
    }
  };

  useDidShow(() => {
    mounted();
  });

  return (
    <View className="mine">
      <AtToast
        status="success"
        text="更新成功"
        duration={1000}
        hasMask
        isOpened={updateUserInfoToast}
      />
      <AtToast
        status="success"
        text="清除成功"
        duration={1000}
        hasMask
        isOpened={clearUserInfoToast}
      />
      {!userInfo ? (
        <>
          <Form ref={formRef} columns={userInfoCollectFormConfig} />
          <AtButton onClick={handleSaveInfo} className="mine__btn">
            保存信息
          </AtButton>
        </>
      ) : (
        <View className="user-info">
          <View className="user-info__card">
            <View className="avatar">
              <AtAvatar image={userInfo?.avatar} circle size="large" />
            </View>
            <View className="info">
              <View className="info__item">
                <AtIcon value="user" className="info__item__icon" size={18} />
                <Text>{`${userInfo?.username}(${userInfo?.id})`}</Text>
              </View>
              <View className="info__item">
                <AtIcon
                  value="map-pin"
                  className="info__item__icon"
                  size={18}
                />
                <Text>{`${userInfo?.college} - ${userInfo?.class}`}</Text>
              </View>
            </View>
          </View>
          <AtButton className="user-info__btn" onClick={resetUserInfo}>
            清空缓存
          </AtButton>
        </View>
      )}
    </View>
  );
};

export default Mine;
