import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type CustomerHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerHome'>;

const mockOrders = [
  {
    id: '1',
    orderNumber: '#12345',
    status: 'completed',
    date: '2024-01-15',
    address: 'شارع الملك فهد، الرياض',
  },
  {
    id: '2',
    orderNumber: '#12344',
    status: 'in_progress',
    date: '2024-01-14',
    address: 'شارع التحلية، جدة',
  },
  {
    id: '3',
    orderNumber: '#12343',
    status: 'pending',
    date: '2024-01-13',
    address: 'شارع العليا، الرياض',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return '#28a745';
    case 'in_progress':
      return '#ffc107';
    case 'pending':
      return '#6c757d';
    default:
      return '#6c757d';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'مكتمل';
    case 'in_progress':
      return 'قيد التنفيذ';
    case 'pending':
      return 'في الانتظار';
    default:
      return 'غير معروف';
  }
};

export default function CustomerHomeScreen() {
  const navigation = useNavigation<CustomerHomeScreenNavigationProp>();

  const renderOrderItem = ({ item }: { item: any }) => (
    <Card style={styles.orderCard} mode="outlined">
      <Card.Content>
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Chip
            mode="outlined"
            textStyle={{ color: getStatusColor(item.status) }}
            style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
          >
            {getStatusText(item.status)}
          </Chip>
        </View>
        <Text style={styles.orderAddress}>{item.address}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Button
          mode="outlined"
          style={styles.detailsButton}
          onPress={() => navigation.navigate('TrackOrder', { orderId: item.id })}
        >
          تفاصيل
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>مرحباً، أحمد</Text>
          <Text style={styles.subtitle}>كيف يمكننا مساعدتك اليوم؟</Text>
        </View>
        <IconButton
          icon="help-circle"
          size={24}
          onPress={() => navigation.navigate('Support')}
          style={styles.supportButton}
        />
      </View>

      <ScrollView style={styles.content}>
        <Button
          mode="contained"
          style={styles.newOrderButton}
          onPress={() => navigation.navigate('CreateOrder')}
          icon="plus"
        >
          طلب توصيل جديد
        </Button>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>الطلبات السابقة</Text>
          <FlatList
            data={mockOrders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  supportButton: {
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  newOrderButton: {
    marginBottom: 30,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#007bff',
  },
  ordersSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  orderCard: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusChip: {
    height: 30,
  },
  orderAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  detailsButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
}); 