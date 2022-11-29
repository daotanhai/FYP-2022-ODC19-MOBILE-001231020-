import { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { saveInfo } from "../redux/auth";
import { useDispatch } from "react-redux";
import { showToast } from "../component/toast";
import { login, register } from "../service/service";
import jwt_decode from "jwt-decode";

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [registerUser, setRegisterUser] = useState({
    userName: "",
    password: "",
    passwordCfm: "",
    email: "",
    address: "",
    fullName: "",
    identityNumber: "",
    phoneNumber: "",
    postCode: "",
  });

  const onChange = (key, text) => {
    setUser({ ...user, [key]: text });
  };

  const onRegisterChange = (key, text) => {
    setRegisterUser({ ...registerUser, [key]: text });
  };

  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      if (!user.username || !user.password) {
        showToast("You need to fill all required fields");
        return;
      }
      const response = await login(user);
      if (response.status === 200) {
        const payload = jwt_decode(response.data.access_token);
        if (!payload?.roles?.includes("Shipper")) {
          showToast("Only for Shipper");
          return;
        }
        showToast("Login Succeed");
        dispatch(saveInfo({ ...response.data, userId: payload.userId }));
      } else {
        showToast("Login Failed");
      }
    } catch (error) {
      showToast("Login Failed");
      console.log(error.message);
    }
  };

  const onRegister = async () => {
    try {
      for (let key in registerUser) {
        if (!registerUser[key]) {
          showToast("All fields must be filled");
          return;
        }
      }
      if (registerUser.password !== registerUser.passwordCfm) {
        showToast("Password not match");
        return;
      }
      const response = await register(registerUser);
      if (response.status === 200) {
        showToast("Register Succeed");
        setIsLogin(true);
      } else {
        showToast("Register Failed");
      }
    } catch (error) {
      showToast("Register Failed");
      console.log(error);
    }
  };

  const renderForm = () => {
    return isLogin ? (
      <>
        <View style={styles.inputCtn}>
          <Icon name="account" color={"#A6A6A6"} size={26} />
          <TextInput
            style={styles.input}
            placeholder="username"
            value={user.username}
            onChangeText={(text) => onChange("username", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <Icon name="lock" color={"#A6A6A6"} size={26} />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            value={user.password}
            onChangeText={(text) => onChange("password", text)}
          />
        </View>
      </>
    ) : (
      <>
        <View style={styles.inputCtn}>
          <Icon name="account" color={"#A6A6A6"} size={26} />
          <TextInput
            style={styles.input}
            placeholder="username"
            value={registerUser.userName}
            onChangeText={(text) => onRegisterChange("userName", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <Icon name="lock" color={"#A6A6A6"} size={26} />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            value={registerUser.password}
            onChangeText={(text) => onRegisterChange("password", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <Icon name="lock" color={"#A6A6A6"} size={26} />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Cofirm Password"
            onChangeText={(text) => onRegisterChange("passwordCfm", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => onRegisterChange("email", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={(text) => onRegisterChange("fullName", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={(text) => onRegisterChange("address", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            placeholder="Identity Number"
            keyboardType="number-pad"
            onChangeText={(text) => onRegisterChange("identityNumber", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="number-pad"
            onChangeText={(text) => onRegisterChange("phoneNumber", text)}
          />
        </View>
        <View style={styles.inputCtn}>
          <TextInput
            style={styles.input}
            placeholder="Post Code"
            keyboardType="number-pad"
            onChangeText={(text) => onRegisterChange("postCode", text)}
          />
        </View>
      </>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>
          By signing in you are agreeing our Term and privacy policy
        </Text>
        <View style={styles.tabBtnCtn}>
          <TouchableOpacity
            onPress={() => {
              setIsLogin(true);
              setRegisterUser({});
            }}
            style={styles.tabButton}
          >
            <Text style={isLogin ? styles.tabBtnContent : styles.deactivate}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsLogin(false);
              setUser({});
            }}
            style={styles.tabButton}
          >
            <Text style={!isLogin ? styles.tabBtnContent : styles.deactivate}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View>{renderForm()}</View>
        <View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={isLogin ? onLogin : onRegister}
          >
            <Text style={styles.loginBtnContent}>
              {isLogin ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "relative",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          <Image
            source={require("../assets/login.png")}
            style={{
              position: "absolute",
              bottom: 20,
              width: 300,
              height: 300,
            }}
            resizeMode="contain"
          />
          <Image source={require("../assets/overlay.png")} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: Dimensions.get("window").height,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F6A76E",
  },
  description: {
    width: 300,
    textAlign: "center",
  },
  tabBtnCtn: {
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "center",
    marginTop: 30,
  },
  deactivate: {
    color: "#A6A6A6",
    fontSize: 20,
    fontWeight: "bold",
  },
  tabButton: {
    marginRight: 10,
  },
  tabBtnContent: {
    color: "#F6A76E",
    fontSize: 20,
    borderBottomColor: "#F6A76E",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  inputCtn: {
    flexDirection: "row",
    borderBottomColor: "#A6A6A6",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  input: {
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginBtn: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    backgroundColor: "#F6A76E",
    borderRadius: 20,
  },
  loginBtnContent: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AuthScreen;
