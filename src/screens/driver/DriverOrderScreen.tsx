import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button, Text, Card, IconButton, Chip, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type DriverOrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverOrder'>;
type DriverOrderScreenRouteProp = RouteProp<RootStackParamList, 'DriverOrder'>;

export default function DriverOrderScreen() {
  const navigation = useNavigation<DriverOrderScreenNavigationProp>();
  const route = useRoute<DriverOrderScreenRouteProp>();
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>تفاصيل الطلب</Text>
        <Text style={styles.subtitle}>رقم الطلب: {orderId}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.statusCard}>
          <Card.Content>
            <View style={styles.statusHeader}>
              <IconButton
                icon="truck-delivery"
                size={40}
                iconColor="#28a745"
              />
              <View style={styles.statusText}>
                <Text style={styles.statusTitle}>طلب نشط</Text>
                <Text style={styles.statusDescription}>
                  في انتظار وصول العميل
                </Text>
              </View>
            </View>
            <Chip 
              mode="outlined" 
              style={styles.statusChip}
              textStyle={{ color: '#28a745' }}
            >
              قيد التنفيذ
            </Chip>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>معلومات العميل</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.customerInfo}>
              <IconButton
                icon="account"
                size={40}
                iconColor="#007bff"
              />
              <View style={styles.customerText}>
                <Text style={styles.customerName}>أحمد محمد</Text>
                <Text style={styles.customerPhone}>+966 50 987 6543</Text>
                <Text style={styles.customerRating}>تقييم: ⭐⭐⭐⭐⭐ (4.8)</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>تفاصيل الرحلة</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>عنوان الانطلاق:</Text>
              <Text style={styles.detailValue}>شارع الملك فهد، الرياض</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>الوجهة:</Text>
              <Text style={styles.detailValue}>شارع التحلية، جدة</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>المسافة:</Text>
              <Text style={styles.detailValue}>15 كم</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>السعر:</Text>
              <Text style={styles.detailValue}>25 ريال</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>الوقت المتوقع:</Text>
              <Text style={styles.detailValue}>20 دقيقة</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>ملاحظات إضافية</Text>
            <Divider style={styles.divider} />
            <Text style={styles.notesText}>
              العميل يفضل السفر في الصباح الباكر. يرجى الوصول في الوقت المحدد.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('DriverMap', { orderId })}
            style={styles.mapButton}
            icon="map-marker"
          >
            عرض الخريطة
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Support')}
            style={styles.supportButton}
            icon="headset"
          >
            الدعم الفني
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
    backgroundColor: '#007bff',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
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
    alignItems: 'center',
    marginBottom: 15,
  },
  statusText: {
    flex: 1,
    marginLeft: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
  },
  statusChip: {
    alignSelf: 'flex-start',
    borderColor: '#28a745',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  divider: {
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerText: {
    flex: 1,
    marginLeft: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  customerPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  customerRating: {
    fontSize: 12,
    color: '#ffc107',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
  },
  mapButton: {
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#007bff',
  },
  supportButton: {
    borderRadius: 8,
    paddingVertical: 8,
    borderColor: '#007bff',
  },
}); 