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
import GuideList from "../components/GuideList";
import GuideTitle from "../components/GuideTitle";
import GuideMenu from "../components/GuideMenu";
import GuideOverview from "../components/GuideOverview";
import GuideAbout from "../components/GuideAbout";
import GuideHeader from "../components/GuideHeader";
import guidesJSON from "../data/guides.json";
import photosJSON from "../data/photos.json";
import routesJSON from "../data/routes.json";
import '../styles/app.css';
import '../libraries/normalize.min.css';
import '../libraries/leaflet.css';

class App extends Component {

	componentDidMount() {
		this.remoteData();
		document.body.addEventListener("click", this.remoteLink.bind(this));
	}

	localData() {
		const {actions} = this.props;
		actions.importData({'guides': guidesJSON, 'routes': routesJSON, 'photos': photosJSON});
		actions.loadState();
	}

	remoteData() {
		Promise.all([
			fetch(Config.guidesURL),
			fetch(Config.routesURL),
			fetch(Config.photosURL)
		]).then(([guidesResponse, routesResponse, photosResponse]) => {
			this.processData(guidesResponse, routesResponse, photosResponse);
		}).catch((err) => {
			console.log(err);
			this.localData();
		});
	}

	processData(guidesResponse, routesResponse, photosResponse) {
		const {actions} = this.props;
		Promise.all([guidesResponse.json(), routesResponse.json(), photosResponse.json()]).then(([guidesJSON, routesJSON, photosJSON]) => {
			actions.importData({'guides': guidesJSON, 'routes': routesJSON, 'photos': photosJSON});
			actions.loadState();
		}).catch((err) => {
			console.log(err);
			this.localData();
		});
	}

	remoteLink(evt) {
		const href = evt.target.getAttribute("href");
		if(/^http/i.test(href) && !/.jpg$/i.test(href)) {
			evt.preventDefault();
			window.open(href, '_system', 'location=yes');
		}
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
		components.push(<GuideTitle key="app-title"/>);
		if (active) {
			components.push(<GuideHeader key="app-header" guide={guide} resetGuide={actions.resetGuide}/>);
			components.push(<GuideOverview key="app-overview" routes={routes} pickGuide={actions.pickGuide} saveState={actions.saveState}/>);
			components.push(<GuideMap key="app-map" route={route} markers={markers} photo={photo} previousView={actions.previousView}/>);
			components.push(<GuideZoom key="app-zoom" photo={photo} resetPhoto={actions.resetPhoto} switchView={actions.switchView}/>);
			components.push(<GuideDetails key="app-details" guide={guide} active={active} pickPhoto={actions.pickPhoto}/>);
			components.push(<GuideGallery key="app-gallery" gallery={gallery} pickPhoto={actions.pickPhoto}/>);
		} else {
			components.push(<GuideFilters key="app-filters" filtered={filtered} sorted={sorted} sortGuides={actions.sortGuides} filterGuides={actions.filterGuides}/>);
			components.push(<GuideList key="app-list" filtered={filtered} sorted={sorted} guides={guides} pickGuide={actions.pickGuide} saveState={actions.saveState}/>);
			components.push(<GuideOverview key="app-overview" routes={routes} pickGuide={actions.pickGuide} saveState={actions.saveState}/>);
			components.push(<GuideAbout key="app-about"/>);
		}
		components.push(<GuideMenu key="app-menu" active={active} view={view} resetPhoto={actions.resetPhoto} resetGuide={actions.resetGuide} switchView={actions.switchView} originView={actions.originView} saveState={actions.saveState}/>);
		return (components);
	}

	render() {
		const {active, view} = this.props;
		return (<section className={"guide-app guide-view-" + view}>
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
		view: state.view,
		previous: state.previous,
		origin: state.origin
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(allActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
