Emotions Quiz App
=================

Built on React Native for iOS.  Uses emotions data collected by Mantaray AR LLC.

BSD License


# Getting Started

## Requirements

1. OSX
2. Xcode
3. Homebrew
4. `brew install node`
5. `brew install watchman`
6. `brew install flow`
7. `npm install -g react-native-cli`

We have already done the following step:

1. `react-native init EmotionsQuiz

## Building and Testing

1. Open `EmotionsQuiz/EmotionsQuiz.xcodeproj`

The is an extra step you will need to do here in order to link a library that has `RTCRootView.h`:

> Import file under "Build Phase" into the "Link Binary with Library". Click the plus under "Link Binary with Library", and hit "Add Other...". Then navigate to the directory node_modules -> react-native -> React -> Base -> RCTRootView.m

2. Run in Xcode.

You can now modify code in the project and refresh your iOS simulator to see the changes.

## Testing vs Deploying

When testing, make sure the following like is uncommented in `EmotionsQuiz/AppDelegate.m`:

```obj-c
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
```

When deploying, comment out that line and uncomment the following line in the same file:

```obj-c
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

And then run:

```sh
react-native bundle --minify
```

in the terminal.


