import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {s} from "react-native-size-matters"
import useKeyboard from '../../hooks/useKeyboard';

const Layout = ({
  children,
  style,
  safeAreaViewStyleTop,
  safeAreaViewStyleBottom,
  touchable = true,
}) => {
  const {isKeyboardVisible} = useKeyboard();
  
  useEffect(() => {
    if (touchable) {
      Keyboard.dismiss();
    }
  }, [touchable]);

  return (
    <>
      <SafeAreaView
        style={[
          {backgroundColor: "white"},
          safeAreaViewStyleTop,
        ]}
      />
      <SafeAreaView
        style={[
          styles.safeView,
          {backgroundColor: "white"},
          safeAreaViewStyleBottom,
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          {touchable ? (
            <TouchableWithoutFeedback
              style={{flex: 1}}
              onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  styles.default,
                  isKeyboardVisible && {
                    paddingBottom:
                      Platform.OS === 'ios' ? s(16) : s(16),
                  },
                  style,
                ]}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={[
                styles.default,
                isKeyboardVisible && {
                  paddingBottom:
                    Platform.OS === 'ios' ? s(16) : s(16),
                },
                style,
              ]}>
              {children}
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  default: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'ios' ? s(8) : s(16),
    paddingHorizontal: s(15),
  },
});

export default Layout;
