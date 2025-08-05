import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Text, Card, IconButton } from 'react-native-paper';
import { LocationService, LocationData } from '../services/location';

const { width, height } = Dimensions.get('window');

interface MapViewProps {
  initialLocation?: LocationData;
  markers?: Array<{
    id: string;
    title: string;
    description?: string;
    coordinate: LocationData;
    type: 'customer' | 'driver' | 'destination';
  }>;
  polylines?: Array<{
    id: string;
    coordinates: LocationData[];
    color?: string;
  }>;
  showCurrentLocation?: boolean;
  onMarkerPress?: (markerId: string) => void;
  onMapPress?: (coordinate: LocationData) => void;
  style?: any;
}

export default function CustomMapView({
  initialLocation,
  markers = [],
  polylines = [],
  showCurrentLocation = true,
  onMarkerPress,
  onMapPress,
  style,
}: MapViewProps) {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    initializeLocation();
  }, []);

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

  const handleMapPress = (event: any) => {
    if (onMapPress) {
      const coordinate: LocationData = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      };
      onMapPress(coordinate);
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'customer':
        return '👤';
      case 'driver':
        return '🚗';
      case 'destination':
        return '📍';
      default:
        return '📍';
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

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
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
      >
        {/* العلامات */}
        {markers.map((marker) => (
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
      </MapView>

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
          </Card.Content>
        </Card>
      </View>

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
  controls: {
    position: 'absolute',
    top: 20,
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
}); 