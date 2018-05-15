import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guide-zoom.css';
import PhotoCylinder from '../libraries/photocylinder.js';
import '../libraries/photocylinder.css';

class GuideZoom extends Component {

	constructor(props) {
		super(props);
		this.refs = React.createRef();
	}

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

	onImageFailed(evt) {
		const {resetPhoto, switchView} = this.props;
		this.refs.guide_zoom.style.visibility = "hidden";
		switchView("map");
	}

	onImageSuccess(evt) {}

	addPhoto(url, error, success) {
		window.requestAnimationFrame(evt => {
			this.refs.guide_zoom.style.visibility = "visible";
			new PhotoCylinder().init({
				'url': url,
				'container' : document.querySelector('.guide-zoom-stage'),
				'standalone': true,
				'spherical' : /fov360|_r|^r/,
				'cylindrical' : /fov180/,
				'idle': 0.002,
				'success': success,
				'failure': error
			});
		});
	}

	addZoom(photo) {
		this.addPhoto(
			Config.remoteAssetsURL + "medium/" + photo.key + "/" + photo.name,
			this.onImageFailed.bind(this),
			this.onImageSuccess.bind(this)
		);
		return (<figure ref="guide_zoom" className="guide-zoom">
			<figcaption className="guide-zoom-controls">
				<button className="guide-zoom-locate" onClick={this.onLocate.bind(this)}>Locate on map</button>
				<button className="guide-zoom-close" onClick={this.onClosed.bind(this)}>Close</button>
			</figcaption>
			<div className="guide-zoom-stage"></div>
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
