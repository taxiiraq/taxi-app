# 🔑 دليل الحصول على مفتاح Google Maps API

## 📋 الخطوات السريعة

### 1️⃣ **إنشاء حساب Google Cloud**
```
https://console.cloud.google.com/
```

### 2️⃣ **إنشاء مشروع جديد**
- اضغط "Select a project" → "New Project"
- أدخل اسم: "Taxi App Maps"
- اضغط "Create"

### 3️⃣ **تفعيل APIs المطلوبة**
في "APIs & Services" → "Library" ابحث عن:
- ✅ **Maps SDK for Android**
- ✅ **Maps SDK for iOS**
- ✅ **Directions API**
- ✅ **Geocoding API**
- ✅ **Places API**

### 4️⃣ **إنشاء مفتاح API**
- اذهب إلى "APIs & Services" → "Credentials"
- اضغط "Create Credentials" → "API Key"
- انسخ المفتاح (يبدأ بـ `AIzaSy...`)

### 5️⃣ **تقييد المفتاح (مهم!)**
- اضغط على المفتاح المنشأ
- في "Application restrictions":
  - اختر "Android apps"
  - أضف package name: `com.taxiapp.app`
- في "API restrictions":
  - اختر "Restrict key"
  - حدد APIs المطلوبة فقط

### 6️⃣ **إضافة المفتاح للتطبيق**
في ملف `app.config.js`:
```javascript
android: {
  config: {
    googleMaps: {
      apiKey: "YOUR_API_KEY_HERE" // استبدل بمفتاحك
    }
  }
}
```

## ⚠️ ملاحظات مهمة

### 🔒 الأمان
- **لا تشارك المفتاح** مع أي شخص
- **لا ترفعه على GitHub** بدون تقييد
- **استخدم تقييدات** للأندرويد و iOS

### 💰 التكلفة
- **الحد المجاني**: 28,500 تحميل شهرياً
- **للتطبيق الصغير**: كافي تماماً
- **للتطبيق الكبير**: قد تحتاج خطة مدفوعة

### 🐛 استكشاف الأخطاء

#### مشكلة: "Maps API key not found"
- تأكد من تفعيل Maps SDK
- تحقق من صحة المفتاح
- تأكد من تقييد المفتاح بشكل صحيح

#### مشكلة: "This API project is not authorized"
- تأكد من تفعيل APIs المطلوبة
- تحقق من أن المشروع مفعل

#### مشكلة: "Quota exceeded"
- تجاوزت الحد المجاني
- فكر في خطة مدفوعة

## 📞 المساعدة

### روابط مفيدة:
- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps API Documentation](https://developers.google.com/maps/documentation)
- [Billing Setup](https://console.cloud.google.com/billing)

### للحصول على SHA-1 للأندرويد:
```bash
# في مجلد المشروع
cd android && ./gradlew signingReport
```

### للحصول على Bundle ID للـ iOS:
- في Xcode: Project Settings → Bundle Identifier
- أو في `app.config.js`: `bundleIdentifier: "com.taxiapp.app"`

## ✅ التحقق من الإعداد

بعد إضافة المفتاح، اختبر التطبيق:
1. `npm install`
2. `npx expo start`
3. اختبر الخرائط في التطبيق

إذا ظهرت الخريطة، فالإعداد صحيح! 🎉 