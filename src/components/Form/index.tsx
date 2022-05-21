import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Picker, View, Text } from "@tarojs/components";
import { AtInput, AtImagePicker, AtList, AtListItem } from "taro-ui";
import { File } from "taro-ui/types/image-picker";
import { getBase64 } from "@/utils";
import { IFormHandler, IFormProps, IFormRule } from "./types";
import "./index.less";

const Form = forwardRef<IFormHandler, IFormProps>((props, ref) => {
  const { columns, className } = props;
  const [value, setValue] = useState<Record<string, any>>({});
  const [imageFile, setImageFile] = useState<Record<string, File[]>>({});
  const handleChangField = (fields: string, fieldsValue: any) => {
    setValue({
      ...value,
      [fields]: fieldsValue
    });
  };

  useImperativeHandle(ref, () => ({
    getFieldsValue: () => value as any
  }));

  const renderWidget = (item: IFormRule) => {
    const { type, extraProps, field, placeholder } = item;
    switch (type) {
      case "string": {
        return (
          <AtInput
            border
            {...extraProps}
            name={field}
            value={value[field]}
            onChange={__value => {
              handleChangField(field, __value);
            }}
            placeholder={placeholder}
          />
        );
      }
      case "image": {
        return (
          <AtImagePicker
            count={1}
            files={imageFile?.[field]}
            onChange={async file => {
              setImageFile({
                ...imageFile,
                [field]: file
              });
              handleChangField(field, await getBase64(file[0].url));
            }}
          />
        );
      }
      case "date": {
        return (
          <Picker
            mode="date"
            value={value[field]}
            onChange={event => {
              handleChangField(field, event.detail.value);
            }}
          >
            <AtList>
              <AtListItem
                title={value[field]}
                className="picker"
                hasBorder={false}
              />
            </AtList>
          </Picker>
        );
      }
      case "time": {
        return (
          <Picker
            mode="time"
            value={value[field]}
            onChange={event => {
              handleChangField(field, event.detail.value);
            }}
          >
            <AtList>
              <AtListItem
                title={value[field]}
                className="picker"
                hasBorder={false}
              />
            </AtList>
          </Picker>
        );
      }
    }
  };
  return (
    <View className={`form ${className}`}>
      {columns?.map(item => (
        <View className="form__item">
          <View className="form__item__label">{item.label}</View>
          <View className="form__item__widget">{renderWidget(item)}</View>
        </View>
      ))}
    </View>
  );
});

export default Form;
