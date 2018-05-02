import React from "react";
import {Component} from "react";
import '../styles/guide-label.css';
import trainIcon from "../icons/sign_train_3.svg";
import busIcon from "../icons/sign_bus.svg";
import ferryIcon from "../icons/sign_water_transport.svg";

class GuideLabel extends Component {

	getIcon(method) {
		switch (method) {
			case "train":
				return trainIcon;
			case "bus":
				return busIcon;
			case "ferry":
				return ferryIcon;
			default:
				return null;
		}
	}

	render() {
		const {guide} = this.props;
		return (
			<div className="guide-label">
				<span className="guide-label-station">
					<img alt={guide.markers.start.method} src={this.getIcon(guide.markers.start.method)}/> {guide.markers.start.location}
				</span>
				<span className="guide-label-park">
					{guide.location}
					<em>{guide.length}km / {guide.duration}hr</em>
				</span>
				<span className="guide-label-station">
					<img alt={guide.markers.end.method} src={this.getIcon(guide.markers.end.method)}/> {guide.markers.end.location}
				</span>
			</div>);
	}

}

export default GuideLabel;
