import React from 'react';
import PropTypes from 'prop-types';
//import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Resizeable from 'components/Resizeable/Resiziable.js';
import Feeds from 'components/Feeds/Feeds.js';
import Feed from 'components/Feed/Feed.js';
import Post from 'components/Post/Post.js';

import * as selectors from './selectors.js';

import { fetchFeeds, updateFeed } from './actions.js';

import './home.scss';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        feedsByGroups: PropTypes.array.isRequired,
        feeds: PropTypes.array.isRequired,
        fetchFeeds: PropTypes.func.isRequired
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

    componentWillMount() {
        this.fetchFeeds();
    }

    fetchFeeds() {
        if (!this.props.feeds.length) {
            this.props.fetchFeeds();
        }
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
        const { feedsByGroups } = this.props;

        return (
            <div className='content'>
                <Resizeable className='block' width={this.state.widths[0]} onDrag={this.dragHandlers[0]}>
                    <Feeds feeds={feedsByGroups} width={this.state.widths[0]} />
                </Resizeable>
                <Resizeable className='block' width={this.state.widths[1]} onDrag={this.dragHandlers[1]}>
                    <Feed width={this.state.widths[1]} />
                </Resizeable>
                <div className='block'>
                    <Post width={this.state.widths[0] + this.state.widths[1]} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    feeds: selectors.selectFeeds(),
    feedsByGroups: selectors.selectFeedsByGroups(),
    postsLoading: selectors.selectPostsLoading(),
    posts: selectors.selectPosts(),
    currentFeed: selectors.selectCurrentFeed()
});

export default connect(mapStateToProps, {
    fetchFeeds,
    updateFeed
})(HomePage);
