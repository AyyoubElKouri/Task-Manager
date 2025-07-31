# Standards de Documentation et Commentaires React

## 1. Principes Généraux

### 1.1 Objectifs
- Assurer la lisibilité et la maintenabilité du code
- Faciliter la collaboration entre développeurs
- Documenter les décisions techniques et la logique métier
- Permettre la génération automatique de documentation

### 1.2 Règles de Base
- **Langue** : Français pour les commentaires métier, anglais pour les termes techniques
- **Clarté** : Les commentaires doivent expliquer le "pourquoi", pas le "quoi"
- **Mise à jour** : Les commentaires doivent être maintenus à jour avec le code
- **Concision** : Éviter les commentaires redondants ou évidents

## 2. Documentation des Composants React

### 2.1 Structure Standard d'un Composant

```typescript
/**
 * Composant de carte produit affichant les informations essentielles d'un produit
 * 
 * @description Ce composant gère l'affichage d'une carte produit avec image, titre, prix
 * et actions utilisateur. Il inclut la gestion des états de chargement et d'erreur.
 * 
 * @example
 * ```tsx
 * <ProductCard 
 *   product={productData} 
 *   onAddToCart={(id) => handleAddToCart(id)}
 *   variant="compact"
 * />
 * ```
 * 
 * @version 1.2.0
 * @since 2024-01-15
 * @author Équipe Frontend
 */
interface ProductCardProps {
  /** Données du produit à afficher */
  product: Product;
  /** Callback appelé lors de l'ajout au panier */
  onAddToCart?: (productId: string) => void;
  /** Variante d'affichage de la carte */
  variant?: 'default' | 'compact' | 'detailed';
  /** Indique si le composant est en mode chargement */
  loading?: boolean;
  /** Classes CSS additionnelles */
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  variant = 'default',
  loading = false,
  className
}) => {
  // États locaux
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Gestion de l'ajout au panier avec validation
  const handleAddToCart = useCallback(() => {
    if (!product.available) {
      toast.error('Produit non disponible');
      return;
    }
    
    onAddToCart?.(product.id);
  }, [product.id, product.available, onAddToCart]);

  // Rendu conditionnel pour le mode chargement
  if (loading) {
    return <ProductCardSkeleton />;
  }

  return (
    // JSX du composant...
  );
};

export default ProductCard;
```

### 2.2 Headers de Composants

Chaque composant doit commencer par un header JSDoc contenant :

