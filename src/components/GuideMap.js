import React from "react";
import {Component} from "react";
import {Map, TileLayer, Marker, Popup, ScaleControl, GeoJSON} from "react-leaflet";
import Config from "../config.json";
import Leaflet from "leaflet";
import LocationMarker from "../markers/marker-location.png";
import TrainMarker from "../markers/marker-train.png";
import TramMarker from "../markers/marker-tram.png";
import FerryMarker from "../markers/marker-ferry.png";
import BusMarker from "../markers/marker-bus.png";
import InfoMarker from "../markers/marker-info.png";
import WarningMarker from "../markers/marker-warning.png";
import ToiletMarker from "../markers/marker-toilet.png";
import KioskMarker from "../markers/marker-kiosk.png";
import LandmarkMarker from "../markers/marker-landmark.png";
import PhotoMarker from "../markers/marker-photo.png";
import TentMarker from "../markers/marker-tent.png";
import HotelMarker from "../markers/marker-hotel.png";
import '../styles/guide-map.css';

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

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watcher);
	}

	pickMarker(type) {
		var marker;
		switch(type) {
			case "location": marker = LocationMarker; break;
			case "train": marker = TrainMarker; break;
			case "tram": marker = TramMarker; break;
			case "ferry": marker = FerryMarker; break;
			case "bus": marker = BusMarker; break;
			case "warning": marker = WarningMarker; break;
			case "toilet": marker = ToiletMarker; break;
			case "kiosk": marker = KioskMarker; break;
			case "landmark": marker = LandmarkMarker; break;
			case "photo": marker = PhotoMarker; break;
			case "tent": marker = TentMarker; break;
			case "hotel": marker = HotelMarker; break;
			case "info": marker = InfoMarker; break;
			default: marker = LocationMarker;
		}
		return marker;
	}

	onReturn(evt) {
		evt.preventDefault();
		const {previousView} = this.props;
		previousView();
	}

	onFailedLocation(e) {
		console.log(e);
	}

	onUpdatedLocation(result) {
		this.setState({
			mapLocation: [result.coords.latitude, result.coords.longitude]
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
			minLon = (point[0] < minLon) ? point[0] : minLon;
			minLat = (point[1] < minLat) ? point[1] : minLat;
			maxLon = (point[0] > maxLon) ? point[0] : maxLon;
			maxLat = (point[1] > maxLat) ? point[1] : maxLat;
		});
		var maxWidth = Math.round(13 - (maxLon - minLon) / 0.333 * 3);
		var maxHeight = Math.round(13 - (maxLat - minLat) / 0.333 * 3);
		var maxZoom = Math.max(Math.min(maxWidth, maxHeight, 13), 10);
		return {
			center: photo ? photo.coords : [
				(maxLat - minLat) / 2 + minLat,
				(maxLon - minLon) / 2 + minLon
			],
			limits: [
				[minLat - 0.01, minLon - 0.01],
				[maxLat + 0.01, maxLon + 0.01]
			],
			zoom: photo ? 14 : maxZoom,
			first: points[0],
			last: points[points.length - 1]
		};
	}

	addLocation() {
		const icon = new Leaflet.Icon({
			iconUrl: LocationMarker,
			iconSize: [28, 28],
			iconAnchor: [14, 28],
			popupAnchor: [14, 0]
		});
		return this.state.mapLocation
			? <Marker position={this.state.mapLocation} icon={icon}></Marker>
			: null;
	}

	addPhoto(photo) {
		const icon = new Leaflet.Icon({
			iconUrl: PhotoMarker,
			iconSize: [28, 28],
			iconAnchor: [14, 28],
			popupAnchor: [14, 0]
		});
		return (photo && photo.coords)
			? <Marker position={photo.coords} icon={icon}></Marker>
			: null;
	}

	addMarkers(markers) {
		var icon, popup;
		return markers.map((marker, index) => {
			if (marker.photo) return null;
			icon = new Leaflet.Icon({
				iconUrl: this.pickMarker(marker.type),
				iconSize: [32, 32],
				iconAnchor: [16, 32],
				popupAnchor: [0, -16]
			});
			popup = (marker.description) ? <Popup position={this.state.popupLocation}><span dangerouslySetInnerHTML={this.getMarkerDescription(marker.description)}></span></Popup> : null;
			return (<Marker onClick={this.onMarkerOpen.bind(this, [marker.lat, marker.lon])} key={"marker" + index} position={[marker.lat, marker.lon]} icon={icon}>{popup}</Marker>);
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

	addScale() {
		return <ScaleControl imperial={false}/>;
	}

	onTileError(e) {
		if (!/\/tiles\//i.test(e.tile.src)) {
			/* e.tile.onerror = function(e) { console.log('secondary tile failure', e); } */
			e.tile.src = Config.localMapURL.replace("{x}", e.coords.x).replace("{y}", e.coords.y).replace("{z}", e.coords.z);
		}
	}

	addMap() {
		const {route, markers, photo} = this.props;
		const bounds = this.calculateBounds(route, photo);
		return (<Map bounds={bounds.limits} maxBounds={bounds.limits} minZoom={10} center={bounds.center} zoom={bounds.zoom} maxZoom={15}>
			<TileLayer attribution={Config.mapAttribution} url={Config.remoteMapURL} ontileerror={this.onTileError.bind(this)}/>
			{this.addScale()}
			{this.addRoute(route)}
			{this.addMarkers(markers)}
			{this.addLocation()}
			{this.addPhoto(photo)}
		</Map>);
	}

	render() {
		const {route} = this.props;
		return route
			? (<figure className="guide-map">{this.addMap()}
				<button className="guide-map-return" onClick={this.onReturn.bind(this)}>Return</button>
			</figure>)
			: null;
	}

}

export default GuideMap;
