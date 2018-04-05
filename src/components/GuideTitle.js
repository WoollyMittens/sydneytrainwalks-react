import React from "react";
import {Component} from "react";
import '../styles/guide-title.css';
import logoIcon from "../icons/logo.svg";

class GuideTitle extends Component {

	render() {
		return (<header className="guide-title">
			<h1><img alt="" src={logoIcon}/> Sydney Train Walks</h1>
		</header>);
	}

}

export default GuideTitle;
