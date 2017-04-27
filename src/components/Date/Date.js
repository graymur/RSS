import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

export default class DateComponent extends React.PureComponent {
    static propTypes = {
        source: PropTypes.string.isRequired,
        format: PropTypes.string.isRequired
    };

    render() {
        const { source, format } = this.props;
        return (
            <span>{dateFns.format(source, format)}</span>
        );
    }
}
