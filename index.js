const fetch = require('isomorphic-fetch');
const queryString = require('query-string');


const handleResponse = call => call.then(response => response.json());

class Rest {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    };

    this.handleResponse = handleResponse;
  }

  mergeHeaders(headers) {
    return Object.assign({}, this.headers, headers);
  }

  config(options) {
    if ('headers' in options) {
      this.headers = this.mergeHeaders(options.headers);
    }
    if ('handleResponse' in options) {
      this.handleResponse = options.handleResponse;
    }
  }

  get(url, params = null, headers = {}) {
    const getUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    const call = fetch(getUrl, {
      headers: this.mergeHeaders(headers),
    });
    return this.handleResponse(call);
  }

  post(url, body, headers = {}) {
    const call = fetch(url, {
      method: 'POST',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    });
    return this.handleResponse(call);
  }

  patch(url, body, headers = {}) {
    const call = fetch(url, {
      method: 'PATCH',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    });
    return this.handleResponse(call);
  }
}

const instance = new Rest();

module.exports = instance;
