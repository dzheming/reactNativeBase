import 'react-native-gesture-handler';
import React from 'react';
import NewsPage from './components/NewsPage';
import UserPage from './components/UserPage';
import NewsShow from './components/NewsShow';
import CommentsPage from './components/CommentsPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from "./assets/icons/home.svg"
import HomeActive from "./assets/icons/homeActive.svg"
import User from "./assets/icons/user.svg"
import UserActive from "./assets/icons/userActive.svg"

const HameStack = createStackNavigator();
const UserStack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color }) => {
            if (route.name === 'Home') {
              return focused ? <HomeActive color={color} width={32} height={32}/> : <Home color={color} width={30} height={30}/>
            } else if (route.name === 'User') {
              return focused ? <UserActive color={color} width={32} height={32}/> : <User color={color} width={30} height={30}/>
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}
        >
        <Tab.Screen name="Home">
          {() => (
            <HameStack.Navigator mode="modal">
              <HameStack.Screen name="News" component={NewsPage} options={{ headerShown: false }}/>
              <HameStack.Screen name="NewsShow" component={NewsShow} />
              <HameStack.Screen name="CommentsPage" component={CommentsPage} />
            </HameStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="User">
          {() => (
            <UserStack.Navigator>
              <UserStack.Screen name="User" component={UserPage} />
            </UserStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
