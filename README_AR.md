# تطبيق التاكسي للهاتف 📱

تطبيق React Native شامل لإدارة خدمات التوصيل والتاكسي مع واجهات منفصلة للزبائن والسواق والمشرفين.

## 🚀 المميزات

### 🚗 للزبائن
- ✅ تسجيل الدخول وإنشاء حساب
- ✅ طلب توصيل جديد
- ✅ تتبع حالة الطلب
- ✅ عرض الطلبات السابقة
- ✅ التواصل مع السائق
- ✅ دعم فني

### 🚘 للسواق
- ✅ تسجيل الدخول وإنشاء حساب
- ✅ عرض الطلبات الجديدة
- ✅ قبول الطلبات
- ✅ إدارة حالة التوصيل
- ✅ التواصل مع الزبون
- ✅ دعم فني

### 👨‍💼 للمشرفين
- ✅ لوحة تحكم شاملة
- ✅ إدارة الطلبات
- ✅ إدارة المستخدمين
- ✅ إدارة السواق
- ✅ نظام الدعم الفني

## 🛠 التقنيات المستخدمة

- **React Native** - إطار العمل الأساسي
- **Expo** - منصة التطوير والنشر
- **TypeScript** - لكتابة الكود الآمن
- **React Navigation** - للتنقل بين الشاشات
- **React Native Paper** - لمكونات الواجهة
- **React Native Elements** - لمكونات إضافية

## 📱 الشاشات المطورة

### شاشات الزبون
1. **شاشة البداية** - شعار التطبيق وأزرار تسجيل الدخول وإنشاء الحساب
2. **شاشة تسجيل الدخول** - تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
3. **شاشة إنشاء الحساب** - إنشاء حساب جديد مع اختيار الدور
4. **الشاشة الرئيسية للزبون** - عرض الطلبات السابقة وزر طلب جديد
5. **شاشة إنشاء طلب** - إدخال تفاصيل الطلب الجديد
6. **شاشة تتبع الطلب** - عرض حالة الطلب وبيانات السائق

### شاشات السائق
1. **الشاشة الرئيسية للسائق** - عرض الطلبات الجديدة وحالة الاتصال
2. **شاشة الطلب الحالي** - تفاصيل الطلب وأزرار التحكم

### شاشات المشرف
1. **لوحة التحكم** - تبويبات لإدارة الطلبات والمستخدمين والسواق والدعم الفني

### شاشة الدعم الفني
- واجهة لإرسال الرسائل والاستفسارات

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js (الإصدار 16 أو أحدث)
- npm أو yarn
- Expo CLI

### خطوات التثبيت

1. تثبيت التبعيات:
```bash
npm install
```

2. تشغيل التطبيق:
```bash
npm start
```

3. فتح التطبيق على الهاتف:
- تثبيت تطبيق Expo Go على الهاتف
- مسح رمز QR الذي يظهر في المتصفح

## 🔄 بناء التطبيق تلقائياً

### GitHub Actions
تم إعداد workflows تلقائية لبناء التطبيق:

1. **بناء APK للأندرويد:**
   - يتم تلقائياً عند push إلى main
   - يمكن تشغيله يدوياً من Actions
   - ينتج ملفات APK و AAB

2. **بناء iOS:**
   - يتم تلقائياً عند push إلى main
   - ينتج ملف IPA للـ iOS

3. **اختبار التطبيق:**
   - فحص TypeScript
   - تشغيل ESLint
   - اختبارات شاملة

### كيفية الاستخدام:
1. ارفع الكود إلى GitHub
2. اذهب إلى Actions
3. شغل workflow "Build Android APK"
4. انتظر حتى يكتمل البناء
5. حمل الملف من Releases

### إعداد مطلوب:
```bash
# إعداد Expo token
expo login
expo whoami

# إعداد EAS
npm install -g @expo/eas-cli
eas login
eas build:configure
```

ثم أضف `EXPO_TOKEN` إلى GitHub Secrets.

## 📁 هيكل المشروع

```
src/
├── screens/
│   ├── SplashScreen.tsx          # شاشة البداية
│   ├── LoginScreen.tsx           # شاشة تسجيل الدخول
│   ├── RegisterScreen.tsx        # شاشة إنشاء الحساب
│   ├── SupportScreen.tsx         # شاشة الدعم الفني
│   ├── customer/
│   │   ├── CustomerHomeScreen.tsx    # الشاشة الرئيسية للزبون
│   │   ├── CreateOrderScreen.tsx     # شاشة إنشاء طلب
│   │   └── TrackOrderScreen.tsx      # شاشة تتبع الطلب
│   ├── driver/
│   │   ├── DriverHomeScreen.tsx      # الشاشة الرئيسية للسائق
│   │   └── DriverOrderScreen.tsx     # شاشة الطلب الحالي
│   └── admin/
│       └── AdminPanelScreen.tsx      # لوحة تحكم المشرف
└── types/
    └── index.ts                      # أنواع TypeScript
```

## 🗄 قاعدة البيانات المقترحة

```sql
-- جدول المستخدمين
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('customer', 'driver', 'admin') NOT NULL,
    status ENUM('active', 'banned', 'inactive') DEFAULT 'active',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الطلبات
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    driver_id VARCHAR(255),
    address TEXT NOT NULL,
    description TEXT NOT NULL,
    notes TEXT,
    status ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);

-- جدول رسائل الدعم
CREATE TABLE support_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- جدول الإشعارات
CREATE TABLE notifications (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('order_accepted', 'order_started', 'order_completed', 'new_order', 'order_cancelled') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔔 نظام الإشعارات

### للزبون:
- "طلبك تم قبوله"
- "السائق بدأ التوصيل"
- "تم التوصيل بنجاح"

### للسائق:
- "وصلك طلب جديد"
- "طلبك تم إلغاؤه"
- "تفاصيل جديدة للطلب"

## 🌐 النشر على Netlify

لتطبيق الويب (إذا تم إضافة دعم الويب):

1. بناء التطبيق:
```bash
npm run web:build
```

2. رفع مجلد `web-build` إلى Netlify

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع جديد للميزة
3. Commit التغييرات
4. Push إلى الفرع
5. إنشاء Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 📞 الدعم

للحصول على الدعم، يرجى التواصل عبر:
- البريد الإلكتروني: support@taxi-app.com
- الهاتف: +966-XXX-XXXX

---

**تم تطوير هذا التطبيق باستخدام أحدث التقنيات وأفضل الممارسات في تطوير تطبيقات الهاتف المحمول.** 