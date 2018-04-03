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

	onLocate(evt) {
		evt.preventDefault();
		const {switchView} = this.props;
		switchView("map");
	}

	addZoom(photo) {
		const mediumImagePath = Config.remoteAssetsURL + "medium/" + photo.key + "/";
		return (<figure className="guide-zoom">
			<figcaption className="guide-zoom-controls">
				<button className="guide-zoom-locate" onClick={this.onLocate.bind(this)}>Locate on map</button>
				<button className="guide-zoom-close" onClick={this.onClosed.bind(this)}>Close</button>
			</figcaption>
			<img alt="" src={mediumImagePath + photo.name}/>
		</figure>);
	}

	render() {
		const {photo} = this.props;
		return photo
			? this.addZoom(photo)
			: null;
	}

}

export default GuideZoom;
