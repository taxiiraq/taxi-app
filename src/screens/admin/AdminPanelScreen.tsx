import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button, Text, Card, IconButton, DataTable, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type AdminPanelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminPanel'>;

export default function AdminPanelScreen() {
  const navigation = useNavigation<AdminPanelScreenNavigationProp>();

  const handleDriversMap = () => {
    navigation.navigate('DriversMap');
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>لوحة التحكم</Text>
        <Text style={styles.subtitle}>إدارة تطبيق التاكسي</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="map-marker-multiple"
                size={40}
                iconColor="#007bff"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>خريطة السائقين</Text>
                <Text style={styles.cardDescription}>
                  عرض مواقع جميع السائقين على الخريطة
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleDriversMap}
              style={styles.cardButton}
            >
              عرض الخريطة
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <IconButton
                icon="headset"
                size={40}
                iconColor="#28a745"
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>الدعم الفني</Text>
                <Text style={styles.cardDescription}>
                  إدارة طلبات الدعم والمساعدة
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={handleSupport}
              style={[styles.cardButton, { backgroundColor: '#28a745' }]}
            >
              إدارة الدعم
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>إحصائيات سريعة</Text>
          
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>25</Text>
                <Text style={styles.statLabel}>سائق نشط</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>150</Text>
                <Text style={styles.statLabel}>طلب اليوم</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>تقييم متوسط</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>معدل الرضا</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>الطلبات الحديثة</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>رقم الطلب</DataTable.Title>
              <DataTable.Title>الحالة</DataTable.Title>
              <DataTable.Title numeric>المبلغ</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>#12345</DataTable.Cell>
              <DataTable.Cell>مكتمل</DataTable.Cell>
              <DataTable.Cell numeric>25 ريال</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>#12344</DataTable.Cell>
              <DataTable.Cell>قيد التنفيذ</DataTable.Cell>
              <DataTable.Cell numeric>30 ريال</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>#12343</DataTable.Cell>
              <DataTable.Cell>في الانتظار</DataTable.Cell>
              <DataTable.Cell numeric>20 ريال</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // إضافة وظيفة جديدة
          console.log('إضافة وظيفة جديدة');
        }}
      />
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
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardButton: {
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  statsSection: {
    marginTop: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 15,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  recentSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007bff',
  },
}); 