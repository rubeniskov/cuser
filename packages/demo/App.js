import React, { useCallback, useState } from 'react';
import CuserProvider from '@cuser/react/Provider';
import Cuser from '@cuser/react/Cuser';
import Gui from './Gui';
const createClient = require('@cuser/client').createClient;

const ipfs = require('ipfs');


const node = ipfs.create({
  repo: "/tmp/rubeniskov",
  EXPERIMENTAL: {
    ipnsPubsub: true,
  },
  // start: true,
  // relay: {
  //   enabled: true,
  //   hop: {
  //     enabled: true,
  //   },
  // },
});

const client = createClient(node);
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
