import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type DriverHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverHome'>;

const mockNewOrders = [
  {
    id: '1',
    customerName: 'أحمد محمد',
    address: 'شارع الملك فهد، الرياض',
    description: 'توصيل طرد من المطار إلى المنزل',
    phone: '+966501234567',
  },
  {
    id: '2',
    customerName: 'فاطمة علي',
    address: 'شارع التحلية، جدة',
    description: 'توصيل طعام من المطعم',
    phone: '+966502345678',
  },
];

export default function DriverHomeScreen() {
  const navigation = useNavigation<DriverHomeScreenNavigationProp>();
  const [isOnline, setIsOnline] = useState(true);

  const handleAcceptOrder = (orderId: string) => {
    navigation.navigate('DriverOrder', { orderId });
  };

  const renderNewOrderItem = ({ item }: { item: any }) => (
    <Card style={styles.orderCard} mode="outlined">
      <Card.Content>
        <View style={styles.orderHeader}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Chip mode="outlined" style={styles.newOrderChip}>
            طلب جديد
          </Chip>
        </View>
        <Text style={styles.orderAddress}>{item.address}</Text>
        <Text style={styles.orderDescription}>{item.description}</Text>
        <Text style={styles.orderPhone}>{item.phone}</Text>
        <Button
          mode="contained"
          style={styles.acceptButton}
          onPress={() => handleAcceptOrder(item.id)}
        >
          قبول الطلب
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>مرحباً، محمد</Text>
          <Text style={styles.subtitle}>إدارة الطلبات</Text>
        </View>
        <View style={styles.headerControls}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {isOnline ? 'أنا متصل ✅' : 'غير متصل ⛔'}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              color="#007bff"
            />
          </View>
          <IconButton
            icon="help-circle"
            size={24}
            onPress={() => navigation.navigate('Support')}
            style={styles.supportButton}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>الطلبات الجديدة</Text>
          <FlatList
            data={mockNewOrders}
            renderItem={renderNewOrderItem}
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
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusContainer: {
    alignItems: 'center',
    gap: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  supportButton: {
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
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
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  newOrderChip: {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
  },
  orderAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  orderDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  orderPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  acceptButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#28a745',
  },
}); 