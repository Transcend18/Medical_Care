import { PaperProvider } from "react-native-paper";
import { AppProvider } from "./Components/AppContext/App-Context";
import { StackNavigator } from "./Components/Navigations/StackNavigation";


export default function App() {
  return (
    <AppProvider>
      <PaperProvider>
        <StackNavigator>
        </StackNavigator>
      </PaperProvider>
    </AppProvider>
  );
}

