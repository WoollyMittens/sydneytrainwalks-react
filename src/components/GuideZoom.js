import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guide-zoom.css';

class GuideZoom extends Component {

	onClosed(evt) {
		evt.preventDefault();
		const {resetPhoto} = this.props;
		resetPhoto();
	}

	addZoom(photo) {
		const mediumImagePath = Config.remoteAssetsURL + "medium/" + photo.key + "/";
		return (<figure className="guide-zoom"><a onClick={this.onClosed.bind(this)} href="">Close</a><img alt="" src={mediumImagePath + photo.name}/></figure>);
	}

	render() {
		const {photo} = this.props;
		return photo
			? this.addZoom(photo)
			: null;
	}

}

export default GuideZoom;
