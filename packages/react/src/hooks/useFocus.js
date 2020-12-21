import { useState, useEffect} from 'react';

const getPath = (evt) => {
  if (evt.path) return evt.path;
  var path = [];
    var currentElem = evt.target;
    while (currentElem) {
      path.push(currentElem);
      currentElem = currentElem.parentElement;
    }
    if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
      path.push(document);
    if (path.indexOf(window) === -1)
      path.push(window);
    return path;
}

const useFocus = (ref, binding = (e, b) => {}) => {
  const [focus, setFocus] = useState(false);
  const container = document.body;

  useEffect(() => {
    if (ref.current) {
      const listener = (evt) => {
        if (getPath(evt).includes(ref.current)) {
          binding(evt, true);
          if (evt.defaultPrevented === false) {
            setFocus(true);
          }
        } else {
          binding(evt, false);
          if (evt.defaultPrevented === false) {
            setFocus(false);
          }
        }
      };
      container.addEventListener('mousedown', listener);
      return () => {
        container.removeEventListener('mousedown', listener);
      }
    }
  }, [ref]);

  return focus;
}

export default useFocus;
