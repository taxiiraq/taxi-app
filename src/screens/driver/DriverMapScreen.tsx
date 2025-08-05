import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Card, IconButton, Chip } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import FreeMapView from '../../components/FreeMapView';
import { LocationService, LocationData } from '../../services/location';
import { OpenStreetMapService } from '../../services/openstreetmap';

type DriverMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverMap'>;
type DriverMapScreenRouteProp = RouteProp<RootStackParamList, 'DriverMap'>;

const mockOrder = {
  id: 'ORD001',
  customerName: 'أحمد محمد',
  customerPhone: '+964700123456',
  pickupAddress: 'شارع الرشيد، بغداد',
  destinationAddress: 'شارع فلسطين، بغداد',
  status: 'accepted',
  estimatedTime: '12 دقيقة',
  distance: '1.8 كم',
  price: '15,000 دينار',
  description: 'توصيل طرد من المطار إلى المنزل',
};

const mockLocations = {
  driver: { latitude: 33.3200, longitude: 44.3700 }, // موقع السائق
  customer: { latitude: 33.3152, longitude: 44.3661 }, // موقع العميل
  destination: { latitude: 33.3100, longitude: 44.3600 }, // الوجهة
};

export default function DriverMapScreen() {
  const navigation = useNavigation<DriverMapScreenNavigationProp>();
  const route = useRoute<DriverMapScreenRouteProp>();
  const [order] = useState(mockOrder);
  const [driverLocation, setDriverLocation] = useState<LocationData>(mockLocations.driver);
  const [estimatedTime, setEstimatedTime] = useState('12 دقيقة');
  const [distance, setDistance] = useState('1.8 كم');
  const [neighborhoodInfo, setNeighborhoodInfo] = useState<any>(null);

  useEffect(() => {
    // بدء تتبع موقع السائق
    const startLocationTracking = async () => {
      try {
        const hasPermission = await LocationService.requestLocationPermission();
        if (hasPermission) {
          const location = await LocationService.getCurrentLocation();
          if (location) {
            setDriverLocation(location);
          }
        }
      } catch (error) {
        console.error('خطأ في تتبع الموقع:', error);
      }
    };

    startLocationTracking();

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
      const info = await OpenStreetMapService.getNeighborhoodInfo(driverLocation);
      setNeighborhoodInfo(info);
    } catch (error) {
      console.error('خطأ في تحميل معلومات الحي:', error);
    }
  };

  const handleCallCustomer = () => {
    Alert.alert(
      'اتصال بالعميل',
      `هل تريد الاتصال بـ ${order.customerName}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'اتصال', onPress: () => console.log('اتصال بالعميل') },
      ]
    );
  };

  const handleStartDelivery = () => {
    Alert.alert(
      'بدء التوصيل',
      'هل تريد بدء التوصيل؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'بدء', 
          onPress: () => {
            Alert.alert('تم', 'تم بدء التوصيل بنجاح');
          }
        },
      ]
    );
  };

  const handleCompleteDelivery = () => {
    Alert.alert(
      'إكمال التوصيل',
      'هل تريد إكمال التوصيل؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'إكمال', 
          onPress: () => {
            Alert.alert('تم', 'تم إكمال التوصيل بنجاح');
            navigation.goBack();
          }
        },
      ]
    );
  };

  const handleMarkerPress = (markerId: string) => {
    if (markerId === 'customer') {
      Alert.alert('معلومات العميل', `${order.customerName}\n${order.customerPhone}`);
    } else if (markerId === 'destination') {
      Alert.alert('الوجهة', order.destinationAddress);
    }
  };

  const markers = [
    {
      id: 'driver',
      title: 'موقعك',
      description: 'موقعك الحالي',
      coordinate: driverLocation,
      type: 'driver' as const,
    },
    {
      id: 'customer',
      title: order.customerName,
      description: 'العميل',
      coordinate: mockLocations.customer,
      type: 'customer' as const,
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
        <Text style={styles.headerTitle}>خريطة التوصيل</Text>
        <IconButton
          icon="phone"
          size={24}
          onPress={handleCallCustomer}
          style={styles.callButton}
        />
      </View>

      <View style={styles.mapContainer}>
        <FreeMapView
          initialLocation={driverLocation}
          markers={markers}
          polylines={polylines}
          onMarkerPress={handleMarkerPress}
          showCurrentLocation={true}
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
                textStyle={{ color: '#007bff' }}
                style={[styles.statusChip, { borderColor: '#007bff' }]}
              >
                تم القبول
              </Chip>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <Text style={styles.customerPhone}>{order.customerPhone}</Text>
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

            <View style={styles.actionsContainer}>
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
                style={styles.completeButton}
                onPress={handleCompleteDelivery}
                icon="check"
              >
                إكمال التوصيل
              </Button>
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
  customerInfo: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  customerPhone: {
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
    marginBottom: 16,
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
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  startButton: {
    flex: 1,
    backgroundColor: '#007bff',
  },
  completeButton: {
    flex: 1,
    backgroundColor: '#28a745',
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