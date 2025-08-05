import { LocationService, LocationData } from './location';

export interface DirectionsResult {
  distance: string;
  duration: string;
  polyline: LocationData[];
  steps: string[];
}

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  location: LocationData;
  rating?: number;
  types: string[];
}

export interface GeocodingResult {
  address: string;
  location: LocationData;
  components: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

export class AdvancedMapsService {
  private static apiKey = process.env.GOOGLE_MAPS_API_KEY || '';

  // 1. Locator Plus - تحديد مواقع الأعمال
  static async findNearbyBusinesses(
    location: LocationData,
    radius: number = 5000,
    type?: string
  ): Promise<PlaceResult[]> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${location.latitude},${location.longitude}&` +
        `radius=${radius}&` +
        `${type ? `type=${type}&` : ''}` +
        `key=${this.apiKey}`
      );
      
      const data = await response.json();
      return data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.vicinity,
        location: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
        rating: place.rating,
        types: place.types,
      }));
    } catch (error) {
      console.error('خطأ في البحث عن الأعمال القريبة:', error);
      return [];
    }
  }

  // 2. Address Selection - اختيار العناوين
  static async autocompleteAddress(query: string): Promise<string[]> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
        `input=${encodeURIComponent(query)}&` +
        `types=address&` +
        `key=${this.apiKey}`
      );
      
      const data = await response.json();
      return data.predictions.map((prediction: any) => prediction.description);
    } catch (error) {
      console.error('خطأ في البحث عن العناوين:', error);
      return [];
    }
  }

  // 3. Neighborhood Discovery - استكشاف الحي
  static async getNeighborhoodInfo(
    location: LocationData,
    radius: number = 2000
  ): Promise<{
    restaurants: PlaceResult[];
    schools: PlaceResult[];
    parks: PlaceResult[];
    shopping: PlaceResult[];
  }> {
    try {
      const [restaurants, schools, parks, shopping] = await Promise.all([
        this.findNearbyBusinesses(location, radius, 'restaurant'),
        this.findNearbyBusinesses(location, radius, 'school'),
        this.findNearbyBusinesses(location, radius, 'park'),
        this.findNearbyBusinesses(location, radius, 'shopping_mall'),
      ]);

      return {
        restaurants,
        schools,
        parks,
        shopping,
      };
    } catch (error) {
      console.error('خطأ في استكشاف الحي:', error);
      return {
        restaurants: [],
        schools: [],
        parks: [],
        shopping: [],
      };
    }
  }

  // 4. Commutes & Transit - التنقل والمواصلات
  static async getDirections(
    origin: LocationData,
    destination: LocationData,
    mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
  ): Promise<DirectionsResult> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?` +
        `origin=${origin.latitude},${origin.longitude}&` +
        `destination=${destination.latitude},${destination.longitude}&` +
        `mode=${mode}&` +
        `key=${this.apiKey}`
      );
      
      const data = await response.json();
      
      if (data.routes.length > 0) {
        const route = data.routes[0];
        const leg = route.legs[0];
        
        // تحويل polyline إلى إحداثيات
        const polyline = this.decodePolyline(route.overview_polyline.points);
        
        return {
          distance: leg.distance.text,
          duration: leg.duration.text,
          polyline,
          steps: leg.steps.map((step: any) => step.html_instructions),
        };
      }
      
      throw new Error('لا يوجد مسار متاح');
    } catch (error) {
      console.error('خطأ في الحصول على الاتجاهات:', error);
      return {
        distance: 'غير متاح',
        duration: 'غير متاح',
        polyline: [],
        steps: [],
      };
    }
  }

  // 5. Data Visualization - تصور البيانات على الخريطة
  static async getHeatmapData(
    center: LocationData,
    radius: number = 10000
  ): Promise<LocationData[]> {
    try {
      // محاكاة بيانات كثافة السكان أو النشاط
      const points: LocationData[] = [];
      const count = Math.floor(Math.random() * 50) + 20;
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const distance = Math.random() * radius;
        
        points.push({
          latitude: center.latitude + (distance * Math.cos(angle)) / 111000,
          longitude: center.longitude + (distance * Math.sin(angle)) / (111000 * Math.cos(center.latitude * Math.PI / 180)),
        });
      }
      
      return points;
    } catch (error) {
      console.error('خطأ في إنشاء خريطة الحرارة:', error);
      return [];
    }
  }

  // 6. Custom Map Styling - تخصيص الخريطة
  static getCustomMapStyle(): any[] {
    return [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }],
      },
    ];
  }

  // 7. Transaction Context - إضافة سياق المعاملات
  static async getLocationContext(location: LocationData): Promise<{
    address: string;
    neighborhood: string;
    city: string;
    timezone: string;
    weather?: any;
  }> {
    try {
      const geocoding = await this.reverseGeocode(location);
      
      return {
        address: geocoding.address,
        neighborhood: geocoding.components.city || '',
        city: geocoding.components.city || '',
        timezone: 'Asia/Riyadh', // افتراضي للسعودية
      };
    } catch (error) {
      console.error('خطأ في الحصول على سياق الموقع:', error);
      return {
        address: 'غير متاح',
        neighborhood: 'غير متاح',
        city: 'غير متاح',
        timezone: 'Asia/Riyadh',
      };
    }
  }

  // 8. Current Location Info - معلومات الموقع الحالي
  static async getCurrentLocationInfo(): Promise<{
    location: LocationData;
    address: string;
    nearbyPlaces: PlaceResult[];
  }> {
    try {
      const location = await LocationService.getCurrentLocation();
      if (!location) throw new Error('لا يمكن الحصول على الموقع');

      const address = await this.reverseGeocode(location);
      const nearbyPlaces = await this.findNearbyBusinesses(location, 1000);

      return {
        location,
        address: address.address,
        nearbyPlaces: nearbyPlaces.slice(0, 5), // أول 5 أماكن فقط
      };
    } catch (error) {
      console.error('خطأ في الحصول على معلومات الموقع الحالي:', error);
      throw error;
    }
  }

  // Helper: تحويل polyline إلى إحداثيات
  private static decodePolyline(encoded: string): LocationData[] {
    const poly: LocationData[] = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let shift = 0, result = 0;

      do {
        let b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (result >= 0x20);

      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        let b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (result >= 0x20);

      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      poly.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return poly;
  }

  // Helper: تحويل الإحداثيات إلى عنوان
  private static async reverseGeocode(location: LocationData): Promise<GeocodingResult> {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?` +
        `latlng=${location.latitude},${location.longitude}&` +
        `key=${this.apiKey}`
      );
      
      const data = await response.json();
      
      if (data.results.length > 0) {
        const result = data.results[0];
        const components: any = {};
        
        result.address_components.forEach((component: any) => {
          const type = component.types[0];
          components[type] = component.long_name;
        });

        return {
          address: result.formatted_address,
          location,
          components,
        };
      }
      
      throw new Error('لا يمكن العثور على العنوان');
    } catch (error) {
      console.error('خطأ في تحويل الإحداثيات:', error);
      throw error;
    }
  }
} 