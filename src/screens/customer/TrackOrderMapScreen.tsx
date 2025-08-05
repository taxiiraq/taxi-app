import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Text, Card, IconButton, Chip } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import FreeMapView from '../../components/FreeMapView';
import { LocationService, LocationData } from '../../services/location';
import { OpenStreetMapService } from '../../services/openstreetmap';

type TrackOrderMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TrackOrderMap'>;
type TrackOrderMapScreenRouteProp = RouteProp<RootStackParamList, 'TrackOrderMap'>;

const mockOrder = {
  id: 'ORD001',
  customerName: 'أحمد محمد',
  driverName: 'علي السائق',
  driverPhone: '+964700123456',
  pickupAddress: 'شارع الرشيد، بغداد',
  destinationAddress: 'شارع فلسطين، بغداد',
  status: 'in_progress',
  estimatedTime: '15 دقيقة',
  distance: '2.5 كم',
  price: '15,000 دينار',
};

const mockLocations = {
  customer: { latitude: 33.3152, longitude: 44.3661 }, // بغداد
  driver: { latitude: 33.3200, longitude: 44.3700 },
  destination: { latitude: 33.3100, longitude: 44.3600 },
};

export default function TrackOrderMapScreen() {
  const navigation = useNavigation<TrackOrderMapScreenNavigationProp>();
  const route = useRoute<TrackOrderMapScreenRouteProp>();
  const [order] = useState(mockOrder);
  const [driverLocation, setDriverLocation] = useState<LocationData>(mockLocations.driver);
  const [estimatedTime, setEstimatedTime] = useState('15 دقيقة');
  const [distance, setDistance] = useState('2.5 كم');
  const [neighborhoodInfo, setNeighborhoodInfo] = useState<any>(null);

  useEffect(() => {
    // محاكاة تحديث موقع السائق
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));
    }, 5000);

    // تحميل معلومات الحي
    loadNeighborhoodInfo();

    return () => clearInterval(interval);
  }, []);

  const loadNeighborhoodInfo = async () => {
    try {
      const info = await OpenStreetMapService.getNeighborhoodInfo(mockLocations.customer);
      setNeighborhoodInfo(info);
    } catch (error) {
      console.error('خطأ في تحميل معلومات الحي:', error);
    }
  };

  const handleCallDriver = () => {
    Alert.alert(
      'اتصال بالسائق',
      `هل تريد الاتصال بـ ${order.driverName}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'اتصال', onPress: () => console.log('اتصال بالسائق') },
      ]
    );
  };

  const handleMarkerPress = (markerId: string) => {
    if (markerId === 'driver') {
      Alert.alert('معلومات السائق', `${order.driverName}\n${order.driverPhone}`);
    } else if (markerId === 'destination') {
      Alert.alert('الوجهة', order.destinationAddress);
    }
  };

  const markers = [
    {
      id: 'customer',
      title: 'موقعك',
      description: 'موقعك الحالي',
      coordinate: mockLocations.customer,
      type: 'customer' as const,
    },
    {
      id: 'driver',
      title: order.driverName,
      description: 'السائق',
      coordinate: driverLocation,
      type: 'driver' as const,
    },
    {
      id: 'destination',
      title: 'الوجهة',
      description: order.destinationAddress,
      coordinate: mockLocations.destination,
      type: 'destination' as const,
    },
  ];

  const polylines = [
    {
      id: 'route',
      coordinates: [driverLocation, mockLocations.destination],
      color: '#007bff',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-right"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>تتبع الطلب</Text>
        <IconButton
          icon="phone"
          size={24}
          onPress={handleCallDriver}
          style={styles.callButton}
        />
      </View>

      <View style={styles.mapContainer}>
        <FreeMapView
          initialLocation={mockLocations.customer}
          markers={markers}
          polylines={polylines}
          onMarkerPress={handleMarkerPress}
          showNeighborhood={true}
        />
      </View>

      <View style={styles.infoContainer}>
        <Card style={styles.orderCard}>
          <Card.Content>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>طلب #{order.id}</Text>
              <Chip
                mode="outlined"
                textStyle={{ color: '#28a745' }}
                style={[styles.statusChip, { borderColor: '#28a745' }]}
              >
                قيد التوصيل
              </Chip>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{order.driverName}</Text>
              <Text style={styles.driverPhone}>{order.driverPhone}</Text>
            </View>

            <View style={styles.routeInfo}>
              <View style={styles.routeItem}>
                <Text style={styles.routeLabel}>من:</Text>
                <Text style={styles.routeAddress}>{order.pickupAddress}</Text>
              </View>
              <View style={styles.routeItem}>
                <Text style={styles.routeLabel}>إلى:</Text>
                <Text style={styles.routeAddress}>{order.destinationAddress}</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>الوقت المتوقع</Text>
                <Text style={styles.statValue}>{estimatedTime}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>المسافة</Text>
                <Text style={styles.statValue}>{distance}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>السعر</Text>
                <Text style={styles.statValue}>{order.price}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {neighborhoodInfo && (
          <Card style={styles.neighborhoodCard}>
            <Card.Content>
              <Text style={styles.neighborhoodTitle}>الأماكن القريبة</Text>
              <View style={styles.neighborhoodStats}>
                <Chip style={styles.neighborhoodChip}>
                  مطاعم: {neighborhoodInfo.restaurants.length}
                </Chip>
                <Chip style={styles.neighborhoodChip}>
                  مدارس: {neighborhoodInfo.schools.length}
                </Chip>
                <Chip style={styles.neighborhoodChip}>
                  حدائق: {neighborhoodInfo.parks.length}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  callButton: {
    margin: 0,
    backgroundColor: '#28a745',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  infoContainer: {
    padding: 16,
  },
  orderCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusChip: {
    borderRadius: 16,
  },
  driverInfo: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  driverPhone: {
    fontSize: 14,
    color: '#666',
  },
  routeInfo: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  routeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 40,
  },
  routeAddress: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  neighborhoodCard: {
    borderRadius: 12,
    elevation: 2,
  },
  neighborhoodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  neighborhoodStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  neighborhoodChip: {
    marginBottom: 8,
  },
}); 