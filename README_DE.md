# Taxi-App für Mobilgeräte 📱

Eine umfassende React Native-Anwendung zur Verwaltung von Taxi- und Lieferdiensten mit separaten Schnittstellen für Kunden, Fahrer und Administratoren.

## 🚀 Funktionen

### 🚗 Für Kunden
- ✅ Anmeldung und Kontoerstellung
- ✅ Neue Lieferanfrage
- ✅ Auftragsstatus verfolgen
- ✅ Vorherige Aufträge anzeigen
- ✅ Kontakt mit Fahrer
- ✅ Technischer Support

### 🚘 Für Fahrer
- ✅ Anmeldung und Kontoerstellung
- ✅ Neue Aufträge anzeigen
- ✅ Aufträge annehmen
- ✅ Lieferstatus verwalten
- ✅ Kontakt mit Kunde
- ✅ Technischer Support

### 👨‍💼 Für Administratoren
- ✅ Umfassendes Dashboard
- ✅ Auftragsverwaltung
- ✅ Benutzerverwaltung
- ✅ Fahrerverwaltung
- ✅ Technisches Support-System

## 🛠 Verwendete Technologien

- **React Native** - Hauptframework
- **Expo** - Entwicklungs- und Bereitstellungsplattform
- **TypeScript** - Typsichere Codierung
- **React Navigation** - Bildschirmnavigation
- **React Native Paper** - UI-Komponenten
- **React Native Elements** - Zusätzliche Komponenten

## 📱 Entwickelte Bildschirme

### Kundenbildschirme
1. **Startbildschirm** - App-Logo und Anmelde-/Registrierungsbuttons
2. **Anmeldebildschirm** - E-Mail- und Passwort-Anmeldung
3. **Registrierungsbildschirm** - Neue Kontoerstellung mit Rollenauswahl
4. **Kunden-Hauptbildschirm** - Vorherige Aufträge und neue Anfrage-Button
5. **Auftragserstellungsbildschirm** - Eingabe neuer Auftragsdetails
6. **Auftragsverfolgungsbildschirm** - Auftragsstatus und Fahrerinformationen

### Fahrerbildschirme
1. **Fahrer-Hauptbildschirm** - Neue Aufträge und Verbindungsstatus
2. **Fahrer-Auftragsbildschirm** - Auftragsdetails und Steuerungsbuttons

### Administratorbildschirme
1. **Admin-Panel** - Tabs zur Verwaltung von Aufträgen, Benutzern, Fahrern und Support

### Support-Bildschirm
- Schnittstelle zum Senden von Nachrichten und Anfragen

## 🚀 Installation und Einrichtung

### Anforderungen
- Node.js (Version 16 oder höher)
- npm oder yarn
- Expo CLI

### Installationsschritte

1. Abhängigkeiten installieren:
```bash
npm install
```

2. Anwendung starten:
```bash
npm start
```

3. App auf Ihrem Telefon öffnen:
- Expo Go-App auf Ihrem Telefon installieren
- QR-Code scannen, der im Browser angezeigt wird

## 📁 Projektstruktur

```
src/
├── screens/
│   ├── SplashScreen.tsx          # Startbildschirm
│   ├── LoginScreen.tsx           # Anmeldebildschirm
│   ├── RegisterScreen.tsx        # Registrierungsbildschirm
│   ├── SupportScreen.tsx         # Support-Bildschirm
│   ├── customer/
│   │   ├── CustomerHomeScreen.tsx    # Kunden-Hauptbildschirm
│   │   ├── CreateOrderScreen.tsx     # Auftragserstellungsbildschirm
│   │   └── TrackOrderScreen.tsx      # Auftragsverfolgungsbildschirm
│   ├── driver/
│   │   ├── DriverHomeScreen.tsx      # Fahrer-Hauptbildschirm
│   │   └── DriverOrderScreen.tsx     # Fahrer-Auftragsbildschirm
│   └── admin/
│       └── AdminPanelScreen.tsx      # Admin-Panel
└── types/
    └── index.ts                      # TypeScript-Typen
```

## 🗄 Vorgeschlagenes Datenbankschema

```sql
-- Benutzer-Tabelle
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

-- Auftrags-Tabelle
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

-- Support-Nachrichten-Tabelle
CREATE TABLE support_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Benachrichtigungs-Tabelle
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

## 🔔 Benachrichtigungssystem

### Für Kunden:
- "Ihr Auftrag wurde angenommen"
- "Fahrer hat mit der Lieferung begonnen"
- "Lieferung erfolgreich abgeschlossen"

### Für Fahrer:
- "Neuer Auftrag erhalten"
- "Ihr Auftrag wurde storniert"
- "Neue Auftragsdetails"

## 🌐 Bereitstellung auf Netlify

Für die Web-App (falls Web-Support hinzugefügt wird):

1. Anwendung erstellen:
```bash
npm run web:build
```

2. Ordner `web-build` zu Netlify hochladen

## 🤝 Beitrag

1. Projekt forken
2. Neuen Feature-Branch erstellen
3. Änderungen committen
4. Zu Branch pushen
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

## 📞 Support

Für Support kontaktieren Sie bitte über:
- E-Mail: support@taxi-app.com
- Telefon: +966-XXX-XXXX

---

**Diese Anwendung wurde mit den neuesten Technologien und bewährten Praktiken in der mobilen App-Entwicklung entwickelt.** 