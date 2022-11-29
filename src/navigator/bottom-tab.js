import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import HistoryScreen from "../screens/history";
import BillDetailScreen from "../screens/bill-detail";
import AuthScreen from "../screens/authenicate";
import { useSelector, shallowEqual } from "react-redux";
import ProfileScreen from "../screens/profile";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History-Main"
        component={HistoryScreen}
        options={{ title: "Delivery History" }}
      />
      <Stack.Screen
        name="Bill-Detail"
        component={BillDetailScreen}
        options={{ title: "Bill Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigation() {
  const userInfo = useSelector(
    (state) => state?.authenticationReducer,
    shallowEqual
  );

  return userInfo?.userId ? (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffffff"
      barStyle={{ backgroundColor: "#F6A76E" }}
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
          title: "Order Information",
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <Icon name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  ) : (
    <AuthScreen />
  );
}
