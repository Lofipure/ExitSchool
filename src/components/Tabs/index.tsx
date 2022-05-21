import { View, Text } from "@tarojs/components";
import React, { FC, forwardRef, useImperativeHandle, useState } from "react";
import "./index.less";
import { ITabsHandler, ITabsProps } from "./types";

const Tabs = forwardRef<ITabsHandler, ITabsProps>((props, ref) => {
  const { config, activeTab: __active, onChange } = props;
  const [activeTab, setActiveTab] = useState<string>(__active ?? config[0].key);

  const handelChange = (key: string) => {
    setActiveTab(key);
    onChange(key);
  };

  useImperativeHandle(ref, () => ({
    switchTab: key => setActiveTab(key)
  }));
  return (
    <View className="tabs">
      {config.map(item => (
        <View
          className={`tabs__item ${
            item.key == activeTab ? "active" : "normal"
          }`}
          onClick={() => handelChange(item.key)}
        >
          <Text>{item.label}</Text>
        </View>
      ))}
    </View>
  );
});

export default Tabs;
