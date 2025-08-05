import { LocationService, LocationData } from './location';

export interface OSMPlace {
  id: string;
  name: string;
  address: string;
  location: LocationData;
  type: string;
  rating?: number;
}

export interface OSMDirections {
  distance: string;
  duration: string;
  polyline: LocationData[];
  steps: string[];
}

export class OpenStreetMapService {
  // 1. البحث عن الأماكن القريبة
  static async findNearbyPlaces(
    location: LocationData,
    radius: number = 5000,
    type?: string
  ): Promise<OSMPlace[]> {
    try {
      const query = type ? `[out:json][timeout:25];(
        node["amenity"="${type}"](around:${radius},${location.latitude},${location.longitude});
        way["amenity"="${type}"](around:${radius},${location.latitude},${location.longitude});
        relation["amenity"="${type}"](around:${radius},${location.latitude},${location.longitude});
      );out body;>;out skel qt;`;
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      );
      
      const data = await response.json();
      return data.elements.map((element: any) => ({
        id: element.id.toString(),
        name: element.tags?.name || 'غير معروف',
        address: element.tags?.addr:street || '',
        location: {
          latitude: element.lat,
          longitude: element.lon,
        },
        type: element.tags?.amenity || 'place',
      }));
    } catch (error) {
      console.error('خطأ في البحث عن الأماكن القريبة:', error);
      return [];
    }
  }

  // 2. البحث عن العناوين
  static async searchAddress(query: string): Promise<string[]> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `format=json&` +
        `limit=5&` +
        `addressdetails=1`
      );
      
      const data = await response.json();
      return data.map((item: any) => item.display_name);
    } catch (error) {
      console.error('خطأ في البحث عن العناوين:', error);
      return [];
    }
  }

  // 3. تحويل العنوان إلى إحداثيات
  static async geocodeAddress(address: string): Promise<LocationData | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(address)}&` +
        `format=json&` +
        `limit=1`
      );
      
      const data = await response.json();
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error('خطأ في تحويل العنوان:', error);
      return null;
    }
  }

  // 4. تحويل الإحداثيات إلى عنوان
  static async reverseGeocode(location: LocationData): Promise<string | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
        `lat=${location.latitude}&` +
        `lon=${location.longitude}&` +
        `format=json&` +
        `addressdetails=1`
      );
      
      const data = await response.json();
      return data.display_name || null;
    } catch (error) {
      console.error('خطأ في تحويل الإحداثيات:', error);
      return null;
    }
  }

  // 5. الحصول على الاتجاهات
  static async getDirections(
    origin: LocationData,
    destination: LocationData,
    mode: 'driving' | 'walking' | 'bicycling' = 'driving'
  ): Promise<OSMDirections> {
    try {
      const profile = mode === 'driving' ? 'driving-car' : 
                     mode === 'walking' ? 'foot-walking' : 'cycling-regular';
      
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ORS_API_KEY', // مجاني من openrouteservice.org
          },
          body: JSON.stringify({
            coordinates: [
              [origin.longitude, origin.latitude],
              [destination.longitude, destination.latitude]
            ],
            instructions: true,
            geometry: true,
          }),
        }
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const route = data.features[0];
        const properties = route.properties;
        
        // تحويل GeoJSON إلى إحداثيات
        const polyline = this.decodeGeoJSON(route.geometry);
        
        return {
          distance: `${(properties.summary.distance / 1000).toFixed(1)} كم`,
          duration: `${Math.round(properties.summary.duration / 60)} دقيقة`,
          polyline,
          steps: properties.segments?.[0]?.steps?.map((step: any) => step.instruction) || [],
        };
      }
      
      throw new Error('لا يوجد مسار متاح');
    } catch (error) {
      console.error('خطأ في الحصول على الاتجاهات:', error);
      // استخدام حساب المسافة البسيط كبديل
      const distance = LocationService.calculateDistance(
        origin.latitude,
        origin.longitude,
        destination.latitude,
        destination.longitude
      );
      
      return {
        distance: `${distance.toFixed(1)} كم`,
        duration: `${Math.round(distance * 2)} دقيقة`,
        polyline: [origin, destination],
        steps: [],
      };
    }
  }

  // 6. الحصول على معلومات الحي
  static async getNeighborhoodInfo(location: LocationData): Promise<{
    restaurants: OSMPlace[];
    schools: OSMPlace[];
    parks: OSMPlace[];
    shopping: OSMPlace[];
  }> {
    try {
      const [restaurants, schools, parks, shopping] = await Promise.all([
        this.findNearbyPlaces(location, 2000, 'restaurant'),
        this.findNearbyPlaces(location, 2000, 'school'),
        this.findNearbyPlaces(location, 2000, 'park'),
        this.findNearbyPlaces(location, 2000, 'shop'),
      ]);

      return {
        restaurants,
        schools,
        parks,
        shopping,
      };
    } catch (error) {
      console.error('خطأ في الحصول على معلومات الحي:', error);
      return {
        restaurants: [],
        schools: [],
        parks: [],
        shopping: [],
      };
    }
  }

  // Helper: تحويل GeoJSON إلى إحداثيات
  private static decodeGeoJSON(geometry: any): LocationData[] {
    if (geometry.type === 'LineString') {
      return geometry.coordinates.map((coord: number[]) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
    }
    return [];
  }

  // 7. الحصول على خريطة مخصصة
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
    ];
  }
} 