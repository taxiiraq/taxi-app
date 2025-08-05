export default {
  expo: {
    name: "تطبيق التاكسي",
    slug: "taxi-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    // إعدادات إضافية للاستقرار
    jsEngine: "hermes",
    android: {
      enableProguardInReleaseBuilds: false,
      enableSeparateBuildPerCPUArchitecture: false,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.taxiapp.app",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ],
      // 🆓 إعدادات الخرائط المجانية
      // لا تحتاج مفتاح API - يعمل مع OpenStreetMap
      config: {
        // يمكنك إضافة مفتاح Google Maps هنا إذا أردت
        // googleMaps: {
        //   apiKey: "YOUR_GOOGLE_MAPS_API_KEY_HERE"
        // }
      }
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.taxiapp.app",
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "يحتاج التطبيق إلى الوصول إلى موقعك لتتبع الطلبات وتوجيه السائقين",
        NSLocationAlwaysAndWhenInUseUsageDescription: "يحتاج التطبيق إلى الوصول إلى موقعك لتتبع الطلبات وتوجيه السائقين"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "يحتاج التطبيق إلى الوصول إلى موقعك لتتبع الطلبات وتوجيه السائقين"
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "your-project-id"
      }
    }
  }
}; 