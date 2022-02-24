import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}


export function navigateBack() {
  navigationRef.current?.goBack();
}

export function navigateToTheTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function navigateToPreviousStack() {
  navigateToTheTop();
  navigateBack();
}

export function navigateBackTo(routeName) {
  navigationRef.current?.navigate(routeName);
}
