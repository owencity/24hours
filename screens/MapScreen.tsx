import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface MapScreenProps {
  navigation: any;
  route: any;
}

export default function MapScreen({ navigation, route }: MapScreenProps) {
  const { selectedFilters, showAll } = route.params || {};
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const active = Array.isArray(selectedFilters) && selectedFilters.length > 0 ? selectedFilters[0] : null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치 권한이 거부되었습니다.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const allResults = [
    { 
      id: 'r1', 
      type: 'charging', 
      title: '서울시청 전기차 충전소', 
      subtitle: '서울특별시 중구 세종대로 110', 
      distance: '0.3km', 
      icon: 'flash', 
      color: '#FBBF24', 
      latitude: 37.5663, 
      longitude: 126.9779,
      phone: '02-120',
      rating: 4.2,
      hours: '24시간 운영',
      description: '서울시청 지하주차장에 위치한 급속 충전소입니다. DC차데모, AC3상 충전기 보유.'
    },
    { 
      id: 'r2', 
      type: 'cafe', 
      title: '스타벅스 24시간 매장', 
      subtitle: '서울특별시 중구 명동길 26', 
      distance: '0.5km', 
      icon: 'cafe', 
      color: '#8B4513', 
      latitude: 37.5636, 
      longitude: 126.9834,
      phone: '02-1234-5678',
      rating: 4.5,
      hours: '24시간 운영',
      description: '명동 중심가에 위치한 24시간 운영 스타벅스입니다. WiFi 무료, 좌석 넉넉함.'
    },
    { 
      id: 'r3', 
      type: 'hospital', 
      title: '서울대병원', 
      subtitle: '서울특별시 종로구 대학로 101', 
      distance: '1.2km', 
      icon: 'business', 
      color: '#EF4444', 
      latitude: 37.5800, 
      longitude: 127.0000,
      phone: '02-2072-2114',
      rating: 4.8,
      hours: '응급실 24시간',
      description: '대한민국 최고 수준의 종합병원입니다. 응급실은 24시간 운영됩니다.'
    },
    { 
      id: 'r4', 
      type: 'pharmacy', 
      title: '종로 24시간 약국', 
      subtitle: '서울특별시 종로구 종로 1', 
      distance: '0.9km', 
      icon: 'ellipse-outline', 
      color: '#8B5CF6', 
      latitude: 37.5701, 
      longitude: 126.9826,
      phone: '02-9876-5432',
      rating: 4.3,
      hours: '24시간 운영',
      description: '종로구청 근처 24시간 운영 약국입니다. 처방전 조제, 일반의약품 판매.'
    },
  ];

  const results = active ? allResults.filter(r => r.type === active) : allResults;

  const openPlaceDetail = (place: any) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const makePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const openDirections = (latitude: number, longitude: number) => {
    const url = `https://maps.google.com/?daddr=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.headerLogo}
            resizeMode="cover"
          />
          <Text style={styles.headerTitle}>24시간이 모자라</Text>
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filter')}
        >
          <Ionicons name="filter" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      {/* 지도 영역 */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* 사용자 위치 마커 */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="내 위치"
              pinColor="blue"
            />
            
            {/* 업체 마커들 */}
            {results.map((item) => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.title}
                description={item.subtitle}
                pinColor={item.type === 'charging' ? 'yellow' : item.type === 'cafe' ? 'brown' : item.type === 'hospital' ? 'red' : 'purple'}
              />
            ))}
          </MapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="location" size={64} color="#9CA3AF" />
            <Text style={styles.mapPlaceholderText}>위치를 가져오는 중...</Text>
            <Text style={styles.mapPlaceholderSubtext}>
              {errorMsg || '잠시만 기다려주세요'}
            </Text>
          </View>
        )}
      </View>

      {/* 하단 정보 패널 */}
      <View style={styles.bottomPanel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>검색 결과</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.resultList}>
          {results.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.resultItem}
              onPress={() => openPlaceDetail(item)}
            >
              <View style={[styles.resultIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
                <View style={styles.resultMeta}>
                  <Text style={styles.resultDistance}>{item.distance}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#FBBF24" />
                    <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.resultAction}>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 플로팅 액션 버튼 */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Filter')}
      >
        <Ionicons name="search" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* 업체 상세 정보 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            {selectedPlace && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.placeHeader}>
                  <View style={[styles.placeIcon, { backgroundColor: selectedPlace.color + '20' }]}>
                    <Ionicons name={selectedPlace.icon} size={32} color={selectedPlace.color} />
                  </View>
                  <View style={styles.placeInfo}>
                    <Text style={styles.placeTitle}>{selectedPlace.title}</Text>
                    <Text style={styles.placeSubtitle}>{selectedPlace.subtitle}</Text>
                    <View style={styles.placeRating}>
                      <Ionicons name="star" size={16} color="#FBBF24" />
                      <Text style={styles.ratingText}>{selectedPlace.rating}</Text>
                      <Text style={styles.distanceText}>• {selectedPlace.distance}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.placeDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={20} color="#8B5CF6" />
                    <Text style={styles.detailText}>{selectedPlace.hours}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Ionicons name="call" size={20} color="#8B5CF6" />
                    <Text style={styles.detailText}>{selectedPlace.phone}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Ionicons name="information-circle" size={20} color="#8B5CF6" />
                    <Text style={styles.detailText}>{selectedPlace.description}</Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => makePhoneCall(selectedPlace.phone)}
                  >
                    <Ionicons name="call" size={20} color="white" />
                    <Text style={styles.actionButtonText}>전화하기</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.directionsButton]}
                    onPress={() => openDirections(selectedPlace.latitude, selectedPlace.longitude)}
                  >
                    <Ionicons name="navigate" size={20} color="white" />
                    <Text style={styles.actionButtonText}>길찾기</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF3FF',
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // 지도 영역
  mapContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  
  // 하단 패널
  bottomPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: height * 0.4,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // 결과 리스트
  resultList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultDistance: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  resultAction: {
    padding: 8,
  },
  
  // 플로팅 액션 버튼
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  placeHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  placeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  placeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  placeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  placeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  placeRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  placeDetails: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  callButton: {
    backgroundColor: '#10B981',
  },
  directionsButton: {
    backgroundColor: '#3B82F6',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
