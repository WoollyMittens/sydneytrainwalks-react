import React from "react";
import {Component} from "react";
import Config from '../config.json';

class GuidesMenu extends Component {

	onResetGuide(evt) {
		evt.preventDefault();
		const {resetGuide} = this.props;
		resetGuide();
	}

	getItems(active) {
		var items = [];
		items.push(<button onClick={this.onResetGuide.bind(this)}>Menu</button>);
		if (active) {
			items.push(<button>Map</button>);
			items.push(<button>Guide</button>);
			items.push(<button>Photos</button>);
		} else {
			items.push(<button>Overview</button>);
			items.push(<button>About</button>);
		}
		return items;
	}

	render() {
		const {active} = this.props;
		return (<footer className="guides-menu">
			<nav>
				{this.getItems(active)}
			</nav>
		</footer>);
	}

}

export default GuidesMenu;
