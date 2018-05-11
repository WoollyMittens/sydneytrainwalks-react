import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import App from "./containers/App";
import appReducer from "./reducers";
const store = createStore(appReducer);

if (!window.cordova) {
	var onDeviceReady = new Event("deviceready");
	window.requestAnimationFrame(function() {
		document.dispatchEvent(onDeviceReady);
	});
};

document.addEventListener('deviceready', function() {
	ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
}, false);
