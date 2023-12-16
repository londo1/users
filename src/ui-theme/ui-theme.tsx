import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { defaultThemeConfig } from "./default-theme.config";

export const UiTheme = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider theme={defaultThemeConfig}>{children}</ConfigProvider>;
};
