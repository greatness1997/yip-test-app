import React from 'react';
import { Text, View } from 'react-native';
import { isEmpty, isNil } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { s } from 'react-native-size-matters';

const CustomToast = ({ toast, variant = 'custom' }) => {
  return (
    <View
      style={{
        width: '95%',
        height: s(50),
        backgroundColor:
          variant === 'success'
            ? '#008000' 
            : variant === 'warning'
            ? '#FFA500'
            : variant === 'error'
            ? '#FF0000'
            : '#8A2BE2',
        marginTop: 20,
        borderRadius: 8,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{ marginRight: 8 }}>
        {variant === 'success' && (
          <Icon
            name="check-circle"
            size={14}
            color="white" // Green for success, Red for error
            onPress={() => toast.onHide && toast.onHide()}
          />
        )}
        {variant === 'error' && (
          <Icon
            name="close-circle"
            size={14}
            color="white" // Green for success, Red for error
            onPress={() => toast.onHide && toast.onHide()}
          />
        )}
      </View>
      <View>
        {!isNil(toast?.data?.title ?? toast?.title) &&
          !isEmpty(toast?.data?.title ?? toast?.title) && (
            <Text
              style={{
                fontSize: s(14),
                color: '#FFFFFF', 
                fontFamily: 'Inter-Bold',
                fontWeight: variant === 'success' ? 'bold' : 'normal',
                marginBottom: 4, 
              }}>
              {toast?.title ?? toast?.data?.title ?? 'Success'}
            </Text>
          )}
        <Text
          style={{
            color: '#FFFFFF', 
            fontFamily: 'Inter-Regular', 
            fontSize: s(14),
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: s(20),
            letterSpacing: -0.05,
            paddingVertical: 4,
          }}>
          {toast?.message}
        </Text>
      </View>
    </View>
  );
};

export default CustomToast;
