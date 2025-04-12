// components/CustomDrawer.js
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.header}>
                <Image
                     source={require('../assets/images/user.png')}
                    style={{width:50, height:50}}
                />
                <Text style={styles.username}>Hello, Dear </Text>
            </View>  
            <View style={styles.body}>
                <DrawerItemList {...props} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => alert('logout sucssfully')}>
                    <Text style={styles.logout}>logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#eee',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
    },
    body: {
        flex: 1,
        paddingTop: 10,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    logout: {
        color: 'red',
        fontWeight: 'bold',
    },
});
