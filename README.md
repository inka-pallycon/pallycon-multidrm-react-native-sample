# React-Native-Video : PallyCon DRM 스트리밍 재생



## React Native 프로젝트 생성

- React Native 환경이 구축된 상태에서 프로젝트를 생성합니다.
  
    ```bash
    # intel cpu인 경우
    $ react-native init ProjectName
    
    # M1 MacBook 에서 react-native 0.69.0 이상 버전에서 정상적으로 프로젝트가 생성되지 않을 수 있다.
    # react-native 버전 확인 : packager.json 파일 or $npx react-native info
    # 프로젝트 생성 시 0.68.2 버전으로 생성을 권장한다.
    # $ react-native init ProjectName --version 0.68.2
    ```
    



## React Native Video 설치

- `react-native-video` 패키지를 설치합니다.
- 설치 시 버전을 지정하지 않으면 `5.2.0` 버전이 설치되는데, DRM 콘텐츠 재생을 위해서는 `6.0.0` 이상 버전을 설치해야 합니다( 개발자는 6.0.0-alpha.1 로 테스트 ).
  
    ```bash
    # [https://github.com/react-native-video/react-native-video](https://github.com/react-native-video/react-native-video)
    # 6.0.0 버전 이상으로 설치해야하며, 6.0.0-alpha.1 버전이 현재 최신이다.
    $ npm install react-native-video@6.0.0-alpha.1
    or
    $ yarn add react-native-video@{{6.0.0-alpha.1}} 
    ```
    



## Android - PallyCon Widevine DRM

- Widevine DRM 재생 예제 코드입니다 - App.js 파일
    - Widevine 콘텐츠 URL : `source` 에 콘텐츠 URL 정보를 입력하세요.
    - 라이선스 서버 URL :  PallyCon - `https://license-global.pallycon.com/ri/licenseManager.do`
    - 라이선스 획득 정보 : `pallycon-customdata-v2` 에 PallyCon Token 정보를 입력하세요.
- App.js 파일
  
    ```jsx
    // App.js 파일 - 기존 소스를 모두 삭제하고 아래 코드 실행
    
    import React from "react";
    import { StyleSheet, View } from "react-native";
    import Video, { DRMType } from 'react-native-video';
    
    const VideoPlayer = () => {
      return (
        <View style={styles.container}>
          <Video
          source={{ 
            uri: "https://Widevine.DRM.ContentURL.mpd" 
          }}
          style={styles.fullScreen}
          paused={false}
          resizeMode={"cover"}
          onLoad={e => console.log(e)}
          repeat={true}
          onAnimatedValueUpdate={() => {}}
          drm={{
            type: DRMType.WIDEVINE,
            licenseServer:'https://license-global.pallycon.com/ri/licenseManager.do',
            headers: {          
              'pallycon-customdata-v2': "PallyCon Token String",
              'Content-Type': 'application/octet-stream'
            }
           }}/>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      },
      fullScreen: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    });
    
    export default VideoPlayer;
    ```
    



### Android 디바이스 연결

- adb 명령어로 연결된 디바이스 찾고, 포트 연결 프로젝트를 실행하면 디바이스에 앱이 설치됩니다.
- 이후 App.js 소스를 수정하고 저장하면 reflash 되어 디바이스에 반영됩니다.
  
    ```bash
    # 연결된 디바이스 찾기
    $ adb devices
    List of devices attached
    RXXXXXXXXTW	device
    
    # 8081 포트로 변경 연결
    $ adb reverse tcp:8081 tcp:8081
    
    # 프로젝트 실행
    $ react-native run-android
    ```
    



## iOS - PallyCon FairPlay Streaming(FPS) DRM



### App.js 수정

- Apple Certificate URL을 입력해야 합니다. URL 마지막에 `Site ID`를 입력하세요.
    - `certificateUrl: 'https://license.pallycon.com/ri/fpsKeyManager.do?siteId=Your Site ID',`
    - `base64Certificate: true,`
- 나머지는 `Widevine` 처럼 FPS 콘텐츠/라이선스 서버 URL/라이선스 요청 정보(Token)을 입력해야 합니다.
  
    ```jsx
    import React from "react";
    import { StyleSheet, View } from "react-native";
    import Video, { DRMType } from 'react-native-video';
    
    const VideoPlayer = () => {
      return (
        <View style={styles.container}>
          <Video
          source={{ 
            uri: "https://FPS.DRM.ContentURL.m3u8" 
          }}
          style={styles.fullScreen}
          paused={false} // 재생/중지 여부
          resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={true} // video가 끝나면 다시 재생할 지 여부
          onAnimatedValueUpdate={() => {}}
          drm={{
            type: DRMType.FAIRPLAY,
            licenseServer:'https://license-global.pallycon.com/ri/licenseManager.do',
            certificateUrl: 'https://license.pallycon.com/ri/fpsKeyManager.do?siteId=Your Site ID',
            base64Certificate: true,       
            headers: {          
              'pallycon-customdata-v2': "PallyCon Token String",
              'Content-Type': 'application/x-www-form-urlencoded'
            }
           }}/>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      },
      fullScreen: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    });
    
    export default VideoPlayer;
    ```
    



### pod install

- iOS는 `react-native-video` 설치된 후 `pod install` 실행해야 합니다.
- 생성된 `projectName.xcworkspace` 열어줍니다.
  
    ```bash
    $ cd projectName/ios && pod install
    
    # apple silicon 에서 문제 발생 시 아래와 같이 시도해 보시기 바랍니다.
    # arch -x86_64 pod install
    
    # Xcode가 실행됩니다.
    $ open projectName.xcworkspace
    ```
    



### Xcode Project 설정 및 iOS 디바이스 연결

- FPS DRM은 실제 디바이스에서 동작하며 시뮬레이터에서 FPS 콘텐츠는 재생이 안됩니다.
    - Xcode `Signing & Capabilities` 에서 애플 개발자 인증서를 설정합니다.
    - 디바이스 연결 후 프로젝트를 실행하여 앱을 디바이스에 설치합니다.
- 이후 App.js 소스를 수정하고 저장하면 reflash 되어 디바이스에 반영됩니다.
    - react-native run-ios 명령어는 iOS 시뮬레이터를 실행시킨다.



## 참고 사항

- Apple M1 MacBook에서는 React Native가 바로 동작하지 않을 수 있습니다.
- Pod install 오류시 시도해보시기 바랍니다.
  
    ```bash
    # 1. pod install 실행
    # intel
    $ cd ios && pod install
    # apple silicon M1
    --> $ cd ios && arch -x86_64 pod install
    
    # 오류가 발생할 경우 아래 명령을 시도해본다.
    --> # $sudo xcode-select --switch /Applications/Xcode.app
    
    # 2. project open
    $ cd ios && open projectName.xcworkspace
    ```
    
- **[React Native - ios ] N/A: version "default -> N/A" is not yet installed. 오류 발생  시**
  
    ```jsx
    nvm alias default system
    ```