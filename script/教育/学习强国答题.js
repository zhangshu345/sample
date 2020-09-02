// 获取题目，并获取答案
function cnosole_question() {
    var question;
    try {
        question = className("ListView").findOnce().parent().child(0).desc();
        console.log(question)
    } catch (err) {
        window.answer.setText("请重新获取答案")
    }

    try {
        http.get("http://47.105.59.72:8333/auto/api/v1/answer?keywords=" + question, {}, function (res, err) {
            if (err) {
                console.error(err);
                window.answer.setText("网络异常，请重试")
                return;
            }
            console.log(res.body.string())
            window.answer.setText(res.body.string())
        });

    } catch (err) {
        console.log(err)
        // console.log(r.body)
        // cnosole_question()
    }

}



// 悬浮框部分代码
var window = floaty.window(
    <frame>
        <button id="action" text="求助" w="90" h="40" bg="#77ffffff" />
        <text id="answer" text="点击可调整位置" textSize="16sp" />
    </frame>
);

window.setSize(500, 200)
window.exitOnClose();

window.action.click(() => {
    cnosole_question()
});

window.action.longClick(() => {
    window.setAdjustEnabled(!window.isAdjustEnabled());
    return true;
});

setInterval(() => { }, 1000);


