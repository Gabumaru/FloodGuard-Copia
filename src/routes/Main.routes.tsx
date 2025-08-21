import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Import Screens
import { Home } from '../screens/Home'
import { Forum } from '../screens/Forum';
import { Map } from '../screens/Map';

const { Navigator, Screen } = createBottomTabNavigator()

export default function MainRoutes() {
    return (
        <Navigator
            initialRouteName='Home Screen'
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: '#2d3142',
                    height: 55, 
                    paddingHorizontal: 20,
                },
                tabBarActiveTintColor: '#5e9ff2',
                tabBarInactiveTintColor: '#ffffff',
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Screen 
                name='Home Screen'
                component={Home}
                options={{
                    tabBarIcon: ({color}) => (
                        <Ionicons 
                            name='notifications'
                            size={35}
                            color={color}
                        />
                    ),
                    title: 'Home',
                }}
            />
            <Screen 
                name='Forum Screen'
                component={Forum}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons 
                            name='forum'
                            size={35}
                            color={color}
                        />
                    ),
                    title: 'Forum',
                }}
            />
            <Screen 
                name='Map Screen'
                component={Map}
                options={{
                    tabBarIcon: ({color}) => (
                        <Ionicons 
                            name='map-sharp'
                            size={35}
                            color={color}
                        />
                    ),
                    title: 'Map',
                }}
            />
        </Navigator>
    )
}