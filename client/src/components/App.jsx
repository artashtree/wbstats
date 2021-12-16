import React from "react";
// import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import store from "../store";
import Main from "./Main";

const App = () => (
  // <Provider store={store}>
    <Router>
      <Route path="/" component={Main} />
    </Router>
  // </Provider>
);

export default App;
