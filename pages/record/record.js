// pages/record/record.js
import AV from '../../lib/av-live-query-core'
import Util from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },
    recordTime(){
        const time = new Date()
        const Record = AV.Object.extend('Record')
        const record = new Record()
        record.set('dateTime', Util.formatTime(time))
        record.save().then(r=>{
            wx.showToast({
              title: '打卡成功',
              icon: 'success'
            })
            this.getList()
        }).catch(err=>{
            console.log('err', err)
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
        })
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