import "react-native-gesture-handler"
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/screens/routes/AppNavigator'
import {ToastProvider} from 'react-native-toast-notifications';
import CustomToast from "./src/screens/component/CustomToast";





const app = () => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle={Platform.select({ android: 'light-content', ios: 'light-content' })} />
      <NavigationContainer>
        <ToastProvider
          placement="top"
          duration={5000}
          animationType="slide-in"
          animationDuration={250}
          successColor="#028a0f"
          dangerColor="#60100b"
          warningColor="#e69b00"
          normalColor="gray"
          textStyle="white"
          style={{ elevation: 10 }}
          renderType={{
            custom_toast: toast => <CustomToast toast={toast} />,
            custom_error_toast: toast => (
              <CustomToast toast={toast} variant="error" />
            ),
            custom_success_toast: toast => (
              <CustomToast toast={toast} variant="success" />
            ),
            custom_attention_toast: toast => (
              <CustomToast toast={toast} variant="warning" />
            ),
          }}
          swipeEnabled={true}>
           <AppNavigator />
        </ToastProvider> 
      </NavigationContainer>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#060C27"
  }
})


export default app

