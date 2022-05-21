import InfoBoard from "@/components/InfoBoard";
import { IAtom, IUserInfo } from "@/types";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import moment from "moment";
import React, { FC } from "react";
import { AtAvatar, AtDivider } from "taro-ui";
import { infoBoardConfig } from "./cofig";
import "./index.less";

type DataType = IUserInfo & IAtom;

const Detail = () => {
  const detailData: DataType = JSON.parse(
    decodeURIComponent(Taro.Current.router?.params?.data ?? "")
  );

  return (
    <View className="detail">
      <View className="detail__card">
        <View className="student-info">
          <View className="student-info__left">
            <AtAvatar image={detailData.avatar} circle />
          </View>
          <View className="student-info__right">
            <View className="student-info__right__row">
              <View className="student-info__right__col username">
                <Text>{`${detailData.username}(${detailData.id})`}</Text>
              </View>
              <View className="student-info__right__col status">
                <Text>事假</Text>
              </View>
            </View>
            <View className="student-info__right__row">
              <View className="student-info__right__col college-class">
                <Text>{`${detailData.college} ${detailData.class}`}</Text>
              </View>
            </View>
          </View>
        </View>
        <AtDivider lineColor="#eee" className="divider" />
        <View className="atom-info">
          <InfoBoard
            data={{
              ...detailData,
              start: `${detailData.startDate} ${detailData.startTime}`,
              end: `${detailData.endDate} ${detailData.endTime}`
            }}
            config={infoBoardConfig}
          />
        </View>
      </View>
      <View className="detail__card">
        <View className="teacher-info">
          <View className="teacher-info__left">
            <AtAvatar text="User" circle />
          </View>
          <View className="teacher-info__right">
            <View className="teacher-info__right__row">
              <View className="teacher-info__right__col username">
                <Text>{`${detailData.teacher}(辅导员)`}</Text>
              </View>
              <View className="teacher-info__right__col time">
                <Text>{moment().format("MM.DD hh:mm")}</Text>
              </View>
            </View>
            <View className="teacher-info__right__row">
              <View className="teacher-info__right__col judge">
                <Text>审批通过</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Detail;
