import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { s } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Layout from '../component/Layout';
import Button from '../component/Button';
import CustomTextInput from '../component/CustomTextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from './AuthContext';
import { useToast } from 'react-native-toast-notifications';


const LoginPage = ({ navigation }) => {

    const { login, loading } = useAuth();

    const Schema = Yup.object().shape({
        login: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const toast = useToast()

    const handleSuccessNotification = () =>
        toast.show('Login Successful', {
            type: 'custom_success_toast',
            animationDuration: 150,
            // message,
            data: {
                // title: 'Success',
            },
        });

    const handleFailedNotification = (message) =>
        toast.show('Failed', {
            type: 'custom_error_toast',
            animationDuration: 150,
            message,
            data: {
                // title: 'Failed',
            },
        });


    return (
        <Layout>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text></Text>
                    <Text></Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ padding: s(5), borderRadius: 50, backgroundColor: "#cefad0", alignItems: "center", borderColor: "green", borderWidth: 1 }}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={s(15)} color="green" />
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: s(20), marginTop: s(20), width: "40%" }}>
                    <Text style={{ fontSize: s(20), fontWeight: "bold", color: 'black' }}>Let's get you in quickly</Text>
                </View>
                <Formik
                    initialValues={{ login: "", password: "" }}
                    validationSchema={Schema}
                    onSubmit={async (values) => {
                        const { status, message } = await login(values)
                        if (status === "success") {
                            handleSuccessNotification(message)
                            navigation.navigate("Home")
                        } else {
                            handleFailedNotification(message)
                        }
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <ScrollView>
                            <View style={{ flex: 1 }}>

                                <CustomTextInput
                                    label="Email"
                                    icon="email"
                                    onChangeText={handleChange('login')}
                                    value={values.login}
                                />
                                {errors.login && touched.login && (
                                    <Text style={styles.errorText}>{errors.login}</Text>
                                )}

                                <CustomTextInput
                                    label="Password"
                                    icon="lock"
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    secureTextEntry={true}
                                />
                                {errors.password && touched.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}

                            

                                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: s(50) }}>
                                    <Button title="Proceed" onPress={handleSubmit} style={styles.btn} isSubmitting={loading} />
                                </View>
                            </View>
                        </ScrollView>
                    )}
                </Formik>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: s(12),
        marginLeft: s(5),
    },
    btn: {
        backgroundColor: "green",
        marginTop: s(28),
        height: s(45),
        borderRadius: s(10),
    },
});

export default LoginPage;
