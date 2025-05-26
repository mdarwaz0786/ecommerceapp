/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store/index';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;


// import { View, Text } from 'react-native';
// import React from 'react';

// const App = () => {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   );
// };

// export default App;
