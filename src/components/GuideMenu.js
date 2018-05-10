import React from "react";
import {Component} from "react";
import '../styles/guide-menu.css';
import homeIcon from "../icons/base.svg";
import overviewIcon from "../icons/languages.svg";
import aboutIcon from "../icons/profile_1.svg";
import mapIcon from "../icons/map_1.svg";
import detailsIcon from "../icons/info_2.svg";
import galleryIcon from "../icons/nature_1.svg";

class GuideMenu extends Component {

	onSwitchHome(evt) {
		evt.preventDefault();
		const {resetPhoto, resetGuide, saveState} = this.props;
		resetPhoto();
		resetGuide();
		saveState();
	}

	onSwitchOverview(name, evt) {
		evt.preventDefault();
		const {resetPhoto, switchView, resetGuide, saveState} = this.props;
		resetPhoto();
		resetGuide();
		switchView(name);
		saveState();
	}

	onSwitchView(name, evt) {
		evt.preventDefault();
		const {resetPhoto, switchView, saveState} = this.props;
		resetPhoto();
		switchView(name);
		saveState();
	}

	isActive(name) {
		const {view} = this.props;
		return view === name
			? "active"
			: null
	}

	getItems(active, view) {
		var items = [];
		items.push(<button className={this.isActive("home")} key="guide-menu-home" onClick={this.onSwitchHome.bind(this)}><img alt="" src={homeIcon}/> Home</button>);
		items.push(<button className={this.isActive("overview")} key="guide-menu-overview" onClick={this.onSwitchOverview.bind(this, "overview")}><img alt="" src={overviewIcon}/> Overview</button>);
		if (active) {
			items.push(<button className={this.isActive("map")} key="guide-menu-map" onClick={this.onSwitchView.bind(this, "map")}><img alt="" src={mapIcon}/> Map</button>);
			items.push(<button className={this.isActive("details")} key="guide-menu-details" onClick={this.onSwitchView.bind(this, "details")}><img alt="" src={detailsIcon}/> Guide</button>);
			items.push(<button className={this.isActive("gallery")} key="guide-menu-gallery" onClick={this.onSwitchView.bind(this, "gallery")}><img alt="" src={galleryIcon}/> Photos</button>);
		} else {
			items.push(<button className={this.isActive("about")} key="guide-menu-about" onClick={this.onSwitchView.bind(this, "about")}><img alt="" src={aboutIcon}/> About</button>);
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
