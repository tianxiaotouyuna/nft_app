import "react-native-gesture-handler";

import React from "react";
import WalletProvider from "./provider/WalletProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <WalletProvider />
    </Provider>
  );
};

export default App;
