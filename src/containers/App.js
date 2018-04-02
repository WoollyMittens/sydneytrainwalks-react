import React from "react";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as allActions from "../actions";
import Config from '../config.json';
import GuideMap from "../components/GuideMap";
import GuideDetails from "../components/GuideDetails";
import GuideZoom from "../components/GuideZoom";
import GuideGallery from "../components/GuideGallery";
import GuideFilters from "../components/GuideFilters";
import GuidesList from "../components/GuidesList";
import GuideTitle from "../components/GuidesTitle";
import GuideMenu from "../components/GuidesMenu";

class App extends Component {

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		Promise.all([
			fetch(Config.guidesURL),
			fetch(Config.routesURL),
			fetch(Config.photosURL)
		]).then(([guidesResponse, routesResponse, photosResponse]) => {
			this.processData(guidesResponse, routesResponse, photosResponse);
		}).catch((err) => {
			console.log(err);
		});
	}

	processData(guidesResponse, routesResponse, photosResponse) {
		const {actions} = this.props;
		Promise.all([guidesResponse.json(), routesResponse.json(), photosResponse.json()]).then(([guidesJson, routesJson, photosJson]) => {
			actions.importData({'guides': guidesJson, 'routes': routesJson, 'photos': photosJson});
		}).catch((err) => {
			console.log(err);
		});
	}

	prepareGallery(active, guides, photos) {
		if (guides[active].assets) {
			const assets = guides[active].assets;
			return {
				key: assets.prefix,
				photos: Object.keys(photos[assets.prefix]).slice(assets.start, assets.end)
			}
		}
		return {
			key: active,
			photos: Object.keys(photos[active])
		};
	}

	preparePhoto(active, highlight, guides, photos) {
		const key = (guides[active].assets)
			? guides[active].assets.prefix
			: active;
		return {
			key: key, name: highlight, coords: photos[key][highlight]
		};
	}

	addComponents(active) {
		const {
			highlight,
			guides,
			routes,
			photos,
			filtered,
			sorted,
			view,
			actions
		} = this.props;

		var route = active
			? routes[active]
			: null;
		var guide = active
			? guides[active]
			: null;
		var markers = active
			? guides[active].markers
			: null;
		var gallery = active
			? this.prepareGallery(active, guides, photos)
			: null;
		var photo = (active && highlight)
			? this.preparePhoto(active, highlight, guides, photos)
			: null;

		var components = [];
		components.push(<GuideTitle/>);
		if (active) {
			components.push(<GuideMap route={route} markers={markers} photo={photo}/>);
			components.push(<GuideZoom photo={photo} resetPhoto={actions.resetPhoto}/>);
			components.push(<GuideDetails guide={guide} active={active} pickPhoto={actions.pickPhoto}/>);
			components.push(<GuideGallery gallery={gallery} pickPhoto={actions.pickPhoto}/>);
		} else {
			components.push(<GuideFilters filtered={filtered} sorted={sorted} sortGuides={actions.sortGuides} filterGuides={actions.filterGuides}/>);
			components.push(<GuidesList filtered={filtered} sorted={sorted} guides={guides} pickGuide={actions.pickGuide}/>);
		}
		components.push(<GuideMenu active={active} resetGuide={actions.resetGuide} switchView={actions.switchView}/>);
		return (components);
	}
	render() {
		const {active} = this.props;
		return (<section>
			{this.addComponents(active)}
		</section>);
	}
}

function mapStateToProps(state, props) {
	return {
		active: state.active,
		highlight: state.highlight,
		guides: state.guides,
		routes: state.routes,
		photos: state.photos,
		filtered: state.filtered,
		sorted: state.sorted,
		view: state.view
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(allActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
