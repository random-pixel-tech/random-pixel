# Android Build Readme

## Overview

This document provides a step-by-step guide on how to view the build on your Android device using the `eas build` command with the specified parameters.

## Prerequisites

Before proceeding, ensure that you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo EAS CLI](https://docs.expo.dev/build/introduction/)
- Android device with the Expo Go app installed

## Steps

1. Open your terminal or command prompt.

2. Navigate to your project directory using the `cd` command.

   ```bash
   cd random-pixel
   ```

3. Run the following command to initiate the build for Android with the preview profile:

   ```bash
   eas build -p android --profile preview
   ```

4. Wait for the build to complete. Once finished, you will see a URL to the APK in the build details page or in the link provided when `eas build` is done.

5. Copy the URL to the APK.

6. Send the APK URL to your Android device. You can use email or any other method of your choice.

7. Open the URL on your Android device using a web browser.

8. Download and install the APK on your device.

9. Run the installed APK to test the build on your Android device.

Note: Ensure that your Android device has the Expo Go app installed to run the Expo project.

Congratulations! You have successfully viewed the build on your Android device. If you encounter any issues, refer to the Expo documentation or community forums for assistance.