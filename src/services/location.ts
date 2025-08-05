import * as Location from 'expo-location';
import { Platform, Alert } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface DriverLocation {
  id: string;
  name: string;
  location: LocationData;
  isOnline: boolean;
  currentOrder?: string;
}

export interface CustomerLocation {
  id: string;
  name: string;
  location: LocationData;
  destination?: LocationData;
}

export class LocationService {
  // طلب إذن الموقع
  static async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'إذن الموقع مطلوب',
          'يجب السماح بالوصول إلى الموقع لاستخدام هذه الميزة'
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('خطأ في طلب إذن الموقع:', error);
      return false;
    }
  }

  // الحصول على الموقع الحالي
  static async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) return null;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: location.timestamp,
      };
    } catch (error) {
      console.error('خطأ في الحصول على الموقع:', error);
      return null;
    }
  }

  // بدء تتبع الموقع
  static async startLocationTracking(
    callback: (location: LocationData) => void
  ): Promise<() => void> {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) return () => {};

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const locationData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            timestamp: location.timestamp,
          };
          callback(locationData);
        }
      );

      return () => subscription.remove();
    } catch (error) {
      console.error('خطأ في بدء تتبع الموقع:', error);
      return () => {};
    }
  }

  // حساب المسافة بين نقطتين
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // المسافة بالكيلومترات
    return distance;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // تحويل العنوان إلى إحداثيات (Geocoding)
  static async geocodeAddress(address: string): Promise<LocationData | null> {
    try {
      const results = await Location.geocodeAsync(address);
      if (results.length > 0) {
        return {
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        };
      }
      return null;
    } catch (error) {
      console.error('خطأ في تحويل العنوان:', error);
      return null;
    }
  }

  // تحويل الإحداثيات إلى عنوان (Reverse Geocoding)
  static async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<string | null> {
    try {
      const results = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (results.length > 0) {
        const address = results[0];
        return `${address.street || ''} ${address.name || ''} ${address.city || ''} ${address.region || ''}`.trim();
      }
      return null;
    } catch (error) {
      console.error('خطأ في تحويل الإحداثيات:', error);
      return null;
    }
  }

  // الحصول على اتجاه القيادة
  static async getDirections(
    origin: LocationData,
    destination: LocationData
  ): Promise<any> {
    try {
      // هنا يمكن إضافة API للاتجاهات مثل Google Directions API
      // للآن سنعيد مسار بسيط
      return {
        distance: this.calculateDistance(
          origin.latitude,
          origin.longitude,
          destination.latitude,
          destination.longitude
        ),
        duration: 0, // سيتم حسابها من API
        polyline: [], // سيتم إضافتها من API
      };
    } catch (error) {
      console.error('خطأ في الحصول على الاتجاهات:', error);
      return null;
    }
  }
} 