import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Button, Text, Card, IconButton, Divider } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type DriverOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverOrder'>;
type DriverOrderScreenRouteProp = RouteProp<RootStackParamList, 'DriverOrder'>;

const mockOrder = {
  id: '12345',
  customerName: 'أحمد محمد',
  customerPhone: '+966501234567',
  address: 'شارع الملك فهد، الرياض',
  description: 'توصيل طرد من المطار إلى المنزل',
  notes: 'الطرد يحتوي على ملابس وأغراض شخصية',
  status: 'accepted',
};

export default function DriverOrderScreen() {
  const navigation = useNavigation<DriverOrderScreenNavigationProp>();
  const route = useRoute<DriverOrderScreenRouteProp>();
  const [order] = useState(mockOrder);

  const handleCallCustomer = () => {
    Linking.openURL(`tel:${order.customerPhone}`);
  };

  const handleStartDelivery = () => {
    // بدء التوصيل
  };

  const handleCompleteDelivery = () => {
    // إكمال التوصيل
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
        <Text style={styles.title}>الطلب الحالي</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.customerCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>بيانات الزبون</Text>
            <Divider style={styles.divider} />
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <Text style={styles.customerPhone}>{order.customerPhone}</Text>
              <Button
                mode="contained"
                style={styles.callButton}
                onPress={handleCallCustomer}
                icon="phone"
              >
                اتصال بالزبون
              </Button>
            </View>
          </Card.Content>
        </Card>

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
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.startButton}
            onPress={handleStartDelivery}
            icon="play"
          >
            بدء التوصيل
          </Button>

          <Button
            mode="contained"
            style={styles.mapButton}
            onPress={() => navigation.navigate('DriverMap', { orderId: route.params.orderId })}
            icon="map"
          >
            عرض الخريطة
          </Button>

          <Button
            mode="contained"
            style={styles.completeButton}
            onPress={handleCompleteDelivery}
            icon="check"
          >
            تم التوصيل
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
  customerCard: {
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
  customerInfo: {
    gap: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customerPhone: {
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
  startButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#007bff',
  },
  mapButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#6c757d',
  },
  completeButton: {
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#28a745',
  },
  supportButton: {
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: '#6c757d',
  },
}); 