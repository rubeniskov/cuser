import { useLayoutEffect, useState } from 'react';
import useCuser from './useCuser';


const useReplayMessage = (opts) => {
  const {
    eventName = 'replyTo',
    attach = true,
  } = {
    ...opts
  }
  const {
    emitter
  } = useCuser();

  const [value, setValue] = useState(null);

  const replyTo = (value) => {
    emitter.emit(eventName, value);
  }

  const clear = () => {
    emitter.emit(eventName, null);
  }

  useLayoutEffect(() => {
    if(!attach) return
    const listener = (value) => {
      setValue(value);
    };
    emitter.addListener(eventName, listener);
    return () => {
      emitter.removeListener(eventName, listener);
    }
  }, [emitter]);

  return {
    replyTo,
    clear,
    value,
  }
}

export default useReplayMessage;
