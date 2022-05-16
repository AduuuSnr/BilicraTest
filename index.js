/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StoreProvider from './StoreProvider';

AppRegistry.registerComponent(appName, () => StoreProvider);
