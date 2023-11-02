import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

const Finger = async () => {
    const navigation = useNavigation();
    const hasFingerPrint = await LocalAuthentication.hasHardwareAsync();
    if (hasFingerPrint) {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'เข้าสู่แอปพลิเคชันด้วยลายนิ้วมือ',
        });
  
        if (result.success) {
            navigation.navigate('Gyroscope');
        } else {
          alert('ลายนิวมือไม่ถูกต้อง');
        }
      } else {
        alert('โปรดลงทะเบียนลายนิ้วมือ');
      }
    } else {
        alert('อุปกรณ์ไม่รองรับการแสกนลายนิ้วมือ');
    }
  };
  export default Finger;