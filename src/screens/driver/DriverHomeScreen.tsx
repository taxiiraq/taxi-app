import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type DriverHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverHome'>;

export default function DriverHomeScreen() {
  const navigation = useNavigation<DriverHomeScreenNavigationProp>();

  const handleMap = () => {
    navigation.navigate('DriverMap', { orderId: 'test-order-123' });
  };

  const handleOrders = () => {
    navigation.navigate('DriverOrder', { orderId: 'test-order-123' });
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>مرحباً بك في تطبيق التاكسي</Text>
        <Text style={styles.subtitle}>لوحة تحكم السائق</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>حالة العمل</Text>
              <Switch value={true} />
            </View>
            <Text style={styles.statusText}>متاح للطلبات</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="map-marker"
                size={40}
                iconColor="#007bff"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>الخريطة</Text>
                <Text style={styles.cardDescription}>
                  عرض الخريطة والطلبات المتاحة
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleMap}
              style={styles.cardButton}
            >
              عرض الخريطة
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="clipboard-list"
                size={40}
                iconColor="#28a745"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>الطلبات</Text>
                <Text style={styles.cardDescription}>
                  عرض وإدارة الطلبات الحالية
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleOrders}
              style={[styles.cardButton, { backgroundColor: '#28a745' }]}
            >
              عرض الطلبات
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

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>إحصائيات اليوم</Text>
          
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>طلبات مكتملة</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>120</Text>
                <Text style={styles.statLabel}>ريال إجمالي</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>4.9</Text>
                <Text style={styles.statLabel}>تقييم متوسط</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>طلبات معلقة</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>معلومات سريعة</Text>
          <View style={styles.chipContainer}>
            <Chip icon="clock" style={styles.chip}>
              متوسط وقت الرحلة: 15 دقيقة
            </Chip>
            <Chip icon="currency-usd" style={styles.chip}>
              متوسط السعر: 15 ريال
            </Chip>
            <Chip icon="star" style={styles.chip}>
              تقييم العملاء: ممتاز
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
  statusCard: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
    backgroundColor: '#e8f5e8',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
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
  statsSection: {
    marginTop: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 15,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
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