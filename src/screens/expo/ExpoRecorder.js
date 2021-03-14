import * as React from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import {Audio} from 'expo-av'

export default function App() {
  const [recording, setRecording] = React.useState()

  async function startRecording() {
    try {
      console.log('Requesting permissions..')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      console.log('Starting recording..')
      const recording = new Audio.Recording()
      // const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: Audio.RecordingOptions = {
      //   android: {
      //     extension: '.m4a',
      //     outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      //     audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      //     sampleRate: 44100,
      //     numberOfChannels: 2,
      //     bitRate: 128000,
      //   },
      //   ios: {
      //     extension: '.caf',
      //     audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      //     sampleRate: 44100,
      //     numberOfChannels: 2,
      //     bitRate: 128000,
      //     linearPCMBitDepth: 16,
      //     linearPCMIsBigEndian: false,
      //     linearPCMIsFloat: false,
      //   },
      // };

      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      )
      await recording.startAsync()
      setRecording(recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    console.log('Recording stopped and stored at', uri)
  }

  return (
    <View style={{backgroundColor: 'white'}}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  )
}
