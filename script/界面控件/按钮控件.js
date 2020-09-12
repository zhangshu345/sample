"ui";

ui.layout(
    <vertical padding="16">
        <button text="普通按钮" w="auto" bl_corners_radius="4dp"    bl_solid_color="#E3B666"  bl_stroke_color="#8c6822"     bl_stroke_width="2dp"/>
        <button text="带颜色按钮" style="Widget.AppCompat.Button.Colored" w="auto"/>
        <button text="无边框按钮" style="Widget.AppCompat.Button.Borderless" w="auto"/>
        <button text="无边框有颜色按钮" style="Widget.AppCompat.Button.Borderless.Colored" w="auto"/>
        <button text="长长的按钮" w="*"/>
        <button id="click_me" text="点我" w="auto"/>
    </vertical>
);

ui.click_me.on("click", ()=>{
    toast("我被点啦");
});

ui.click_me.on("long_click", ()=>{
    toast("我被长按啦");
});