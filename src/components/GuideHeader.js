import React from "react";
import {Component} from "react";
import '../styles/guide-header.css';

class GuideHeader extends Component {

	addDetails(guide) {
		return (<header className="guide-header">
			<h2>From {guide.markers.start.location}{" "}
				to {guide.markers.end.location}{" "}
				via {guide.location}</h2>
		</header>);
	}

	render() {
		const {guide} = this.props;
		return guide
			? this.addDetails(guide)
			: null;
	}

}

export default GuideHeader;
