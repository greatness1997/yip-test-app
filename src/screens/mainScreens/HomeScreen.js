import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { s } from "react-native-size-matters";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { empty, jean } from "../../assets/exports";
import Layout from "../component/Layout";
import CustomSearchField from "../component/CustomSearchField";
import { isEmpty } from 'lodash'
import Button from "../component/Button";
import { getItems, deleteItem } from "./logic";
import { useAuth } from "../Auth/AuthContext";
import { useToast } from 'react-native-toast-notifications';
import { useFocusEffect } from "@react-navigation/native";



const HomeScreen = ({ navigation }) => {

    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const toast = useToast()

    const { token, logout } = useAuth()

    const handleSearch = () => {
        console.log('Searching for:', searchText);
    };


    const fetchItems = async () => {
        setLoading(true);
        const response = await getItems(token);
        setLoading(false);

        if (response.status === "success") {
            setItems(response.data);
        }
    };

    useEffect(() => {
        fetchItems()
    }, [items])

    useFocusEffect(
        useCallback(() => {
            fetchItems()
        }, [])
    );

    const handleSuccessNotification = () =>
        toast.show('Successful', {
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

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        const response = await deleteItem(id, token);
                        if (response.status === "success") {
                            handleSuccessNotification("Item deleted successfully");
                            await fetchItems()
                        } else {
                            handleFailedNotification(response.message);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };


  const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("ItemDetails", { data: item })} style={styles.card}>
                <Image source={{ uri: item.photo }} style={styles.house} />
                <View style={{ marginTop: s(10) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: s(14), fontWeight: "600", marginTop: s(5) }}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item._id)}>
                            <MaterialCommunityIcons name="delete" size={s(18)} color="red" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", width: "70%", marginTop: s(5) }}>
                        <Text style={{ color: "gray", fontSize: s(14), fontWeight: "400", width: "90%" }}>{item.categoryName}</Text>
                        <Text style={{ color: "green", fontSize: s(14), fontWeight: "400", width: "90%" }}>₦{item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };



    return (
        <Layout>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: s(30), height: s(30), backgroundColor: "black", borderRadius: s(50) }}></View>
                    <View style={{ marginLeft: s(5) }}>
                        <Text style={{ color: "grey", fontWeight: "400", fontSize: s(12) }}>Hello,</Text>
                        <Text style={{ color: "#0c0c26", fontWeight: "600", fontSize: s(12), marginTop: s(2) }}>Greatness</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => logout()} style={{ justifyContent: "center", alignItems: "center", width: s(30), height: s(30), backgroundColor: "white", borderRadius: s(50), marginRight: s(5) }}>
                        <MaterialCommunityIcons name="logout" size={s(22)} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: s(30) }}>
                <CustomSearchField
                    value={searchText}
                    onChangeText={setSearchText}
                    onSearch={handleSearch}
                    placeholder="Search..."
                />
            </View>

            <View style={{ marginTop: s(15), marginBottom: s(10), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", fontSize: s(14), color: "#656565" }}>Categories</Text>
                {!isEmpty(items) && (<TouchableOpacity
                    style={{
                        backgroundColor: "green",
                        width: s(25),
                        height: s(25),
                        borderRadius: s(20),
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => navigation.navigate("AddItem")}
                >
                    <MaterialCommunityIcons name="plus" color="white" size={s(15)} />
                </TouchableOpacity>)}
            </View>

            {isEmpty(items) ?
                (<View>
                    <View style={{ marginTop: "30%", alignItems: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <Image source={empty} style={{ width: s(100), height: s(100) }} />
                            <Text style={{ fontWeight: "bold", fontSize: s(14), color: "#4F4F4F" }}>No Items to Display</Text>
                            <View style={{ width: "80%" }}>
                                <Text style={{ marginTop: s(10), fontWeight: "500", fontSize: s(13), color: "#9a9a9a", textAlign: "center", lineHeight: s(18) }}>
                                    You have no items on your page, click the button bellow to add items
                                </Text>
                            </View>
                            <Button title="Add Item" onPress={() => navigation.navigate("AddItem")} style={{ width: s(100), height: s(40) }} />
                        </View>
                    </View>
                </View>) : (
                    <FlatList
                        data={items}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                    />
                )}

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    gradient: {
        flex: 1,
    },

    buttonContainer: {
        width: s(120),
        height: s(42),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(10),
        marginHorizontal: s(10),
    },
    house: {
        width: "100%",
        height: s(80),
        resizeMode: "cover"
    },
    card: {
        marginTop: s(10),
        width: "48%",
        backgroundColor: "#f5f5f5",
        padding: s(10),
        borderRadius: s(10),
        marginRight: s(10),
    },
});

export default HomeScreen;
