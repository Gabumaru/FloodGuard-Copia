import { createStackNavigator } from '@react-navigation/stack'

// Import Screens
import { Profile } from '../screens/Profile';
import { AlertConfig } from '../screens/AlertConfig';
import { ReportAbuse } from '../screens/ReportAbuse';
import { TalkToUs } from '../screens/TalkToUs';

const { Navigator, Screen } = createStackNavigator()

export default function ConfigRoutes() {
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
                name="Profile Screen"
                component={Profile}
                options={{
                    title: 'Informação Pessoal',
                }}
            />

            <Screen 
                name="Alert Configurations Screen"
                component={AlertConfig}
                options={{
                    title: 'Configurar Alertas',
                }}
            />

            <Screen 
                name="Report Abuse Screen"
                component={ReportAbuse}
                options={{
                    title: 'Denunciar Abuso',
                }}
            />

            <Screen
                name="Talk to Us Screen"
                component={TalkToUs}
                options={{
                    title: 'Fale Conosco'
                }}
            />
        </Navigator>
    )
}