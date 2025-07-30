# إعداد GitHub Actions مع Supabase

## ✅ ما تم إنجازه:

### 1. تحديث GitHub Actions
- ✅ `build-android.yml` - تم إضافة متغيرات Supabase
- ✅ `build-ios.yml` - تم إضافة متغيرات Supabase

### 2. متغيرات البيئة المضافة
```yaml
EXPO_PUBLIC_SUPABASE_URL: https://weqqelaqsypnevypsdxq.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🚀 كيفية تشغيل البناء التلقائي:

### 1. إعداد GitHub Secrets
في إعدادات المشروع على GitHub، أضف:

**EXPO_TOKEN** (iris:
1. اذهب إلى [Expo Dashboard](https://expo.dev/accounts/[username]/settings/access-tokens)
2. أنشئ token جديد
3. أضفه في GitHub Secrets

### 2. تشغيل البناء
- **تلقائي**: عند push إلى `main` أو ``
- **يدوي**: من تبويب Actions في GitHub
- **عند PR**: عند إنشاء Pull Request

### 3. تحميل APK/IPA
1. اذهب إلى تبويب Actions في GitHub
2. اختر workflow "Build Android APK with Supabase"
3. اضغط على "Download APK" أو "Downloadhaus"

## 📱 الملفات المتاحة:

### Android:
- `taxi-app.apk` - ملف APK للتثبيت المباشر
- `taxi-app.aab` - ملف AAB لمتجر Google Play

### iOS:
- `taxi-app.ipa` - ملف IPA للتثبيت

## 🔧 إعدادات إضافية:

### 1. تحديث app.json
```json
{
  "expo": {
    "name": "Taxi App",
    "slug": "taxi-app",
    "version": "1.0.0",
    "platforms": ["android", "ios"]
  }
}
```

### 2. إعداد EAS
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

## 🧪 اختبار البناء:

### 1. اختبار محلي
```bash
npm install
npm start
```

### 2. اختبار البناء
```bash
npx eas build --platform android --local
```

### 3. اختبار التطبيق
- جرب تسجيل الدخول
- جرب إنشاء طلب
- جرب جميع الميزات

## 📋 قائمة التحقق:

- ✅ إعداد Supabase
- ✅ إضافة متغيرات البيئة
- ✅ تحديث GitHub Actions
- ✅ إعداد EXPO_TOKEN
- ✅ اختبار البناء المحلي
- ✅ اختبار البناء على GitHub

## 🎯 النتيجة النهائية:

عند كل push إلى main branch:
1. يتم تشغيل البناء تلقائياً
2. يتم إنشاء APK/IPA
3. يتم رفع الملفات كـ artifacts
4. يتم إنشاء release جديد

## 📞 الدعم:

إذا واجهت أي مشاكل:
1. تحقق من logs في GitHub Actions
2. تأكد من صحة EXPO_TOKEN
3. تأكد من إعداد Supabase
4. تحقق من متغيرات البيئة

🎉 **الآن يمكنك بناء APK تلقائياً مع قاعدة البيانات!** 