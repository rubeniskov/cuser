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

  const replayTo = (value) => {
    console.log('????', value)
    emitter.emit(eventName, value);
  }

  const clear = () => {
    emitter.emit(eventName, null);
  }

  useLayoutEffect(() => {
    if(!attach) return
    const listener = (value) => {
      console.log('yeah', value)
      setValue(value);
    };
    emitter.addListener(eventName, listener);
    return () => {
      emitter.removeListener(eventName, listener);
    }
  }, [emitter]);

  return {
    replayTo,
    clear,
    value,
  }
}

export default useReplayMessage;
