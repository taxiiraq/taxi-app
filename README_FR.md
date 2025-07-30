# Application Taxi pour Mobile 📱

Une application React Native complète pour gérer les services de taxi et de livraison avec des interfaces séparées pour les clients, les chauffeurs et les administrateurs.

## 🚀 Fonctionnalités

### 🚗 Pour les Clients
- ✅ Connexion et création de compte
- ✅ Nouvelle demande de livraison
- ✅ Suivi du statut de commande
- ✅ Affichage des commandes précédentes
- ✅ Contact avec le chauffeur
- ✅ Support technique

### 🚘 Pour les Chauffeurs
- ✅ Connexion et création de compte
- ✅ Affichage des nouvelles commandes
- ✅ Accepter les commandes
- ✅ Gérer le statut de livraison
- ✅ Contact avec le client
- ✅ Support technique

### 👨‍💼 Pour les Administrateurs
- ✅ Tableau de bord complet
- ✅ Gestion des commandes
- ✅ Gestion des utilisateurs
- ✅ Gestion des chauffeurs
- ✅ Système de support technique

## 🛠 Technologies Utilisées

- **React Native** - Framework principal
- **Expo** - Plateforme de développement et déploiement
- **TypeScript** - Écriture de code sécurisé
- **React Navigation** - Navigation entre écrans
- **React Native Paper** - Composants d'interface
- **React Native Elements** - Composants supplémentaires

## 📱 Écrans Développés

### Écrans Client
1. **Écran de démarrage** - Logo de l'application et boutons de connexion/inscription
2. **Écran de connexion** - Connexion par email et mot de passe
3. **Écran d'inscription** - Création de nouveau compte avec sélection de rôle
4. **Écran d'accueil client** - Commandes précédentes et bouton nouvelle demande
5. **Écran de création de commande** - Saisie des détails de la nouvelle commande
6. **Écran de suivi de commande** - Statut de commande et informations du chauffeur

### Écrans Chauffeur
1. **Écran d'accueil chauffeur** - Nouvelles commandes et statut de connexion
2. **Écran de commande chauffeur** - Détails de commande et boutons de contrôle

### Écrans Administrateur
1. **Panneau d'administration** - Onglets pour gérer les commandes, utilisateurs, chauffeurs et support

### Écran de Support
- Interface pour envoyer des messages et demandes

## 🚀 Installation et Configuration

### Prérequis
- Node.js (version 16 ou plus récente)
- npm ou yarn
- Expo CLI

### Étapes d'Installation

1. Installer les dépendances:
```bash
npm install
```

2. Lancer l'application:
```bash
npm start
```

3. Ouvrir l'application sur votre téléphone:
- Installer l'application Expo Go sur votre téléphone
- Scanner le code QR qui apparaît dans le navigateur

## 📁 Structure du Projet

```
src/
├── screens/
│   ├── SplashScreen.tsx          # Écran de démarrage
│   ├── LoginScreen.tsx           # Écran de connexion
│   ├── RegisterScreen.tsx        # Écran d'inscription
│   ├── SupportScreen.tsx         # Écran de support
│   ├── customer/
│   │   ├── CustomerHomeScreen.tsx    # Écran d'accueil client
│   │   ├── CreateOrderScreen.tsx     # Écran de création de commande
│   │   └── TrackOrderScreen.tsx      # Écran de suivi de commande
│   ├── driver/
│   │   ├── DriverHomeScreen.tsx      # Écran d'accueil chauffeur
│   │   └── DriverOrderScreen.tsx     # Écran de commande chauffeur
│   └── admin/
│       └── AdminPanelScreen.tsx      # Panneau d'administration
└── types/
    └── index.ts                      # Types TypeScript
```

## 🗄 Schéma de Base de Données Suggéré

```sql
-- Table des utilisateurs
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

-- Table des commandes
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

-- Table des messages de support
CREATE TABLE support_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des notifications
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

## 🔔 Système de Notifications

### Pour les Clients:
- "Votre commande a été acceptée"
- "Le chauffeur a commencé la livraison"
- "Livraison terminée avec succès"

### Pour les Chauffeurs:
- "Nouvelle commande reçue"
- "Votre commande a été annulée"
- "Nouveaux détails de commande"

## 🌐 Déploiement sur Netlify

Pour l'application web (si le support web est ajouté):

1. Construire l'application:
```bash
npm run web:build
```

2. Télécharger le dossier `web-build` vers Netlify

## 🤝 Contribution

1. Fork le projet
2. Créer une nouvelle branche pour la fonctionnalité
3. Commiter les changements
4. Pousser vers la branche
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour obtenir de l'aide, veuillez contacter via:
- Email: support@taxi-app.com
- Téléphone: +966-XXX-XXXX

---

**Cette application a été développée en utilisant les dernières technologies et les meilleures pratiques en développement d'applications mobiles.** 