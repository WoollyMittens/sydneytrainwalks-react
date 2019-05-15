import React from "react";
import {Component} from "react";
import '../styles/guide-filters.css';

class GuideFilters extends Component {

	onHideKeyboard(evt) {
		evt.preventDefault();
		evt.target.blur();
	}

	onFilter(evt) {
		const {filterGuides} = this.props;
		if (evt.key == 'Enter') {
			evt.preventDefault();
			evt.target.blur();
		}
		filterGuides(evt.target.value);
	}

	onClear(evt) {
		const {filterGuides} = this.props;
		evt.preventDefault();
		evt.target.value = '';
		filterGuides('');
	}

	onSort(evt) {
		const {sortGuides} = this.props;
		sortGuides(evt.target.value);
	}

	addFilter() {
		const {filtered} = this.props;
		return (<label>
				<span>Filter</span><input onKeyPress={this.onFilter.bind(this)} onChange={this.onFilter.bind(this)} placeholder="Search" type="text" value={filtered}/>
				<button onClick={this.onClear.bind(this)}>Clear</button>
			</label>);
	}

	addSorter() {
		const {sorted} = this.props;
		return (<label>
			<span>Sort</span>
			<select onChange={this.onSort.bind(this)} value={sorted}>
				<option value="">Unsorted</option>
				<option value="shortest">Shortest first</option>
				<option value="longest">Longest first</option>
				<option value="start">Starting station</option>
				<option value="end">Return station</option>
				<option value="region">By region</option>
				<option value="fireban">During bushfires</option>
				<option value="rain">For rainy days</option>
			</select>
		</label>);
	}

	render() {
		return (<form className="guide-filters" onSubmit={this.onHideKeyboard.bind(this)}>
			{this.addFilter()}
			{this.addSorter()}
		</form>);
	}

}

export default GuideFilters;
