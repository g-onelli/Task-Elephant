import { StyleSheet, Platform } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import originalPalette from './styleConstants/Colors';
import borderStyle from './styleConstants/Border';
import textStyling from './styleConstants/Texts';

const taskSheet = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: originalPalette.taskBackground,
  },

  content: {
    flex: 1,
    padding: 40
  },
  list: {
    marginTop: 10
  },

  button: {
    marginBottom: 20
  },

  empty: {
    // flex:1,
    // alignItems: 'center',
    // justifyContent: 'center'

    justifyContent: 'center',
    alignItems: 'center',
    top: '40%', left: 0,
    right: 0, bottom: 0,

  },
  startText: {
    color: '#000',
    fontSize: 18,
    fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
    letterSpacing: 2,
    textTransform:'capitalize',
  },

  scheduleItem: {
    padding: 16,
    marginTop: 16,
    borderColor: originalPalette.black,
    borderWidth: borderStyle.narrowBorder,
    borderStyle: borderStyle.borderLine,
    borderRadius: borderStyle.lrgCurve,
    textAlign: 'center',
    backgroundColor: originalPalette.scheduleItemColor,
    overflow: 'hidden',
    letterSpacing: 2,
    fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
  },

  item: {
    backgroundColor: originalPalette.itemBackground,
    color: originalPalette.itemTextColor,
    padding: 16,
    marginTop: 16,
    borderColor: originalPalette.itemBorderColor,
    borderWidth: borderStyle.narrowBorder,
    borderStyle: borderStyle.borderLine,
    borderRadius: borderStyle.lrgCurve,
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: Platform.OS == 'ios'? textStyling.iosFont: textStyling.androidFont,
  }
})

export default taskSheet;
