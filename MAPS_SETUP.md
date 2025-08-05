# 🗺️ إعداد نظام الخرائط المتقدم

## 📋 المتطلبات

### 1. مكتبات الخرائط المطلوبة
```bash
npm install react-native-maps expo-google-maps react-native-geolocation-service
```

### 2. إعداد Google Maps Platform

#### أ. إنشاء مشروع في Google Cloud Console
1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. فعّل Google Maps APIs:
   - **Maps SDK for Android**
   - **Maps SDK for iOS**
   - **Directions API**
   - **Geocoding API**
   - **Places API**
   - **Distance Matrix API**
   - **Time Zone API**

#### ب. إنشاء مفتاح API
1. اذهب إلى "Credentials" في القائمة الجانبية
2. اضغط "Create Credentials" → "API Key"
3. انسخ المفتاح واحفظه

#### ج. تقييد المفتاح (مهم للأمان)
1. اضغط على المفتاح المنشأ
2. أضف تقييدات:
   - **Application restrictions**: Android apps & iOS apps
   - **API restrictions**: حدد APIs المطلوبة فقط

### 3. إعداد التطبيق

#### أ. تحديث app.config.js
```javascript
android: {
  config: {
    googleMaps: {
      apiKey: "YOUR_ANDROID_API_KEY"
    }
  }
},
ios: {
  config: {
    googleMapsApiKey: "YOUR_IOS_API_KEY"
  }
}
```

#### ب. إضافة متغيرات البيئة
أنشئ ملف `.env`:
```env
GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🚀 الميزات المتقدمة المضافة

### ✅ **1. Locator Plus - تحديد مواقع الأعمال**
- **البحث عن الأعمال القريبة**: مطاعم، مدارس، حدائق، مراكز تسوق
- **عرض تفاصيل كل مكان**: الاسم، العنوان، التقييم
- **تصفية حسب النوع**: مطاعم، مدارس، حدائق، تسوق
- **عرض على الخريطة**: علامات ملونة لكل نوع

### ✅ **2. Address Selection - اختيار العناوين**
- **البحث التلقائي**: اقتراحات العناوين أثناء الكتابة
- **تحويل العناوين**: من نص إلى إحداثيات
- **تحويل الإحداثيات**: من إحداثيات إلى عنوان
- **قائمة اقتراحات**: عرض أفضل 5 نتائج

### ✅ **3. Neighborhood Discovery - استكشاف الحي**
- **معلومات الحي**: عرض إحصائيات الحي
- **المطاعم القريبة**: قائمة المطاعم في المنطقة
- **المدارس**: المدارس والجامعات القريبة
- **الحدائق**: الحدائق والمنتزهات
- **مراكز التسوق**: المولات والمحلات

### ✅ **4. Commutes & Transit - التنقل والمواصلات**
- **حساب المسارات**: من نقطة إلى نقطة
- **أنواع النقل**: قيادة، مشي، دراجة، مواصلات
- **معلومات المسار**: المسافة والوقت المتوقع
- **خطوات مفصلة**: تعليمات خطوة بخطوة
- **عرض المسار**: خط أزرق على الخريطة

### ✅ **5. Data Visualization - تصور البيانات**
- **خريطة الحرارة**: عرض كثافة النشاط
- **تخصيص الألوان**: ألوان مخصصة للبيانات
- **تحليل البيانات**: إحصائيات المنطقة
- **عرض تفاعلي**: تحديث فوري للبيانات

### ✅ **6. Custom Map Styling - تخصيص الخريطة**
- **ألوان مخصصة**: تخصيص ألوان الخريطة
- **إخفاء العناصر**: إخفاء نقاط الاهتمام غير المطلوبة
- **نمط خاص**: تصميم يناسب التطبيق
- **وضع ليلي**: دعم الوضع الليلي

### ✅ **7. Transaction Context - سياق المعاملات**
- **معلومات الموقع**: العنوان، الحي، المدينة
- **المنطقة الزمنية**: توقيت المنطقة
- **معلومات إضافية**: معلومات مفيدة للمعاملات
- **تحليل المنطقة**: معلومات عن المنطقة

### ✅ **8. Current Location Info - معلومات الموقع الحالي**
- **الموقع الحالي**: إحداثيات دقيقة
- **العنوان**: عنوان مفصل للموقع
- **الأماكن القريبة**: أفضل 5 أماكن قريبة
- **معلومات فورية**: تحديث مستمر للمعلومات

## 🛠️ الملفات المضافة

### 1. خدمات متقدمة
- `src/services/maps.ts`: خدمة الخرائط المتقدمة
- `src/services/location.ts`: خدمة الموقع الأساسية

### 2. مكونات الخريطة
- `src/components/MapView.tsx`: مكون الخريطة الأساسي
- `src/components/AdvancedMapView.tsx`: مكون الخريطة المتقدم

### 3. شاشات الخرائط
- `src/screens/customer/TrackOrderMapScreen.tsx`: تتبع الطلب مع الخريطة للعميل
- `src/screens/driver/DriverMapScreen.tsx`: خريطة السائق
- `src/screens/admin/DriversMapScreen.tsx`: مراقبة السائقين للإدارة

## 📱 كيفية الاستخدام

### للعميل:
1. اذهب إلى "تفاصيل الطلب"
2. اضغط "عرض الخريطة"
3. استخدم شريط البحث للعناوين
4. شاهد معلومات الحي والأماكن القريبة

### للسائق:
1. اذهب إلى "الطلب الحالي"
2. اضغط "عرض الخريطة"
3. احصل على اتجاهات دقيقة
4. شاهد معلومات المنطقة

### للإدارة:
1. اذهب إلى "لوحة التحكم"
2. اختر تبويب "السواق"
3. اضغط "مراقبة السائقين على الخريطة"
4. شاهد خريطة الحرارة للنشاط

## 🔧 إعدادات متقدمة

### 1. تحسين الأداء
```javascript
// في AdvancedMapsService
const locationOptions = {
  accuracy: Location.Accuracy.High,
  timeInterval: 5000, // تحديث كل 5 ثواني
  distanceInterval: 10, // تحديث عند التحرك 10 متر
  maxWaitTime: 10000, // انتظار أقصى 10 ثواني
};
```

### 2. إضافة اتجاهات متقدمة
```javascript
// إضافة Google Directions API مع خيارات متقدمة
const directions = await AdvancedMapsService.getDirections(
  origin,
  destination,
  'driving', // أو 'walking', 'bicycling', 'transit'
);
```

### 3. إضافة البحث المتقدم
```javascript
// إضافة Google Places API مع تصفية
const places = await AdvancedMapsService.findNearbyBusinesses(
  location,
  5000, // نصف قطر البحث
  'restaurant' // نوع المكان
);
```

### 4. تخصيص الخريطة
```javascript
// تخصيص مظهر الخريطة
const customStyle = AdvancedMapsService.getCustomMapStyle();
// تطبيق على MapView
customMapStyle={customStyle}
```

## 🎨 ميزات التصميم

### ألوان العلامات:
- **👤 العميل**: أزرق `#007bff`
- **🚗 السائق**: أخضر `#28a745`
- **📍 الوجهة**: أحمر `#dc3545`
- **🏢 الأعمال**: أصفر `#ffc107`

