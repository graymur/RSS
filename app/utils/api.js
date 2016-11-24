import request from 'utils/request';

function makeRequest(endpoint, data = {}, config = {}) {
    config.method = config.method || 'GET';

    let url;

    if (config.method === 'GET') {
        url = `/api/1/${endpoint}?` + Object.keys(data).map(k => k + '=' + encodeURIComponent(data[k])).join('&');
    } else {
        url = `/api/1/${endpoint}`;
        config.body = JSON.stringify(data);
        config.headers = { 'Content-Type': 'application/json' };
    }

    return request(url, config);
}

export default {
    checkFeed: url => makeRequest('check', { url }),
    saveFeed: data => makeRequest('save', data, { method: 'PUT' }),
    fetchFeeds: () => makeRequest('feeds'),
    fetchFeed: id => makeRequest('feed', { id }),
    updateFeed: id => makeRequest('update', { id })
};