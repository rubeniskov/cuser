import { useState, useEffect } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import useCuser from '../hooks/useCuser';

const Status = ({ className }) => {
  const { client } = useCuser();
  const [ status, setStatus ] = useState(0);

  useEffect(() => {
    Promise.resolve(client._node).then((node) => {
      setStatus(node.isOnline() + 0);
    })
  }, []);

  console.log(status);
  return (
    <span title="status online" className={clsx(className, ['unhealthy', 'healthy'][status])}></span>
  )
}

export default styled(Status)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid;
  background-color: #ececec;
  color: #b4b5b4;

  &.healthy {
    background-color: #75e844;
    color: #7db964;
  }

  &.degraded {
    background-color: #e8e344;
    color: #b9b764;
  }

  &.unhealthy {
    background-color: #e84444;
    color: #b96464;
  }
`;
