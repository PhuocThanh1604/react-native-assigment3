import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import { FavoriteOrchidsProvider } from './screens/FavoriteOrchidsContext';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function OrchidsOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: 'black', 
        inactiveTintColor: 'white',
      }}
      tabBarStyle={{
        backgroundColor: '#9acd32', 
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color}></Ionicons>
          ),
          tabBarStyle: {
            backgroundColor: '#9acd32',
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: 'Favorite',
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color}></Ionicons>
          ),
          tabBarStyle: {
            backgroundColor: '#9acd32', // Màu nền cho Tab Favorite
          },
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoriteOrchidsProvider>
        <NavigationContainer>
          <Stack.Navigator
            options={{ headerTintColor: 'white', headerShown: false }}>
            <Stack.Screen
              name="OrchidsOverview"
              component={OrchidsOverview}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                title: 'Detail',
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="bookmark"
                    size={size}
                    color={color}></Ionicons>
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteOrchidsProvider>
    </>
  );
}
