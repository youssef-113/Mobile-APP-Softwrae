if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/SignUp" />;
}
