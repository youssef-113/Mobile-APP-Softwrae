
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../components/CustomDrawer';

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawer {...props} />} />
  );
}
