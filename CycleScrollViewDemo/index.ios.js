/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    AppRegistry,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native'
// 引入计时器
var TimerMiXin = require('react-timer-mixin')

const SCREEN_WIDTH = require('Dimensions').get('window').width
const ImageData = require('./ImageData.json')

export default class CycleScrollViewDemo extends Component {

    //注册计时器
    minXins: [TimerMiXin]

    constructor(props) {
        super(props)
    
        this.state = {
            currentPageIndex:0
        }
    }

    render() {
        return(
            <View style = {styles.container}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    >
                    {this.renderAllImage()}
                </ScrollView>
                {/*返回指示器*/}
                <View style={styles.pageViewStyle}>
                    {this.renderPageControl()}
                </View>
            </View>
        )

    }
    renderAllImage() {
        // 数组
        var allImage = []
        for(let index in ImageData.data) {
            let item = ImageData.data[index]
            //创建组件 装入数组
            allImage.push(
                this.renderSigleImage(index,item)
            )
        }
        return allImage
    }

    renderSigleImage(index,item) {
        return(
            <Image
                key={index}
                source={{uri:item.img}}
                style={{width:SCREEN_WIDTH,height:SCREEN_WIDTH*13/30}}
            />
        )
    }

    //返回所有圆点
    renderPageControl() {
        //定义一个数组，防止所有的圆点
        var indicatorArr = []
        var pageControlStyle
        for (var i = 0; i < ImageData.data.length; i++) {
            pageColor = (i==this.state.currentPageIndex) ? 'orange' : 'white'
            indicatorArr.push(
                <Text key={i} style={[{fontSize:37,marginLeft:8,color:pageColor}]}>&bull;</Text>
            )
        }
        return indicatorArr
    }

    componentDidMount() {
        //开启定时器

    }

    //当一帧滚动结束的时候调用
    onAnimationEnd(e) {
        
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:20
    },
    pageViewStyle: {
        width:SCREEN_WIDTH,
        height:25,
        position:'absolute',
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.2)',

        //设置主轴方向
        flexDirection:'row',
        //设置侧轴方向对齐方式
        alignItems:'center'
    }
})

AppRegistry.registerComponent('CycleScrollViewDemo', () => CycleScrollViewDemo);
