import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {isAuthenticated} from '@okta/okta-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createConfig} from '@okta/okta-react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: true,
      authenticated: false,
    };

    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  async checkAuthentication() {
    const result = await isAuthenticated();

    this.setState({
      authenticated: result.authenticated,
      progress: false,
    });
  }

  async componentDidMount() {
    await createConfig({
      clientId: '0oa517anv4uuqFvpr5d7', // e.g.: `a0abcEf0gH123ssJS4o5`
      redirectUri: 'com.okta.dev-47183138:/callback', // e.g.: `com.okta.example:/callback`
      endSessionRedirectUri: 'com.okta.dev-47183138:/', // e.g.: com.okta.example:/logout
      discoveryUri: 'https://dev-47183138.okta.com/oauth2/default',
      scopes: ['openid', 'profile', 'offline_access'],
      requireHardwareBackedKeyStore: false,
    });

    await this.checkAuthentication();
  }

  render() {
    if (this.state.progress) {
      return (
        <SafeAreaView>
          <ActivityIndicator />
        </SafeAreaView>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={this.state.authenticated ? 'Home' : 'Login'}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
