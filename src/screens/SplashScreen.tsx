import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const handleLoginPress = () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('خطأ في الانتقال إلى شاشة تسجيل الدخول:', error);
    }
  };

  const handleRegisterPress = () => {
    try {
      navigation.navigate('Register');
    } catch (error) {
      console.error('خطأ في الانتقال إلى شاشة التسجيل:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🚗</Text>
        </View>
        <Text style={styles.appName}>تطبيق التاكسي</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLoginPress}
        >
          تسجيل الدخول
        </Button>

        <Button
          mode="outlined"
          style={styles.registerButton}
          onPress={handleRegisterPress}
        >
          إنشاء حساب
        </Button>
      </View>

      <Text style={styles.supportText}>
        تواصل وياك – دعم فني
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    gap: 15,
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 8,
    backgroundColor: '#007bff',
  },
  registerButton: {
    borderRadius: 12,
    paddingVertical: 8,
    borderColor: '#007bff',
    borderWidth: 2,
  },
  supportText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 20,
  },
}); 