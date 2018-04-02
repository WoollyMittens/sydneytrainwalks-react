import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guides-title.css';

class GuideTitle extends Component {

	render() {
		return (<header className="guides-title">
			<h1>Sydney Train Walks</h1>
		</header>);
	}

}

export default GuideTitle;
