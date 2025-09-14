import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface FilterOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSelected: boolean;
}

export default function FilterScreen({ navigation }: any) {
  const [filters, setFilters] = useState<FilterOption[]>([
    { id: 'charging', name: '전기차 충전소', icon: 'flash', color: '#FBBF24', isSelected: false },
    { id: 'cafe', name: '24시간 카페', icon: 'cafe', color: '#8B4513', isSelected: false },
    { id: 'hospital', name: '병원', icon: 'business', color: '#EF4444', isSelected: false },
    { id: 'pharmacy', name: '약국', icon: 'ellipse-outline', color: '#8B5CF6', isSelected: false },
    { id: 'convenience', name: '편의점', icon: 'storefront', color: '#06B6D4', isSelected: false },
    { id: 'atm', name: 'ATM', icon: 'card', color: '#84CC16', isSelected: false },
    { id: 'gas', name: '주유소', icon: 'car', color: '#F97316', isSelected: false },
    { id: 'restaurant', name: '24시간 식당', icon: 'restaurant', color: '#EC4899', isSelected: false },
  ]);

  const toggleFilter = (id: string) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === id 
          ? { ...filter, isSelected: !filter.isSelected }
          : filter
      )
    );
  };

  const selectedCount = filters.filter(f => f.isSelected).length;

  const applyFilters = () => {
    // 필터 적용 로직 (나중에 구현)
    navigation.navigate('Map', { 
      selectedFilters: filters.filter(f => f.isSelected).map(f => f.id)
    });
  };

  const clearAllFilters = () => {
    setFilters(prev => prev.map(filter => ({ ...filter, isSelected: false })));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* 배경 장식 요소들 */}
      <View style={[styles.backgroundDecoration, styles.decoration1]} />
      <View style={[styles.backgroundDecoration, styles.decoration2]} />
      
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
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>24시간이 모자라</Text>
        </View>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearAllFilters}
        >
          <Text style={styles.clearButtonText}>초기화</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 필터 설명 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>원하는 업체 유형을 선택하세요</Text>
          <Text style={styles.descriptionSubtitle}>
            {selectedCount > 0 
              ? `${selectedCount}개 업체 유형 선택됨` 
              : '최소 1개 이상 선택해주세요'
            }
          </Text>
        </View>

        {/* 필터 그리드 */}
        <View style={styles.filterGrid}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterCard,
                filter.isSelected && styles.selectedFilterCard,
                { borderLeftColor: filter.color }
              ]}
              onPress={() => toggleFilter(filter.id)}
            >
              <View style={styles.filterContent}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: filter.isSelected ? filter.color : 'rgba(255, 255, 255, 0.8)' }
                ]}>
                  <Ionicons 
                    name={filter.icon as any} 
                    size={28} 
                    color={filter.isSelected ? '#FFFFFF' : filter.color} 
                  />
                </View>
                <Text style={[
                  styles.filterText,
                  filter.isSelected && styles.selectedFilterText
                ]}>
                  {filter.name}
                </Text>
                {filter.isSelected && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 추가 옵션 */}
        <View style={styles.additionalOptions}>
          <Text style={styles.sectionTitle}>추가 옵션</Text>
          
          <View style={styles.optionRow}>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>현재 위치 기준</Text>
              <Text style={styles.optionSubtitle}>내 위치에서 가까운 순으로 표시</Text>
            </View>
            <View style={styles.toggleSwitch}>
              <View style={styles.toggleActive} />
            </View>
          </View>

          <View style={styles.optionRow}>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>영업 중인 업체만</Text>
              <Text style={styles.optionSubtitle}>현재 영업 중인 업체만 표시</Text>
            </View>
            <View style={styles.toggleSwitch}>
              <View style={styles.toggleInactive} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 하단 액션 버튼 */}
      <View style={styles.bottomAction}>
        <TouchableOpacity 
          style={[
            styles.applyButton,
            selectedCount === 0 && styles.disabledButton
          ]}
          onPress={applyFilters}
          disabled={selectedCount === 0}
        >
          <Text style={[
            styles.applyButtonText,
            selectedCount === 0 && styles.disabledButtonText
          ]}>
            {selectedCount > 0 ? `${selectedCount}개 업체 찾기` : '업체를 선택해주세요'}
          </Text>
          <Ionicons 
            name="search" 
            size={20} 
            color={selectedCount === 0 ? '#9CA3AF' : '#FFFFFF'} 
          />
        </TouchableOpacity>
      </View>
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
    width: 70,
    height: 70,
    backgroundColor: '#CCFCE1',
    top: 150,
    left: 50,
  },
  decoration2: {
    width: 80,
    height: 80,
    backgroundColor: '#FFE4CC',
    bottom: 200,
    right: 50,
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  
  // 설명 섹션
  descriptionSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  descriptionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  
  // 필터 그리드
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  filterCard: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedFilterCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  filterContent: {
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  selectedFilterText: {
    color: '#8B5CF6',
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // 추가 옵션
  additionalOptions: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  toggleSwitch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignSelf: 'flex-end',
  },
  toggleInactive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  
  // 하단 액션
  bottomAction: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  applyButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});
