import { createStackNavigator } from '@react-navigation/stack'
import { AuthRoutesType } from '../types/routes';

// Import Screens
import { RegisterUser } from '../screens/RegisterUser';
import { Credentials } from '../screens/Login/Credentials';
import { RecoverPassword } from '../screens/Login/RecoverPassword';

const { Navigator, Screen } = createStackNavigator<AuthRoutesType>();

export default function AuthRoutes() {
    return (
        <Navigator
            initialRouteName="Login Screen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen 
                name="Register User Screen"
                component={RegisterUser}
                initialParams={{ onComplete: () => console.log("completed") }}
            />

            <Screen 
                name="Login Screen"
                component={Credentials}
            />

            <Screen
                name="Recover Password Screen"
                component={RecoverPassword}
            />
        </Navigator>
    )
}