// pages/record/record.js
import AV from '../../lib/av-live-query-core'
import {formatTime, formatList, generateTitle, titleArr} from '../../utils/util'
import wxCharts from '../../lib/wxcharts.js'
var columnChart = null;
var windowWidth = 320;
var fullData = null;
var baseKey = "";
var depth = 0;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight: 500,
        listOrChat: true,
        list: [],
        chartTitle: '总打卡记录',
        isMainChartDisplay: true,
        chartData: [],
        categories: []
    },
    changeShowType(e){
        const type = e.currentTarget.dataset.type
        this.setData({
            listOrChat: type
        })
        if(type){
            this.getList()
        } else {
            this.initChart()
        }
    },
    recordTime(){
        const time = new Date()
        const Record = AV.Object.extend('Record')
        const record = new Record()
        record.set('dateTime', formatTime(time))
        record.save().then(r=>{
            wx.showToast({
              title: '打卡成功',
              icon: 'success'
            })
            this.getList()
        }).catch(err=>{
            wx.showToast({
                title: '打卡失败',
                icon: 'error'
              })
        })
    },
    getList(){
        const query = new AV.Query('Record')
        query.descending('createAt')
        query.find().then(recordList=>{
            this.setData({
                list: recordList.map(item => ({
                    time: item.attributes.dateTime
                }))
            })
            fullData = formatList(recordList)
            console.log('fullData:', fullData)
        })
    },
    getPrevList(key){
        if(key){
            return this.getNextList(key)
        } else {
            this.setData({
                chartData: fullData.mainData.data,
                categories: fullData.mainData.categories
            })
            return Promise.resolve()
        }
    },
    getNextList(key){
        console.log('key:', key)
        const data = {}
        const reg = new RegExp(`${key}\/(\\d+)[^\/]`)
        console.log('reg:', reg)
        Object.keys(fullData).forEach(item => {
            console.log('1 item:', item, fullData[item])
            const result = item.match(reg)
            if(result){
                console.log('2 item:', item, fullData[item])
                const month = result[1]
                const extraTitle = titleArr[depth]
                data[`${month}${extraTitle}`] = fullData[item]
            }
        })
        console.log('data:', data)
        this.setData({
            chartData: Object.values(data),
            categories: Object.keys(data)
        })
        return Promise.resolve()
    },
    initChart(){
        depth = 0
        baseKey = ''
        this.getPrevList('').then(()=>{
            this.setData({
                chartTitle: generateTitle(baseKey),
                isMainChartDisplay: true
            })
            columnChart = new wxCharts({
                canvasId: 'columnCanvas',
                type: 'column',
                animation: true,
                categories: this.data.categories,
                series: [{
                    name: '打卡次数',
                    data: this.data.chartData,
                    format: function (val, name) {
                        return val.toFixed(2) + '次';
                    }
                }],
                yAxis: {
                    format: function (val) {
                        return val + '次';
                    },
                    title: '打卡次数',
                    min: 0
                },
                xAxis: {
                    disableGrid: true,
                    type: 'calibration'
                },
                extra: {
                    column: {
                        width: 15
                    }
                },
                width: windowWidth,
                height: 200,
            });
        })
    },
    zoomOut: function (e) {
        depth = Math.max(depth-1, 0)
        const index = baseKey.lastIndexOf('/')
        let key
        if(index>-1){
            key = baseKey.slice(0, index)
        } else if(baseKey){ // 本身是年，再往后退就是总的了
            key = ''
        }
        console.log('zoomOut,baseKey, key,depth', baseKey, key, depth)
        baseKey = key
        this.getPrevList(key).then(()=>{
            this.setData({
                chartTitle: generateTitle(baseKey),
                isMainChartDisplay: depth == 0
            })
            columnChart.updateData({
                categories: this.data.categories,
                series: [{
                    name: '打卡次数',
                    data: this.data.chartData,
                    format: function (val, name) {
                        return val.toFixed(2) + '次';
                    }
                }]
            });
        })
    },
    zoomIn: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && depth<4) {
            depth = depth+1
            const val = parseInt(this.data.categories[index])
            const key = `${baseKey ? `${baseKey}/` : ''}${val}`
            baseKey = key
            this.setData({
                chartTitle: generateTitle(baseKey)
            })
            console.log('zoomIn,baseKey, key,depth', baseKey, key, depth)
            this.getNextList(key).then(()=>{
                this.setData({
                    isMainChartDisplay: false
                })
                columnChart.updateData({
                    categories: this.data.categories,
                    series: [{
                        name: '打卡次数',
                        data: this.data.chartData,
                        format: function (val, name) {
                            return val.toFixed(2) + '次';
                        }
                    }]
                });
            })
        }
    },
    getClientWidth(){
        try {
          var res = wx.getSystemInfoSync();
          console.log(res)
          windowWidth = res.windowWidth;
          this.setData({
              scrollHeight: res.windowHeight-190
          })
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
    },
    sortList(){
        // 分为年月日时分
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.getList()
        this.getClientWidth()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})