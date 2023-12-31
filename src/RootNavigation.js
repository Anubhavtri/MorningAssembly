import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationRef.current?.replace(name, params);
}

export function resetRoot(name) {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{name: name}],
  });
}
