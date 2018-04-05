import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guide-label.css';
import trainIcon from "../icons/sign_train_3.svg";
import busIcon from "../icons/sign_bus.svg";
import ferryIcon from "../icons/sign_water_transport.svg";
import durationIcon from "../icons/duration.png";
import walkingIcon from "../icons/walking.png";

class GuideLabel extends Component {

	getIcon(method) {
		switch (method) {
			case "train":
				return trainIcon;
			case "bus":
				return busIcon;
			case "ferry":
				return ferryIcon;
			case "duration":
				return durationIcon;
			case "park":
				return walkingIcon;
			default:
				return null;
		}
	}

	render() {
		const {guide, name} = this.props;
		const path = Config.localAssetsURL + "wide/";
		const bgStyle = {
			backgroundImage: "url(" + path + name + ".jpg)"
		};
		return (
			<div className="guide-label" style={bgStyle}>
				<span className="guide-label-station">
					<img alt="from" src={this.getIcon(guide.markers.start.method)}/> {guide.markers.start.location}
				</span>
				<span className="guide-label-park">
					<img alt="via" src={this.getIcon("park")}/> {guide.location}
					<em><img alt="duration" src={this.getIcon("duration")}/> {guide.length}km/{guide.duration}hr</em>
				</span>
				<span className="guide-label-station">
					<img alt="to" src={this.getIcon(guide.markers.end.method)}/> {guide.markers.end.location}
				</span>
			</div>);
	}

}

export default GuideLabel;
