import { createStackNavigator } from '@react-navigation/stack';
import WelcomeRoutes from './Welcome.routes';
import MainRoutes from './Main.routes';
import ConfigRoutes from './Config.routes';
import SecondaryRoutes from './Secondary.routes';
import AuthRoutes from './Auth.routes';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
    return (
        <Navigator
            initialRouteName="Main Tabs"
            screenOptions={{ headerShown: false }}
        >
            <Screen name="Welcome Tabs" component={WelcomeRoutes} />
            <Screen name="Main Tabs" component={MainRoutes} />
            <Screen name="Secondary Tabs" component={SecondaryRoutes} />
            <Screen name="Configurations Tabs" component={ConfigRoutes} />
            <Screen name="Authentication Tabs" component={AuthRoutes} />
        </Navigator>
    );
}
