export interface ITabConfig {
  label: string;
  key: string;
}

export interface ITabsProps {
  config: ITabConfig[];
  activeTab?: string;
  onChange: (key: string) => void;
}

export interface ITabsHandler {
  switchTab: (key: string) => void;
}
