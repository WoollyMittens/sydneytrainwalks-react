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