```typescript
/**
 * [Titre court du composant]
 * 
 * @description [Description détaillée du rôle et du comportement]
 * 
 * @example
 * ```tsx
 * [Exemple d'utilisation simple]
 * ```
 * 
 * @version [Version actuelle]
 * @since [Date de création]
 * @author [Nom de l'équipe/développeur]
 * @see [Liens vers documentation externe si nécessaire]
 */
```

## 3. Documentation des Interfaces et Types

### 3.1 Interfaces

```typescript
/**
 * Interface définissant la structure d'un utilisateur dans l'application
 * 
 * @interface User
 * @description Représente un utilisateur avec ses informations personnelles,
 * ses préférences et son statut dans l'application.
 */
interface User {
  /** Identifiant unique de l'utilisateur */
  id: string;
  
  /** Nom complet de l'utilisateur */
  fullName: string;
  
  /** Adresse email (doit être unique) */
  email: string;
  
  /** URL de l'avatar utilisateur (optionnel) */
  avatar?: string;
  
  /** Date de création du compte */
  createdAt: Date;
  
  /** Date de dernière connexion */
  lastLogin?: Date;
  
  /** Rôle de l'utilisateur dans l'application */
  role: UserRole;
  
  /** Préférences utilisateur */
  preferences: UserPreferences;
  
  /** Indique si le compte est actif */
  isActive: boolean;
}
```

### 3.2 Types et Énumérations

```typescript
/**
 * Types de rôles utilisateur disponibles dans l'application
 * 
 * @description Définit les différents niveaux d'accès et permissions
 * - admin: Accès complet à toutes les fonctionnalités
 * - moderator: Gestion du contenu et modération
 * - user: Utilisateur standard avec accès limité
 * - guest: Accès en lecture seule
 */
type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

/**
 * États possibles d'une commande
 */
enum OrderStatus {
  /** Commande en attente de traitement */
  PENDING = 'pending',
  /** Commande confirmée et en préparation */
  CONFIRMED = 'confirmed',
  /** Commande expédiée */
  SHIPPED = 'shipped',
  /** Commande livrée */
  DELIVERED = 'delivered',
  /** Commande annulée */
  CANCELLED = 'cancelled'
}
```

## 4. Documentation des Hooks Personnalisés

### 4.1 Structure Standard

```typescript
/**
 * Hook personnalisé pour la gestion des données utilisateur
 * 
 * @description Ce hook encapsule la logique de récupération, mise à jour
 * et gestion du cache des données utilisateur. Il gère également les
 * états de chargement et d'erreur.
 * 
 * @param userId - Identifiant de l'utilisateur à charger
 * @returns Objet contenant les données et méthodes de gestion utilisateur
 * 
 * @example
 * ```tsx
 * const { user, loading, error, updateUser, refetch } = useUser('123');
 * 
 * if (loading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * 
 * return <UserProfile user={user} onUpdate={updateUser} />;
 * ```
 * 
 * @throws {Error} Erreur si l'userId est invalide
 * @since 2024-01-10
 */
const useUser = (userId: string) => {
  // États du hook
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fonction de récupération des données
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userService.getUser(userId);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ... reste de la logique

  return { user, loading, error, updateUser, refetch };
};
```

## 5. Documentation des Utilitaires et Helpers

### 5.1 Fonctions Utilitaires

```typescript
/**
 * Formate un prix en euros avec les options de localisation françaises
 * 
 * @param amount - Montant à formater en centimes
 * @param options - Options de formatage (optionnel)
 * @returns Prix formaté en chaîne de caractères
 * 
 * @example
 * ```typescript
 * formatPrice(1999) // "19,99 €"
 * formatPrice(1999, { showCents: false }) // "20 €"
 * ```
 * 
 * @throws {Error} Si le montant est négatif
 */
const formatPrice = (
  amount: number, 
  options: FormatPriceOptions = {}
): string => {
  if (amount < 0) {
    throw new Error('Le montant ne peut pas être négatif');
  }

  // Conversion des centimes en euros
  const euros = amount / 100;
  
  // Configuration par défaut
  const defaultOptions = {
    showCents: true,
    currency: 'EUR',
    locale: 'fr-FR'
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Formatage selon les options
  return euros.toLocaleString(finalOptions.locale, {
    style: 'currency',
    currency: finalOptions.currency,
    minimumFractionDigits: finalOptions.showCents ? 2 : 0
  });
};
```

## 6. Commentaires Inline

### 6.1 Commentaires de Logique Complexe

```typescript
const ProductList: React.FC<ProductListProps> = ({ filters, sortBy }) => {
  // Mémorisation des produits filtrés pour éviter les recalculs inutiles
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Filtre par catégorie si spécifiée
        if (filters.category && product.category !== filters.category) {
          return false;
        }
        
        // Filtre par prix (gestion des valeurs nulles)
        if (filters.minPrice && product.price < filters.minPrice) {
          return false;
        }
        
        // Filtre par disponibilité
        return filters.showOutOfStock || product.inStock;
      })
      .sort((a, b) => {
        // Tri selon le critère sélectionné
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name, 'fr');
          default:
            return 0;
        }
      });
  }, [products, filters, sortBy]);

  // ... reste du composant
};
```

### 6.2 Commentaires TODO et FIXME

```typescript
// TODO: Implémenter la pagination infinie pour améliorer les performances
// Ticket JIRA: FRONT-123
const [currentPage, setCurrentPage] = useState(1);

// FIXME: Gérer le cas où l'API retourne une erreur 429 (rate limit)
// Bug signalé le 2024-01-15 - Priorité haute
const handleApiCall = async () => {
  try {
    return await api.getData();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// HACK: Solution temporaire en attendant la refonte du système de cache
// À supprimer lors de la migration vers React Query v5
const clearCacheWorkaround = () => {
  localStorage.removeItem('temp_cache');
};
```

## 7. Documentation des Contextes React

### 7.1 Structure Standard d'un Context

```typescript
/**
 * Context pour la gestion globale du thème de l'application
 * 
 * @description Fournit les fonctionnalités de basculement entre thème clair/sombre,
 * persistance des préférences utilisateur et adaptation automatique selon
 * les préférences système.
 * 
 * @example
 * ```tsx
 * // Provider
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // Utilisation
 * const { theme, toggleTheme, isDark } = useTheme();
 * ```
 */

interface ThemeContextType {
  /** Thème actuel ('light' ou 'dark') */
  theme: Theme;
  /** Fonction pour basculer entre les thèmes */
  toggleTheme: () => void;
  /** Indique si le thème sombre est actif */
  isDark: boolean;
  /** Définit un thème spécifique */
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider du contexte thème
 * 
 * @param children - Composants enfants
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // États et logique du provider
  const [theme, setTheme] = useState<Theme>(() => {
    // Récupération du thème sauvegardé ou détection système
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  });

  // ... reste de la logique

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook pour utiliser le contexte thème
 * 
 * @throws {Error} Si utilisé en dehors d'un ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  
  return context;
};
```

## 8. Standards Spécifiques par Type de Fichier

### 8.1 Fichiers de Configuration

```typescript
/**
 * Configuration de l'API pour l'environnement de production
 * 
 * @description Centralise les URLs, timeouts et configurations
 * spécifiques à l'API backend. Les valeurs sont définies via
 * les variables d'environnement.
 * 
 * @see https://docs.api.company.com pour la documentation API
 */
export const apiConfig = {
  /** URL de base de l'API */
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  
  /** Timeout par défaut pour les requêtes (ms) */
  timeout: 10000,
  
  /** Nombre de tentatives en cas d'échec */
  retryAttempts: 3,
  
  /** Headers par défaut */
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
```

### 8.2 Fichiers de Services

```typescript
/**
 * Service de gestion des utilisateurs
 * 
 * @description Encapsule toutes les interactions avec l'API
 * concernant les utilisateurs : CRUD, authentification, etc.
 * 
 * @class UserService
 */
class UserService {
  /**
   * Récupère un utilisateur par son identifiant
   * 
   * @param userId - Identifiant de l'utilisateur
   * @returns Promise contenant les données utilisateur
   * @throws {NotFoundError} Si l'utilisateur n'existe pas
   * @throws {NetworkError} En cas de problème réseau
   */
  async getUser(userId: string): Promise<User> {
    const response = await apiClient.get(`/users/${userId}`);
    
    if (response.status === 404) {
      throw new NotFoundError(`Utilisateur ${userId} non trouvé`);
    }
    
    return response.data;
  }

  // ... autres méthodes
}

export const userService = new UserService();
```

## 9. Règles de Formatage et Style

### 9.1 Conventions de Nommage dans les Commentaires

- **Variables** : `camelCase` avec description claire
- **Fonctions** : Verbe à l'infinitif décrivant l'action
- **Composants** : `PascalCase` avec nom descriptif
- **Constantes** : `UPPER_SNAKE_CASE` pour les valeurs fixes

### 9.2 Structure des Commentaires Multi-lignes

```typescript
/**
 * Première ligne : résumé concis
 * 
 * Description détaillée sur plusieurs lignes si nécessaire.
 * Peut inclure le contexte métier, les contraintes techniques
 * ou les considérations de performance.
 * 
 * @param paramName - Description du paramètre
 * @returns Description de la valeur retournée
 * @throws Type d'erreur et condition
 * @example Exemple d'utilisation
 * @since Version d'introduction
 * @deprecated Information sur la dépréciation si applicable
 */
```

## 10. Validation et Outils

### 10.1 Configuration ESLint pour les Commentaires

```json
{
  "rules": {
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnDescription": true,
      "requireParamDescription": true
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true
      }
    }]
  }
}
```

### 10.2 Génération de Documentation

Ce standard permet la génération automatique de documentation avec des outils comme :
- **TypeDoc** : Pour la documentation TypeScript
- **Storybook** : Pour les composants React
- **JSDoc** : Pour la documentation générale

## 11. Exemples de Mauvaises Pratiques à Éviter

### 11.1 Commentaires à Éviter

```typescript
// ❌ Commentaire évident
const total = price + tax; // Addition du prix et de la taxe

// ❌ Commentaire obsolète
const users = []; // TODO: Implémenter la récupération depuis l'API (fait en 2023)

// ❌ Commentaire trop vague
// Fonction pour gérer les trucs
const handleStuff = () => { /* ... */ };
```

### 11.2 Bonnes Pratiques

```typescript
// ✅ Commentaire expliquant le pourquoi
// Utilisation de setTimeout pour éviter les appels API trop fréquents
const debouncedSearch = useMemo(
  () => debounce(searchTerm => search(searchTerm), 300),
  []
);

// ✅ Commentaire avec contexte métier
// Les commandes de plus de 100€ bénéficient automatiquement de la livraison gratuite
// selon la politique commerciale du 01/01/2024
if (order.total >= 10000) { // 100€ en centimes
  order.shippingCost = 0;
}
```

---

## Résumé des Points Clés

1. **Cohérence** : Utiliser toujours la même structure pour les types similaires
2. **Clarté** : Expliquer le contexte et les décisions, pas juste le code
3. **Maintenance** : Tenir les commentaires à jour avec le code
4. **Outils** : Utiliser JSDoc pour permettre la génération automatique
5. **Équipe** : Ce document doit être partagé et respecté par tous les développeurs

Ce standard assure une documentation uniforme et professionnelle de votre codebase React, facilitant la maintenance et la collaboration sur le projet.