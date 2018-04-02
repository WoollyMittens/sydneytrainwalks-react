import React from "react";
import {Component} from "react";

class GuidesList extends Component {

	onGuidePicked(key, evt) {
		evt.preventDefault();
		const {pickGuide} = this.props;
		pickGuide(key);
	}

	getPlaceholder() {
		return (<span className="busy">loading...</span>);
	}

	getLinks(guides) {
		const {sorted, filtered} = this.props;
		var sorter,
			matcher = new RegExp(filtered, 'i');
		switch (sorted) {
			case 'longest':
				sorter = (a, b) => guides[b].length - guides[a].length;
				break;
			case 'shortest':
				sorter = (a, b) => guides[a].length - guides[b].length;
				break;
			case 'start':
				sorter = (a, b) => guides[a].markers.start.location > guides[b].markers.start.location
					? 1
					: -1;
				break;
			case 'end':
				sorter = (a, b) => guides[a].markers.end.location > guides[b].markers.end.location
					? 1
					: -1;
				break;
			case 'region':
				sorter = (a, b) => guides[a].location > guides[b].location
					? 1
					: -1;
				break;
			default:
				sorter = (a, b) => a - b;
		}

		return Object.keys(guides).sort(sorter).map(
			(key) => matcher.test(guides[key].location + ' ' + guides[key].markers.start.location + ' ' + guides[key].markers.end.location)
			? (<li key={key}>
				<button onClick={this.onGuidePicked.bind(this, key)}>
					From {guides[key].markers.start.location}{" "}
					to {guides[key].markers.end.location}{" "}
					via {guides[key].location}{" "}
					({guides[key].length}km)
				</button>
			</li>)
			: null)
	}

	render() {
		const {guides} = this.props;
		return (<nav>
			<ul>{
					guides
						? this.getLinks(guides)
						: this.getPlaceholder()
				}</ul>
		</nav>);
	}

}

export default GuidesList;
