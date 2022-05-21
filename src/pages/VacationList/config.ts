import { IFormRule } from "@/components/Form/types";
import { ITabConfig } from "@/components/Tabs/types";

export const tabsConfig: ITabConfig[] = [
  {
    key: "list",
    label: "请假记录"
  },
  {
    key: "create",
    label: "提交请假"
  }
];

export const createAtomRule: IFormRule[] = [
  {
    label: "请假理由",
    field: "reason",
    type: "string"
  },
  {
    label: "开始日期",
    field: "startDate",
    type: "date"
  },
  {
    label: "开始时间",
    field: "startTime",
    type: "time"
  },
  {
    label: "结束日期",
    field: "endDate",
    type: "date"
  },
  {
    label: "结束时间",
    field: "endTime",
    type: "time"
  },
  {
    label: "紧急联系人",
    field: "telephone",
    type: "string"
  },
  {
    label: "辅导员姓名",
    field: "teacher",
    type: "string"
  }
];
