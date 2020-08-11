"ui";
importClass(android.graphics.Color);

ui.layout(
    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout id="swipe">
        <text id="str" text="下拉刷新测试"/>
    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
);
//设置颜色
ui.swipe.setColorSchemeColors(Color.RED, Color.BLUE, Color.GREEN);
//监听刷新事件
ui.swipe.setOnRefreshListener({
    onRefresh: function() {
        //为了看效果延迟一下
        setTimeout(function() {
            ui.str.setText(random(987654321, 123456789) + "");
            //设置刷新状态
            ui.swipe.setRefreshing(false);
        }, 3000);
    },
});