// components/CustomDrawer.js
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            {/* صورة واسم المستخدم */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    style={styles.avatar}
                />
                <Text style={styles.username}>مرحبا، مستخدم</Text>
            </View>

            {/* روابط الشاشات */}
            <View style={styles.body}>
                <DrawerItemList {...props} />
            </View>

            {/* زر تسجيل الخروج */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => alert('تم تسجيل الخروج')}>
                    <Text style={styles.logout}>تسجيل الخروج</Text>
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
