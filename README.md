# 🍳 re.sippy 🍳
re.sippy is an Expo-based recipe book app for Android, built with Javascript and React Native. This was created over the course of a 12-week long semester for a second year university assignment.

## Installation
1. [Install git](https://git-scm.com/).
2. [Install NodeJS](https://nodejs.org/en).
3. To clone the repository:

- Open [Visual Studio Code](https://code.visualstudio.com/).
- Open a new Terminal inside VSCode (`Ctrl+Shift+`\`).
- Run the command `git clone https://github.com/aster1ya/re.sippy.git`.
- Navigate into the created folder wth `cd re.sippy`.
- Run the following commands, `npm install expo` and `npm install https://github.com/aster1ya/re.sippy.git`, to install the missing dependencies that were exlcuded through the .gitignore file.

4. To launch the app on your phone:

> **DISCLAIMER**
> These methods require you to have the app [Expo Go (SDK 52)](https://expo.dev/go) installed on your Android device.

**via wireless**
- Run the command `npx expo start`.
- Scan the QR code with the Expo Go app.

**via wired**
- Enable Developer Mode (`Settings > About phone > Software information`, then tap `Build number` repeatedly to unlock).
- Enable USB debugging in Developer Options (`Settings > Developer options`, then scroll down to `Debugging` section).
- Run the command `npx expo start --localhost --android` with the device awake to allow debugging authorization.

5. To access the backend database:

> **DISCLAIMER**
> This method STRICTLY requires that the app is opened on your Android device via the wired method above.

- Run command `adb reverse tcp:5000 tcp:5000` in a terminal in VSCode.
- Run the command `node backend/server.js` in another terminal WITHIN the directory of the app's files.

## Troubleshooting
### My 'npm expo' command is throwing permission errors!
- Press `CTRL+P` and search for settings.json.
- Add `"args": ["-ExecutionPolicy", "Bypass"]` inside `"PowerShell"` JUST below "source" and "icon". 
- If you cannot do that, you'll need to a new profile (`CTRL+SHIFT+P`) and selecting `Create New Terminal (With Profile)`.

### The app won't run because of an 'Android SDK' or 'adb' issue!
- Install [Android Studio](https://developer.android.com/studio) to download everything required and in the right place.
