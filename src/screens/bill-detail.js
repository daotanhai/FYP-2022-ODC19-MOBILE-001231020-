import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const BillDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <View style={styles.progressItem}>
          {!item.delivered ? (
            <Icon name="check-circle" size={15} color="#F6A76E" />
          ) : (
            <View style={styles.dot}></View>
          )}
          <Text>Ordered</Text>
        </View>
        <View style={styles.connector}></View>
        <View style={styles.progressItem}>
          {item.delivered ? (
            <Icon name="check-circle" size={15} color="#F6A76E" />
          ) : (
            <View style={styles.dot}></View>
          )}
          <Text>Delivered</Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingVertical: 10,
          borderBottomColor: "#cccccccc",
          borderBottomWidth: 1,
        }}
      >
        {item.delivered ? "Delivered" : "In Progress"}
      </Text>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#cccccccc",
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontWeight: "500", fontSize: 16, paddingBottom: 5 }}>
            {item.medicalShopDTO.medicalShopName}
          </Text>
          <Text>
            {item?.totalPrice} USD - {item?.goodsDTOS?.length} items -{" "}
            {item?.paymentMethod.toUpperCase()}
          </Text>
          <Text>
            Orderer : {item?.customerDTO.fullName} -{" "}
            {item?.customerDTO.phoneNumber}
          </Text>
        </View>
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", paddingBottom: 5 }}>
            Delivery To
          </Text>
          <Text>{`${item?.customerDTO?.streetNumber} ${item?.customerDTO?.address}`}</Text>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#cccccccc",
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        <FlatList
          style={{ maxHeight: 200 }}
          data={item?.goodsDTOS}
          renderItem={({ item }) => (
            <View key={item.goodsId} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 15,
                  marginLeft: 10,
                  paddingBottom: 10,
                }}
              >
                <Image
                  source={
                    item?.goodsUrlImage
                      ? {
                          uri: item.goodsUrlImage,
                        }
                      : require("../assets/goods.jpg")
                  }
                  resizeMode="cover"
                  style={{ width: 100, height: 70, marginRight: 10 }}
                />
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.goodsName}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {item?.price} USD
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#cccccccc",
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Total Price (2 items):</Text>
      </View>
      <Text style={{ textAlign: "right", fontWeight: "bold", fontSize: 20 }}>
        {item?.totalPrice} USD
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    alignItems: "stretch",
  },
  progress: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "#cccccccc",
    borderBottomWidth: 1,
  },
  progressItem: {
    alignItems: "center",
    paddingTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "#cccccc",
  },
  connector: {
    width: 150,
    height: 2,
    marginHorizontal: 5,
    backgroundColor: "#cccccc",
  },
});

export default BillDetailScreen;
