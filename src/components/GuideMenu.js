import React from "react";
import {Component} from "react";
import '../styles/guide-menu.css';

class GuideMenu extends Component {

	onResetGuide(evt) {
		evt.preventDefault();
		const {resetPhoto, resetGuide} = this.props;
		resetPhoto();
		resetGuide();
	}

	onSwitchView(name, evt) {
		evt.preventDefault();
		const {resetPhoto, switchView} = this.props;
		resetPhoto();
		switchView(name);
	}

	isActive(name) {
		const {view} = this.props;
		return view === name
			? "active"
			: null
	}

	getItems(active, view) {
		var items = [];
		items.push(<button className={this.isActive("home")} key="guide-menu-home" onClick={this.onResetGuide.bind(this)}>Home</button>);
		if (active) {
			items.push(<button className={this.isActive("map")} key="guide-menu-map" onClick={this.onSwitchView.bind(this, "map")}>Map</button>);
			items.push(<button className={this.isActive("details")} key="guide-menu-details" onClick={this.onSwitchView.bind(this, "details")}>Guide</button>);
			items.push(<button className={this.isActive("gallery")} key="guide-menu-gallery" onClick={this.onSwitchView.bind(this, "gallery")}>Photos</button>);
		} else {
			items.push(<button className={this.isActive("overview")} key="guide-menu-overview" onClick={this.onSwitchView.bind(this, "overview")}>Overview</button>);
			items.push(<button className={this.isActive("about")} key="guide-menu-about" onClick={this.onSwitchView.bind(this, "about")}>About</button>);
		}
		return items;
	}

	render() {
		const {active, view} = this.props;
		return (<footer className="guide-menu">
			<nav>
				{this.getItems(active, view)}
			</nav>
		</footer>);
	}

}

export default GuideMenu;
