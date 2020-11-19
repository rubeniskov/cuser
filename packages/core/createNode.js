const IPFS = require('ipfs');
// const Multiaddr = require('multiaddr')
// const WebRTCStar = require('libp2p-webrtc-star')
// const DelegatedPeerRouter = require('libp2p-delegated-peer-routing')
// const DelegatedContentRouter = require('libp2p-delegated-content-routing')

// libp2pOptions.modules.transport.push(WebRTCStar)

function createNode (options) {
  options = options || {}
  options.path = options.path || '/tmp/ipfs'
  return IPFS.create({
    // init: false,
    // start: true,
    // libp2p: getLibp2p,
    EXPERIMENTAL: {
      ipnsPubsub: true,
    },
    relay: {
      enabled: true,
      hop: {
        enabled: true
      }
    },
    config: {
      Addresses: {
        Swarm: [
          "/ip4/0.0.0.0/tcp/4001",
          "/ip4/0.0.0.0/tcp/4004/ws",
          '/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star',
          // "/ip6/::/tcp/4001",
        ]
      },
    },
    repo: options.path,
    // config: {
    //   Addresses: {
    //     Swarm: [
    //       '/ip4/0.0.0.0/tcp/0'
    //     ],
    //     API: '/ip4/127.0.0.1/tcp/0',
    //     Gateway: '/ip4/127.0.0.1/tcp/0'
    //   }
    // },
    ipld: options.ipld
  })
}


module.exports = createNode
