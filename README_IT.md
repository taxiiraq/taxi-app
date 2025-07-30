# App Taxi per Mobile 📱

Un'applicazione React Native completa per gestire servizi di taxi e consegna con interfacce separate per clienti, autisti e amministratori.

## 🚀 Funzionalità

### 🚗 Per i Clienti
- ✅ Accesso e creazione account
- ✅ Nuova richiesta di consegna
- ✅ Tracciamento stato ordine
- ✅ Visualizzazione ordini precedenti
- ✅ Contatto con autista
- ✅ Supporto tecnico

### 🚘 Per gli Autisti
- ✅ Accesso e creazione account
- ✅ Visualizzazione nuovi ordini
- ✅ Accettazione ordini
- ✅ Gestione stato consegna
- ✅ Contatto con cliente
- ✅ Supporto tecnico

### 👨‍💼 Per gli Amministratori
- ✅ Dashboard completo
- ✅ Gestione ordini
- ✅ Gestione utenti
- ✅ Gestione autisti
- ✅ Sistema supporto tecnico

## 🛠 Tecnologie Utilizzate

- **React Native** - Framework principale
- **Expo** - Piattaforma di sviluppo e distribuzione
- **TypeScript** - Scrittura codice sicuro
- **React Navigation** - Navigazione tra schermate
- **React Native Paper** - Componenti interfaccia
- **React Native Elements** - Componenti aggiuntivi

## 📱 Schermate Sviluppate

### Schermate Cliente
1. **Schermata iniziale** - Logo app e pulsanti accesso/registrazione
2. **Schermata accesso** - Accesso con email e password
3. **Schermata registrazione** - Creazione nuovo account con selezione ruolo
4. **Schermata principale cliente** - Ordini precedenti e pulsante nuova richiesta
5. **Schermata creazione ordine** - Inserimento dettagli nuovo ordine
6. **Schermata tracciamento ordine** - Stato ordine e informazioni autista

### Schermate Autista
1. **Schermata principale autista** - Nuovi ordini e stato connessione
2. **Schermata ordine autista** - Dettagli ordine e pulsanti controllo

### Schermate Amministratore
1. **Pannello amministrazione** - Tab per gestire ordini, utenti, autisti e supporto

### Schermata Supporto
- Interfaccia per inviare messaggi e richieste

## 🚀 Installazione e Configurazione

### Requisiti
- Node.js (versione 16 o successiva)
- npm o yarn
- Expo CLI

### Passi di Installazione

1. Installare dipendenze:
```bash
npm install
```

2. Avviare l'applicazione:
```bash
npm start
```

3. Aprire l'app sul telefono:
- Installare app Expo Go sul telefono
- Scansionare codice QR che appare nel browser

## 📁 Struttura Progetto

```
src/
├── screens/
│   ├── SplashScreen.tsx          # Schermata iniziale
│   ├── LoginScreen.tsx           # Schermata accesso
│   ├── RegisterScreen.tsx        # Schermata registrazione
│   ├── SupportScreen.tsx         # Schermata supporto
│   ├── customer/
│   │   ├── CustomerHomeScreen.tsx    # Schermata principale cliente
│   │   ├── CreateOrderScreen.tsx     # Schermata creazione ordine
│   │   └── TrackOrderScreen.tsx      # Schermata tracciamento ordine
│   ├── driver/
│   │   ├── DriverHomeScreen.tsx      # Schermata principale autista
│   │   └── DriverOrderScreen.tsx     # Schermata ordine autista
│   └── admin/
│       └── AdminPanelScreen.tsx      # Pannello amministrazione
└── types/
    └── index.ts                      # Tipi TypeScript
```

## 🗄 Schema Database Suggerito

```sql
-- Tabella utenti
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

-- Tabella ordini
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

-- Tabella messaggi supporto
CREATE TABLE support_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabella notifiche
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

## 🔔 Sistema Notifiche

### Per Clienti:
- "Il tuo ordine è stato accettato"
- "L'autista ha iniziato la consegna"
- "Consegna completata con successo"

### Per Autisti:
- "Nuovo ordine ricevuto"
- "Il tuo ordine è stato cancellato"
- "Nuovi dettagli ordine"

## 🌐 Deploy su Netlify

Per l'app web (se viene aggiunto il supporto web):

1. Costruire l'applicazione:
```bash
npm run web:build
```

2. Caricare la cartella `web-build` su Netlify

## 🤝 Contribuzione

1. Fork del progetto
2. Creare nuovo branch per la funzionalità
3. Commit delle modifiche
4. Push al branch
5. Creare Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT.

## 📞 Supporto

Per supporto, contattare via:
- Email: support@taxi-app.com
- Telefono: +966-XXX-XXXX

---

**Questa applicazione è stata sviluppata utilizzando le ultime tecnologie e le migliori pratiche nello sviluppo di applicazioni mobili.** 