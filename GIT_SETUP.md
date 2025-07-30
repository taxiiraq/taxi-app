# إعداد Git ورفع المشروع إلى GitHub

## 🚀 الخطوات المطلوبة:

### 1. تهيئة Git
```bash
git init
```

### 2. إضافة الملفات
```bash
git add .
```

### 3. عمل commit أولي
```bash
git commit -m "Initial commit: Taxi app with Supabase integration"
```

### 4. ربط المستودع المحلي بـ GitHub
```bash
git remote add origin https://github.com/taxiiraq/taxi-app.git
```

### 5. رفع الكود
```bash
git push -u origin main
```

## 📋 قائمة التحقق:

### قبل الرفع:
- ✅ إعداد Supabase
- ✅ إضافة EXPO_TOKEN إلى GitHub Secrets
- ✅ تحديث GitHub Actions
- ✅ اختبار التطبيق محلياً

### بعد الرفع:
- ✅ سيتم تشغيل GitHub Actions تلقائياً
- ✅ سيتم بناء APK مع قاعدة البيانات
- ✅ سيتم رفع الملفات كـ artifacts

## 🎯 النتيجة النهائية:

1. **عند push إلى main branch:**
   - سيتم تشغيل "Build Android APK with Supabase"
   - سيتم إنشاء APK مع قاعدة البيانات
   - سيتم رفع الملفات للتحميل

2. **تحميل APK:**
   - اذهب إلى تبويب Actions في GitHub
   - اختر workflow "Build Android APK with Supabase"
   - اضغط على "Download APK"

## 🔧 إعدادات إضافية:

### إذا لم يكن لديك branch main:
```bash
git branch -M main
```

### إذا واجهت مشاكل في الرفع:
```bash
git pull origin main --allow-unrelated-histories
```

## 📞 الدعم:

إذا واجهت أي مشاكل:
1. تأكد من إعداد EXPO_TOKEN في GitHub Secrets
2. تحقق من logs في GitHub Actions
3. تأكد من إعداد Supabase

🎉 **بعد اتباع هذه الخطوات، سيتم بناء APK تلقائياً مع قاعدة البيانات!** 