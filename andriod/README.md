# Laxmi Construction mobile app

React Native (Expo) app for customers using the same backend and account system as the website.

## Configure the backend URL

The app uses the Expo development host to reach your computer from a physical phone while using Expo Go. If needed, copy `.env.example` to `.env` and uncomment `EXPO_PUBLIC_API_URL` with your computer's LAN address, for example `http://192.168.1.12:5000/api`. Android emulators can use `http://10.0.2.2:5000/api`.

The backend must be running on port `5000` and reachable from the device. For email verification in production, configure SMTP on the backend.

## Run

```bash
npm start
npm run android
```

The app shows a two-second branded splash, two onboarding pages, account registration, email verification, sign in and password recovery. Successful sign in is saved securely on the device and validated with the backend when the app opens. The home screen links into the existing mobile service, project, careers and contact routes.

## Generate native Android project

Expo manages native configuration through Continuous Native Generation. When an Android Studio project is needed, run:

```bash
npm run android:generate
```
