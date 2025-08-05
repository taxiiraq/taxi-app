import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, Text, IconButton, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type SupportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Support'>;

export default function SupportScreen() {
  const navigation = useNavigation<SupportScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !phone || !message) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setLoading(true);
    try {
      // محاكاة إرسال الرسالة
      setTimeout(() => {
        Alert.alert(
          'تم الإرسال',
          'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
          [
            {
              text: 'حسناً',
              onPress: () => navigation.goBack(),
            },
          ]
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء إرسال الرسالة');
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
          <Text style={styles.title}>الدعم الفني</Text>
          <Text style={styles.subtitle}>كيف يمكننا مساعدتك؟</Text>
        </View>

        <Card style={styles.contactCard}>
          <Card.Content>
            <View style={styles.contactHeader}>
              <IconButton
                icon="headset"
                size={40}
                iconColor="#007bff"
              />
              <View style={styles.contactText}>
                <Text style={styles.contactTitle}>تواصل معنا</Text>
                <Text style={styles.contactDescription}>
                  نحن هنا لمساعدتك في أي وقت
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.form}>
          <TextInput
            label="الاسم الكامل"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
          />

          <TextInput
            label="البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
            label="رسالتك"
            value={message}
            onChangeText={setMessage}
            mode="outlined"
            style={styles.messageInput}
            multiline
            numberOfLines={6}
            placeholder="اكتب رسالتك هنا..."
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            loading={loading}
            disabled={loading}
          >
            إرسال الرسالة
          </Button>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>معلومات التواصل</Text>
          
          <Card style={styles.infoCard}>
            <Card.Content>
              <View style={styles.infoRow}>
                <IconButton icon="phone" size={20} />
                <Text style={styles.infoText}>+966 50 123 4567</Text>
              </View>
              <View style={styles.infoRow}>
                <IconButton icon="email" size={20} />
                <Text style={styles.infoText}>support@taxiapp.com</Text>
              </View>
              <View style={styles.infoRow}>
                <IconButton icon="clock" size={20} />
                <Text style={styles.infoText}>24/7 متاح على مدار الساعة</Text>
              </View>
            </Card.Content>
          </Card>
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
  contactCard: {
    marginBottom: 30,
    elevation: 4,
    borderRadius: 12,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    flex: 1,
    marginLeft: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
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
    elevation: 2,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
}); 