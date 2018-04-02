import React from "react";
import {Component} from "react";
import Config from '../config.json';

class GuideGallery extends Component {

	onPhotoPicked(key, evt) {
		evt.preventDefault();
		const {pickPhoto} = this.props;
		pickPhoto(key);
	}

	getThumbnails(gallery) {
		const smallImagePath = Config.localAssetsURL + "small/" + gallery.key + "/";
		const mediumImagePath = Config.remoteAssetsURL + "medium/" + gallery.key + "/";
		return gallery.photos.map(key => (<li key={key}>
			<a href={mediumImagePath + key} onClick={this.onPhotoPicked.bind(this, key)}><img alt="" src={smallImagePath + key}/></a>
		</li>));
	}

	addGallery(gallery) {
		return (<figure className="guide-gallery">
			<figcaption>Gallery</figcaption>
			<ul>{this.getThumbnails(gallery)}</ul>
		</figure>);
	}

	render() {
		const {gallery} = this.props;
		return gallery
			? this.addGallery(gallery)
			: null;
	}

}

export default GuideGallery;
