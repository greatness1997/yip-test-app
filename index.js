/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/screens/Auth/AuthContext';


const RNRedux = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
