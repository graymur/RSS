import request from 'utils/request';

function makeRequest(endpoint, data = {}, config = {}) {
	config.method = config.method || 'GET';
	config.credentials = 'same-origin';

	let url;

	if (config.method === 'GET') {
		url = `/api/1/${endpoint}?` + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&');
	} else {
		url = `/api/1/${endpoint}`;
		config.body = JSON.stringify(data);
		config.headers = {'Content-Type': 'application/json'};
	}

	return request(url, config);
}

export default {
	checkFeed: url => makeRequest('check', {url}),
	saveFeed: data => makeRequest('save', data, {method: 'PUT'}),
	fetchFeeds: () => makeRequest('feeds'),
	updateFeedPosts: id => makeRequest('update-feed-posts', {id}),
	markRead: (id, feedId) => makeRequest('mark-read', {id, feedId}, {method: 'POST'}),
	posts: config => makeRequest('posts', config),
	saveGroup: data => makeRequest('group', data, {method: 'POST'}),
	moveFeedToGroup: config => makeRequest('move-feed', config, {method: 'POST'})
};
