import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* 배경 장식 요소들 */}
      <View style={[styles.backgroundDecoration, styles.decoration1]} />
      <View style={[styles.backgroundDecoration, styles.decoration2]} />
      <View style={[styles.backgroundDecoration, styles.decoration3]} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo.png')} 
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.headerTitle}>24시간이 모자라</Text>
          <Text style={styles.headerSubtitle}>언제든지 찾을 수 있는 업체들</Text>
        </View>

        {/* 메인 CTA 버튼 */}
        <TouchableOpacity 
          style={styles.mainCTA}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.ctaText}>지금 찾아보기</Text>
          <Ionicons name="arrow-forward" size={20} color="#8B5CF6" />
        </TouchableOpacity>

        {/* 카테고리 그리드 */}
        <View style={styles.categoryGrid}>
          <TouchableOpacity 
            style={[styles.categoryCard, styles.chargingStationCard]}
            onPress={() => navigation.navigate('Map', { selectedFilters: ['charging'] })}
          >
            <Ionicons name="flash" size={32} color="#FBBF24" />
            <Text style={styles.categoryText}>전기차 충전소</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.cafeCard]}
            onPress={() => navigation.navigate('Map', { selectedFilters: ['cafe'] })}
          >
            <Ionicons name="cafe" size={32} color="#8B4513" />
            <Text style={styles.categoryText}>24시간 카페</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.hospitalCard]}
            onPress={() => navigation.navigate('Map', { selectedFilters: ['hospital'] })}
          >
            <Ionicons name="business" size={32} color="#EF4444" />
            <Text style={styles.categoryText}>병원</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.categoryCard, styles.pharmacyCard]}
            onPress={() => navigation.navigate('Map', { selectedFilters: ['pharmacy'] })}
          >
            <Ionicons name="ellipse-outline" size={32} color="#8B5CF6" />
            <Text style={styles.categoryText}>약국</Text>
          </TouchableOpacity>
        </View>

        {/* 빠른 액션 버튼들 */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Map', { showAll: true })}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons name="map" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>전체 지도 보기</Text>
              <Text style={styles.quickActionSubtitle}>모든 24시간 업체를 지도에서 확인</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Filter')}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons name="filter" size={24} color="#10B981" />
            </View>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>상세 필터</Text>
              <Text style={styles.quickActionSubtitle}>원하는 업체 유형을 세밀하게 선택</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* 하단 네비게이션 */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#8B5CF6" />
            <Text style={styles.navText}>홈</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Filter')}
          >
            <Ionicons name="search" size={24} color="#6B7280" />
            <Text style={styles.navText}>검색</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Map')}
          >
            <Ionicons name="map" size={24} color="#6B7280" />
            <Text style={styles.navText}>지도</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color="#6B7280" />
            <Text style={styles.navText}>내정보</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF3FF',
  },
  scrollView: {
    flex: 1,
  },
  
  // 배경 장식 요소들
  backgroundDecoration: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.3,
  },
  decoration1: {
    width: 80,
    height: 80,
    backgroundColor: '#FFE4CC',
    top: 100,
    left: 50,
  },
  decoration2: {
    width: 60,
    height: 60,
    backgroundColor: '#CCFCE1',
    top: 200,
    right: 50,
  },
  decoration3: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E7FF',
    bottom: 200,
    left: 100,
  },
  
  // 헤더
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  
  // 메인 CTA 버튼
  mainCTA: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  
  // 카테고리 그리드
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  categoryCard: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chargingStationCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FBBF24',
  },
  cafeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  hospitalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  pharmacyCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  
  // 빠른 액션
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // 하단 네비게이션
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 32,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
