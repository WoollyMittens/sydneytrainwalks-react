import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guide-details.css';

class GuideDetails extends Component {

	onPhotoPicked(key, evt) {
		evt.preventDefault();
		const {pickPhoto} = this.props;
		pickPhoto(key);
	}

	getDescription(description) {
		return {
			__html: '<p>' + description.join('</p><p>') + '</p>'
		};
	}

	getLandmarks(landmarks, assets) {
		const {active} = this.props;
		const assetsKey = assets
			? assets.prefix
			: active;
		const smallImagePath = Config.localAssetsURL + "small/" + assetsKey + "/";
		const mediumImagePath = Config.remoteAssetsURL + "medium/" + assetsKey + "/";
		return Object.keys(landmarks).map(key => {
			var imgStyle = {
				"backgroundImage": "url(" + smallImagePath + key + ".jpg)"
			};
			var isOptional = /OPTIONAL: /.test(landmarks[key])
				? "guide-optional"
				: "guide-landmark";
			return (<p key={key} className={isOptional}>
				<a className="guide-thumbnail" style={imgStyle} href={mediumImagePath + key + ".jpg"} onClick={this.onPhotoPicked.bind(this, key + ".jpg")}>
					<img alt="" src={smallImagePath + key + ".jpg"}/>
				</a>
				<span className="guide-text">{landmarks[key].replace(/OPTIONAL: /, '')}</span>
			</p>);
		});
	}

	addDetails(guide) {
		return (<article className="guide-details">
			<div dangerouslySetInnerHTML={this.getDescription(guide.description)}></div>
			<div className="guide-instructions">
				<p>It takes about TODO hours to complete the full TODO kilometre walk, with plenty of breaks and photography stops. A brisk walker can do this much faster, but consider that there's a lot to see along the way.</p>
				<h2>Getting there and back</h2>
				<p>Get the TODO to TODO using <a href="https://transportnsw.info/trip#/?to=TODO">transportnsw.info</a>. Plan your return trip from TODO at <a href="https://transportnsw.info/trip#/?to=TODO">transportnsw.info</a>.</p>
				<h2>Along the way</h2>
			</div>
			{this.getLandmarks(guide.landmarks, guide.assets)}
			<div className="guide-instructions">
				<h2>What to bring</h2>
				<ul>
					<li>Check the <a href="http://www.nationalparks.nsw.gov.au/alert/state-alerts">national parks website</a> for possible detours, closures and restrictions.</li>
					<li>Install an OpenStreetMap app for <a href="http://wiki.openstreetmap.org/wiki/Android">Android</a> or <a href="http://wiki.openstreetmap.org/wiki/Apple_iOS">iOS</a> and preload the area.</li>
					<li>Download the <a href="./inc/gpx/TODO.gpx">GPS data</a> if your device can import it.</li>
					<li>Print out this map and get a better one from a visitor information centre if possible.</li>
					<li>Be sure to leave enough charge in your phone's battery for emergency calls.</li>
					<li>Bring plenty of water, comfortable shoes, a hat and SPF 50 sunscreen.</li>
					<li>Also bring a light windbreaker/raincoat in case you get caught out in the rain.</li>
				</ul>
			</div>
		</article>);
	}

	render() {
		const {guide} = this.props;
		return guide
			? this.addDetails(guide)
			: null;
	}

}

export default GuideDetails;
