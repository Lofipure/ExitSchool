import { IFormRule } from "@/components/Form/types";

export const userInfoCollectFormConfig: IFormRule[] = [
  {
    field: "username",
    label: "姓名",
    type: "string"
  },
  {
    field: "id",
    label: "学号",
    type: "string"
  },
  {
    field: "college",
    label: "学院",
    type: "string"
  },
  {
    field: "class",
    label: "班级",
    type: "string"
  },
  {
    field: "avatar",
    label: "头像",
    type: "image"
  }
];
