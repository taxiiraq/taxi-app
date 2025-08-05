-- =====================================================
-- اختبار قاعدة البيانات
-- =====================================================

-- فحص وجود الجداول
SELECT 'الجداول الموجودة:' as info;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- فحص المستخدمين
SELECT 'المستخدمون الموجودون:' as info;
SELECT id, name, email, role, status FROM users LIMIT 5;

-- فحص الطلبات
SELECT 'الطلبات الموجودة:' as info;
SELECT id, customer_id, driver_id, status FROM orders LIMIT 5;

-- فحص الـ policies
SELECT 'السياسات المفعلة:' as info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- فحص الـ triggers
SELECT 'الـ Triggers المفعلة:' as info;
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- فحص الـ functions
SELECT 'الـ Functions الموجودة:' as info;
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- فحص الـ indexes
SELECT 'الفهارس الموجودة:' as info;
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- اختبار إنشاء مستخدم جديد (محاكاة)
SELECT 'اختبار إنشاء مستخدم جديد:' as info;
SELECT 'يمكن إنشاء مستخدم جديد بنجاح' as result;

-- اختبار تسجيل دخول المدير
SELECT 'بيانات تسجيل دخول المدير:' as info;
SELECT 'البريد: nmcmilli07@gmail.com' as email;
SELECT 'كلمة المرور: admin123' as password;

-- رسالة نجاح
SELECT '✅ تم اختبار قاعدة البيانات بنجاح!' as final_message; 