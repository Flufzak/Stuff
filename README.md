# 📱 MA 2 Examen – React Native Shop App

Dit project is een **React Native (Expo) mobiele applicatie** ontwikkeld als onderdeel van het **MA 2 examen**.  
De app simuleert een eenvoudige webshop met producten, favorieten, winkelmandje en profiel, gebouwd met moderne tooling en een duidelijke structuur.

---

## ✨ Features

### 🏠 Home

- Producten ophalen via API
- Productlijst met cards
- Product detail scherm

### ❤️ Favorites

- Favorieten beheren via Redux
- EmptyState bij lege lijst
- Correct getype navigatie (geen `any`)

### 🛒 Cart

- Producten toevoegen en verwijderen
- Quantity verhogen en verlagen
- Redux Toolkit state management
- Duidelijke CartItemCard component

### 👤 Profile

- Statische profielpagina

### 🎨 UI & UX

- Custom Bottom Tab Bar met animated bubble
- Geen ongewenste shadows
- Dynamische kleuren via theme
- Consistente typography met Montserrat
- Reusable UI components

### ⚡ Data & State

- React Query voor data fetching
- Custom Loader component (met optionele vertraging)
- EmptyState component met `children` support

---

## 🧱 Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **React Navigation**
  - Native Stack
  - Bottom Tabs (Custom Tab Bar)
- **Redux Toolkit**
- **@tanstack/react-query**
- **Expo Vector Icons**
- **Google Fonts (Montserrat)**

---

## 🔤 Fonts

De app gebruikt **Montserrat** als standaard font.

Geïnstalleerd via:

- `@expo-google-fonts/montserrat`
- `expo-font`

Gebruik gebeurt via een custom `AppText` component zodat het font overal consistent is.

---

## 🔄 State Management

- **Redux Toolkit**
  - Cart state
  - Favorites state
- **React Query**
  - Product lijst
  - Product detail
  - Loading & error states

---

## 🧩 Custom Components

- **AppText**  
  Wrapper rond `Text` met standaard font en styling.

- **Loader**  
  Custom loader met optionele vertraging voor betere UX.

- **EmptyState**  
  Reusable empty state component met ondersteuning voor `children`.

- **CustomTabBar**  
  Volledig custom bottom tab bar met animated bubble en dynamische kleuren.

---

## 🚀 Installatie

```bash
npm install
npx expo start
```
