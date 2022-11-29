import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./src/navigator/bottom-tab";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  );
}
