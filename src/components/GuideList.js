import React from "react";
import {Component} from "react";
import GuideLabel from "../components/GuideLabel";
import '../styles/guide-list.css';

class GuideList extends Component {

	onPickGuide(key, evt) {
		evt.preventDefault();
		const {pickGuide, saveState} = this.props;
		pickGuide(key, "home");
		saveState();
	}

	getPlaceholder() {
		return (<span className="guide-busy">loading...</span>);
	}

	getLinks(guides) {
		const {sorted, filtered} = this.props;
		const matcher = new RegExp(filtered, 'i');

		var sorter;
		switch (sorted) {
			case 'longest':
				sorter = (a, b) => guides[b].length - guides[a].length;
				break;
			case 'shortest':
				sorter = (a, b) => guides[a].length - guides[b].length;
				break;
			case 'start':
				sorter = (a, b) => guides[a].markers[0].location > guides[b].markers[0].location ? 1 : -1;
				break;
			case 'end':
				sorter = (a, b) => guides[a].markers[guides[a].markers.length - 1].location > guides[b].markers[guides[b].markers.length - 1].location ? 1 : -1;
				break;
			case 'region':
				sorter = (a, b) => guides[a].location > guides[b].location ? 1 : -1;
				break;
			default:
				sorter = (a, b) => a - b;
		}

		var markers, allowRain, allowFire;
		return Object.keys(guides).sort(sorter).map(
			(key) => {
				markers = guides[key].markers;
				allowRain = (sorted === 'rain') ? guides[key].rain : true;
				allowFire = (sorted === 'fireban') ? guides[key].fireban : true;
				return (matcher.test(guides[key].location + ' ' + guides[key].markers[0].location + ' ' + guides[key].markers[markers.length - 1].location) && allowRain && allowFire)
					? <li key={key}><button onClick={this.onPickGuide.bind(this, key)}><GuideLabel guide={guides[key]}/></button></li>
					: null
			}
		);
	}

	render() {
		const {guides} = this.props;
		return (<nav className="guide-list">
			<ul>{
					guides
						? this.getLinks(guides)
						: this.getPlaceholder()
				}</ul>
		</nav>);
	}

}

export default GuideList;
