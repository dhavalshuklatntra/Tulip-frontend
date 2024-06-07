const config = {
  token: {
    //Colors
    colorBgLayout: '#f8f7fa',
    colorPrimary: '#4f46e5', // Your Brand color
    colorSuccess: '#10b981', //Used to represent the token sequence of operation success, such as Result,
    colorError: '#ff5724', //Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc.
    colorInfo: '#0ea5e9', //Used to represent the operation information of the Token sequence, such as Alert, Tag, Progress, and other components use these map tokens.
    colorLink: '#4f46e5', //Control the color of hyperlink.
    colorWarning: '#ff9800', //Used to represent the warning map token, such as Notification, Alert, etc.
    borderRadius: 6,
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 34,
    controlHeightXS: 32,
    fontFamily: `"Public Sans",sans-serif`,
  },
  components: {
    Button: {
      textHoverBg: '#e2e8f0',
      colorBgContainerDisabled: '#f1f4f8',
      colorTextDisabled: '#878e98',
      //Primary Button
      colorPrimaryHover: '#4338ca',
      defaultColor: '#1e293b',
    },
    Input: {
      inputFontSizeLG: 14,
    },
    DatePicker: {
      fontSizeLG: 14,
    },
    Typography: {},
  },
}
export default config
