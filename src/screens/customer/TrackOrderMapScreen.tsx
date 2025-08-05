import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Button, Text, Card, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type TrackOrderMapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TrackOrderMap'>;
type TrackOrderMapScreenRouteProp = RouteProp<RootStackParamList, 'TrackOrderMap'>;

const { width, height } = Dimensions.get('window');

export default function TrackOrderMapScreen() {
  const navigation = useNavigation<TrackOrderMapScreenNavigationProp>();
  const route = useRoute<TrackOrderMapScreenRouteProp>();
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
        <Text style={styles.title}>تتبع على الخريطة</Text>
        <Text style={styles.subtitle}>رقم الطلب: {orderId}</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <IconButton
            icon="map-marker"
            size={80}
            iconColor="#007bff"
          />
          <Text style={styles.mapText}>خريطة التتبع</Text>
          <Text style={styles.mapDescription}>
            هنا ستظهر خريطة تفاعلية لتتبع التاكسي
          </Text>
        </View>
      </View>

      <Card style={styles.infoCard}>
        <Card.Content>
          <View style={styles.infoHeader}>
            <IconButton
              icon="truck-delivery"
              size={40}
              iconColor="#28a745"
            />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>السائق في الطريق</Text>
              <Text style={styles.infoDescription}>
                محمد علي - سيصل خلال 8 دقائق
              </Text>
            </View>
          </View>
          
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>محمد علي</Text>
            <Text style={styles.driverPhone}>+966 50 123 4567</Text>
            <Text style={styles.driverRating}>تقييم: ⭐⭐⭐⭐⭐ (4.9)</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('TrackOrder', { orderId })}
          style={styles.detailsButton}
          icon="information"
        >
          تفاصيل الطلب
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
    paddingBottom: 20,
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
  mapContainer: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    margin: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
    padding: 40,
  },
  mapText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 20,
    marginBottom: 10,
  },
  mapDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    margin: 20,
    elevation: 4,
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
  },
  driverInfo: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 15,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  driverPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  driverRating: {
    fontSize: 12,
    color: '#ffc107',
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  detailsButton: {
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