# 🌙 24시간이 모자라

> **24시간 운영하는 업체를 쉽게 찾아주는 React Native 앱**

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)

</div>

## ✨ 주요 기능

🔍 **카테고리별 검색**
- 전기차 충전소
- 24시간 카페  
- 응급실 운영 병원
- 24시간 약국

🗺️ **실시간 지도**
- Google Maps 연동
- 현재 위치 기반 검색
- 카테고리별 마커 표시

📱 **업체 상세 정보**
- 영업시간 및 연락처
- 평점 및 리뷰
- 원터치 전화연결
- 길찾기 연동

⭐ **사용자 편의**
- 즐겨찾기 기능
- 거리별 정렬
- 실시간 검색

## 📱 스크린샷

<div align="center">
  <img src="https://via.placeholder.com/250x500/8B5CF6/FFFFFF?text=홈+화면" alt="홈 화면" width="200"/>
  <img src="https://via.placeholder.com/250x500/3B82F6/FFFFFF?text=지도+화면" alt="지도 화면" width="200"/>
  <img src="https://via.placeholder.com/250x500/10B981/FFFFFF?text=상세+정보" alt="상세 정보" width="200"/>
</div>

## 🛠️ 기술 스택

### **Frontend**
- **React Native** - 크로스 플랫폼 모바일 앱 프레임워크
- **Expo** - React Native 개발 플랫폼
- **TypeScript** - 타입 안전성을 위한 언어
- **React Navigation** - 네비게이션 라이브러리

### **Maps & Location**
- **react-native-maps** - 지도 표시
- **expo-location** - 위치 서비스
- **Google Maps API** - 지도 데이터

### **UI/UX**
- **Expo Vector Icons** - 아이콘 라이브러리
- **Custom Components** - 재사용 가능한 UI 컴포넌트

## 🚀 설치 및 실행

### **사전 요구사항**
- Node.js 18+ 
- Android Studio (Android 개발)
- Xcode (iOS 개발, macOS만)
- Expo CLI

### **1. 프로젝트 클론**
```bash
git clone https://github.com/owencity/24hours.git
cd 24hours
```

### **2. 의존성 설치**
```bash
npm install
```

### **3. 앱 실행**

#### **개발 서버 시작**
```bash
npx expo start
```

#### **Android 빌드**
```bash
npx expo run:android
```

#### **iOS 빌드** (macOS만)
```bash
npx expo run:ios
```

## 📁 프로젝트 구조

```
📦 24hours
├── 📂 assets/           # 이미지, 아이콘 등 정적 파일
├── 📂 screens/          # 화면 컴포넌트들
│   ├── HomeScreen.tsx   # 메인 홈 화면
│   ├── MapScreen.tsx    # 지도 및 검색 결과
│   └── FilterScreen.tsx # 필터 및 검색
├── 📂 android/          # Android 네이티브 코드
├── 📄 App.tsx          # 메인 앱 컴포넌트
├── 📄 app.json         # Expo 설정
└── 📄 package.json     # 의존성 관리
```

## 🎯 로드맵

- [x] ✅ 기본 UI 구현
- [x] ✅ 지도 연동  
- [x] ✅ 카테고리별 필터링
- [x] ✅ 업체 상세 정보 모달
- [ ] 🔄 실제 업체 데이터 연동
- [ ] 📱 검색 기능 고도화
- [ ] ⭐ 즐겨찾기 기능
- [ ] 📊 사용자 리뷰 시스템
- [ ] 🔔 푸시 알림

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👨‍💻 개발자

**Owen City** - [@owencity](https://github.com/owencity)

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든 연락주세요!

- 📧 Email: your.email@example.com
- 🐙 GitHub: [@owencity](https://github.com/owencity)

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요! ⭐**

Made with ❤️ in Seoul, Korea

</div>
