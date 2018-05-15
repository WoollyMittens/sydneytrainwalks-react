import {
	IMPORT_DATA,
	PICK_GUIDE,
	RESET_GUIDE,
	PICK_PHOTO,
	RESET_PHOTO,
	SORT_GUIDES,
	FILTER_GUIDES,
	SWITCH_VIEW,
	PREVIOUS_VIEW,
	ORIGIN_VIEW,
	SAVE_STATE,
	LOAD_STATE
} from "./actions";

var defaultState = {
	active: null,
	highlight: null,
	guides: null,
	exif: null,
	gpx: null,
	sorted: "shortest",
	filtered: "",
	view: "home",
	previous: "details",
	origin: "home"
};

function appReducer(state = defaultState, action) {
	switch (action.type) {
		case IMPORT_DATA:
			return Object.assign({}, state, {
				guides: action.data.guides,
				routes: action.data.routes,
				photos: action.data.photos
			});
		case PICK_GUIDE:
			return Object.assign({}, state, {
				active: action.key,
				view: "map",
				previous: "details",
				origin: action.origin
			});
		case RESET_GUIDE:
			return Object.assign({}, state, {
				active: null,
				view: "home",
				previous: "details"
			});
		case PICK_PHOTO:
			return Object.assign({}, state, {
				highlight: action.key
			});
		case RESET_PHOTO:
			return Object.assign({}, state, {
				highlight: null
			});
		case SORT_GUIDES:
			return Object.assign({}, state, {
				sorted: action.property
			});
		case FILTER_GUIDES:
			return Object.assign({}, state, {
				filtered: action.keyword
			});
		case SWITCH_VIEW:
			return Object.assign({}, state, {
				view: action.name,
				previous: (action.name !== state.view) ? state.view : state.previous
			});
		case PREVIOUS_VIEW:
			return Object.assign({}, state, {
				view: state.previous,
				previous: "home",
				highlight: null
			});
		case ORIGIN_VIEW:
		return Object.assign({}, state, {
			active: null,
			view: state.origin,
			previous: "details"
		});
		case SAVE_STATE:
			localStorage.setItem("saved", JSON.stringify({"active": state.active, "view": state.view}));
			return state;
		case LOAD_STATE:
			const loaded = JSON.parse(localStorage.getItem("saved")) || state;
			if (!(loaded.active && state.guides[loaded.active])) return state;
			return Object.assign({}, state, {
				active: loaded.active,
				view: loaded.view
			});
		default:
			return state;
	}
}

export default appReducer;
