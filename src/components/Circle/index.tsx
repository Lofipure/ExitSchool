import { View, Text } from "@tarojs/components";
import React, { FC } from "react";
import "./during.less";
import "./done.less";

interface ICircleProps {
  type: "during" | "done";
}

const Circle: FC<ICircleProps> = props => {
  const { type } = props;

  return (
    <View className={`circle-${type}`}>
      <View className={`circle-${type}__inner`}>
        <View className={`circle-${type}__content`}>
          <View className={`circle-${type}__text`}>
            <Text>{type == "done" ? "已销假" : "假期中"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Circle;
