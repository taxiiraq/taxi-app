import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip, DataTable, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type AdminPanelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminPanel'>;

const mockOrders = [
  {
    id: '1',
    orderNumber: '#12345',
    customerName: 'أحمد محمد',
    driverName: 'محمد علي',
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: '#12344',
    customerName: 'فاطمة علي',
    driverName: 'علي أحمد',
    status: 'in_progress',
    date: '2024-01-14',
  },
];

const mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد',
    phone: '+966501234567',
    ordersCount: 5,
    status: 'active',
  },
  {
    id: '2',
    name: 'فاطمة علي',
    phone: '+966502345678',
    ordersCount: 3,
    status: 'active',
  },
];

const mockDrivers = [
  {
    id: '1',
    name: 'محمد علي',
    ordersCount: 12,
    status: 'active',
  },
  {
    id: '2',
    name: 'علي أحمد',
    ordersCount: 8,
    status: 'active',
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
    case 'active':
      return '#28a745';
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
    case 'active':
      return 'نشط';
    default:
      return 'غير معروف';
  }
};

export default function AdminPanelScreen() {
  const navigation = useNavigation<AdminPanelScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState('orders');

  const renderOrdersTab = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={mockOrders}
        renderItem={({ item }) => (
          <Card style={styles.tableCard} mode="outlined">
            <Card.Content>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.orderNumber}</Text>
                <Text style={styles.tableCell}>{item.customerName}</Text>
                <Text style={styles.tableCell}>{item.driverName}</Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getStatusColor(item.status) }}
                  style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
                >
                  {getStatusText(item.status)}
                </Chip>
                <Text style={styles.tableCell}>{item.date}</Text>
                <Button
                  mode="outlined"
                  style={styles.detailsButton}
                  onPress={() => {}}
                >
                  تفاصيل
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderUsersTab = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={mockUsers}
        renderItem={({ item }) => (
          <Card style={styles.tableCard} mode="outlined">
            <Card.Content>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.phone}</Text>
                <Text style={styles.tableCell}>{item.ordersCount}</Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getStatusColor(item.status) }}
                  style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
                >
                  {getStatusText(item.status)}
                </Chip>
                <Button
                  mode="outlined"
                  style={styles.banButton}
                  onPress={() => {}}
                >
                  حظر المستخدم
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderDriversTab = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={mockDrivers}
        renderItem={({ item }) => (
          <Card style={styles.tableCard} mode="outlined">
            <Card.Content>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.ordersCount}</Text>
                <Chip
                  mode="outlined"
                  textStyle={{ color: getStatusColor(item.status) }}
                  style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
                >
                  {getStatusText(item.status)}
                </Chip>
                <Button
                  mode="outlined"
                  style={styles.banButton}
                  onPress={() => {}}
                >
                  إيقاف السائق
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderSupportTab = () => (
    <View style={styles.tabContent}>
      <Card style={styles.supportCard} mode="outlined">
        <Card.Content>
          <Text style={styles.supportTitle}>الدعم الفني</Text>
          <Text style={styles.supportText}>
            إدارة رسائل الدعم الفني والاستفسارات
          </Text>
          <Button
            mode="contained"
            style={styles.supportButton}
            onPress={() => navigation.navigate('Support')}
          >
            عرض الرسائل
          </Button>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>لوحة التحكم</Text>
        <IconButton
          icon="help-circle"
          size={24}
          onPress={() => navigation.navigate('Support')}
          style={styles.supportIcon}
        />
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Button
            mode={activeTab === 'orders' ? 'contained' : 'outlined'}
            style={styles.tabButton}
            onPress={() => setActiveTab('orders')}
          >
            الطلبات
          </Button>
          <Button
            mode={activeTab === 'users' ? 'contained' : 'outlined'}
            style={styles.tabButton}
            onPress={() => setActiveTab('users')}
          >
            المستخدمين
          </Button>
          <Button
            mode={activeTab === 'drivers' ? 'contained' : 'outlined'}
            style={styles.tabButton}
            onPress={() => setActiveTab('drivers')}
          >
            السواق
          </Button>
          <Button
            mode={activeTab === 'support' ? 'contained' : 'outlined'}
            style={styles.tabButton}
            onPress={() => setActiveTab('support')}
          >
            الدعم الفني
          </Button>
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'drivers' && renderDriversTab()}
        {activeTab === 'support' && renderSupportTab()}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  supportIcon: {
    backgroundColor: '#f8f9fa',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tabButton: {
    marginHorizontal: 5,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    flex: 1,
  },
  tableCard: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    minWidth: 80,
  },
  statusChip: {
    height: 25,
  },
  detailsButton: {
    borderRadius: 6,
    height: 30,
  },
  banButton: {
    borderRadius: 6,
    height: 30,
    borderColor: '#dc3545',
  },
  supportCard: {
    backgroundColor: '#fff',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  supportText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  supportButton: {
    borderRadius: 8,
    backgroundColor: '#007bff',
  },
}); 