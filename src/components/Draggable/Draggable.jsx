import React from 'react';

export class Draggable extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {dragging: false};
	}

	handleDragStart = e => {
		e.dataTransfer.setData('id', this.props.id);

		var x = e.layerX || e.clientX;
		var y = e.layerY || e.clientY;

		e.dataTransfer.setData('x', x);
		e.dataTransfer.setData('y', y);

		this.setState({dragging: true});
		this.props.onStart(this.props.id, e);
	}

	handleDragEnd = e => {
		// e && e.preventDefault()
		console.log('DRAG END');
		this.setState({dragging: false});
		this.props.onEnd(this.props.id, e);
	}

	render() {
		return (
			<div className='draggable' draggable='true' onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
				{this.props.children}
			</div>
		);
	}
}

export default Draggable;

Draggable.propTypes = {
	id: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]).isRequired,
	children: React.PropTypes.object.isRequired,
	onStart: React.PropTypes.func,
	onEnd: React.PropTypes.func
};

Draggable.defaultProps = {
	onStart: () => {},
	onDrag: () => {},
	onEnd: () => {}
};
