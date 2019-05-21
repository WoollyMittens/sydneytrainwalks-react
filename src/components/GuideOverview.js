import React from "react";
import {Component} from "react";
import {Map, TileLayer, Marker, ScaleControl, GeoJSON} from "react-leaflet";
import Config from "../config.json";
import Leaflet from "leaflet";
import LocationMarker from "../markers/marker-location.png";
import WalkMarker from "../markers/marker-walk.png";
import '../styles/guide-overview.css';

class GuideOverview extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mapLocation: null
		};
	}

	componentWillMount() {
		this.watcher = ("geolocation" in navigator)
			? navigator.geolocation.watchPosition(this.onUpdatedLocation.bind(this), this.onFailedLocation.bind(this), {
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000
			})
			: null;
	}

	onFailedLocation(e) {
		console.log(e);
	}

	onUpdatedLocation(result) {
		this.setState({
			mapLocation: [result.coords.latitude, result.coords.longitude]
		});
	}

	onPickGuide(key) {
		const {pickGuide, saveState} = this.props;
		pickGuide(key, "overview");
		saveState();
	}

	flattenCoordinates(route) {
		const features = route.features;
		var segments = features.map(
			feature => (feature.geometry.coordinates[0][0] instanceof Array)
			? [].concat.apply([], feature.geometry.coordinates)
			: feature.geometry.coordinates);
		return [].concat.apply([], segments);
	}

	calculateBounds(routes) {
		var route,
			halfway,
			minLat = 999,
			minLon = 999,
			maxLat = -999,
			maxLon = -999;
		Object.keys(routes).forEach(key => {
			route = this.flattenCoordinates(routes[key]);
			halfway = route[parseInt(route.length / 2, 10)];
			minLon = (halfway[0] < minLon) ? halfway[0] : minLon;
			minLat = (halfway[1] < minLat) ? halfway[1] : minLat;
			maxLon = (halfway[0] > maxLon) ? halfway[0] : maxLon;
			maxLat = (halfway[1] > maxLat) ? halfway[1] : maxLat;
		});
		return {
			center: [
				(maxLat - minLat) / 2 + minLat,
				(maxLon - minLon) / 2 + minLon
			],
			limits: [
				[minLat - 0.3, minLon - 0.3],
				[maxLat + 0.3, maxLon + 0.3]
			]
		};
	}

	addMarkers(routes) {
		var route,
			halfway;
		const icon = new Leaflet.Icon({
			iconUrl: WalkMarker,
			iconSize: [28, 28],
			iconAnchor: [14, 28],
			popupAnchor: [0, -14]
		});
		return Object.keys(routes).map(key => {
			route = this.flattenCoordinates(routes[key]);
			halfway = route[parseInt(route.length / 2, 10)];
			return (<Marker onClick={this.onPickGuide.bind(this, key)} key={key} position={[halfway[1], halfway[0]]} icon={icon}></Marker>);
		});
	}

	addRoutes(routes, guides) {
		var route;
		const routeStyles = {
			'color': '#ff6600',
			'weight': 5,
			'opacity': 0.66
		};
		return Object.keys(guides).map(key => {
			return (!guides[key].assets) ? (<GeoJSON key={key} data={routes[key]} style={routeStyles}/>) : null;
		});
	}

	addLocation() {
		const icon = new Leaflet.Icon({
			iconUrl: LocationMarker,
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [16, 0]
		});
		return this.state.mapLocation
			? <Marker position={this.state.mapLocation} icon={icon}></Marker>
			: null;
	}

	addScale() {
		return <ScaleControl imperial={false}/>;
	}

	onTileError(e) {
		if (!/\/tiles\//i.test(e.tile.src)) {
			e.tile.src = Config.localMapURL.replace("{x}", e.coords.x).replace("{y}", e.coords.y).replace("{z}", e.coords.z);
		}
	}

	addMap(routes, guides) {
		const bounds = this.calculateBounds(routes);
		return (<Map bounds={bounds.limits} maxBounds={bounds.limits} minZoom={8} maxZoom={15}>
			<TileLayer attribution={Config.mapAttribution} url={Config.remoteMapURL} ontileerror={this.onTileError.bind(this)}/>
			{this.addScale()}
			{this.addMarkers(routes)}
			{this.addRoutes(routes, guides)}
			{this.addLocation()}
		</Map>);
	}

	render() {
		const {routes, guides} = this.props;
		return routes
			? (<figure className="guide-overview">{this.addMap(routes, guides)}</figure>)
			: null;
	}

}

export default GuideOverview;
