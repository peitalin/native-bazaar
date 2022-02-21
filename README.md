

## OB1 Native-Bazaar
![banner](./ob1.png)

Original prototype of the OB1 mobile app built with react-native.


### Setup Instructions:

Yarn install, then run `react-native link` to link libraries,
```
yarn;
react-native link;
```
You'll need to setup a local open bazaar node at:
https://github.com/OpenBazaar/openbazaar-go


#### iOS
Then you'll need to set up iOS simulator (Xcode).
After iOS simulator setup, run:
```
~/go/bin/openbazaar-go  start
```
Once the openbazaar-go server is running, start the mobile app by running:
```
yarn;
react-native link;
yarn start:ios
```
Currently only developing iOS. Android may/may not work.
Redux/Redux-saga refactoring is a priority.



#### Android
I've only used an actual Android phone to run the builds.
You'll need to setup Android USB debugging mode.
Then you plug your android phone in and run:
```
yarn start:android
```

For emulators:
Android Studio may be the easiest option for android builds (unless you have an Android Phone)
Android: `https://developer.android.com/studio/run/emulator.html#vm-mac`

1) Make sure you have installed:
`Intel Emulator Accelerator (HAXM installer) from SDK Manager`
`Android Emulator`
`Android SDK Build-tools`
In Tools -> Android -> SDK Manager

Then you need to install HAXM by going into the directory it's download in:
`https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-mac-os-x`

2) Setup Android emulator with AVD manager

3) Once Android studio and emulator is setup, open up the `/android` folder in Android-studio and hit run.

Note: there may be issues with `multidex`: https://stackoverflow.com/questions/35890257/android-errorexecution-failed-for-task-apptransformclasseswithdexforrelease


### Main libraries used:
redux, redux-saga, react-router@v4 (same as web-version), react-native-navigation, typescript.



### POSSIBLE MANUAL INSTALL OF DEPENDENCIES
It's possible you may need to manually install and link native-libraries to access
iOS native features, although it should already be linked in xcode.proj.

#### Camera Roll
https://github.com/ivpusic/react-native-image-crop-picker


#### Check entry file index.ios.js reference
If react-packager can't find index.ios.js,
open ios/ob1/AppDelegate.m and change "index.ios" to "artifacts/index.ios".

```
jsCodeLocation = [[RCTBundleURLProvider sharedSettings]] jsBundleURLForBundleRoot:@"artifacts/index.ios" fallbackResource:nil];
```

https://medium.com/@rintoj/react-native-with-typescript-40355a90a5d7
