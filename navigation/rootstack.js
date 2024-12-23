import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for better icons
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../component/styles';
import ExploreScreen from '../component/explorepage/explore';
import MyAccountScreen from '../component/profilepage/profile';
import LoginScreen from '../component/loginpage/login';
import FavoritesScreen from '../component/favoritespage/favorites';
import WelcomeScreen from '../component/welcomepage/welcomenotes';
import SignUpScreen from '../component/signuppage/signup';
import SideMenu from '../navigation/sidemenu';
import HomeScreen from '../component/homepage/home';
import BarangayDamilag from '../component/brgydamilagpage/BarangayDamilagInfo';
import HomeStack from '../component/homestack';

const { primary, tertiary } = Colors;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="LoginScreen"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeStack"
          component={NavBar}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Explore') {
              iconName = 'compass';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            } else if (route.name === 'My Account') {
              iconName = 'user';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: '#4CAF50',
            paddingVertical: 10,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="My Account" component={MyAccountScreen} />
      </Tab.Navigator>

      {/* Render the SideMenu if the menu is open */}
      {isMenuOpen && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <SideMenu toggleMenu={toggleMenu} />
        </View>
      )}

      {/* Menu Button to Open/Close the Side Menu */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    padding: 10,
    borderRadius: 50,
    zIndex: 101, // Ensure the button is above other content
  },
});

export default RootStack;
