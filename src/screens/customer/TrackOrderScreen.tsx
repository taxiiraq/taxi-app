import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip, Divider } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type TrackOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TrackOrder'>;
type TrackOrderScreenRouteProp = RouteProp<RootStackParamList, 'TrackOrder'>;

const mockOrder = {
  id: '12345',
  status: 'accepted',
  customerName: 'أحمد محمد',
  driverName: 'محمد علي',
  driverPhone: '+966501234567',
  address: 'شارع الملك فهد، الرياض',
  description: 'توصيل طرد من المطار إلى المنزل',
  notes: 'الطرد يحتوي على ملابس وأغراض شخصية',
  createdAt: '2024-01-15 14:30',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#ffc107';
    case 'accepted':
      return '#17a2b8';
    case 'in_progress':
      return '#007bff';
    case 'completed':
      return '#28a745';
    default:
      return '#6c757d';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'في الانتظار';
    case 'accepted':
      return 'تم قبول الطلب';
    case 'in_progress':
      return 'قيد التوصيل';
    case 'completed':
      return 'تم التوصيل';
    default:
      return 'غير معروف';
  }
};

export default function TrackOrderScreen() {
  const navigation = useNavigation<TrackOrderScreenNavigationProp>();
  const route = useRoute<TrackOrderScreenRouteProp>();
  const [order] = useState(mockOrder);

  const handleCallDriver = () => {
    Linking.openURL(`tel:${order.driverPhone}`);
  };

  const handleUpdateStatus = () => {
    // تحديث الحالة
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>تتبع الطلب</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <Text style={styles.orderNumber}>طلب #{order.id}</Text>
              <Chip
                mode="outlined"
                textStyle={{ color: getStatusColor(order.status) }}
                style={[styles.statusChip, { borderColor: getStatusColor(order.status) }]}
              >
                {getStatusText(order.status)}
              </Chip>
            </View>
            <Text style={styles.statusText}>
              {getStatusText(order.status)}
            </Text>
          </Card.Content>
        </Card>

        {order.status !== 'pending' && (
          <Card style={styles.driverCard}>
            <Card.Content>
              <Text style={styles.cardTitle}>بيانات السائق</Text>
              <Divider style={styles.divider} />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{order.driverName}</Text>
                <Text style={styles.driverPhone}>{order.driverPhone}</Text>
                <Button
                  mode="contained"
                  style={styles.callButton}
                  onPress={handleCallDriver}
                  icon="phone"
                >
                  اتصال
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.orderDetailsCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>تفاصيل الطلب</Text>
            <Divider style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>العنوان:</Text>
              <Text style={styles.detailValue}>{order.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>الوصف:</Text>
              <Text style={styles.detailValue}>{order.description}</Text>
            </View>
            {order.notes && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ملاحظات:</Text>
                <Text style={styles.detailValue}>{order.notes}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>التاريخ:</Text>
              <Text style={styles.detailValue}>{order.createdAt}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.updateButton}
            onPress={handleUpdateStatus}
            icon="refresh"
          >
            تحديث الحالة
          </Button>

          <Button
            mode="contained"
            style={styles.mapButton}
            onPress={() => navigation.navigate('TrackOrderMap', { orderId: route.params.orderId })}
            icon="map"
          >
            عرض الخريطة
          </Button>

          <Button
            mode="outlined"
            style={styles.supportButton}
            onPress={() => navigation.navigate('Support')}
            icon="help-circle"
          >
            دعم فني
          </Button>
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
  statusCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  statusHeader: {
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
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  driverCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  orderDetailsCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
  driverInfo: {
    gap: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  driverPhone: {
    fontSize: 16,
    color: '#666',
  },
  callButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#28a745',
  },
  detailRow: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    gap: 15,
  },
  updateButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#007bff',
  },
  mapButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#6c757d',
  },
  supportButton: {
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: '#6c757d',
  },
}); 