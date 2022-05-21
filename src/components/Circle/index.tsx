import { View, Text } from "@tarojs/components";
import React, { FC } from "react";
import "./index.less";

interface ICircleProps {
  type: "during" | "done";
}

const Circle: FC<ICircleProps> = props => {
  const { type } = props;

  return type == "done" ? (
    <View className="circle-done">
      <View className="circle-done__inner">
        <View className="circle-done__content">
          <View className="circle-done__text">
            <Text>已销假</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View className="circle-during">
      <View className="circle-during__inner">
        <View className="circle-during__content">
          <View className="circle-during__text">
            <Text>假期中</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Circle;
