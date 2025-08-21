import { createStackNavigator } from '@react-navigation/stack'

// Import Screens
import { Configs } from '../screens/Configs';
import { WriteComment } from '../screens/WriteComment';

const { Navigator, Screen } = createStackNavigator();

export default function SecondaryRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f2f2f2',
                },
                headerShown: true,
                title: '',
            }}
        >
            <Screen 
                name="Configurations Screen"
                component={Configs}
            />
            <Screen 
                name="Write Comment Screen"
                component={WriteComment}
            />
        </Navigator>
    )
}