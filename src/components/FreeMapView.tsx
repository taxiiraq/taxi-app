import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import MapView, { 
  Marker, 
  Polyline, 
  PROVIDER_DEFAULT,
  Region 
} from 'react-native-maps';
import { Button, Text, Card, IconButton, Chip, Searchbar } from 'react-native-paper';
import { LocationService, LocationData } from '../services/location';
import { OpenStreetMapService, OSMPlace, OSMDirections } from '../services/openstreetmap';

const { width, height } = Dimensions.get('window');

interface FreeMapViewProps {
  initialLocation?: LocationData;
  markers?: Array<{
    id: string;
    title: string;
    description?: string;
    coordinate: LocationData;
    type: 'customer' | 'driver' | 'destination' | 'business';
  }>;
  polylines?: Array<{
    id: string;
    coordinates: LocationData[];
    color?: string;
  }>;
  showCurrentLocation?: boolean;
  showNeighborhood?: boolean;
  onMarkerPress?: (markerId: string) => void;
  onMapPress?: (coordinate: LocationData) => void;
  style?: any;
}

export default function FreeMapView({
  initialLocation,
  markers = [],
  polylines = [],
  showCurrentLocation = true,
  showNeighborhood = false,
  onMarkerPress,
  onMapPress,
  style,
}: FreeMapViewProps) {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [neighborhoodInfo, setNeighborhoodInfo] = useState<{
    restaurants: OSMPlace[];
    schools: OSMPlace[];
    parks: OSMPlace[];
    shopping: OSMPlace[];
  } | null>(null);
  const [directions, setDirections] = useState<OSMDirections | null>(null);

  useEffect(() => {
    initializeLocation();
  }, []);

  useEffect(() => {
    if (showNeighborhood && currentLocation) {
      loadNeighborhoodInfo();
    }
  }, [showNeighborhood, currentLocation]);

  const initializeLocation = async () => {
    try {
      const hasPermission = await LocationService.requestLocationPermission();
      setLocationPermission(hasPermission);
      
      if (hasPermission) {
        const location = await LocationService.getCurrentLocation();
        if (location) {
          setCurrentLocation(location);
        }
      }
    } catch (error) {
      console.error('خطأ في تهيئة الموقع:', error);
    }
  };

  const loadNeighborhoodInfo = async () => {
    if (!currentLocation) return;
    
    try {
      const info = await OpenStreetMapService.getNeighborhoodInfo(currentLocation);
      setNeighborhoodInfo(info);
    } catch (error) {
      console.error('خطأ في تحميل معلومات الحي:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        const results = await OpenStreetMapService.searchAddress(query);
        setSearchResults(results);
      } catch (error) {
        console.error('خطأ في البحث:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleGetDirections = async (origin: LocationData, destination: LocationData) => {
    try {
      const result = await OpenStreetMapService.getDirections(origin, destination);
      setDirections(result);
    } catch (error) {
      console.error('خطأ في الحصول على الاتجاهات:', error);
    }
  };

  const handleMapPress = (event: any) => {
    if (onMapPress) {
      const coordinate: LocationData = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      };
      onMapPress(coordinate);
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'customer':
        return '#007bff';
      case 'driver':
        return '#28a745';
      case 'destination':
        return '#dc3545';
      case 'business':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const fitToMarkers = () => {
    if (mapRef.current && markers.length > 0) {
      const coordinates = markers.map(marker => marker.coordinate);
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const goToCurrentLocation = async () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      const location = await LocationService.getCurrentLocation();
      if (location && mapRef.current) {
        setCurrentLocation(location);
        mapRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }
  };

  // إنشاء علامات الحي
  const neighborhoodMarkers = neighborhoodInfo ? [
    ...neighborhoodInfo.restaurants.map(place => ({
      id: `restaurant_${place.id}`,
      title: place.name,
      description: 'مطعم',
      coordinate: place.location,
      type: 'business' as const,
    })),
    ...neighborhoodInfo.schools.map(place => ({
      id: `school_${place.id}`,
      title: place.name,
      description: 'مدرسة',
      coordinate: place.location,
      type: 'business' as const,
    })),
    ...neighborhoodInfo.parks.map(place => ({
      id: `park_${place.id}`,
      title: place.name,
      description: 'حديقة',
      coordinate: place.location,
      type: 'business' as const,
    })),
    ...neighborhoodInfo.shopping.map(place => ({
      id: `shopping_${place.id}`,
      title: place.name,
      description: 'مركز تسوق',
      coordinate: place.location,
      type: 'business' as const,
    })),
  ] : [];

  const allMarkers = [...markers, ...neighborhoodMarkers];

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={
          initialLocation
            ? {
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 24.7136, // الرياض
                longitude: 46.6753,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
        }
        showsUserLocation={showCurrentLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        onPress={handleMapPress}
        mapType="standard"
      >
        {/* العلامات */}
        {allMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => onMarkerPress?.(marker.id)}
            pinColor={getMarkerColor(marker.type)}
          />
        ))}

        {/* المسارات */}
        {polylines.map((polyline) => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.coordinates.map(coord => ({
              latitude: coord.latitude,
              longitude: coord.longitude,
            }))}
            strokeColor={polyline.color || '#007bff'}
            strokeWidth={3}
          />
        ))}

        {/* مسار الاتجاهات */}
        {directions && (
          <Polyline
            coordinates={directions.polyline.map(coord => ({
              latitude: coord.latitude,
              longitude: coord.longitude,
            }))}
            strokeColor="#007bff"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* شريط البحث */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="ابحث عن عنوان..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {searchResults.length > 0 && (
          <Card style={styles.searchResults}>
            <Card.Content>
              {searchResults.slice(0, 5).map((result, index) => (
                <Button
                  key={index}
                  mode="text"
                  onPress={() => {
                    setSearchQuery(result);
                    setSearchResults([]);
                  }}
                  style={styles.searchResult}
                >
                  {result}
                </Button>
              ))}
            </Card.Content>
          </Card>
        )}
      </View>

      {/* أزرار التحكم */}
      <View style={styles.controls}>
        <Card style={styles.controlCard}>
          <Card.Content style={styles.controlContent}>
            <IconButton
              icon="crosshairs-gps"
              size={24}
              onPress={goToCurrentLocation}
              style={styles.controlButton}
            />
            <IconButton
              icon="fit-to-page"
              size={24}
              onPress={fitToMarkers}
              style={styles.controlButton}
            />
            {showNeighborhood && (
              <IconButton
                icon="map-marker-multiple"
                size={24}
                onPress={loadNeighborhoodInfo}
                style={styles.controlButton}
              />
            )}
          </Card.Content>
        </Card>
      </View>

      {/* معلومات الاتجاهات */}
      {directions && (
        <Card style={styles.directionsCard}>
          <Card.Content>
            <Text style={styles.directionsTitle}>معلومات المسار</Text>
            <Text style={styles.directionsText}>المسافة: {directions.distance}</Text>
            <Text style={styles.directionsText}>الوقت: {directions.duration}</Text>
          </Card.Content>
        </Card>
      )}

      {/* معلومات الحي */}
      {neighborhoodInfo && (
        <Card style={styles.neighborhoodCard}>
          <Card.Content>
            <Text style={styles.neighborhoodTitle}>معلومات الحي</Text>
            <View style={styles.neighborhoodStats}>
              <Chip style={styles.statChip}>مطاعم: {neighborhoodInfo.restaurants.length}</Chip>
              <Chip style={styles.statChip}>مدارس: {neighborhoodInfo.schools.length}</Chip>
              <Chip style={styles.statChip}>حدائق: {neighborhoodInfo.parks.length}</Chip>
              <Chip style={styles.statChip}>تسوق: {neighborhoodInfo.shopping.length}</Chip>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* مؤشر حالة الموقع */}
      {!locationPermission && (
        <Card style={styles.permissionCard}>
          <Card.Content>
            <Text style={styles.permissionText}>
              يرجى السماح بالوصول إلى الموقع لاستخدام الخريطة
            </Text>
            <Button
              mode="contained"
              onPress={initializeLocation}
              style={styles.permissionButton}
            >
              تفعيل الموقع
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* شارة مجاني */}
      <View style={styles.freeBadge}>
        <Chip style={styles.freeChip} textStyle={styles.freeText}>
          مجاني 100%
        </Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  searchResults: {
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  searchResult: {
    justifyContent: 'flex-start',
  },
  controls: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  controlCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
  },
  controlContent: {
    flexDirection: 'row',
    padding: 0,
  },
  controlButton: {
    margin: 0,
  },
  directionsCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  directionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  directionsText: {
    fontSize: 14,
    color: '#666',
  },
  neighborhoodCard: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  neighborhoodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  neighborhoodStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  statChip: {
    marginRight: 5,
    marginBottom: 5,
  },
  permissionCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
  },
  permissionText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    marginBottom: 10,
  },
  permissionButton: {
    backgroundColor: '#007bff',
  },
  freeBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  freeChip: {
    backgroundColor: '#28a745',
  },
  freeText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 