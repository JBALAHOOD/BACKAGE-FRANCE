# Contrôle des Bagages

Une application web moderne pour vérifier la conformité des bagages selon les règles des compagnies aériennes.

## 🚀 Fonctionnalités

- **Recherche de compagnies aériennes** : Base de données de 100+ compagnies aériennes internationales
- **Vérification des bagages** : Contrôle automatique des dimensions et poids
- **Interface intuitive** : Design moderne et responsive avec Tailwind CSS
- **Multilingue** : Interface en français
- **Temps réel** : Vérification instantanée de la conformité

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript moderne
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation côté client
- **Lucide React** - Icônes modernes

## 📦 Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/controle-bagages.git
cd controle-bagages
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse `http://localhost:5173`

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.jsx      # Layout principal
│   └── ui/             # Composants UI de base
├── pages/              # Pages de l'application
│   ├── Home.jsx        # Page d'accueil
│   └── Verification.jsx # Page de vérification
├── lib/                # Utilitaires et données
│   └── utils.js        # Fonctions utilitaires et données des compagnies
└── App.jsx             # Composant racine
```

## 🎯 Utilisation

1. **Page d'accueil** : Recherchez votre compagnie aérienne parmi plus de 100 options
2. **Vérification** : Sélectionnez le type de bagage et saisissez les dimensions/poids
3. **Résultat** : Obtenez instantanément la conformité de votre bagage

## 🌍 Compagnies aériennes supportées

L'application inclut les règles de bagages pour plus de 100 compagnies aériennes internationales :
- Compagnies européennes (Air France, Lufthansa, Ryanair, etc.)
- Compagnies du Moyen-Orient (Emirates, Qatar Airways, etc.)
- Compagnies asiatiques (Singapore Airlines, ANA, etc.)
- Compagnies américaines (American Airlines, Delta, etc.)
- Et bien d'autres...

## 🚀 Déploiement

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour simplifier vos voyages**