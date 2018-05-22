import React from "react";
import {Component} from "react";
import GuideLabel from "../components/GuideLabel";
import '../styles/guide-header.css';

class GuideHeader extends Component {

	onResetGuide(evt) {
		evt.preventDefault();
		const {resetGuide} = this.props;
		resetGuide();
	}

	render() {
		const {guide} = this.props;
		return guide
			? (<header className="guide-header">
				<h2 onClick={this.onResetGuide.bind(this)}><GuideLabel guide={guide}/></h2>
			</header>)
			: null;
	}

}

export default GuideHeader;
