// import React from 'react';
// import {
//   SafeAreaView,
//   Button,
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   ActivityIndicator,
//   TextInput,
// } from 'react-native';
// import {signIn} from '@okta/okta-react-native';
// import Error from '../components/Error';
// import {useDispatch} from 'react-redux';

// export default class LoginScreen extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       progress: false,
//       username: '',
//       password: '',
//       error: '',
//     };

//     this.login = this.login.bind(this);
//   }

//   login() {
//     if (this.state.progress == true) {
//       return;
//     }

//     this.setState({progress: true});

//     const {username, password} = this.state;
//     const {navigation} = this.props;

//     signIn({username, password})
//       .then(_token => {
//         console.log('token:', _token);

//         this.setState(
//           {
//             progress: false,
//             username: '',
//             password: '',
//             error: '',
//           },
//           () => navigation.navigate('Home'),
//         );
//       })
//       .catch(error => {
//         this.setState({
//           progress: false,
//           username: '',
//           password: '',
//           error: error.message,
//         });
//       });
//   }

//   render() {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView style={styles.container}>
//           {this.state.progress ? <ActivityIndicator /> : <></>}
//           <Error error={this.state.error} />
//           <View style={styles.buttonContainer}>
//             <View style={styles.button}>
//               <TextInput
//                 value={this.state.username}
//                 style={styles.textInput}
//                 autoCapitalize="none"
//                 placeholder="User Name"
//                 onChangeText={username => this.setState({username: username})}
//               />
//               <TextInput
//                 style={styles.textInput}
//                 value={this.state.password}
//                 placeholder="Password"
//                 autoCapitalize="none"
//                 secureTextEntry={true}
//                 onChangeText={password => this.setState({password: password})}
//               />
//               <View style={{marginTop: 40, height: 40}}>
//                 <Button onPress={this.login} title="Login" />
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
//   textInput: {
//     marginTop: 10,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
//   buttonContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     borderRadius: 40,
//     width: 200,
//     height: 40,
//     marginTop: 40,
//     marginBottom: 10,
//     marginHorizontal: 10,
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#0066cc',
//     paddingTop: 40,
//     textAlign: 'center',
//   },
// });

import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {signIn} from '@okta/okta-react-native';
import Error from '../components/Error';
import {useDispatch} from 'react-redux';
import {setUser} from '../@redux/app/actions';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const login = useCallback(() => {
    if (progress == true) {
      return;
    }

    setProgress(true);
    console.log('dfdf', username);
    console.log(password);
    signIn(username, password)
      .then(_token => {
        console.log('token:', _token);

        dispatch(setUser(_token));

        setProgress(false);
        // setUserName('');
        // setPassword('');
        // setError('');

        navigation.navigate('Home');
      })
      .catch(error => {
        setProgress(false);
        // setUserName('');
        // setPassword('');
        setError(error.message);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {progress ? <ActivityIndicator /> : <></>}
        <Error error={error} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TextInput
              // value={username}
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="User Name"
              onChangeText={username => setUsername({username})}
            />
            <TextInput
              style={styles.textInput}
              // value={password}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={password => setPassword({password})}
            />
            <View style={{marginTop: 40, height: 40}}>
              <Button onPress={login} title="Login" testID="loginButton" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 40,
    width: 200,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0066cc',
    paddingTop: 40,
    textAlign: 'center',
  },
});
