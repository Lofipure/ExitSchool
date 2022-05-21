import { IBoardAtomRule } from "@/components/InfoBoard/types";

export const infoBoardConfig: IBoardAtomRule[] = [
  {
    field: "status",
    label: "请假状态",
    defaultValue: "假期中",
    isBold: true
  },
  {
    field: "start",
    label: "开始时间",
    isBold: true
  },
  {
    field: "end",
    label: "结束时间",
    isBold: true
  },
  {
    field: "is_leave_school",
    label: "是否离校",
    defaultValue: "是",
    isBold: true
  },
  {
    field: "place",
    label: "外出地点",
    defaultValue: "陕西省西安市雁塔区"
  },
  {
    field: "return_place",
    label: "销假地点",
    defaultValue: "骊山校园"
  },
  {
    field: "telephone",
    label: "紧急联系电话"
  },
  {
    field: "reason",
    label: "请假事由"
  }
];
