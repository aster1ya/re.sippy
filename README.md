# Actually getting started

Here is a guide to clone the repo and launch the app on your phone. Way below this is the premade readme content.

Installing things you need
- Install nodejs from nodejs.org if you don't already have it. Use command `node -v` to check if you already have it installed
- Install git from the website if you don't already have it.

To clone the repo (get it from github onto your device)
- Open VSCode in whatever folder you want it to be.
- Log in to github with the profile icon in the bottom left.
- Run the command `git clone https://github.com/aster1ya/re.sippy.git`.
- Navigate into the folder it just made with `cd re.sippy`.
- Then run these two commands: `npm install expo` and `npm install https://github.com/aster1ya/re.sippy.git` to install dependencies that have been gitignored. Now you can launch the app. 

To launch the app on your phone wirelessly (Cant do at AUT):
- You need to download the Expo Go app.
- Do the command `npx expo start`
- Scan the QR code with the Expo Go app.

To open the app over cable:
- Have developer mode and USB debugging enabled on your phone (google it)
- Run the command `npx expo start --localhost –android` and it just opens.

Troubleshooting. Don't worry about this if everything is working fine. (These fixes worked for me ¯\\\_(ツ)\_/¯ )
- If trying an `npm expo` command gives an error something along the lines of "doesn't have permissions to run scripts":
   - press CTRL+P and search for settings.json.
   - add `"args": ["-ExecutionPolicy", "Bypass"]` inside `"PowerShell"` just below "source" and "icon". 
   - If you cant do that, youll have to create a new profile by doing CTRL+SHIFT+P and selecting `Create New Terminal (With Profile)` 
- If trying to deploy the app over cable gives an error mentioning 'adb' or 'Android SDK', install android studio from their website, it'll download everything you need and put it in the right places.




# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
