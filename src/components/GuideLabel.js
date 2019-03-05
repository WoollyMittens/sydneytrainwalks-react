import React from "react";
import {Component} from "react";
import '../styles/guide-label.css';
import trainIcon from "../icons/sign_train_3.svg";
import busIcon from "../icons/sign_bus.svg";
import ferryIcon from "../icons/sign_water_transport.svg";
import tramIcon from "../icons/sign_tramway.svg";

class GuideLabel extends Component {

	getIcon(type) {
		switch (type) {
			case "train":
				return trainIcon;
			case "bus":
				return busIcon;
			case "ferry":
				return ferryIcon;
			case "tram":
				return tramIcon;
			default:
				return null;
		}
	}

	render() {
		const {guide} = this.props;
		return (
			<div className="guide-label">
				<span className={"guide-label-station guide-label-" + guide.markers.start.type}>
					<img alt={guide.markers.start.type} src={this.getIcon(guide.markers.start.type)}/> {guide.markers.start.location}
				</span>
				<span className="guide-label-park">
					{guide.location}
					<em>{guide.length}km / {guide.duration}hr</em>
				</span>
				<span className={"guide-label-station guide-label-" + guide.markers.end.type}>
					<img alt={guide.markers.end.type} src={this.getIcon(guide.markers.end.type)}/> {guide.markers.end.location}
				</span>
			</div>);
	}

}

export default GuideLabel;
