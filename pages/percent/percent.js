// pages/logs/percent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [
            { question: "100% = 1 / ?", answer: "1" },
            { question: "50% = 1 / ?", answer: "2" },
            { question: "33.3% = 1 / ?", answer: "3" },
            { question: "25% = 1 / ?", answer: "4" },
            { question: "20% = 1 / ?", answer: "5" },
            { question: "16.7% = 1 / ?", answer: "6" },
            { question: "14.3% = 1 / ?", answer: "7" },
            { question: "12.5% = 1 / ?", answer: "8" },
            { question: "11.1% = 1 / ?", answer: "9" },
            { question: "10% = 1 / ?", answer: "10" },
            { question: "9.1% = 1 / ?", answer: "11" },
            { question: "8.3% = 1 / ?", answer: "12" },
            { question: "7.7% = 1 / ?", answer: "13" },
            { question: "7.1% = 1 / ?", answer: "14" },
            { question: "6.7% = 1 / ?", answer: "15" },
            { question: "6.3% = 1 / ?", answer: "16" },
            { question: "5.59% = 1 / ?", answer: "17" },
            { question: "5.56% = 1 / ?", answer: "18" },
            { question: "5.53% = 1 / ?", answer: "19" },
            { question: "5% = 1 / ?", answer: "20" }
          ],
        questionList:[],
        question:'',
        answer: '',
        result: '',
        currentQuestionIndex: 1,
        score :0,
        questionCount: 0,
        totalCount: 10,
        gameOver: false
    },
    displayQuestion() {
        this.setData({
          questionCount: this.data.questionCount+1
        })
        // 先改index
        this.setData({
            currentQuestionIndex: Math.floor(Math.random() * 20),
        })
        // 再改问题
        this.setData({
            question: this.data.data[this.data.currentQuestionIndex].question
        })
      },

      checkAnswer() {
        let answer = this.data.answer;
        if (answer == this.data.data[this.data.currentQuestionIndex].answer) {
          this.setData({
            score: this.data.score + 1,
            result: "回答正确！",
            answer: ''
          });
        } else {
            this.setData({
                result: "回答错误。正确答案是：" + this.data.data[this.data.currentQuestionIndex].answer
            })
        }
        const questionList = this.data.questionList
        questionList.push({question:this.data.question,result:this.data.result})
        this.setData({
            questionList: questionList
        })
        if (this.data.questionCount < this.data.totalCount) {
          this.displayQuestion();
        } else {
            this.setData({
                question: '',
                result: `你的得分是 ${this.data.score} 分！`,
                gameOver: true
            })
          
        }
      },
      startAgain(){
        this.setData({
            question:'',
            answer: '',
            result: '',
            score : 0,
            questionCount: 0,
            gameOver: false,
            questionList: []
        })
        this.displayQuestion()
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
        this.displayQuestion()
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