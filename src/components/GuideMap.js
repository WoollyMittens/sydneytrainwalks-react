import React from "react";
import {Component} from "react";
import {Map, TileLayer, Marker, Popup, GeoJSON} from "react-leaflet";
import Config from "../config.json";
import Leaflet from "leaflet";
import LocationMarker from "../markers/marker-location.png";
import PhotoMarker from "../markers/marker-photo.png";

class GuideMap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mapLocation: null,
			popupLocation: null
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
			location: [result.coords.latitude, result.coords.longitude]
		});
	}

	onMarkerOpen(coords) {
		this.setState({'popupCoords': coords});
	}

	getMarkerDescription(html) {
		return {
			__html: '<p>' + html + '</p>'
		};
	}

	flattenCoordinates(route) {
		const features = route.features;
		var segments = features.map(
			feature => (feature.geometry.coordinates[0][0] instanceof Array)
			? [].concat.apply([], feature.geometry.coordinates)
			: feature.geometry.coordinates);
		return [].concat.apply([], segments);
	}

	calculateBounds(route, photo) {
		var minLat = 999,
			minLon = 999,
			maxLat = -999,
			maxLon = -999;
		var points = this.flattenCoordinates(route);
		points.forEach(point => {
			minLon = (point[0] < minLon)
				? point[0]
				: minLon;
			minLat = (point[1] < minLat)
				? point[1]
				: minLat;
			maxLon = (point[0] > maxLon)
				? point[0]
				: maxLon;
			maxLat = (point[1] > maxLat)
				? point[1]
				: maxLat;
		});
		return {
			center: photo
				? photo.coords
				: [
					(maxLat - minLat) / 2 + minLat,
					(maxLon - minLon) / 2 + minLon
				],
			limits: [
				[
					minLat - 0.01,
					minLon - 0.01
				],
				[
					maxLat + 0.01,
					maxLon + 0.01
				]
			],
			zoom: photo
				? 14
				: 12,
			first: points[0],
			last: points[points.length - 1]
		};
	}

	addLocation() {
		const icon = new Leaflet.Icon({
			iconUrl: LocationMarker,
			iconSize: [
				40, 40
			],
			iconAnchor: [
				20, 40
			],
			popupAnchor: [20, 0]
		});
		return this.state.mapLocation
			? <Marker position={this.state.mapLocation} icon={icon}></Marker>
			: null;
	}

	addPhoto(photo) {
		const icon = new Leaflet.Icon({
			iconUrl: PhotoMarker,
			iconSize: [
				40, 40
			],
			iconAnchor: [
				20, 40
			],
			popupAnchor: [20, 0]
		});
		return photo
			? <Marker position={photo.coords} icon={icon}></Marker>
			: null;
	}

	addMarkers(markers, bounds) {
		markers.start.lat = markers.start.lat
			? markers.start.lat
			: bounds.first[1];
		markers.start.lon = markers.start.lon
			? markers.start.lon
			: bounds.first[0];
		markers.end.lat = markers.end.lat
			? markers.end.lat
			: bounds.last[1];
		markers.end.lon = markers.end.lon
			? markers.end.lon
			: bounds.last[0];
		var icon,
			marker;
		return Object.keys(markers).map(key => {
			marker = markers[key];
			icon = new Leaflet.Icon({
				iconUrl: require('../markers/' + marker.icon),
				iconSize: [
					40, 40
				],
				iconAnchor: [
					20, 40
				],
				popupAnchor: [0, -20]
			});
			return (<Marker onClick={this.onMarkerOpen.bind(this, [marker.lat, marker.lon])} key={key} position={[marker.lat, marker.lon]} icon={icon}>
				<Popup position={this.state.popupLocation}>
					<span dangerouslySetInnerHTML={this.getMarkerDescription(marker.description)}></span>
				</Popup>
			</Marker>);
		});
	}

	addRoute(route) {
		const key = route.features[0].properties.time;
		const routeStyles = {
			'color': '#ff6600',
			'weight': 5,
			'opacity': 0.66
		};
		return <GeoJSON key={key} data={route} style={routeStyles}/>;
	}

	addMap() {
		const {route, markers, photo} = this.props;
		const bounds = this.calculateBounds(route, photo);
		return (<Map center={bounds.center} maxBounds={bounds.limits} minZoom={10} zoom={bounds.zoom} maxZoom={15}>
			<TileLayer attribution={Config.mapAttribution} url={Config.localMapURL}/> {this.addRoute(route)}
			{this.addMarkers(markers, bounds)}
			{this.addLocation()}
			{this.addPhoto(photo)}
		</Map>);
	}

	render() {
		const {route} = this.props;
		return route
			? (<figure className="guide-map">{this.addMap()}</figure>)
			: null;
	}

}

export default GuideMap;
