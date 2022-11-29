import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getBills } from "../service/service";

const HistoryScreen = ({ navigation }) => {
  const [listBill, setListBill] = useState([]);

  const state = useSelector((state) => state.authenticationReducer);

  const getItems = async () => {
    try {
      const response = await getBills(state?.userId, state?.access_token);
      if (response.status === 200) {
        setListBill(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listBill}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item?.billId}
            style={{ backgroundColor: "#fff", marginBottom: 20 }}
            onPress={() => navigation.navigate("Bill-Detail", { item: item })}
          >
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginRight: 5 }}
                >
                  {item.medicalShopDTO?.medicalShopName}
                </Text>
                <Text>#{item?.billId}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 15,
                  marginLeft: 10,
                  paddingBottom: 10,
                  borderBottomColor: "#a2acbdcc",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={{
                    uri: "https://s3.ap-southeast-1.amazonaws.com/odc19/1662894362524-BingImageOfTheDay.jpg",
                  }}
                  resizeMode="cover"
                  style={styles.image}
                />
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.medicalShopDTO?.medicalShopName}
                  </Text>
                  <Text style={{ maxWidth: 250 }}>
                    Delivery Addres: {item?.deliverToAddress}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {item?.totalPrice} USD
                    </Text>{" "}
                    ({item?.goodsDTOS.length} items) -{" "}
                    {item?.paymentMethod.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={{ paddingBottom: 20, paddingHorizontal: 10 }}>
                <Text>{item?.delivered ? "Delivered" : "On Progress"}</Text>
              </View>
            </>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },
  image: {
    width: 100,
    height: 70,
    marginRight: 10,
  },
});

export default HistoryScreen;
