import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Text, Card, IconButton, Chip, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import FreeMapView from '../../components/FreeMapView';
import { LocationService, LocationData, DriverLocation } from '../../services/location';
import { OpenStreetMapService } from '../../services/openstreetmap';

type DriversMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriversMap'>;

const mockDrivers: DriverLocation[] = [
  {
    id: '1',
    name: 'علي السائق',
    location: { latitude: 33.3152, longitude: 44.3661 },
    isOnline: true,
    currentOrder: 'ORD001',
  },
  {
    id: '2',
    name: 'محمد السائق',
    location: { latitude: 33.3200, longitude: 44.3700 },
    isOnline: true,
    currentOrder: 'ORD002',
  },
  {
    id: '3',
    name: 'أحمد السائق',
    location: { latitude: 33.3100, longitude: 44.3600 },
    isOnline: false,
  },
  {
    id: '4',
    name: 'حسن السائق',
    location: { latitude: 33.3250, longitude: 44.3750 },
    isOnline: true,
  },
  {
    id: '5',
    name: 'يوسف السائق',
    location: { latitude: 33.3050, longitude: 44.3550 },
    isOnline: false,
  },
];

export default function DriversMapScreen() {
  const navigation = useNavigation<DriversMapScreenNavigationProp>();
  const [drivers, setDrivers] = useState<DriverLocation[]>(mockDrivers);
  const [showOfflineDrivers, setShowOfflineDrivers] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverLocation | null>(null);
  const [neighborhoodInfo, setNeighborhoodInfo] = useState<any>(null);

  useEffect(() => {
    // محاكاة تحديث مواقع السائقين
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(driver => ({
        ...driver,
        location: {
          latitude: driver.location.latitude + (Math.random() - 0.5) * 0.001,
          longitude: driver.location.longitude + (Math.random() - 0.5) * 0.001,
        },
      })));
    }, 10000);

    // تحميل معلومات الحي
    loadNeighborhoodInfo();

    return () => clearInterval(interval);
  }, []);

  const loadNeighborhoodInfo = async () => {
    try {
      const centerLocation = { latitude: 33.3152, longitude: 44.3661 }; // بغداد
      const info = await OpenStreetMapService.getNeighborhoodInfo(centerLocation);
      setNeighborhoodInfo(info);
    } catch (error) {
      console.error('خطأ في تحميل معلومات الحي:', error);
    }
  };

  const handleDriverPress = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver) {
      setSelectedDriver(driver);
    }
  };

  const handleCallDriver = (driver: DriverLocation) => {
    Alert.alert(
      'اتصال بالسائق',
      `هل تريد الاتصال بـ ${driver.name}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'اتصال', onPress: () => console.log('اتصال بالسائق') },
      ]
    );
  };

  const handleToggleDriverStatus = (driverId: string) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === driverId 
        ? { ...driver, isOnline: !driver.isOnline }
        : driver
    ));
  };

  const filteredDrivers = showOfflineDrivers ? drivers : drivers.filter(driver => driver.isOnline);

  const markers = filteredDrivers.map(driver => ({
    id: driver.id,
    title: driver.name,
    description: driver.isOnline ? 'متصل' : 'غير متصل',
    coordinate: driver.location,
    type: 'driver' as const,
  }));

  const getOnlineDriversCount = () => drivers.filter(d => d.isOnline).length;
  const getTotalDriversCount = () => drivers.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-right"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>مراقبة السائقين</Text>
        <View style={styles.headerStats}>
          <Chip style={styles.statChip}>
            {getOnlineDriversCount()}/{getTotalDriversCount()}
          </Chip>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <FreeMapView
          initialLocation={{ latitude: 33.3152, longitude: 44.3661 }}
          markers={markers}
          onMarkerPress={handleDriverPress}
          showNeighborhood={true}
        />
      </View>

      <View style={styles.controlsContainer}>
        <Card style={styles.controlsCard}>
          <Card.Content>
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>إظهار السائقين غير المتصلين</Text>
              <Switch
                value={showOfflineDrivers}
                onValueChange={setShowOfflineDrivers}
                color="#007bff"
              />
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>متصلون</Text>
                <Text style={styles.statValue}>{getOnlineDriversCount()}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>غير متصلين</Text>
                <Text style={styles.statValue}>{getTotalDriversCount() - getOnlineDriversCount()}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>إجمالي</Text>
                <Text style={styles.statValue}>{getTotalDriversCount()}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      <ScrollView style={styles.driversListContainer}>
        <Text style={styles.listTitle}>قائمة السائقين</Text>
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} style={styles.driverCard}>
            <Card.Content>
              <View style={styles.driverRow}>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <Chip
                    mode="outlined"
                    textStyle={{ 
                      color: driver.isOnline ? '#28a745' : '#dc3545' 
                    }}
                    style={[
                      styles.statusChip, 
                      { 
                        borderColor: driver.isOnline ? '#28a745' : '#dc3545' 
                      }
                    ]}
                  >
                    {driver.isOnline ? 'متصل' : 'غير متصل'}
                  </Chip>
                </View>
                <View style={styles.driverActions}>
                  <IconButton
                    icon="phone"
                    size={20}
                    onPress={() => handleCallDriver(driver)}
                    style={styles.actionButton}
                  />
                  <IconButton
                    icon={driver.isOnline ? "toggle-switch" : "toggle-switch-off"}
                    size={20}
                    onPress={() => handleToggleDriverStatus(driver.id)}
                    style={styles.actionButton}
                  />
                </View>
              </View>
              {driver.currentOrder && (
                <Text style={styles.orderInfo}>
                  الطلب الحالي: {driver.currentOrder}
                </Text>
              )}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {selectedDriver && (
        <Card style={styles.selectedDriverCard}>
          <Card.Content>
            <View style={styles.selectedDriverHeader}>
              <Text style={styles.selectedDriverTitle}>
                {selectedDriver.name}
              </Text>
              <IconButton
                icon="close"
                size={20}
                onPress={() => setSelectedDriver(null)}
                style={styles.closeButton}
              />
            </View>
            <View style={styles.selectedDriverInfo}>
              <Text style={styles.infoLabel}>الحالة:</Text>
              <Chip
                mode="outlined"
                textStyle={{ 
                  color: selectedDriver.isOnline ? '#28a745' : '#dc3545' 
                }}
                style={[
                  styles.statusChip, 
                  { 
                    borderColor: selectedDriver.isOnline ? '#28a745' : '#dc3545' 
                  }
                ]}
              >
                {selectedDriver.isOnline ? 'متصل' : 'غير متصل'}
              </Chip>
            </View>
            {selectedDriver.currentOrder && (
              <View style={styles.selectedDriverInfo}>
                <Text style={styles.infoLabel}>الطلب الحالي:</Text>
                <Text style={styles.infoValue}>{selectedDriver.currentOrder}</Text>
              </View>
            )}
            <View style={styles.selectedDriverActions}>
              <Button
                mode="contained"
                onPress={() => handleCallDriver(selectedDriver)}
                icon="phone"
                style={styles.callButton}
              >
                اتصال
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleToggleDriverStatus(selectedDriver.id)}
                icon={selectedDriver.isOnline ? "toggle-switch-off" : "toggle-switch"}
                style={styles.toggleButton}
              >
                {selectedDriver.isOnline ? 'إيقاف' : 'تفعيل'}
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {neighborhoodInfo && (
        <Card style={styles.neighborhoodCard}>
          <Card.Content>
            <Text style={styles.neighborhoodTitle}>إحصائيات المنطقة</Text>
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
              <Chip style={styles.neighborhoodChip}>
                تسوق: {neighborhoodInfo.shopping.length}
              </Chip>
            </View>
          </Card.Content>
        </Card>
      )}
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
  headerStats: {
    flexDirection: 'row',
  },
  statChip: {
    marginLeft: 8,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  controlsContainer: {
    padding: 16,
  },
  controlsCard: {
    borderRadius: 12,
    elevation: 2,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  driversListContainer: {
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  driverCard: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusChip: {
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  driverActions: {
    flexDirection: 'row',
  },
  actionButton: {
    margin: 0,
  },
  orderInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  selectedDriverCard: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 12,
    elevation: 4,
  },
  selectedDriverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedDriverTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    margin: 0,
  },
  selectedDriverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  infoValue: {
    fontSize: 14,
    color: '#666',
  },
  selectedDriverActions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#28a745',
  },
  toggleButton: {
    flex: 1,
  },
  neighborhoodCard: {
    margin: 16,
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