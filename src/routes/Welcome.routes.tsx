import { createStackNavigator } from '@react-navigation/stack'

// Import Screens

const { Navigator, Screen } = createStackNavigator();
import Welcome from '../screens/Welcome';

export default function WelcomeRoutes() {
    return (
        <Navigator
            initialRouteName='Welcome Screen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f2f2f2',
                },
                headerShown: false,
                title: '',
            }}
        >
            <Screen 
                name="Welcome Screen"
                component={Welcome}
            />
        </Navigator>
    )
}