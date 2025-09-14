import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

// 화면 컴포넌트들
import HomeScreen from './screens/HomeScreen';
import FilterScreen from './screens/FilterScreen';
import MapScreen from './screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }
      console.log('위치 권한이 허용되었습니다.');
    } catch (error) {
      console.error('위치 권한 요청 중 오류:', error);
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // 커스텀 헤더 사용
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}