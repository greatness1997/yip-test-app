import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { s } from "react-native-size-matters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { isEmpty } from 'lodash'

import Layout from "../component/Layout";




const ItemDetails = ({ navigation, route }) => {

    const { data } = route.params;

    return (
        <Layout>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text></Text>
                <Text style={{ color: "black", fontSize: s(14), fontWeight: "bold" }}>Details</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ padding: s(5), borderRadius: 50, backgroundColor: "#cefad0", alignItems: "center", borderColor: "green", borderWidth: 1 }}
                >
                    <MaterialCommunityIcons name="arrow-left" size={s(15)} color="green" />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: s(20) }}>
                <Image source={{ uri: data.photo }} style={{ width: "100%", height: s(300), resizeMode: "contain", borderRadius: s(20) }} />
            </View>

            <View style={{ marginTop: s(20) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={{ color: "black", fontSize: s(14), fontWeight: "bold" }}>{data.name.toUpperCase()}</Text>
                        <Text style={{ color: "black", fontSize: s(14), fontWeight: "400" }}>{data.categoryName.toUpperCase()}</Text>
                    </View>
                    <View style={{ alignItems: "center", backgroundColor: "green", width: s(100), padding: s(10), borderRadius: s(10) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <MaterialCommunityIcons name="star" size={s(18)} color="gold" />
                            <Text style={{ color: "white", fontSize: s(14), fontWeight: "400", marginLeft: s(5) }}>6.5</Text>
                        </View>
                        <Text style={{ color: "white", fontSize: s(12), fontWeight: "400", marginLeft: s(5), marginTop: s(5) }}>250 reviews</Text>
                    </View>
                </View>
                <View style={{ marginTop: s(10) }}>
                    <Text style={{ color: "black", fontSize: s(13), fontWeight: "600" }}>DESCRIPTION</Text>
                    <View style={{ width: "80%" }}>
                        <Text>{data.description}</Text>
                    </View>

                </View>
            </View>

        </Layout>
    );
};

const styles = StyleSheet.create({

});

export default ItemDetails;
