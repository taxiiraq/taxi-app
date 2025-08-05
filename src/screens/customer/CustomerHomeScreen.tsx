import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type CustomerHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerHome'>;

const { width } = Dimensions.get('window');

export default function CustomerHomeScreen() {
  const navigation = useNavigation<CustomerHomeScreenNavigationProp>();

  const handleCreateOrder = () => {
    navigation.navigate('CreateOrder');
  };

  const handleTrackOrder = () => {
    // استخدام orderId تجريبي
    navigation.navigate('TrackOrder', { orderId: 'test-order-123' });
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>مرحباً بك في تطبيق التاكسي</Text>
        <Text style={styles.subtitle}>اختر الخدمة المطلوبة</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="car"
                size={40}
                iconColor="#007bff"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>طلب تاكسي جديد</Text>
                <Text style={styles.cardDescription}>
                  اطلب تاكسي للوصول إلى وجهتك
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleCreateOrder}
              style={styles.cardButton}
            >
              طلب تاكسي
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="map-marker"
                size={40}
                iconColor="#28a745"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>تتبع الطلب</Text>
                <Text style={styles.cardDescription}>
                  تتبع موقع التاكسي ووقت الوصول
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleTrackOrder}
              style={[styles.cardButton, { backgroundColor: '#28a745' }]}
            >
              تتبع الطلب
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="headset"
                size={40}
                iconColor="#ffc107"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>الدعم الفني</Text>
                <Text style={styles.cardDescription}>
                  تواصل مع فريق الدعم للمساعدة
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleSupport}
              style={[styles.cardButton, { backgroundColor: '#ffc107' }]}
            >
              الدعم الفني
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>معلومات سريعة</Text>
          <View style={styles.chipContainer}>
            <Chip icon="clock" style={styles.chip}>
              متوسط وقت الانتظار: 5 دقائق
            </Chip>
            <Chip icon="currency-usd" style={styles.chip}>
              أسعار شفافة
            </Chip>
            <Chip icon="shield-check" style={styles.chip}>
              سائقين معتمدين
            </Chip>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardButton: {
    borderRadius: 8,
    paddingHorizontal: 20,
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    marginBottom: 10,
  },
}); 