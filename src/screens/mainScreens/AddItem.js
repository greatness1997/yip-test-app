import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { s } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Layout from '../component/Layout';
import Button from '../component/Button';
import CustomTextInput from '../component/CustomTextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../Auth/AuthContext';
import { createItem } from './logic';
import { useToast } from 'react-native-toast-notifications';


const AddItem = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, isLoading] = useState(false)
    const { token } = useAuth();
    const toast = useToast()

    const Schema = Yup.object().shape({
        name: Yup.string().required('Product Name is required'),
        categoryName: Yup.string().required('Category Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive').integer('Price must be an integer'),
    });

    const handleChoosePhoto = async () => {
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 1,
        };

        try {
            const result = await launchImageLibrary(options);
            setSelectedImage(result.assets[0]?.uri);
        } catch (error) {
            console.log(error);
        }
    };


    const handleSuccessNotification = () =>
        toast.show('Add Item Successful', {
            type: 'custom_success_toast',
            animationDuration: 150,
            // message,
            data: {
                // title: 'Success',
            },
        });

    const handleFailedNotification = (message) =>
        toast.show('Add Item Failed', {
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

                <TouchableOpacity onPress={handleChoosePhoto} style={{ marginBottom: s(20), marginTop: s(20) }}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={{ width: s(100), height: s(100), borderRadius: s(10) }} />
                    ) : (
                        <View style={{ width: s(100), height: s(100), borderRadius: s(10), borderWidth: 1, borderColor: "lightgray", backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#a9a9a9" }}>Select Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Formik
                    initialValues={{ productName: "", price: "", categoryName: "", description: "" }}
                    validationSchema={Schema}
                    onSubmit={(values) => {
                        isLoading(true)
                        const formData = new FormData();
                        formData.append('name', values.name);
                        formData.append('price', values.price);
                        formData.append('categoryName', values.categoryName);
                        formData.append('description', values.description);
                        if (selectedImage) {
                            const file = {
                                uri: selectedImage,
                                name: 'photo.jpg',
                                type: 'image/jpeg',
                            };
                            formData.append('photo', file);
                        }

                        createItem(token, formData)
                            .then((response) => {
                                if (response.status === "success") {
                                    isLoading(false)
                                    handleSuccessNotification(response.message)
                                    navigation.goBack();
                                } else {
                                    isLoading(false)
                                    handleFailedNotification(response.message);
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                isLoading(false)
                                const {message} = error.response.data
                                handleFailedNotification(message);
                            });
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <ScrollView>
                            <View style={{ flex: 1 }}>
                                <CustomTextInput
                                    label="Product Name"
                                    iconComponent={<MaterialCommunityIcons name="account" />}
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                />
                                {errors.name && touched.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}

                                <CustomTextInput
                                    label="Price"
                                    iconComponent={<Ionicons name="pricetags" />}
                                    onChangeText={handleChange('price')}
                                    value={values.price}
                                />

                                {errors.price && touched.price && (
                                    <Text style={styles.errorText}>{errors.price}</Text>
                                )}

                                <CustomTextInput
                                    label="Category Name"
                                    iconComponent={<MaterialIcons name="category" />}
                                    onChangeText={handleChange('categoryName')}
                                    value={values.categoryName}
                                />

                                {errors.categoryName && touched.categoryName && (
                                    <Text style={styles.errorText}>{errors.categoryName}</Text>
                                )}

                                <CustomTextInput
                                    label="Description"
                                    iconComponent={<MaterialIcons name="description" />}
                                    onChangeText={handleChange('description')}
                                    value={values.description}
                                />

                                {errors.description && touched.description && (
                                    <Text style={styles.errorText}>{errors.description}</Text>
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

export default AddItem;
