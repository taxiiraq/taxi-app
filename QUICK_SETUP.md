# إعداد سريع للتطبيق

## الخطوات الأساسية:

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. إعداد Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. انسخ Project URL و anon key
4. اذهب إلى SQL Editor
5. انسخ محتوى `supabase/schema.sql` واشغله

### 3. إعداد متغيرات البيئة
أنشئ ملف `.env` وأضف:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. تشغيل التطبيق
```bash
npm start
```

## اختبار التطبيق:
1. سجل حساب جديد كعميل
2. سجل حساب جديد كسائق
3. جرب إنشاء طلب
4. جرب قبول الطلب كسائق

## الملفات المهمة:
- `supabase/schema.sql` - هيكل قاعدة البيانات
- `src/lib/supabase.ts` - إعداد Supabase
- `src/services/database.ts` - خدمات قاعدة البيانات
- `src/contexts/AuthContext.tsx` - إدارة المصادقة

## استكشاف الأخطاء:
- تأكد من صحة URL و API Key
- تأكد من تشغيل schema.sql بنجاح
- تحقق من تفعيل Email Auth في Supabase 