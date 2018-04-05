import React from "react";
import {Component} from "react";
import GuideLabel from "../components/GuideLabel";
import '../styles/guide-header.css';

class GuideHeader extends Component {

	render() {
		const {active, guide} = this.props;
		return guide
			? (<header className="guide-header">
				<h2><GuideLabel name={active} guide={guide}/></h2>
			</header>)
			: null;
	}

}

export default GuideHeader;
