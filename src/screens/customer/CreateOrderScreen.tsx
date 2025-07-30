import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type CreateOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateOrder'>;

export default function CreateOrderScreen() {
  const navigation = useNavigation<CreateOrderScreenNavigationProp>();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmitOrder = () => {
    if (address && phone && description) {
      navigation.navigate('TrackOrder', { orderId: 'new-order' });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text style={styles.title}>طلب توصيل جديد</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="العنوان"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="اكتب العنوان بالتفصيل"
          />

          <TextInput
            label="رقم الهاتف"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TextInput
            label="وصف الطلب"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="اكتب تفاصيل الطلب"
          />

          <TextInput
            label="ملاحظات إضافية (اختياري)"
            value={notes}
            onChangeText={setNotes}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="أي ملاحظات إضافية"
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={handleSubmitOrder}
              icon="send"
            >
              إرسال الطلب
            </Button>

            <Button
              mode="outlined"
              style={styles.backButtonStyle}
              onPress={() => navigation.goBack()}
            >
              رجوع
            </Button>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    flex: 1,
    gap: 20,
  },
  input: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  submitButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#007bff',
  },
  backButtonStyle: {
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: '#6c757d',
  },
}); 