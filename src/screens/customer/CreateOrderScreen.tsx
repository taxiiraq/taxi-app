import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type CreateOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateOrder'>;

export default function CreateOrderScreen() {
  const navigation = useNavigation<CreateOrderScreenNavigationProp>();
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    if (!pickupAddress || !destinationAddress) {
      Alert.alert('خطأ', 'يرجى إدخال عنوان الانطلاق والوجهة');
      return;
    }

    setLoading(true);
    try {
      // محاكاة إنشاء الطلب
      setTimeout(() => {
        Alert.alert(
          'تم إنشاء الطلب',
          'تم إنشاء طلبك بنجاح! سيتم التواصل معك قريباً.',
          [
            {
              text: 'حسناً',
              onPress: () => navigation.navigate('CustomerHome'),
            },
          ]
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('خطأ في إنشاء الطلب:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء إنشاء الطلب');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text style={styles.title}>طلب تاكسي جديد</Text>
          <Text style={styles.subtitle}>أدخل تفاصيل رحلتك</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="عنوان الانطلاق"
            value={pickupAddress}
            onChangeText={setPickupAddress}
            mode="outlined"
            style={styles.input}
            placeholder="أدخل عنوان الانطلاق"
          />

          <TextInput
            label="عنوان الوجهة"
            value={destinationAddress}
            onChangeText={setDestinationAddress}
            mode="outlined"
            style={styles.input}
            placeholder="أدخل عنوان الوجهة"
          />

          <TextInput
            label="وصف إضافي (اختياري)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.messageInput}
            multiline
            numberOfLines={4}
            placeholder="أضف أي تفاصيل إضافية..."
          />

          <Button
            mode="contained"
            onPress={handleCreateOrder}
            style={styles.submitButton}
            loading={loading}
            disabled={loading}
          >
            إنشاء الطلب
          </Button>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>معلومات مهمة</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>• متوسط وقت الانتظار: 5-10 دقائق</Text>
            <Text style={styles.infoText}>• السعر سيتم تحديده حسب المسافة</Text>
            <Text style={styles.infoText}>• يمكنك تتبع التاكسي في الوقت الفعلي</Text>
            <Text style={styles.infoText}>• الدفع نقداً أو ببطاقة الائتمان</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  messageInput: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#007bff',
  },
  infoSection: {
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
}); 