### أنواع الخرائط:
- **خريطة عادية**: عرض أساسي
- **خريطة الحرارة**: كثافة النشاط
- **خريطة مخصصة**: تصميم خاص
- **خريطة الليل**: وضع ليلي

## ⚠️ ملاحظات مهمة

1. **مفتاح API**: احتفظ بمفتاح API آمناً ولا تشاركه
2. **الحدود**: Google Maps API له حدود استخدام، راقب الاستخدام
3. **الأداء**: استخدم التحديث الذكي لتوفير البطارية
4. **الخصوصية**: اطلب إذن الموقع فقط عند الحاجة
5. **التكلفة**: بعض APIs مدفوع، راقب الاستخدام

## 🐛 استكشاف الأخطاء

### مشكلة: الخريطة لا تظهر
- تحقق من مفتاح API
- تأكد من تفعيل Google Maps API
- تحقق من إعدادات التطبيق

### مشكلة: البحث لا يعمل
- تحقق من تفعيل Places API
- تأكد من صحة مفتاح API
- تحقق من اتصال الإنترنت

### مشكلة: الاتجاهات لا تظهر
- تحقق من تفعيل Directions API
- تأكد من صحة الإحداثيات
- تحقق من وجود مسار متاح

### مشكلة: الأداء بطيء
- قلل frequency التحديث
- استخدم accuracy أقل
- تحقق من اتصال الإنترنت
- استخدم caching للبيانات

## 💰 التكلفة والحدود

### APIs المجانية (شهرياً):
- **Maps SDK**: 28,500 تحميل
- **Directions API**: 2,500 طلب
- **Geocoding API**: 2,500 طلب
- **Places API**: 1,000 طلب

### APIs المدفوعة:
- **Distance Matrix API**: $5 لكل 1,000 طلب
- **Time Zone API**: $5 لكل 1,000 طلب

## 📞 الدعم

للمساعدة في إعداد الخرائط المتقدمة، تواصل مع فريق الدعم الفني.

### روابط مفيدة:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Places API](https://developers.google.com/maps/documentation/places/web-service) 