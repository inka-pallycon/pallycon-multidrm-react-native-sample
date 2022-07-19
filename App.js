import React from "react";
import { StyleSheet, View } from "react-native";
import Video, { DRMType } from 'react-native-video';

const VideoPlayer = () => {
  return (
    <View style={styles.container}>
      <Video
      source={{ 
        uri: 'https://contents.pallycon.com/DEMO/app/big_buck_bunny/dash/stream.mpd' 
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
          'pallycon-customdata-v2': 'eyJkcm1fdHlwZSI6IldpZGV2aW5lIiwic2l0ZV9pZCI6IkRFTU8iLCJ1c2VyX2lkIjoidGVzdFVzZXIiLCJjaWQiOiJkZW1vLWJiYi1zaW1wbGUiLCJwb2xpY3kiOiI5V3FJV2tkaHB4VkdLOFBTSVljbkp1dUNXTmlOK240S1ZqaTNpcEhIcDlFcTdITk9uYlh6QS9pdTdSa0Vwbk85c0YrSjR6R000ZkdCMzVnTGVORGNHYWdPY1Q4Ykh5c3k0ZHhSY2hYV2tUcDVLdXFlT0ljVFFzM2E3VXBnVVdTUCIsInJlc3BvbnNlX2Zvcm1hdCI6Im9yaWdpbmFsIiwia2V5X3JvdGF0aW9uIjpmYWxzZSwidGltZXN0YW1wIjoiMjAyMi0wNi0zMFQwMzoxMzo0NFoiLCJoYXNoIjoiVHFzd3RwWThJbkpFNSsxdTVJT0Z1VTZ3OU05WUxWbmx5V3NqVnJRZHNIMD0ifQ==',
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

export default VideoPlayer


// PallyCon FPS DRM Playback
// import React from "react";
// import { StyleSheet, View } from "react-native";
// import Video, { DRMType } from 'react-native-video';

// const VideoPlayer = () => {
//   return (
//     <View style={styles.container}>
//       <Video
//       source={{ 
//         uri: "https://FPS.DRM.ContentURL.m3u8" 
//       }}
//       style={styles.fullScreen}
//       paused={false} 
//       resizeMode={"cover"} 
//       onLoad={e => console.log(e)} 
//       repeat={true} 
//       onAnimatedValueUpdate={() => {}}
//       drm={{
//         type: DRMType.FAIRPLAY,
//         licenseServer:'https://license-global.pallycon.com/ri/licenseManager.do',
//         certificateUrl: 'https://license.pallycon.com/ri/fpsKeyManager.do?siteId=Your Site ID',
//         base64Certificate: true,       
//         headers: {          
//           'pallycon-customdata-v2': "PallyCon Token String",
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//        }}/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white"
//   },
//   fullScreen: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0
//   }
// });

// export default VideoPlayer;