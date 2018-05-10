import React from "react";
import {Component} from "react";
import {Map, TileLayer, Marker} from "react-leaflet";
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

	onPickGuide(key) {
		const {pickGuide, saveState} = this.props;
		pickGuide(key);
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
		// TODO: pick the coordinates of a photo along the route
		Object.keys(routes).forEach(key => {
			route = this.flattenCoordinates(routes[key]);
			halfway = route[parseInt(route.length / 2, 10)];
			minLon = (halfway[0] < minLon)
				? halfway[0]
				: minLon;
			minLat = (halfway[1] < minLat)
				? halfway[1]
				: minLat;
			maxLon = (halfway[0] > maxLon)
				? halfway[0]
				: maxLon;
			maxLat = (halfway[1] > maxLat)
				? halfway[1]
				: maxLat;
		});
		return {
			center: [
				(maxLat - minLat) / 2 + minLat,
				(maxLon - minLon) / 2 + minLon
			],
			limits: [
				[minLat - 0.0, minLon - 0.2],
				[maxLat + 0.4, maxLon + 0.4]
			]
		};
	}

	addMarkers(routes) {
		var route,
			halfway;
		const icon = new Leaflet.Icon({
			iconUrl: WalkMarker,
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -16]
		});
		return Object.keys(routes).map(key => {
			route = this.flattenCoordinates(routes[key]);
			halfway = route[parseInt(route.length / 2, 10)];
			return (<Marker onClick={this.onPickGuide.bind(this, key)} key={key} position={[halfway[1], halfway[0]]} icon={icon}></Marker>);
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

	addMap(routes) {
		const bounds = this.calculateBounds(routes);
		return (<Map center={bounds.center} maxBounds={bounds.limits} minZoom={8} zoom={8} maxZoom={15}>
			<TileLayer attribution={Config.mapAttribution} url={Config.localMapURL}/> {this.addMarkers(routes)}
			{this.addLocation()}
		</Map>);
	}

	render() {
		const {routes} = this.props;
		return routes
			? (<figure className="guide-overview">{this.addMap(routes)}</figure>)
			: null;
	}

}

export default GuideOverview;
