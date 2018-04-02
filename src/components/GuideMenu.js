import React from "react";
import {Component} from "react";
import Config from '../config.json';
import '../styles/guide-menu.css';

class GuideMenu extends Component {

	onResetGuide(evt) {
		evt.preventDefault();
		const {resetGuide} = this.props;
		resetGuide();
	}

	getItems(active) {
		var items = [];
		items.push(<button key="guide-menu-reset" onClick={this.onResetGuide.bind(this)}>Menu</button>);
		if (active) {
			items.push(<button key="guide-menu-map">Map</button>);
			items.push(<button key="guide-menu-guide">Guide</button>);
			items.push(<button key="guide-menu-photos">Photos</button>);
		} else {
			items.push(<button key="guide-menu-overview">Overview</button>);
			items.push(<button key="guide-menu-about">About</button>);
		}
		return items;
	}

	render() {
		const {active} = this.props;
		return (<footer className="guide-menu">
			<nav>
				{this.getItems(active)}
			</nav>
		</footer>);
	}

}

export default GuideMenu;
