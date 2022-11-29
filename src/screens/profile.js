import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth";
import { useSelector } from "react-redux";
import { getUserInfo } from "../service/service.js";

const ProfileScreen = () => {
  const [user, setUser] = useState();

  const state = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    const getUser = async () => {
      const response = await getUserInfo(state.userId);
      if (response.status === 200) {
        setUser(response.data);
      }
    };
    getUser();
  }, [state]);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/login.png")} style={styles.avt} />
        <View style={{ marginLeft: 10, marginTop: 15 }}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            {user?.fullName}
          </Text>
          <Text style={{ fontSize: 16, color: "#e6e6e6", fontWeight: "bold" }}>
            Email : {user?.email}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ paddingVertical: 10 }}>
          Address: {user?.streetNumber + " " + user?.address}
        </Text>
        <Text style={{ paddingVertical: 10 }}>Emai: {user?.email}</Text>
        <Text style={{ paddingVertical: 10 }}>Full Name: {user?.fullName}</Text>
        <Text style={{ paddingVertical: 10 }}>
          ID Number: {user?.identityNumber}
        </Text>
        <Text style={{ paddingVertical: 10 }}>
          Phone Number: {user?.phoneNumber}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", flex: 1 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#F6A76E",
            marginTop: 100,
            width: 200,
            justifyContent: "center",
            flexDirection: "row",
            marginRight: 20,
            borderRadius: 100,
          }}
          onPress={() => dispatch(logout())}
        >
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: "white",
              fontWeight: "500",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avt: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#F6A76E",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
});

export default ProfileScreen;
