import React from 'react';
import Resizeable from './Resiziable.js';

export default class Container extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node
    };

    constructor(props) {
        super(props);

        this.state = {
            widths: [25, 25]
        };

        this.dragHandlers = this.state.widths.map((width, index) => {
            return (position, element) => this.onDrag(index, position, element);
        });
    }

    onDrag(index, position, element) {
        const viewportOffset = element.getBoundingClientRect();
        const newWidth = Math.round((position - viewportOffset.left) / window.innerWidth * 100);

        if (newWidth < 5) return;

        const newWidths = this.state.widths.map(x => x);
        newWidths[index] = newWidth;

        this.setState({ widths: newWidths });
    }

    render() {
        return (
            <div className='container'>
                <Resizeable className='r _1' width={this.state.widths[0]} onDrag={this.dragHandlers[0]}>1</Resizeable>
                <Resizeable className='r _2' width={this.state.widths[1]} onDrag={this.dragHandlers[1]}>2</Resizeable>
                <div className='r _3' ref='r3'>
                    <div style={{ width: '10000px', height: '200px', border: '1px solid red' }} />
                </div>
            </div>
        );
    }
}
