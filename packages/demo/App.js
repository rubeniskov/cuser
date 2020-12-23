import React, { useCallback, useState, useMemo } from 'react';
import CuserProvider from '@cuser/react/Provider';
import Cuser from '@cuser/react/Cuser';
import Gui from './Gui';
import createClient from '@cuser/client';

const ipfs = require('ipfs');

const node = ipfs.create({
  repo: "/tmp/rubeniskov",
  EXPERIMENTAL: {
    ipnsPubsub: true,
  },
  relay: {
		enabled: true,
		hop: {enabled: true}
	},
  libp2p: {
    config: {
      dht: {
        enabled: true
      }
    }
  }
});

const addr = '/dns4/gateway.rubeniskov.com/tcp/4004/wss/p2p/QmctQUkPYJi15UVTnHywMEfR7FbDkZE4KkAiCLwPCYgJF2';

Promise.resolve(node).then((n) => n.swarm.connect(addr));

const App = () => {
  const [settings, setSettings] = useState({
    auto: false,
    address: addr,
  });

  const client = useMemo(() => createClient(node, settings.address), [settings.address]);

  const handleUpdate = useCallback((newData) => setSettings({...settings, ...newData}), [settings]);

  return (
    <div>
      <Gui onUpdate={handleUpdate} data={settings} />
      <CuserProvider client={client} topicId={"CUSTOM_TOPIC_ID"}>
        <Cuser {...settings} style={{
          maxWidth: '640px',
          margin: 'auto',
        }}/>
      </CuserProvider>
    </div>
  )
}

export default App;


// .then(n => Promise.all([
//   n.swarm.connect(addr),
// ]).then(() => n));


// global.itall = require('it-all');
// setInterval(() => node.then((n) => {
//   n.id().then(({ id }) => console.log(id));
//   n.swarm.peers().then((c) => console.log(JSON.stringify(c, null, 2)));
//   // n.config.getAll().then((c) => console.log(JSON.stringify(c, null, 2)));
// }), 5000);



// node.then((node) => global.node = node);
// global.client = client;
