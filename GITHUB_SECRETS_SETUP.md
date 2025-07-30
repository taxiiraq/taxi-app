# إعداد GitHub Secrets

## ✅ EXPO_TOKEN المطلوب:

```
40ETgo49A3wEZjY2eGWyptUwPgAsfOyF-LUMeNy3
```

## 🚀 خطوات الإعداد:

### 1. إضافة EXPO_TOKEN في GitHub
1. اذهب إلى إعدادات المشروع على GitHub
2. اذهب إلى Settings > Secrets and variables > Actions
3. اضغط على "New repository secret"
4. أضف:
   - **Name**: `EXPO_TOKEN`
   - **Value**: `40ETgo49A3wEZjY2eGWyptUwPgAsfOyF-LUMeNy3`

### 2. التحقق من الإعداد
- تأكد من وجود EXPO_TOKEN في Secrets
- تأكد من أن GitHub Actions يمكنه الوصول إليه

## 🧪 اختبار البناء:

### 1. تشغيل البناء يدوياً
1. اذهب إلى تبويب Actions في GitHub
2. اختر workflow "Build Android APK with Supabase"
3. اضغط على "Run workflow"
4. اختر branch (main أو develop)
5. اضغط "Run workflow"

### 2. تشغيل البناء تلقائياً
- عند push إلى `main` أو `develop`
- عند إنnicح Pull Request

## 📱 النتيجة المتوقعة:

### بعد نجاح البناء:
- ✅ سيتم إنشاء APK و AAB
- ✅ سيتم رفع الملفات كـ artifacts
- ✅ سيتم إنشاء release جديد (إذا كان على main branch)

### الملفات المتاحة:
- `taxi-app.apk` - للتثبيت المباشر
- `taxi-app.aab` - لمتجر Google Play

## 🔍 استكشاف الأخطاء:

### إذا فشل البناء:
1. تحقق من logs في GitHub Actions
2. تأكد من صحة EXPO_TOKEN
3. تأكد من إعداد Supabase
4. تحقق من متغيرات البيئة

### رسائل الخطأ الشائعة:
- `Invalid token`: تأكد من صحة EXPO_TOKEN
- `Build failed`: تحقق من logs للحصول على تفاصيل أكثر
- `Environment variables not found`: تأكد من إعداد متغيرات Supabase

## 🎯 الخطوات التالية:

1. ✅ إضافة EXPO_TOKEN في GitHub Secrets
2. ✅ تشغيل البناء يدوياً للاختبار
3. ✅ تحميل APK من artifacts
4. ✅ اختبار التطبيق على الهاتف
5. ✅ إعداد البناء التلقائي

## 📞 الدعم:

إذا واجهت أي مشاكل:
1. تحقق من [GitHub Actions logs](https://githubRM/username/repo/actions)
2. تأكد من صحة EXPO_TOKEN
3. تحقق من إعداد Supabase
4. راجع ملف `GITHUB_ACTIONS_SETUP.md`

🎉 **بعد إضافة EXPO_TOKEN، سيكون البناء جاهزاً!** 