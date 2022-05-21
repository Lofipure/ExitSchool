interface IWidget {
  string;
  image;
  date;
  time;
}

export interface IFormRule {
  field: string;
  label: string;
  placeholder?: string;
  extraProps?: Record<string, any>;
  type: keyof IWidget;
}

export interface IFormProps {
  className?: string;
  columns: IFormRule[];
}

export interface IFormHandler {
  getFieldsValue: <T extends Record<string, any>>() => T;
}
