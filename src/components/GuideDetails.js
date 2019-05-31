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

	onLocationRequested(key, evt) {
		evt.preventDefault();
		const {showLocation} = this.props;
		showLocation(key);
	}

	getDescription(description) {
		return {
			__html: '<p>' + description.join('</p><p>') + '</p>'
		};
	}

	getLandmark(landmark) {
		return {
			__html: landmark.description
		};
	}

	getLandmarks(landmarks, assets) {
		const {active} = this.props;
		const assetsKey = assets ? assets.prefix : active;
		const smallImagePath = Config.localAssetsURL + "small/" + assetsKey + "/";
		const mediumImagePath = Config.remoteAssetsURL + "medium/" + assetsKey + "/";
		return landmarks.map(landmark => {
			if (!landmark.photo) return false;
			var photoKey = landmark.photo;
			var imgStyle = {
				"backgroundImage": "url(" + smallImagePath + photoKey + ".jpg)"
			};
			var markerClass = "guide-landmark";
			if (landmark.optional) markerClass = "guide-optional";
			if (landmark.detour) markerClass = "guide-detour";
			if (landmark.attention) markerClass = "guide-attention";
			var guideText = Config.editMode
				?	<span className="guide-text"><textarea name="guide-text-editor" onChange={this.saveEdits.bind(this, photoKey, assetsKey)} defaultValue={this.loadEdits(photoKey, assetsKey, landmark)}></textarea></span>
				: <span className="guide-text"><span dangerouslySetInnerHTML={this.getLandmark(landmark)}/> <button className="guide-locate" onClick={this.onLocationRequested.bind(this, photoKey)}>Show location</button></span>;
			return (<p key={photoKey} className={markerClass}>
				<a className="guide-thumbnail" style={imgStyle} href={mediumImagePath + photoKey} onClick={this.onPhotoPicked.bind(this, photoKey)}>
					<img alt="" src={smallImagePath + photoKey}/>
				</a>
				{guideText}
			</p>);
		});
	}

	loadEdits(photoKey, assetsKey, defaultValue) {
		var storedValue = window.localStorage.getItem("edits") || "{}";
		storedValue = JSON.parse(storedValue);
		if (storedValue[assetsKey] && storedValue[assetsKey][photoKey]) {
			return storedValue[assetsKey][photoKey];
		}
		return defaultValue;
	}

	saveEdits(photoKey, assetsKey, evt) {
		var edits = window.localStorage.getItem("edits") || "{}";
		edits = JSON.parse(edits);
		if (!edits[assetsKey]) edits[assetsKey] = {};
		edits[assetsKey][photoKey] = evt.target.value;
		edits = JSON.stringify(edits);
		window.localStorage.setItem("edits", edits);
		console.log("storeEdits", edits);
	}

	addDetails(guide) {
		const {active} = this.props;
		const last = guide.markers.length - 1;
		return (<article className="guide-details">
			<div dangerouslySetInnerHTML={this.getDescription(guide.description)}></div>
			<div className="guide-instructions">
				<p>{"It takes about " + guide.duration + " hours to complete the full " + guide.length + " kilometre walk, but plan extra for plenty of breaks and photography stops. Consider that there's a lot to see along the way."}</p>
				<h2>Getting there and back</h2>
				<p>
					{"Get the " + guide.markers[0].type + " to " + guide.markers[0].location + " using "}
					<a href={"https://transportnsw.info/trip#/?to=" + guide.markers[0].location}>transportnsw.info</a>.{" "}
					{"Plan your return trip from " + guide.markers[last].location + " at "}
					<a href={"https://transportnsw.info/trip#/?to=" + guide.markers[last].location}>transportnsw.info</a>.
				</p>
				<h2>Along the way</h2>
			</div>
			{this.getLandmarks(guide.markers, guide.assets)}
			<div className="guide-instructions">
				<h2>What to bring</h2>
				<ul>
					<li>Check the <a href="http://www.nationalparks.nsw.gov.au/alert/state-alerts">national parks website</a> for possible detours, closures and restrictions.</li>
					<li>Install an <a href="http://wiki.openstreetmap.org/">OpenStreetMap app</a> and preload the area.</li>
					<li>Download the <a href={"./inc/gpx/" + active + ".gpx"}>GPS data</a> if your device can import it.</li>
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
