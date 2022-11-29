import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { showToast } from "../component/toast";
import { getBills, updateBill } from "../service/service";

const HomeScreen = () => {
  const [bill, setBill] = useState();

  const state = useSelector((state) => state.authenticationReducer);

  const getFirstReceiveBill = async () => {
    try {
      const response = await getBills(state?.userId, state?.access_token);
      if (response.status === 200) {
        const listBill = response.data.filter((item) => !item?.delivered);
        listBill.length ? setBill(listBill[0]) : setBill(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeliver = async () => {
    try {
      const response = await updateBill(bill?.billId, state?.access_token);
      if (response.status === 200) {
        showToast("Deliver Succeed");
        await getFirstReceiveBill();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setInterval(async () => {
      await getFirstReceiveBill();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {bill ? (
        <>
          <Text style={styles.title}>Current Bill Information:</Text>
          <View style={styles.map}>
            <MapView
              initialRegion={{
                latitude: bill?.medicalShopDTO?.latitude,
                longitude: bill?.medicalShopDTO?.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              style={{ ...StyleSheet.absoluteFillObject }}
            >
              {bill?.customerDto?.longitude && (
                <Marker
                  coordinate={{
                    longitude: bill?.customerDto?.longitude,
                    latitude: bill?.customerDto?.latitude,
                  }}
                  title="Delivery Address"
                  description={`${bill?.customerDto?.streetNumber} ${bill?.customerDto?.address}`}
                />
              )}
              {bill?.medicalShopDTO?.longitude && (
                <Marker
                  coordinate={{
                    longitude: bill?.medicalShopDTO?.longitude,
                    latitude: bill?.medicalShopDTO?.latitude,
                  }}
                  title="Medical Shop Address"
                  description={`${bill?.medicalShopDTO?.streetNumber} ${bill?.medicalShopDTO?.address}`}
                />
              )}
            </MapView>
          </View>
          <View>
            <View>
              <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  Sop Address:{" "}
                </Text>{" "}
                {`${bill?.medicalShopDTO?.streetNumber} ${bill?.medicalShopDTO?.detailAddress}`}
              </Text>
              <Text style={{ fontSize: 20 }}>
                <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                  Deliver Address:{" "}
                </Text>{" "}
                {bill?.deliverToAddress}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>Note:</Text>{" "}
              {bill?.note}
            </Text>
            <Text style={{ fontSize: 20 }}>
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>Price:</Text>{" "}
              {bill?.totalPrice}
            </Text>
            <Text style={{ fontSize: 20 }}>
              <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                Payment:
              </Text>{" "}
              {bill?.paymentConfirmed ? "Paid" : "Unpaid"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#F6A76E",
              alignItems: "center",
              marginTop: 10,
              borderRadius: 40,
            }}
            onPress={onDeliver}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                paddingVertical: 10,
                color: "#ffffff",
              }}
            >
              Delivered
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/nobill.png")}
            style={{ width: 300, height: 300 }}
          />
          <Text>No Bill Available</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  map: {
    height: 300,
    width: Dimensions.get("window").width,
  },
});

export default HomeScreen;
