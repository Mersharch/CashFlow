```markdown
# CashFlow

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Git
- Node.js
- npm or yarn
- A code editor (e.g., Visual Studio Code, Sublime Text, WebStorm)
- Expo Go app (for physical devices)
- Android Studio (for Android emulator)
- Xcode (for iOS simulator, macOS only)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mersharch/CashFlow
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

3. **Generate iOS and Android folders**

   ```bash
   npx expo prebuild
   ```

   **Note for macOS users:**  
   After running `npx expo prebuild`, change the directory to the `ios` folder and run `pod install` to complete the necessary configurations.

   ```bash
   cd ios
   pod install
   ```

4. **Open the project**

   - Launch your preferred code editor
   - Open the CashFlow project folder

5. **Start the application**

   ```bash
   # Using npm
   npm start

   # Using yarn
   yarn start

   # Using Expo directly
   npx expo start
   ```

### Running the app

- **Physical Device:**
  - Scan the QR code with your device's camera
  - Open the link with Expo Go app

- **Android Emulator:**
  - Press `a` in the terminal to run on Android emulator

- **iOS Simulator:**
  - Press `i` in the terminal to run on iOS simulator

## Initial Setup

- When the app launches, you'll see the welcome screen
- Enter your name in the input field
- Click the button to proceed

## Adding Expenses

- On the home screen, locate the floating action button (FAB) at the bottom right
- Click the FAB to add a new expense

## Theme Toggle

- Look for the theme toggle icon in the top right corner of the header
- Click the icon to switch between light and dark modes

## Insights Page

- Click on the **Insights** tab to view data visualization concerning your expenses.
```