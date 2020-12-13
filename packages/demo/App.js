import React, { useCallback, useState } from 'react';
import CuserProvider from '@cuser/react/Provider';
import Cuser from '@cuser/react/Cuser';
import Gui from './Gui';
const createClient = require('@cuser/client');

const ipfs = require('ipfs');

const cuserId = process.env.CUSER_ID;
const node = ipfs.create({
  repo: "/tmp/rubeniskov",
  EXPERIMENTAL: {
    ipnsPubsub: true,
  },
  // libp2p: {
  //   autoDialIterval: 30000
  // },
  // config: {
  //   Addresses: {
  //     Swarm: [
  //         // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
  //         '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
  //     ]
  //   }
  // }
}).then(n => Promise.all([
  // n.swarm.connect(`/dns4/${global.location.hostname}/tcp/443/wss/p2p/${cuserId}`, {
  //   timeout: 60000
  // })
  n.swarm.connect(`/dns4/${global.location.hostname}/tcp/4004/ws/p2p/${cuserId}`),
  // n.swarm.connect(`/dns4/localhost/tcp/4004/ws/p2p/${cuserId}`),
]).then(() => console.log('LOADED 2', n)||n));

// node.then((n) => {
//   console.log(n);
//   // n.swarm.connect(`/ip4/192.168.0.11/tcp/4003/p2p/${cuserId}`);
//   n.swarm.connect(`/dns4/localhost/tcp/8081/wss/p2p/${cuserId}`);
//   // /ip4/192.168.0.11/tcp/4003/ws/p2p/QmTqbgEDbedXVRN86TVtBzGYsfq5MNzey7yUyNjb3kUTn7
//   // n.swarm.connect('/dns4/localhost/tcp/13579/ws/p2p-webrtc-star/p2p/QmTqbgEDbedXVRN86TVtBzGYsfq5MNzey7yUyNjb3kUTn7')
//   // /ip4/192.168.0.11/tcp/4002/ws/p2p/QmTqbgEDbedXVRN86TVtBzGYsfq5MNzey7yUyNjb3kUTn7
// });

const client = createClient(node, cuserId, {
  url: `http://${global.location.hostname}:3000`
}, { timeout: 60000 });
const App = () => {
  const [data, setDate] = useState({
    auto: false
  });
  const handleUpdate = useCallback((newData) => setDate({...data, ...newData}), [data]);
  return (
    <div>
      <Gui onUpdate={handleUpdate} data={data} />
      <CuserProvider client={client} >
        <Cuser {...data} topicId={"CUSTOM_TOPIC_ID"}/>
      </CuserProvider>
    </div>
  )
}

export default App;
