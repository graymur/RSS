import React from 'react';
import moment from 'moment';

export class Date extends React.PureComponent {
    static propTypes = {
        source: React.PropTypes.string.isRequired,
        format: React.PropTypes.string.isRequired
    };

    render() {
        const { source, format } = this.props;
        return (
            <span>{moment(source).format(format)}</span>
        );
    }
}

export default Date;