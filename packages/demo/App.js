import React, { useCallback, useState } from 'react';
import CuserProvider from '@cuser/react/Provider';
import Cuser from '@cuser/react/Cuser';
import Gui from './Gui';
const createClient = require('@cuser/client');

const ipfs = require('ipfs');
const cuserId = process.env.CUSER_ID;
const secured = /^https/.test(global.location.protocol);

const addr = `/dns4/${global.location.hostname}/tcp/${global.location.port ? global.location.port : (secured ? 443 : 80)}/${secured ? 'wss' : 'ws'}/p2p/${cuserId}`
console.log(addr);
const node = ipfs.create({
  repo: "/tmp/rubeniskov",
  EXPERIMENTAL: {
    ipnsPubsub: true,
  },
}).then(n => Promise.all([
  n.swarm.connect(addr),
]).then(() => n));

setInterval(() => node.then((n) => {
  n.id().then(({ id }) => console.log(id));
  n.swarm.peers().then((c) => console.log(JSON.stringify(c, null, 2)));
  // n.config.getAll().then((c) => console.log(JSON.stringify(c, null, 2)));
}), 5000);

const client = createClient(node, cuserId, {
  url: `${global.location.protocol}//${global.location.host}`
}, {
  timeout: 60000
});
const App = () => {
  const [settings, setSettings] = useState({
    auto: false
  });
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
