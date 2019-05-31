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
		const last = guide.markers.length - 1;
		return (
			<div className="guide-label">
				<span className={"guide-label-station guide-label-" + guide.markers[0].type}>
					<img alt={guide.markers[0].type} src={this.getIcon(guide.markers[0].type)}/> {guide.markers[0].location}
				</span>
				<span className="guide-label-park">
					{guide.location}
					<em>{guide.length}km / {guide.duration}hr</em>
				</span>
				<span className={"guide-label-station guide-label-" + guide.markers[last].type}>
					<img alt={guide.markers[last].type} src={this.getIcon(guide.markers[last].type)}/> {guide.markers[last].location}
				</span>
			</div>);
	}

}

export default GuideLabel;
