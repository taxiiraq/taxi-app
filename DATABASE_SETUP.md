# 🔧 إعداد قاعدة البيانات

## 📋 الجداول المطلوبة

### 1. جدول المستخدمين (`users`)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('customer', 'driver', 'admin')) NOT NULL DEFAULT 'customer',
    status VARCHAR(20) CHECK (status IN ('active', 'banned', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. جدول الطلبات (`orders`)
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
    pickup_address TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    description TEXT,
    notes TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. جدول رسائل الدعم (`support_messages`)
```sql
CREATE TABLE support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. جدول الإشعارات (`notifications`)
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('order_accepted', 'order_started', 'order_completed', 'new_order', 'order_cancelled')) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 خطوات الإعداد

### 1. إنشاء مشروع Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. احفظ `URL` و `anon key`

### 2. تشغيل ملف SQL
1. اذهب إلى SQL Editor في Supabase
2. انسخ محتوى ملف `supabase/setup-database.sql`
3. اضغط Run لتنفيذ الكود
4. إذا ظهر خطأ "trigger already exists"، لا تقلق - هذا يعني أن الجداول موجودة بالفعل
5. يمكنك تشغيل ملف `supabase/test-database.sql` للتحقق من أن كل شيء يعمل بشكل صحيح

### 3. تحديث إعدادات التطبيق
1. افتح `src/lib/supabase.ts`
2. تأكد من أن `supabaseUrl` و `supabaseAnonKey` صحيحان

## 🔑 تسجيل دخول المدير
- **البريد:** `nmcmilli07@gmail.com`
- **كلمة المرور:** `admin123`

## 🛠️ حل المشاكل

### إذا فشل تسجيل الدخول:
1. تأكد من تشغيل ملف SQL بنجاح
2. تحقق من إعدادات Supabase
3. تأكد من وجود الجداول في قاعدة البيانات

### إذا فشل إنشاء حساب جديد:
1. تحقق من RLS policies
2. تأكد من وجود trigger `on_auth_user_created`
3. تحقق من logs في Supabase

## 📊 فحص الجداول
```sql
-- فحص وجود الجداول
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- فحص المستخدمين
SELECT * FROM users;

-- فحص الطلبات
SELECT * FROM orders;
```

## 🔒 إعدادات الأمان
- تم تفعيل RLS على جميع الجداول
- تم إنشاء policies مناسبة لكل جدول
- المدير يمكنه الوصول لجميع البيانات
- المستخدمون العاديون يمكنهم الوصول لبياناتهم فقط

---

**ملاحظة:** تأكد من تشغيل ملف `setup-database.sql` قبل استخدام التطبيق! 