import { StyleSheet, Dimensions } from 'react-native';
import { darker, lighter } from './Colors.js';
import { Platform } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/* App.js Styles */

export const AppStyles = StyleSheet.create({
    view: 
    {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    image: 
    {
        width: windowWidth - 30,
        height: windowHeight / 4,
        paddingTop: '2%',
        paddingBottom: '2%',
        marginTop: 25,
        shadowColor: 'transparent',
        borderRadius:10
    },
    touchable:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgb(21, 34, 56)'
    },
    printerNameText: 
    {
        fontSize: 200,
        textAlign: 'center',
        color: 'white',
        bottom: 0,
        left:0,
        position: 'absolute',
        marginLeft: 10,
        marginBottom: 7
    },
    printerStatusText: 
    {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        bottom: 0,
        right:0,
        position: 'absolute',
        marginRight: 10,
        marginBottom: 10
    },
    cardCompletionViewStyle:
    {
        borderRadius: Math.round(windowWidth + windowHeight) / 2,
        width: windowWidth / (windowWidth/125),
        height: windowWidth / (windowWidth/125),
        borderColor: 'rgba(255, 255, 255, .3)', 
        borderWidth: 5,
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        marginRight: 10,
        marginTop: (windowHeight/60)
    },
    actionSheetIconStyle:
    {
        marginLeft: 5,
        marginTop: 7
    },
    buttonStyle:
    {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    /* SEGMENTED CONTROLS */
    segmentedStyle:
    {
        width: width,
        backgroundColor: darker['three'],
        borderRadius: 10,
        flexDirection: 'row'
    },
    segmentedText:
    {
        color: 'white',
        fontSize: 15,
        padding: 10,
        marginLeft: 5,
        marginRight: 5
    },
    segmentBox: 
    {
        borderRadius: 20,
        marginRight: 20,
        marginLeft: 5,
        flexDirection: 'row'
    }
})

/* ActionSheet.js Styles */

export const ActionSheetStyles = StyleSheet.create({
    centeredView: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: 
    {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: "rgb(28, 46, 74)",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: 
        {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: windowWidth - 20,
        height: ((windowHeight / 4)),
        position: 'absolute',
        bottom: 0,
    },
    buttonStyle:
    {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    cancelButton:
    {
        color: 'gray',
    },
});

/* CardView.js Styles */

const imageHeight = windowHeight / 4
const width = (windowWidth >= 700 ? (windowWidth / 3) : windowWidth)

export const CardViewStyles = StyleSheet.create({
    image: 
    {
        width: width - 30,
        height: imageHeight,
        paddingTop: '2%',
        paddingBottom: '2%',
        marginTop: 25,
        shadowColor: 'transparent',
        borderRadius:10,
    },
    printerNameText: 
    {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginLeft: 10,
        marginBottom: 7,
        marginTop: 5
    },
    printerStatusText: 
    {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 25,
        position: 'absolute',
        right: 0
    },
})

/* CompletionView.js Styles */

const CardSize = width / (width/(windowHeight/6))
const DetailSize = width / (1 + Math.round(((width / windowHeight) + Number.EPSILON) * 10) / 10)
const borderRadius = Math.round(width + windowHeight) / 2

const borderColor = '#8E99AB'

export const CompletionViewStyles = StyleSheet.create({
    //Card view progress layers
    cardViewStyle:
    {
        borderRadius: borderRadius,
        width: CardSize,
        height: CardSize,
        borderColor: borderColor, 
        borderWidth: 7,
        alignItems: 'center', 
        justifyContent: 'center',
        marginRight: 10,
        marginTop: (windowHeight/60),
        position: 'absolute',
        right: 0,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    cardFirstProgressLayer: 
    {
        borderRadius: borderRadius,
        width: CardSize,
        height: CardSize,
        borderWidth: 7,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'green', //<-- this hex color might have to change (it probably will)
        borderTopColor: 'green',
        transform:[{rotateZ: '-135deg'}]
    },
    cardSecondProgressLayer:
    {
        borderRadius: borderRadius,
        width: CardSize,
        height: CardSize,
        position: 'absolute',
        borderWidth: 7,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'green',
        borderTopColor: 'green',
        transform: [{rotateZ: '45deg'}]
    },
    cardOffsetLayer: 
    {
        borderRadius: borderRadius,
        width: CardSize,
        height: CardSize,
        position: 'absolute',
        borderWidth: 7,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: borderColor,
        borderTopColor: borderColor,
        transform:[{rotateZ: '-135deg'}]
    },
    // Deatil screen progress layers
    detailViewStyle:
    {
        borderRadius: borderRadius,
        width: DetailSize,
        height: DetailSize,
        borderColor: borderColor, 
        borderWidth: 10,
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 25,
        position: 'absolute',
        top: 0,
        marginTop: 25
    },
    detailFirstProgressLayer: 
    {
        borderRadius: borderRadius,
        width: DetailSize,
        height: DetailSize,
        borderWidth: 10,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'green', //<-- this hex color might have to change (it probably will)
        borderTopColor: 'green',
        transform:[{rotateZ: '-135deg'}]
    },
    detailSecondProgressLayer:
    {
        borderRadius: borderRadius,
        width: DetailSize,
        height: DetailSize,
        position: 'absolute',
        borderWidth: 10,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'green',
        borderTopColor: 'green',
        transform: [{rotateZ: '45deg'}]
    },
    detailOffsetLayer: 
    {
        borderRadius: borderRadius,
        width: DetailSize,
        height: DetailSize,
        position: 'absolute',
        borderWidth: 10,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: borderColor,
        borderTopColor: borderColor,
        transform:[{rotateZ: '-135deg'}]
    }
})

/* CustomLogin.js Styles */

export const CustomLoginStyles = StyleSheet.create({
    logo:
    {
        width: Math.round(windowHeight * 0.1847),
        height: Math.round(windowHeight * 0.1847),
        marginBottom: 25
    },
    textInput:
    {
        height: 50,
        width: width - 30,
        padding: '3%',
        fontSize: 15,
        color: 'white',
    },
    SectionStyle: 
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        height: 50,
        width: width - 30,
        backgroundColor: darker['one'],
        borderRadius: 20,
        color: 'gray',
        fontSize: 15,
        marginTop: 10,
    },
    ImageStyle: 
    {
        padding: 10,
        margin: 5,
    },
    GradientWebstyles:
    {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3%',
        borderRadius: 15,
    },
    GradientMobileStyles:
    {
        width: windowWidth,
        height: windowHeight + 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    WebViewStyle:
    {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: darker['five'], 
        paddingTop: 25, 
        width: windowWidth, 
        height: windowHeight
    },
    MobileViewStyle:
    {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'transparent', 
        paddingTop: 25, 
        width: windowWidth, 
        height: windowHeight
    }
})

/* DetailScreen.js Styles */

export const DetailScreenStyles = StyleSheet.create({
    image: 
    {
        width: width - 30,
        height: windowHeight / 3.5,
        paddingTop: '10%',
        paddingBottom: '2%',
        shadowColor: 'transparent',
        borderRadius:10,
        marginBottom: 25,
        position: 'absolute',
        bottom: 0
    },
    background:
    {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:'rgb(21, 34, 56)',
    },
})

/* EditPrinterNameView.js Styles */

export const EditPrinterNameViewStyles = StyleSheet.create({
    container: 
    {
        backgroundColor: 'rgb(21, 34, 56)',
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center'
    },
    textInput: 
    {
        height: 50, //to be determined,
        width: width - 30,
        backgroundColor: darker['one'],
        borderRadius: 10,
        color: 'white',
        fontSize: 15,
        marginTop: 25,
        paddingLeft: '3%',
    },
    button:
    {
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10
    },
    buttonsView: 
    {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

/* EditPrinterView.js Styles */
var offset = windowWidth / 3
export const EditPrinterViewStyles = StyleSheet.create({
    text: 
    {
        fontSize: 15, 
        color: 'gray',
        marginBottom: 10,
        marginLeft: (windowWidth > 700 ? offset + 12 : 20), 
        paddingTop: '1%'
    },
    backgroundColor:
    {
        width: width - 20,
        backgroundColor: 'rgb(25, 40, 65)',
        alignSelf: 'center',
        borderRadius: 10,
    },
    container: 
    {
        backgroundColor: 'rgb(21, 34, 56)',
        flex: 1,
        flexDirection: 'column'
    },
    segmentedStyle:
    {
        backgroundColor: darker['three'],
        borderRadius: 10,
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        marginRight: 5,
        marginTop: 5
    },
})

/* LoadingCardView.js Styles */

export const LoadingCardViewStyles = StyleSheet.create({
    background: 
    {
      width: width - 30,
      height: imageHeight,
      paddingTop: '2%',
      paddingBottom: '2%',
      marginTop: 25,
      shadowColor: 'transparent',
      borderRadius:10,
      backgroundColor: lighter['five']
    },
    bottomBanner: 
    {
      width: width - 30,
      height: 37,
      opacity: .8,
      position: 'absolute',
      bottom: 0,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: darker['three']
    },
    loadingSortIconMobile:
    {
        width: 20,
        height: 20,
        backgroundColor: lighter['five'],
        borderRadius: 5,
        paddingRight: '3%',
        paddingBottom: '1%',
        marginRight: 10
    },
    loadingSortMobile:
    {
        width: width / 5,
        height: 20,
        borderRadius: 5,
        backgroundColor: lighter['five'],
        paddingBottom: '1%',
        flexDirection: 'row'
    },
    loadingSortIconWeb:
    {
        width: width / 20,
        height: 25,
        borderRadius: 20,
        marginRight: 20,
        marginLeft: 5,
        backgroundColor: darker['three']
    },
    loadingSortWeb:
    {
        width: width - 30,
        height: 40,
        borderRadius: 10,
        paddingBottom: '1%',
        backgroundColor: darker['three'],
        flexDirection: 'row'
    }
})

/* OverlayView.js Styles */

export const OverlayViewStyles = StyleSheet.create({
    printingViewText:
    {
      fontWeight: '100',
      fontSize: 20,
      color: 'rgb(255, 255, 255)',
    },
    iconStyle:
    {
      fontWeight: 'bold', 
      color: 'white',
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center' 
    },
    pauseOrCancelView:
    {
      flex: 1,
      justifyContent: 'center',
      marginTop: windowHeight / 22
    }
})

/* RenderButton.js Styles */

export const RenderButtonStyles = StyleSheet.create({
    touchable:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgb(21, 34, 56)'
    },
})

/* SettingsPage.js Styles */

var rectangleHeight = width / 7
var centerInRect = rectangleHeight / 3.5

var offset = windowWidth / 3

export const SettingsPageStyles = StyleSheet.create({
  background:
  {
    flex: 1,
    backgroundColor:'rgb(21, 34, 56)',
    textAlign: 'left', 
    flexDirection: 'column',
    alignItems: 'center', 
    paddingTop: 30,
  },
  textStyle:
  {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: 'gray', 
    fontSize: 15, 
    marginLeft: (windowWidth > 700 ? offset + 20 : 20), 
    marginBottom: 10,
  },
  iconStyle:
  {
    marginLeft: 10, 
    marginTop: centerInRect, 
    marginBottom: centerInRect
  },
  rowStyle:
  {
    width: width - 20,
    backgroundColor: 'rgb(25, 40, 65)',
    alignItems: 'leading',
    marginLeft: 10,
    borderRadius: 10,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  bigRowStyle:
  {
    width: width - 20,
    backgroundColor: 'rgb(25, 40, 65)',
    marginLeft: 10,
    borderRadius: 10,
    flexDirection: 'column',
  }
})

/* TempView.js Styles */

export const TempViewStyles = StyleSheet.create({
    tempViewLeftImage:
    {
        width: 23,
        height: 37,
        marginTop: 25,
        shadowColor: 'transparent',
        position: 'absolute',
        left: 0,
        bottom:0,
        marginLeft: 15,
        flexDirection: 'row'
    },
    tempViewRightImage:
    {
        width: 35,
        height: 50,
        shadowColor: 'transparent',
        position: 'absolute',
        right: 0,
        marginTop: -25,
        marginRight: 75,
        flexDirection: 'row'
    },
    tempViewLeftText:
    {
        color:'white',
        fontSize: 25,
        fontWeight: '300',
        marginLeft: 50,
        flexDirection: 'row'
    },
    tempViewRightText:
    {
        color:'white',
        fontSize: 25,
        fontWeight: '300',
        position: 'absolute',
        right: 0,
        bottom: 0,
        flexDirection: 'row',
    },
})
