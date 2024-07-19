import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

function useKeyboard() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardDimensions, setKeyboardDimensions] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true);
        setKeyboardDimensions(e);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardDimensions(null);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {isKeyboardVisible, keyboardDimensions};
}

export default useKeyboard;
