import React from "react";
import {Component} from "react";
import '../styles/guide-about.css';

class GuideAbout extends Component {

	render() {
		return (<article className="guide-about">
			<h2>About This App</h2>
			<p>
				<strong>Sydney Train Walks</strong>
				<br/>Version 2.2.0
			</p>
			<p>Thank you for supporting Sydney Train Walks. You make it possible for me to expand this guide and motivate people to enjoy Sydney's varied landscapes.</p>
			<p>Please add your <a href="https://github.com/WoollyMittens/sydneytrainwalks-react/issues">suggestions and bug reports on GitHub</a>, or send them to <a href="mailto:info@sydneytrainwalks.com">info@sydneytrainwalks.com</a>.</p>
			<h2>Credits</h2>
			<p>App, photography and GPS logs &copy; Maurice van Creij, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>.</p>
			<p>Maps &copy; <a href="http://www.4umaps.eu/">4UMaps</a>. Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>.</p>
			<h2>Disclaimer</h2>
			<p>Please do not rely solely on this app for your navigation. There is no warranty on the accuracy or reliability of this app. Always carry a real paper map, which are readily available from park offices and tourist information centres.</p>
		</article>);
	}

}

export default GuideAbout;
