import * as React from "react";
import { ConfigProvider } from "antd";
import { NextFont } from "next/dist/compiled/@next/font";

export default function ThemeProvider({
  children,
  font
}: Readonly<{
  children: React.ReactNode;
  font: NextFont
}>) {
  return (
    <ConfigProvider direction="ltr" 
    theme={{
      token: {
        colorPrimary: "#4CCAAE",
        fontFamily: font.style.fontFamily,
        fontSize: 16,
        borderRadius: 8,
        colorTextPlaceholder: '#BEBEBE',
        colorTextQuaternary: '#a3a3a3',
        colorTextTertiary: '#737373', 
      },
      components :{
        Tabs: {
          colorText: '#e5e5e5',
          colorPrimaryHover: '#A3A3A3',
          lineWidthBold: 3,
          colorBorderSecondary: '#A3A3A3',
        },
        Input: {
          fontSize: 18,
          paddingBlock: 16,
          paddingInline: 20,
          colorText: "#525252"
        },
        Button: {
          fontSize: 14,
          paddingBlock: 7,
          paddingInline: 12,
          controlHeight: 38,
          colorBgContainer: '#d4d4d4',
          fontSizeLG: 18,
          paddingBlockLG: 16,
          paddingInlineLG: 20,
          controlHeightLG: 59
        },
        Select: {
          colorBgElevated: '#555555',
          colorBorder: '#737373',
          colorText: '#BEBEBE',
          colorSplit: '#606060',
          optionSelectedBg: '#737373',
          optionSelectedColor: '#e5e5e5',
          optionSelectedFontWeight: 400,
          selectorBg: '#555555',
          colorTextPlaceholder: '#BEBEBE',
          colorTextQuaternary: '#BEBEBE',
        }
      }
    }}>
      {children}
    </ConfigProvider>
  );
}