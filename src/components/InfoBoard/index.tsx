import React, { FC } from "react";
import { View, Text } from "@tarojs/components";
import { IBoardProps } from "./types";
import "./index.less";

const InfoBoard: FC<IBoardProps> = props => {
  const { data, config } = props;
  return (
    <View className="board">
      {config.map(item => {
        const { field, label, isBold = false, defaultValue = "--" } = item;
        return (
          <View
            key={field}
            className={`board__item ${isBold ? "bold" : "normal"}`}
          >
            <Text>
              {label}：{data?.[field] ?? defaultValue}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default InfoBoard;
