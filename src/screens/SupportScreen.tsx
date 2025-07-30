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
import { RootStackParamList } from '../App';

type SupportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Support'>;

export default function SupportScreen() {
  const navigation = useNavigation<SupportScreenNavigationProp>();
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      setIsSubmitted(true);
      setMessage('');
      Alert.alert(
        'تم الإرسال',
        'راح نتواصل وياك خلال وقت قصير',
        [{ text: 'حسناً', onPress: () => navigation.goBack() }]
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>الدعم الفني</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.infoTitle}>كيف يمكننا مساعدتك؟</Text>
            <Text style={styles.infoText}>
              اكتب مشكلتك أو استفسارك وسنقوم بالرد عليك في أقرب وقت ممكن
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.formContainer}>
          <TextInput
            label="اكتب مشكلتك أو استفسارك"
            value={message}
            onChangeText={setMessage}
            mode="outlined"
            style={styles.messageInput}
            multiline
            numberOfLines={6}
            placeholder="اشرح مشكلتك بالتفصيل..."
          />

          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit}
            icon="send"
            disabled={!message.trim()}
          >
            إرسال
          </Button>
        </View>

        {isSubmitted && (
          <Card style={styles.successCard}>
            <Card.Content>
              <Text style={styles.successTitle}>تم الإرسال بنجاح</Text>
              <Text style={styles.successText}>
                راح نتواصل وياك خلال وقت قصير
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
  },
  formContainer: {
    gap: 20,
  },
  messageInput: {
    backgroundColor: '#fff',
  },
  submitButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#007bff',
  },
  successCard: {
    marginTop: 20,
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#424242',
  },
}); 