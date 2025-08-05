# 🔧 دليل حل المشاكل

## 🚨 مشاكل شائعة وحلولها

### 1. التطبيق يخرج عند الفتح

**الأسباب المحتملة:**
- مشكلة في الاتصال بـ Supabase
- خطأ في إعدادات الموقع
- مشكلة في التبعيات

**الحلول:**
```bash
# 1. امسح cache
npm start -- --reset-cache

# 2. أعد تثبيت التبعيات
rm -rf node_modules
npm install

# 3. تحقق من إعدادات الموقع
# تأكد من تفعيل GPS والموقع في إعدادات الهاتف
```

### 2. الخريطة لا تظهر

**الأسباب المحتملة:**
- مشكلة في اتصال الإنترنت
- خطأ في إعدادات OpenStreetMap
- مشكلة في مكون الخريطة

**الحلول:**
```bash
# 1. تحقق من اتصال الإنترنت
# 2. تأكد من تثبيت react-native-maps
npm install react-native-maps

# 3. أعد تشغيل التطبيق
```

### 3. فشل في بناء APK

**الأسباب المحتملة:**
- خطأ في babel.config.js
- مشكلة في التبعيات
- خطأ في إعدادات Metro

**الحلول:**
```bash
# 1. تحقق من babel.config.js
# تأكد من أنه يحتوي فقط على:
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};

# 2. امسح cache
npx expo start --clear

# 3. أعد تثبيت التبعيات
npm install
```

### 4. مشكلة في تسجيل الدخول

**الأسباب المحتملة:**
- مشكلة في الاتصال بـ Supabase
- خطأ في بيانات تسجيل الدخول
- مشكلة في AuthContext

**الحلول:**
```bash
# 1. تحقق من إعدادات Supabase
# تأكد من صحة URL و API Key

# 2. جرب تسجيل دخول المدير:
# البريد: nmcmilli07@gmail.com
# كلمة المرور: admin123

# 3. تحقق من اتصال الإنترنت
```

### 5. مشكلة في التثبيت على الهاتف

**الأسباب المحتملة:**
- إعدادات الأمان في الأندرويد
- مساحة غير كافية
- مشكلة في APK

**الحلول:**
```
1. تفعيل "مصادر غير معروفة" في إعدادات الأندرويد
2. تأكد من وجود مساحة كافية (500MB على الأقل)
3. أعد تشغيل الهاتف
4. جرب تثبيت APK آخر
```

### 6. مشكلة في الموقع

**الأسباب المحتملة:**
- عدم تفعيل GPS
- مشكلة في إذن الموقع
- مشكلة في expo-location

**الحلول:**
```
1. تأكد من تفعيل GPS
2. امنح إذن الموقع للتطبيق
3. تحقق من إعدادات الموقع في الهاتف
4. أعد تشغيل التطبيق
```

## 🔍 تشخيص المشاكل

### فحص الأخطاء في التطوير:
```bash
# تشغيل مع عرض الأخطاء
npx expo start --dev-client

# فحص TypeScript
npx tsc --noEmit

# فحص ESLint
npx eslint src/
```

### فحص الأخطاء في البناء:
```bash
# بناء مع عرض التفاصيل
cd android && ./gradlew assembleRelease --info

# فحص التبعيات
npm ls
```

## 📱 اختبار التطبيق

### اختبار محلي:
```bash
# تشغيل على المحاكي
npx expo start

# تشغيل على الهاتف
npx expo start --tunnel
```

### اختبار البناء:
```bash
# بناء APK
cd android && ./gradlew assembleRelease

# فحص حجم APK
ls -la app/build/outputs/apk/release/
```

## 🛠️ أدوات مفيدة

### تنظيف المشروع:
```bash
# مسح cache
npm start -- --reset-cache

# إعادة تثبيت التبعيات
rm -rf node_modules package-lock.json
npm install

# تنظيف Android
cd android && ./gradlew clean
```

### فحص الإعدادات:
```bash
# فحص إعدادات Expo
npx expo doctor

# فحص التبعيات
npm audit

# فحص TypeScript
npx tsc --noEmit
```

## 📞 الحصول على المساعدة

### إذا لم تحل المشكلة:
1. **تحقق من السجلات:**
   - Android: `adb logcat`
   - iOS: Xcode Console

2. **ابحث في الإنترنت:**
   - Stack Overflow
   - React Native GitHub Issues
   - Expo Documentation

3. **اطلب المساعدة:**
   - استخدم ميزة "الدعم الفني" في التطبيق
   - ارفع المشكلة على GitHub Issues

## ✅ قائمة التحقق

قبل طلب المساعدة، تأكد من:

- [ ] تم تثبيت جميع التبعيات
- [ ] تم مسح cache
- [ ] تم إعادة تشغيل التطبيق
- [ ] تم فحص اتصال الإنترنت
- [ ] تم تفعيل GPS والموقع
- [ ] تم فحص إعدادات الأمان في الأندرويد
- [ ] تم تجربة الحلول المذكورة أعلاه

---

**تذكر: معظم المشاكل يمكن حلها بإعادة تشغيل التطبيق أو مسح cache!** 🔄 