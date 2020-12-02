const EventEmitter = require('events')


const avatars = new Array(4).fill(null).map((_,idx) => (`https://www.w3schools.com/w3images/avatar${idx + 1}.png`))

const usernames = ['aurora', 'alice', 'bob', 'katelyn'];

/**
 * test
 */
class CuserClient extends EventEmitter {
  constructor(node, opts) {
    super();
    const {
      url = global.location.protocol + '//' + global.location.hostname + ':3000'
    } = { ...opts };

    this._node = node;
    this._fetcher = (url, opts) => fetch(url, {
      ...opts,
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      cache: 'no-cache',
    }).then((response) => response.status < 400 ? response.json() : response.json().then((err) => Promise.reject(err)));
    this._url = url;

    // this.__messages__ = new Array(200).fill().map((_,idx) => {
    //   const rand = Math.floor(Math.random() * avatars.length);
    //   return ({
    //   id: 'asdasdasdasd'+ idx,
    //   mdate: new Date().getTime(),
    //   content: {
    //     data: `Test message content nº ${idx}`
    //   },
    //   user: {
    //     peerId: 'asdasdasdasd',
    //     username: usernames[rand],
    //     avatar: avatars[rand]
    //   }
    // })}).reverse();
  }

  async getMessages(topicId, limit = 10, offset = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          messages: this.__messages__.slice(offset, offset + limit),
          count: this.__messages__.length,
        });
      }, Math.random() * 2000);
    });
  }

  async publishMessage(topicId, accessToken, content) {
    const message = {
      id: 'asdasdasdasd'+ this.__messages__.length,
      mdate: new Date().getTime(),
      content: {
        data: content
      },
      user: {
        peerId: 'asdasdasdasd',
        username: 'asdasd',
        avatar: 'https://avatars3.githubusercontent.com/u/6261914?s=460&u=2412cfab92dbef27237a478c0e073a59086762c2&v=4'
      }
    };

    this.__messages__.unshift(message);

    return new Promise((resolve) => setTimeout(() => {
      this.emit(`message:${topicId}`, message);
      resolve();
    }, 2000));
  }

  async updateMessage(topicId, accessToken, content) {

  }

  async deleteMessage(topicId, accessToken, content) {

  }

  subscribe(topicId, listener) {
    this.addListener(`message:${topicId}`, listener);
    return () => {
      this.removeListener(`message:${topicId}`, listener);
    }
  }

  async authenticate(payload) {
    return this._node.then(({ id }) => id().then(({ id }) => id))
      .then((peerId) => this._fetcher(this._url + '/auth',{
        method: 'POST',
        body: JSON.stringify({ ...payload, peerId }),
      }));
  }
}

CuserClient.createClient = (node, opts) => {
  return new CuserClient(node, opts);
}

module.exports = CuserClient;
