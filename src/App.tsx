import React from "react";
import { Router } from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { UiTheme } from "./ui-theme/ui-theme";
import { message } from "antd";
import { MessageInstance } from "antd/lib/message/interface";

export const MessageApiContext = React.createContext(
  {} as unknown as MessageInstance,
);

const App = () => {
  const [messageApi, messageApiContextHolder] = message.useMessage();

  return (
    <UiTheme>
      {messageApiContextHolder}
      <Provider store={store}>
        <MessageApiContext.Provider value={messageApi}>
          <Router />
        </MessageApiContext.Provider>
      </Provider>
    </UiTheme>
  );
};

export default App;
