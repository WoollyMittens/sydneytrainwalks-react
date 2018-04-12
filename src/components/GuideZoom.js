import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guide-zoom.css';

class GuideZoom extends Component {

	constructor(props) {
		super(props);
		this.state = {
			popupVisible: false
		};
	}

	onClosed(evt) {
		evt.preventDefault();
		const {resetPhoto} = this.props;
		this.setState({popupVisible: false});
		resetPhoto();
	}

	onLocate(evt) {
		evt.preventDefault();
		const {switchView} = this.props;
		switchView("map");
	}

	onImageFailed(evt) {
		const {switchView} = this.props;
		switchView("map");
	}

	onImageSuccess(evt) {
		this.setState({popupVisible: true});
	}

	addZoom(photo) {
		const mediumImagePath = Config.remoteAssetsURL + "medium/" + photo.key + "/";
		const popUpVisibility = (this.state.popupVisible) ? " guide-zoom-visible" : " guide-zoom-hidden";
		return (<figure className={"guide-zoom" + popUpVisibility}>
			<figcaption className="guide-zoom-controls">
				<button className="guide-zoom-locate" onClick={this.onLocate.bind(this)}>Locate on map</button>
				<button className="guide-zoom-close" onClick={this.onClosed.bind(this)}>Close</button>
			</figcaption>
			<img onLoad={this.onImageSuccess.bind(this)} onError={this.onImageFailed.bind(this)} alt="" src={mediumImagePath + photo.name}/>
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
