import React, { ElementRef, useRef, useState, ReactNode } from "react";
import { AtButton, AtTabs, AtToast } from "taro-ui";
import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { getUserInfo, getVacationList, pushVacationList } from "@/utils";
import Circle from "@/components/Circle";
import { IAtom, IUserInfo } from "@/types";
import Tabs from "@/components/Tabs";
import Form from "@/components/Form";
import TimeSVG from "@/assets/svg/time.svg";
import EllipsisSVG from "@/assets/svg/ellipsis.svg";
import TimeDoneSVG from "@/assets/svg/time_done.svg";
import EllipsisDoneSVG from "@/assets/svg/ellipsis_done.svg";
import PersonSVG from "@/assets/svg/person.svg";
import FolderOpenSVG from "@/assets/svg/folder-open.svg";
import ChatBoxSVG from "@/assets/svg/chatbox.svg";
import { createAtomRule, tabsConfig } from "./config";
import "./index.less";

const List = () => {
  const [atomList, setAtomList] = useState<IAtom[]>([]);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [tabsKey, setTabsKey] = useState<string>("list");
  const [toast, setToast] = useState<boolean>(false);
  const formRef = useRef<ElementRef<typeof Form>>(null);
  const tabsRef = useRef<ElementRef<typeof Tabs>>(null);

  const updateAtomList = async () => {
    const atomList = await getVacationList();
    if (atomList && typeof atomList == "object") {
      setAtomList(atomList);
    }
  };

  const mounted = async () => {
    const [userInfo, atomList] = await Promise.all([
      getUserInfo(),
      getVacationList()
    ]);
    if (userInfo && typeof userInfo == "object") {
      setUserInfo(userInfo);
    }
    if (atomList && typeof atomList == "object") {
      setAtomList(atomList);
    }
  };

  const handleSubmit = async () => {
    const atomInfo = formRef.current?.getFieldsValue<IAtom>();
    if (atomInfo) {
      const result = await pushVacationList(atomInfo);
      if (result) {
        updateAtomList();
        tabsRef.current?.switchTab("list");
        setTabsKey("list");
      }
    }
  };

  const gotoDetail = (atomInfo: IAtom) => {
    console.log("[🔧 Debug 🔧]", "before", userInfo);
    const params = encodeURIComponent(
      JSON.stringify({ ...userInfo, ...atomInfo })
    );
    Taro.navigateTo({
      url: "/pages/VacationDetail/index?data=" + params
    });
  };

  const renderAtom = (atom: IAtom, key: number): ReactNode => {
    const { reason, startDate, startTime, endDate, endTime } = atom;
    const status = key == 0 ? "during" : "done";
    return (
      <View
        key={key}
        className={`atom ${status}`}
        onClick={() => gotoDetail(atom)}
      >
        <View className="atom__body">
          <View className="atom__body__left">
            <View className="reason">
              <Text>{reason}</Text>
            </View>
            <View className="type">
              <Image
                src={status == "during" ? EllipsisSVG : EllipsisDoneSVG}
                className="icon"
              />
              <Text>事假</Text>
            </View>
            <View className="date-time">
              <Image
                src={status == "during" ? TimeSVG : TimeDoneSVG}
                className="icon"
              />
              <Text>{`${startDate} ${startTime}`}</Text>
            </View>
            <View className="date-time">
              <Image
                src={status == "during" ? TimeSVG : TimeDoneSVG}
                className="icon"
              />
              <Text>{`${endDate} ${endTime}`}</Text>
            </View>
          </View>
          <View className="atom__body__right">
            <Circle type={status} />
          </View>
        </View>
        <View className="atom__footer">
          <View className="atom__footer__item">
            <Image src={PersonSVG} className="icon" />
            <Text>电子假条</Text>
          </View>
          <View className="atom__footer__item">
            <Image src={ChatBoxSVG} className="icon" />
            <Text>留言</Text>
          </View>
          <View className="atom__footer__item">
            <Image src={FolderOpenSVG} className="icon" />
            <Text>销假</Text>
          </View>
        </View>
      </View>
    );
  };

  useDidShow(() => {
    mounted();
  });

  return (
    <View className="vacation-list">
      <AtToast
        text="提交成功"
        isOpened={toast}
        duration={1500}
        onClose={() => {
          setToast(false);
        }}
      />
      <Tabs
        ref={tabsRef}
        config={tabsConfig}
        activeTab={tabsKey}
        onChange={key => {
          setTabsKey(key);
        }}
      />
      {tabsKey == "list" ? (
        <View className="list">{atomList.map(renderAtom)}</View>
      ) : (
        <View className="create">
          <Form ref={formRef} columns={createAtomRule} />
          <AtButton onClick={handleSubmit} className="create__btn">
            提交请假
          </AtButton>
        </View>
      )}
    </View>
  );
};

export default List;
