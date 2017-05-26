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
const TimerMiXin = require('react-timer-mixin');

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const ImageData = require('./ImageData.json');

var timer;

class CycleScrollViewDemo extends Component {

    constructor(props) {

        super(props);

        this.state = {
            currentPageIndex:0
        }
    }

    render() {

        let defaultProps = {
            duration:1000
        };

        return(
            <View style = {styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    pagingEnabled={true}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.myOnScrollEndDrag}
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
        let allImage = [];
        for(let index in ImageData.data) {
            if (ImageData.data.hasOwnProperty(index)) {
                let item = ImageData.data[index];
                //创建组件 装入数组
                allImage.push(
                    this.renderSigleImage(index, item)
                )
            }
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
        let indicatorArr = [];
        let pageControlStyle;
        for (let i = 0; i < ImageData.data.length; i++) {
            let pageColor = (i===this.state.currentPageIndex) ? 'orange' : 'white';
            indicatorArr.push(
                <Text key={i} style={[{fontSize:37,marginLeft:8,color:pageColor}]}>&bull;</Text>
            );
        }
        return indicatorArr;
    }

    //实现一些复杂的操作
    componentDidMount() {
        //开启定时器
        this.startTimer()

    }

    // 开启定时器
    startTimer() {
        let scrollView = this.refs.scrollView;
        let count = ImageData.data.length;
        let activePage = 0;

        timer = setInterval(()=>{
            if ((this.state.currentPageIndex+1) >= count) {
                activePage = 0;
            }else {
                activePage += 1;
            }
            this.setState({currentPageIndex:activePage});
            let offsetX = activePage * SCREEN_WIDTH;
            scrollView.scrollResponderScrollTo({x:offsetX,y:0,animated:true});
        },1000);

    }

    //当一帧滚动结束的时候调用
    onAnimationEnd(e) {
        //偏移量
        let offsetX = e.nativeEvent.contentOffset.x;
        //当前页数
        let index = Math.floor(offsetX/SCREEN_WIDTH);
        this.setState({
            currentPageIndex:index
        })
    }
    onScrollBeginDrag() {
        console.log('clear');
        timer && clearTimeout(timer);
    }

    myOnScrollEndDrag() {
        // console.log(this);
        // this.startTimer();
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
});

AppRegistry.registerComponent('CycleScrollViewDemo', () => CycleScrollViewDemo);
