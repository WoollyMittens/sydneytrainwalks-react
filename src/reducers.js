import {IMPORT_DATA, PICK_GUIDE, RESET_GUIDE, PICK_PHOTO, RESET_PHOTO, SORT_GUIDES, FILTER_GUIDES, SWITCH_VIEW} from "./actions";

var defaultState = {
	active: null,
	highlight: null,
	guides: null,
	exif: null,
	gpx: null,
	sorted: '',
	filtered: '',
	view: ''
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
			return Object.assign({}, state, {active: action.key});
		case RESET_GUIDE:
			return Object.assign({}, state, {active: null});
		case PICK_PHOTO:
			return Object.assign({}, state, {highlight: action.key});
		case RESET_PHOTO:
			return Object.assign({}, state, {highlight: null});
		case SORT_GUIDES:
			return Object.assign({}, state, {sorted: action.property});
		case FILTER_GUIDES:
			return Object.assign({}, state, {filtered: action.keyword});
		case SWITCH_VIEW:
			return Object.assign({}, state, {view: action.name});
		default:
			return state;
	}
}

export default appReducer;
