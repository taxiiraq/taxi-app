# GitHub Actions Workflows

هذا المجلد يحتوي على ملفات GitHub Actions لبناء واختبار التطبيق تلقائياً.

## 📋 Workflows المتاحة

### 1. Build Android APK
**الملف:** `.github/workflows/build-android.yml`

**الوظائف:**
- بناء ملف APK للأندرويد
- رفع الملف كـ artifact
- إنشاء release تلقائي على GitHub
- دعم ملفات APK و AAB

**متى يعمل:**
- عند push إلى main أو develop
- عند pull request إلى main
- يدوياً عبر workflow_dispatch

### 2. Build iOS
**الملف:** `.github/workflows/build-ios.yml`

**الوظائف:**
- بناء ملف IPA للـ iOS
- رفع الملف كـ artifact
- إنشاء release تلقائي على GitHub

**متى يعمل:**
- عند push إلى main أو develop
- عند pull request إلى main
- يدوياً عبر workflow_dispatch

### 3. Test Application
**الملف:** `.github/workflows/test.yml`

**الوظائف:**
- فحص TypeScript
- تشغيل ESLint
- تشغيل الاختبارات
- رفع تقارير التغطية

**متى يعمل:**
- عند push إلى main أو develop
- عند pull request إلى main
- يدوياً عبر workflow_dispatch

## 🔧 الإعداد المطلوب

### 1. إعداد Expo Token
```bash
# إنشاء Expo token
expo login
expo whoami
```

ثم أضف الـ token إلى GitHub Secrets:
1. اذهب إلى Settings > Secrets and variables > Actions
2. أضف `EXPO_TOKEN` مع قيمة الـ token

### 2. إعداد EAS
```bash
# تثبيت EAS CLI
npm install -g @expo/eas-cli

# تسجيل الدخول
eas login

# تهيئة المشروع
eas build:configure
```

## 📱 كيفية الاستخدام

### 1. بناء APK يدوياً
1. اذهب إلى Actions في GitHub
2. اختر "Build Android APK"
3. اضغط "Run workflow"
4. انتظر حتى يكتمل البناء
5. حمل الملف من Releases

### 2. بناء iOS يدوياً
1. اذهب إلى Actions في GitHub
2. اختر "Build iOS"
3. اضغط "Run workflow"
4. انتظر حتى يكتمل البناء
5. حمل الملف من Releases

### 3. مراقبة الاختبارات
1. اذهب إلى Actions في GitHub
2. شاهد نتائج "Test Application"
3. تحقق من تقارير التغطية

## 🚀 النشر التلقائي

عند push إلى main branch:
- يتم بناء APK و iOS تلقائياً
- يتم إنشاء release جديد
- يتم رفع الملفات للتحميل

## 📊 المراقبة

### Status Badges
أضف هذه الـ badges إلى README.md:

```markdown
![Build Android](https://github.com/username/repo/workflows/Build%20Android%20APK/badge.svg)
![Build iOS](https://github.com/username/repo/workflows/Build%20iOS/badge.svg)
![Test](https://github.com/username/repo/workflows/Test%20Application/badge.svg)
```

### Notifications
- GitHub سيرسل إشعارات عند فشل البناء
- يمكن إعداد Slack/Discord notifications

## 🔍 استكشاف الأخطاء

### مشاكل شائعة:
1. **فشل في بناء Android:**
   - تحقق من Expo token
   - تأكد من إعداد EAS

2. **فشل في بناء iOS:**
   - يتطلب macOS runner
   - تحقق من إعدادات iOS

3. **فشل في الاختبارات:**
   - تحقق من TypeScript errors
   - راجع ESLint warnings

## 📝 ملاحظات مهمة

- الملفات محفوظة لمدة 30 يوم
- Releases يتم إنشاؤها فقط من main branch
- يمكن تعديل retention period في الـ workflows 