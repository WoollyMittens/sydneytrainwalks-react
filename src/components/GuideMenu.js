import React from "react";
import {Component} from "react";
import '../styles/guide-menu.css';

class GuideMenu extends Component {

	onResetGuide(evt) {
		evt.preventDefault();
		const {resetGuide} = this.props;
		resetGuide();
	}

	onSwitchView(name, evt) {
		evt.preventDefault();
		const {resetPhoto, switchView} = this.props;
		resetPhoto();
		switchView(name);
	}

	getItems(active) {
		var items = [];
		items.push(<button key="guide-menu-home" onClick={this.onResetGuide.bind(this)}>Home</button>);
		if (active) {
			items.push(<button key="guide-menu-map" onClick={this.onSwitchView.bind(this, "map")}>Map</button>);
			items.push(<button key="guide-menu-details" onClick={this.onSwitchView.bind(this, "details")}>Guide</button>);
			items.push(<button key="guide-menu-gallery" onClick={this.onSwitchView.bind(this, "gallery")}>Photos</button>);
		} else {
			items.push(<button key="guide-menu-overview" onClick={this.onSwitchView.bind(this, "overview")}>Overview</button>);
			items.push(<button key="guide-menu-about" onClick={this.onSwitchView.bind(this, "about")}>About</button>);
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
