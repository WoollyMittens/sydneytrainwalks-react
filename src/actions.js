export const IMPORT_DATA = "IMPORT_DATA";
export const PICK_GUIDE = "PICK_GUIDE";
export const RESET_GUIDE = "RESET_GUIDE";
export const PICK_PHOTO = "PICK_PHOTO";
export const RESET_PHOTO = "RESET_PHOTO";
export const SORT_GUIDES = "SORT_GUIDES";
export const FILTER_GUIDES = "FILTER_GUIDES";
export const SWITCH_VIEW = "SWITCH_VIEW";
export const PREVIOUS_VIEW = "PREVIOUS_VIEW";

export function importData(data) {
	return {type: IMPORT_DATA, data};
}

export function pickGuide(key) {
	return {type: PICK_GUIDE, key};
}

export function resetGuide() {
	return {type: RESET_GUIDE};
}

export function pickPhoto(key) {
	return {type: PICK_PHOTO, key};
}

export function resetPhoto() {
	return {type: RESET_PHOTO};
}

export function sortGuides(property) {
	return {type: SORT_GUIDES, property};
}

export function filterGuides(keyword) {
	return {type: FILTER_GUIDES, keyword};
}

export function switchView(name) {
	return {type: SWITCH_VIEW, name};
}

export function previousView() {
	return {type: PREVIOUS_VIEW};
}
