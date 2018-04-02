import React from "react";
import {Component} from "react";
import Config from '../config.json';

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
		return Object.keys(landmarks).map(key => <p key={key}>
			<a href={mediumImagePath + key + ".jpg"} onClick={this.onPhotoPicked.bind(this, key + ".jpg")}><img alt="" src={smallImagePath + key + ".jpg"}/></a>{landmarks[key]}</p>);
	}

	addDetails(guide) {
		return (<article className="guide-details">
			<h1>From {guide.markers.start.location}{" "}
				to {guide.markers.end.location}{" "}
				via {guide.location}</h1>
			<div dangerouslySetInnerHTML={this.getDescription(guide.description)}></div>
			{this.getLandmarks(guide.landmarks, guide.assets)}
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
