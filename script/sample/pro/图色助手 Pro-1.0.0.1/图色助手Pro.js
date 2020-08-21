requestScreenCapture();

var 模式 = "取色";

var 提示 = {
    内容: null,
    计时: null,
};

var 数据存储 = {
    颜色列表: [],
    找色编码: [],
    图片: null,    
};

var 屏幕属性 = {
    方向: 获取屏幕方向(),
    状态栏高度: 计算状态栏高度(),
    w: device.width,
    h: device.height,
    X: device.width,
};

var 布局属性 = {
    全局: {
        显示: true,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        锁定x: 0,
        锁定y: 0,
        初始x: 0,
        初始y: device.width * 0.05,
    },
    状态栏: {
        w: 缩放(240),
        h: 缩放(70),
        标题: "图色助手 Pro"
    },
    主界面: {
        显示: true,
    },
    侧拉栏: {
        显示: false,
    },
};

var 功能列表 = [{
        图标: "@drawable/ic_keyboard_arrow_left_black_48dp"
    },
    {
        图标: "@drawable/ic_colorize_black_48dp"
    },
    {
        图标: "@drawable/ic_check_circle_black_48dp"
    },
    {
        图标: "@drawable/ic_my_location_black_48dp"
    },
    {
        图标: "@drawable/ic_sd_card_black_48dp"
    },
    {
        图标: "@drawable/ic_layers_black_48dp"
    },
];

var 图形渲染 = {
    画布: {
        w: 0,
        h: 0,
        中心点: [0, 0],
    },
    图像: {
        图片: null,
        顶点_x: 0,
        顶点_y: 0,
        比例: 1,
    },
    指针: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        中心点: [0, 0],
        操作半径: 0,
    },
    控件坐标: {
        展示框: [缩放(10), 缩放(10), 缩放(160), 缩放(110)],
        X值: [缩放(20), 缩放(40)],
        Y值: [缩放(20), 缩放(70)],
        颜色值: [缩放(20), 缩放(100)],
    },
    焦点: {
        x: 0,
        y: 0,
    },
};

var 点色 = {
    x: 0,
    y: 0,
    颜色数值: -1,
    颜色字符串: "#ffffff",
    反色数值: -16777216,
    反色字符串: "#000000",
    颜色R: 255,
    颜色G: 255,
    颜色B: 255,
    反色R: 0,
    反色G: 0,
    反色B: 0,
};

旋转监听();
var 悬浮窗 = 控制台();


function 控制台() {
    var 悬浮窗 = new floaty.rawWindow(
        <vertical id="全局" w="auto" h="auto" bg="#50000000">
            <frame w="*" h="{{缩放(70)}}px" layout_gravity="bottom" bg="#60000000">
                <horizontal gravity="center_vertical">
                    <img id="总控" h="*" w="{{缩放(80)}}px" src="@drawable/ic_panorama_fish_eye_black_48dp" tint="#ffe785"/>
                    <text id="标题" text="{{布局属性.状态栏.标题}}" textColor="#ffe785" textSize="{{缩放(32)}}px"/>
                </horizontal>
                <horizontal gravity="center_vertical|right">
                    <img id="截图" w="{{缩放(80)}}px" h="*" src="@drawable/ic_wallpaper_black_48dp" tint="#ffe785"/>
                    <img id="关闭" w="{{缩放(80)}}px" h="*" src="@drawable/ic_close_black_48dp" tint="#ffe785"/>
                </horizontal>
            </frame>
            
            <frame margin="{{缩放(5)}}px" h="{{缩放(850)}}px">
                <canvas id="canvas" w="*" h="*"/>
                <frame w="auto" h="{{缩放(600)}}px" bg="#99000000" layout_gravity="right|center_vertical">
                    
                    <horizontal>
                        <list id="功能列表" h="*">
                            <img id="功能" w="{{缩放(50)}}px" h="{{缩放(98)}}px" src="{{图标}}" tint="#ffe785"/>
                        </list>
                        <frame id="侧拉栏" w="{{缩放(400)}}px" h="*">
                            <vertical id="颜色记录" w="*" h="*">
                                <card w="*" h="{{缩放(50)}}px" cardCornerRadius="0px" cardElevation="0dp" bg="#00000000">
                                    <text w="*" h="*" text="颜色记录" textSize="{{缩放(28)}}px" textColor="#ffe785" margin="{{缩放(10)}}px 0" gravity="left|center_vertical"/>
                                    <card id="清空" w="auto" h="auto" cardCornerRadius="{{缩放(20)}}px" cardElevation="0dp" backgroundTint="#ffe785" margin="{{缩放(3)}}px 0" layout_gravity="right|center_vertical">
                                        <text text="清空" textSize="{{缩放(28)}}px" textColor="#ff0000" margin="{{缩放(10)}} 0" layout_gravity="center"/>
                                    </card>
                                </card>
                                
                                <list id="颜色列表" h="*" bg="#50ffffff">
                                    <vertical w="*">
                                        <horizontal w="*" h="{{缩放(50)}}px" bg="?selectableItemBackground">
                                            <img id="删除_颜色" w="{{缩放(50)}}px" h="*" bg="#88000000" tint="#ffe785" src="@drawable/ic_clear_black_48dp" margin="{{缩放(5)}}px 3px 0 3px" gravity="center"/>
                                            <text w="{{缩放(90)}}px"h="*" text="{{颜色数据[0]}}" textColor="#ffe785" textSize="{{缩放(28)}}px" gravity="right|center_vertical"/>
                                            <text w="{{缩放(90)}}px" h="*" text="{{颜色数据[1]}}" textColor="#ffe785" textSize="{{缩放(28)}}px" gravity="right|center_vertical"/>
                                            <text w="{{缩放(150)}}px" h="*" text="{{颜色数据[2]}}" textColor="#ffe785" textSize="{{缩放(28)}}px" gravity="right|center_vertical"/>
                                        </horizontal>
                                        <frame w="*" h="{{缩放(3)}}px" bg="#33ffffff"/>
                                    </vertical>
                                </list>
                            </vertical>
                            
                            <vertical id="图片记录" w="*" h="*">
                                <card w="*" h="{{缩放(50)}}px" cardCornerRadius="0px" cardElevation="0dp" bg="#00000000">
                                    <text w="*" h="*" text="图片记录" textSize="{{缩放(28)}}px" textColor="#ffe785" margin="{{缩放(10)}}px 0" gravity="left|center_vertical"/>
                                </card>
                                
                                <img id="裁剪预览" w="*" h="*" bg="#50ffffff"/>
                            </vertical>
                        </frame>
                    </horizontal>
                    <frame w="*" h="1px" bg="#ffe785" layout_gravity="top"/>
                    <frame w="*" h="1px" bg="#ffe785" layout_gravity="bottom"/>
                    <frame w="1px" h="*" bg="#ffe785"/>
                </frame>
            </frame>
            
            <horizontal h="{{缩放(50)}}px" margin="0 0" bg="#60000000" layout_gravity="bottom">
                <text id="倍率" w="auto" h="*" textSize="{{缩放(28)}}px" text="1X" textColor="#ffe785" margin="{{缩放(8)}}px 0 0 0" gravity="center"/>
                <seekbar id="放大" progress="1" max="50" w="*" h="*"/>
            </horizontal>
        </vertical>
    );



    var 画笔1 = new Paint;//描边画笔，绘制指针
    画笔1.setTextAlign(Paint.Align.CENTER);
    画笔1.setStrokeWidth(3); //设置画笔宽度为3像素
    画笔1.setStyle(Paint.Style.STROKE); //设置画笔为描边
    画笔1.setARGB(255, 255, 230, 130);
    
    var 画笔2 = new Paint;//填充画笔，绘制文字与颜色展示框
    画笔2.setTextSize(缩放(28));//设置文字大小为28像素
    
    悬浮窗.canvas.on("draw", function(canvas) {
        try {
            canvas.drawARGB(255, 200, 200, 200);
            if (!图形渲染.图像.图片) {
                return;
            };
            实时取色();
            var matrix = new android.graphics.Matrix();
            matrix.postScale(图形渲染.图像.比例, 图形渲染.图像.比例);
            matrix.postTranslate(图形渲染.图像.顶点_x, 图形渲染.图像.顶点_y);
            canvas.drawImage(图形渲染.图像.图片, matrix, 画笔1);
            画笔1.setARGB(255, 点色.反色R, 255, 点色.反色B);
            if (模式 == "截图") {
                canvas.drawRect(图形渲染.指针.x1, 图形渲染.指针.y1, 图形渲染.指针.x2, 图形渲染.指针.y2, 画笔1);
                canvas.drawCircle(图形渲染.指针.x1, 图形渲染.指针.y1, 3, 画笔1);
                canvas.drawCircle(图形渲染.指针.x2, 图形渲染.指针.y2, 3, 画笔1);
            } else {
                画笔2.setARGB(255, 点色.颜色R, 点色.颜色G, 点色.颜色B);
                canvas.drawRect(图形渲染.控件坐标.展示框[0], 图形渲染.控件坐标.展示框[1], 图形渲染.控件坐标.展示框[2], 图形渲染.控件坐标.展示框[3], 画笔2);
                canvas.drawRect(图形渲染.控件坐标.展示框[0], 图形渲染.控件坐标.展示框[1], 图形渲染.控件坐标.展示框[2], 图形渲染.控件坐标.展示框[3], 画笔1);
                画笔2.setARGB(255, 点色.反色R, 255, 点色.反色B);
                canvas.drawText("X:" + 点色.x, 图形渲染.控件坐标.X值[0], 图形渲染.控件坐标.X值[1], 画笔2);
                canvas.drawText("Y:" + 点色.y, 图形渲染.控件坐标.Y值[0], 图形渲染.控件坐标.Y值[1], 画笔2);
                canvas.drawText(点色.颜色字符串, 图形渲染.控件坐标.颜色值[0], 图形渲染.控件坐标.颜色值[1], 画笔2);
            };
            canvas.drawCircle(图形渲染.指针.中心点[0], 图形渲染.指针.中心点[1], 10, 画笔1);
            if (提示.内容 != null) {
                画笔2.setARGB(255, 255, 255, 255);
                canvas.drawRect(0, 图形渲染.画布.h, 图形渲染.画布.w, 图形渲染.画布.h - 缩放(50), 画笔2);
                画笔2.setARGB(255, 0, 0, 0);
                canvas.drawText(提示.内容, 缩放(20), 图形渲染.画布.h - 缩放(15), 画笔2);
            };
        } catch (e) {
            log("绘图出现错误:" + e);
        };
    });



    ui.run(() => {
        //初始化对象
        悬浮窗.全局.attr("visibility", "invisible");
        悬浮窗.setTouchable(false);
        悬浮窗.setSize(缩放(1000), -2);
        悬浮窗.setPosition(0, 布局属性.全局.初始y);
        悬浮窗.侧拉栏.setVisibility('8');
        悬浮窗.图片记录.setVisibility('8');

        悬浮窗.功能列表.setDataSource(功能列表);
        悬浮窗.颜色列表.setDataSource(数据存储.颜色列表);

        setTimeout(() => {
            布局属性.全局.w = 悬浮窗.getWidth();
            布局属性.全局.h = 悬浮窗.getHeight();
            布局属性.全局.x = 悬浮窗.getX();
            布局属性.全局.y = 悬浮窗.getY();
            布局属性.全局.锁定x = 悬浮窗.getX();
            布局属性.全局.锁定y = 悬浮窗.getY();
            图形渲染.画布.w = 悬浮窗.canvas.getWidth();
            图形渲染.画布.h = 悬浮窗.canvas.getHeight();
            图形渲染.画布.中心点 = [图形渲染.画布.w / 2, 图形渲染.画布.h / 2];
            图形渲染.指针.x1 = 图形渲染.画布.中心点[0] - 100;
            图形渲染.指针.y1 = 图形渲染.画布.中心点[1] - 100;
            图形渲染.指针.x2 = 图形渲染.画布.中心点[0] + 100;
            图形渲染.指针.y2 = 图形渲染.画布.中心点[1] + 100;
            图形渲染.指针.中心点 = [图形渲染.指针.x1 + (图形渲染.指针.x2 - 图形渲染.指针.x1) / 2, 图形渲染.指针.y1 + (图形渲染.指针.y2 - 图形渲染.指针.y1) / 2];
            悬浮窗.标题.setText("");
            悬浮窗.setSize(布局属性.状态栏.w, 布局属性.状态栏.h);
            悬浮窗.全局.attr("visibility", "visible");
            显示主界面();
        }, 1000);
    });


    悬浮窗.放大.setOnSeekBarChangeListener({
        onProgressChanged: function(seekbar, p, fromUser) {
            if (fromUser) {
                let 倍率 = (悬浮窗.放大.getProgress().toString() - 0);
                if (倍率 == 0) 倍率 = 0.5;
                悬浮窗.倍率.setText(倍率 + "X");
                if (图形渲染.图像.图片 != null) {
                    缩放图片(倍率);
                };
            }
        }
    });

    悬浮窗.功能列表.on("item_bind", function(itemView, itemHolder) {
        itemView.功能.on("click", function() {
            switch (itemHolder.position) {
                case 0:
                    if (布局属性.侧拉栏.显示) {
                        悬浮窗.侧拉栏.setVisibility('8');
                        功能列表[0].图标 = "@drawable/ic_keyboard_arrow_left_black_48dp";
                        布局属性.侧拉栏.显示 = false;
                    } else {
                        悬浮窗.侧拉栏.setVisibility('0');
                        功能列表[0].图标 = "@drawable/ic_keyboard_arrow_right_black_48dp"
                        布局属性.侧拉栏.显示 = true;
                    };

                    break;
                case 1:
                    if (模式 == "截图") {
                        取色模式();
                    } else {
                        截图模式();
                    };
                    break;
                case 2:
                    if (模式 == "取色") {
                        if (图形渲染.图像.图片 == null) {
                            系统提示("请先截图");
                        } else {
                            取色();
                            多点找色编码();
                        };
                    } else {
                        if (图形渲染.图像.图片 == null) {
                            系统提示("请先截图");
                        } else {
                            裁剪图片();
                        };
                    };
                    break;
                case 3:
                    if (模式 == "取色") {
                        if (数据存储.颜色列表.length < 2) {
                            系统提示("至少取2个点");
                        } else {
                            找色测试();
                        };
                    } else {
                        if (数据存储.图片 == null) {
                            系统提示("请先裁剪图片");
                        } else {
                            找图测试();
                        };
                    };
                    break;
                case 4:
                    if (模式 == "截图") {
                        if (数据存储.图片 == null) {
                            系统提示("请先截图");
                        } else {
                            隐藏悬浮窗(() => {
                                保存图片(() => {
                                    显示悬浮窗();
                                });
                            });
                        };
                    } else {
                        if (数据存储.颜色列表.length < 2) {
                            系统提示("请取至少2个像素点");
                        } else {
                            多点找色编码();
                            隐藏悬浮窗(() => {
                                保存颜色数据(() => {
                                    显示悬浮窗();
                                });
                            });
                        };
                    };
                    break;
                case 5:
                    if (模式 == "截图") {
                        if (数据存储.图片 == null) {
                            系统提示("请先裁剪图片");
                        } else {
                            复制图片编码();
                        };
                    }else{
                        if (数据存储.颜色列表.length < 2) {
                            系统提示("请取至少2个像素点");
                        } else {
                            多点找色编码();
                            隐藏悬浮窗(() => {
                                复制点阵编码(() => {
                                    显示悬浮窗();
                                });
                            })
                        };
                    };
                    break;
            };
            悬浮窗.功能列表.adapter.notifyDataSetChanged();
        });
    });

    var windowX, windowY, downTime, x, y, 最大宽度, 最大高度, 位移;
    悬浮窗.总控.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = 悬浮窗.getX();
                windowY = 悬浮窗.getY();
                downTime = new Date().getTime();
                位移 = false;
                最大宽度 = 屏幕属性.w - 悬浮窗.getWidth();
                最大高度 = 屏幕属性.h - 悬浮窗.getHeight();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                let sX = windowX + (event.getRawX() - x);
                let sY = windowY + (event.getRawY() - y);
                if (sX < 0) sX = 0;
                if (sY < 0) sY = 0;
                if (sX > 最大宽度) sX = 最大宽度;
                if (sY > 最大高度) sY = 最大高度;
                if (new Date().getTime() - downTime > 100 && Math.abs(event.getRawY() - y) > 10 && Math.abs(event.getRawX() - x) > 10 || 位移 == true) {
                    if (位移 == false) {
                        device.vibrate(30);
                    };
                    位移 = true;
                    布局属性.全局.x = sX;
                    布局属性.全局.y = sY;
                    布局属性.全局.锁定x = sX;
                    布局属性.全局.锁定y = sY;
                    悬浮窗.setPosition(布局属性.全局.x, 布局属性.全局.y);
                };
                return true;
            case event.ACTION_UP:
                if (Math.abs(event.getRawY() - y) < 10 && Math.abs(event.getRawX() - x) < 10) {
                    if (布局属性.主界面.显示) {
                        隐藏主界面();
                    } else {
                        显示主界面();
                    };
                }
                return true;
        }
        return true;
    });


    var 按下_坐标 = new Array; //记录手指按下时相对于布局的坐标;
    var sX, sY; //记录手指第一次按下时相对于屏幕的坐标
    var imgX, imgY; //记录手指按下时图片的顶点坐标
    var 焦点; //记录手指按下时焦点的坐标
    var 目标 = ""; //记录手指按下时点击的控件
    var 指针_x1, 指针_y1, 指针_x2, 指针_y2, 指针_中心点; //记录手指按下时指针的坐标
    悬浮窗.canvas.setOnTouchListener(function(view, event) {
        try {
            sw: switch (event.getAction()) {
                case event.ACTION_DOWN:
                    图形渲染.画布.w = view.width;
                    图形渲染.画布.h = view.height;
                    图形渲染.画布.中心点 = [图形渲染.画布.w / 2, 图形渲染.画布.h / 2];
                    按下_坐标 = [event.getX(), event.getY()];
                    目标 = 目标分析(按下_坐标[0], 按下_坐标[1]);
                    sX = event.getRawX();
                    sY = event.getRawY();
                    imgX = 图形渲染.图像.顶点_x;
                    imgY = 图形渲染.图像.顶点_y;
                    焦点 = [图形渲染.焦点.x, 图形渲染.焦点.y];
                    指针_x1 = 图形渲染.指针.x1;
                    指针_y1 = 图形渲染.指针.y1;
                    指针_x2 = 图形渲染.指针.x2;
                    指针_y2 = 图形渲染.指针.y2;
                    指针_中心点 = [图形渲染.指针.中心点[0], 图形渲染.指针.中心点[1]];
                    log("手指按下坐标:" + 按下_坐标);
                    break;
                case event.ACTION_MOVE:
                    let 滑动距离_x = event.getRawX() - sX;
                    let 滑动距离_y = event.getRawY() - sY;
                    switch (目标) {
                        case "指针_xy1":
                            缩放指针("xy1", 指针_x1 + 滑动距离_x, 指针_y1 + 滑动距离_y);
                            图形渲染.焦点.x = 焦点[0] - (指针_中心点[0] - 图形渲染.指针.中心点[0]) / 图形渲染.图像.比例;
                            图形渲染.焦点.y = 焦点[1] - (指针_中心点[1] - 图形渲染.指针.中心点[1]) / 图形渲染.图像.比例;
                            break;
                        case "指针_xy2":
                            缩放指针("xy2", 指针_x2 + 滑动距离_x, 指针_y2 + 滑动距离_y);
                            图形渲染.焦点.x = 焦点[0] - (指针_中心点[0] - 图形渲染.指针.中心点[0]) / 图形渲染.图像.比例;
                            图形渲染.焦点.y = 焦点[1] - (指针_中心点[1] - 图形渲染.指针.中心点[1]) / 图形渲染.图像.比例;
                            break;
                        case "指针_中心点":
                            移动指针(指针_x1 + 滑动距离_x, 指针_y1 + 滑动距离_y);
                            图形渲染.焦点.x = 焦点[0] - (指针_中心点[0] - 图形渲染.指针.中心点[0]) / 图形渲染.图像.比例;
                            图形渲染.焦点.y = 焦点[1] - (指针_中心点[1] - 图形渲染.指针.中心点[1]) / 图形渲染.图像.比例;
                            break;
                        case "图片":
                            移动图片(imgX + 滑动距离_x, imgY + 滑动距离_y);
                            图形渲染.焦点.x = 焦点[0] - 滑动距离_x / 图形渲染.图像.比例;
                            图形渲染.焦点.y = 焦点[1] - 滑动距离_y / 图形渲染.图像.比例;
                            break;
                    };
                    //实时取色();
                    break;
                case event.ACTION_UP:
                    log("手指抬起");

                    break;
            };

            return true;
        }
        catch (e) {
            系统提示Log("Touch: " + e);
            return true;
        };
    });



    悬浮窗.清空.click(() => {
        let n = 数据存储.颜色列表.length;
        for (var i = 0; i < n; i++) {
            数据存储.颜色列表.pop();
        };
    });

    悬浮窗.颜色列表.on("item_bind", function(itemView, itemHolder) {
        itemView.删除_颜色.on("click", function() {
            数据存储.颜色列表.splice(itemHolder.position, 1);
        });
    });

    悬浮窗.截图.click(() => {
        截图();
    });

    悬浮窗.关闭.click(() => {
        悬浮窗.canvas.removeAllListeners();
        exit();
    });

    return 悬浮窗;
};

function 复制图片编码(){
    var base64 = images.toBase64(数据存储.图片, "png", 100);
    setClip(base64);
    系统提示("图片base64编码已成功复制到剪切板");
};

function 复制点阵编码(回调){
    dialogs.singleChoice("复制点色数据:", ["多点找色", "多点比色"], 2, (i) => {
        let 点色数据 = [];
        switch (i) {
        case 0:
            setClip(JSON.stringify(数据存储.找色编码));
            系统提示("多点找色数据已成功复制到剪切板");
            break;
        case 1:
            for(元素 of 数据存储.颜色列表){
                点色数据.push(元素.颜色数据);
            };
            setClip(JSON.stringify(点色数据));
            系统提示("多点比色数据已成功复制到剪切板")
            break;
        };
        回调(true);
    });
};

function 实时取色() {
    var X = 图形渲染.指针.中心点[0] - 图形渲染.图像.顶点_x,
        Y = 图形渲染.指针.中心点[1] - 图形渲染.图像.顶点_y;
    var x = X / 图形渲染.图像.比例;
    var y = Y / 图形渲染.图像.比例;
    var x = Math.floor((0 <= x && x < 图形渲染.图像.图片.getWidth()) ? x : (0 <= x ? 图形渲染.图像.图片.getWidth() - 1 : 0));
    var y = Math.floor((0 <= y && y < 图形渲染.图像.图片.getHeight()) ? y : (0 <= y ? 图形渲染.图像.图片.getHeight() - 1 : 0));
    var 颜色数值 = images.pixel(图形渲染.图像.图片, 点色.x, 点色.y);
    var 颜色字符串 = colors.toString(颜色数值);
    var 反色数值 = 反色(颜色数值);
    var 反色字符串 = colors.toString(反色数值);
    var 颜色R = colors.red(颜色字符串);
    var 颜色G = colors.green(颜色字符串);
    var 颜色B = colors.blue(颜色字符串);
    var 反色R = colors.red(反色字符串);
    var 反色G = colors.green(反色字符串);
    var 反色B = colors.blue(反色字符串);

    点色 = {
        x: x,
        y: y,
        颜色数值: 颜色数值,
        颜色字符串: "#" + 颜色字符串.slice(3),
        反色数值: 反色数值,
        反色字符串: "#" + 反色字符串.slice(3),
        颜色R: 颜色R,
        颜色G: 颜色G,
        颜色B: 颜色B,
        反色R: 反色R,
        反色G: 反色G,
        反色B: 反色B,
    };
};

function 目标分析(x, y) {
    if (x > (图形渲染.指针.x2 - 图形渲染.指针.操作半径) && x < (图形渲染.指针.x2 + 图形渲染.指针.操作半径) && y > (图形渲染.指针.y2 - 图形渲染.指针.操作半径) && y < (图形渲染.指针.y2 + 图形渲染.指针.操作半径)) {
        log("目标在xy2");
        return "指针_xy2";
    } else if (x > (图形渲染.指针.x1 - 图形渲染.指针.操作半径) && x < (图形渲染.指针.x1 + 图形渲染.指针.操作半径) && y > (图形渲染.指针.y1 - 图形渲染.指针.操作半径) && y < (图形渲染.指针.y1 + 图形渲染.指针.操作半径)) {
        log("目标在指针内");
        return ("指针_xy1");
    } else if (x > (图形渲染.指针.中心点[0] - 图形渲染.指针.操作半径) && x < (图形渲染.指针.中心点[0] + 图形渲染.指针.操作半径) && y > (图形渲染.指针.中心点[1] - 图形渲染.指针.操作半径) && y < (图形渲染.指针.中心点[1] + 图形渲染.指针.操作半径)) {
        log("目标在中心点");
        return "指针_中心点";
    } else {
        log("目标在图片");
        return "图片";
    };
};

function 缩放指针(xy, x, y) {
    let 边距 = 20;
    if (xy == "xy2") {
        x < 图形渲染.画布.w - 边距 && x - 图形渲染.指针.x1 > 100 ? 图形渲染.指针.x2 = x : x - 图形渲染.指针.x1 > 100 ? 图形渲染.指针.x2 = 图形渲染.画布.w - 边距 : 图形渲染.指针.x2 = 图形渲染.指针.x1 + 100;
        y < 图形渲染.画布.h - 边距 && y - 图形渲染.指针.y1 > 100 ? 图形渲染.指针.y2 = y : y - 图形渲染.指针.y1 > 100 ? 图形渲染.指针.y2 = 图形渲染.画布.h - 边距 : 图形渲染.指针.y2 = 图形渲染.指针.y1 + 100;
    } else {
        x > 0 + 边距 && 图形渲染.指针.x2 - x > 100 ? 图形渲染.指针.x1 = x : 图形渲染.指针.x2 - x > 100 ? 图形渲染.指针.x1 = 0 + 边距 : 图形渲染.指针.x1 = 图形渲染.指针.x2 - 100;
        y > 0 + 边距 && 图形渲染.指针.y2 - y > 100 ? 图形渲染.指针.y1 = y : 图形渲染.指针.y2 - y > 100 ? 图形渲染.指针.y1 = 0 + 边距 : 图形渲染.指针.y1 = 图形渲染.指针.y2 - 100;
    };
    图形渲染.指针.中心点 = [图形渲染.指针.x1 + (图形渲染.指针.x2 - 图形渲染.指针.x1) / 2, 图形渲染.指针.y1 + (图形渲染.指针.y2 - 图形渲染.指针.y1) / 2];
};


function 移动指针(x, y) {
    let 边距 = 20;
    let w = 图形渲染.指针.x2 - 图形渲染.指针.x1;
    let h = 图形渲染.指针.y2 - 图形渲染.指针.y1;
    x > 0 + 边距 && x + w < 图形渲染.画布.w - 边距 ? 图形渲染.指针.x1 = x : x + w < 图形渲染.画布.w - 边距 ? 图形渲染.指针.x1 = 0 + 边距 : 图形渲染.指针.x1 = 图形渲染.画布.w - 边距 - w;
    y > 0 + 边距 && y + h < 图形渲染.画布.h - 边距 ? 图形渲染.指针.y1 = y : y + h < 图形渲染.画布.h - 边距 ? 图形渲染.指针.y1 = 0 + 边距 : 图形渲染.指针.y1 = 图形渲染.画布.h - 边距 - h;
    图形渲染.指针.x2 = 图形渲染.指针.x1 + w;
    图形渲染.指针.y2 = 图形渲染.指针.y1 + h;
    图形渲染.指针.中心点 = [图形渲染.指针.x1 + (图形渲染.指针.x2 - 图形渲染.指针.x1) / 2, 图形渲染.指针.y1 + (图形渲染.指针.y2 - 图形渲染.指针.y1) / 2];
};

function 截图() {
    ui.run(() => {
        悬浮窗.setTouchable(false);
    });
    隐藏悬浮窗(() => {
        threads.start(function() {
            sleep(100);
            let img = captureScreen();
            图形渲染.图像.图片 = images.copy(img);
            图形渲染.焦点.x = 0;
            图形渲染.焦点.y = 0;
            缩放图片(图形渲染.图像.比例);
            显示悬浮窗(() => {
                ui.run(() => {
                    悬浮窗.setTouchable(true);
                });
            });
        });
    });
};

function 缩放图片(比例) {
    if (比例 == 0) 比例 = 0.5;
    try {
        var x = 0 - ((图形渲染.图像.图片.getWidth() / 2 + 图形渲染.焦点.x) * 比例) + 图形渲染.指针.中心点[0];
        var y = 0 - ((图形渲染.图像.图片.getHeight() / 2 + 图形渲染.焦点.y) * 比例) + 图形渲染.指针.中心点[1];
    } catch (e) {
        系统提示Log("异常错误:" + e);
    };
    图形渲染.图像.顶点_x = x;
    图形渲染.图像.顶点_y = y;
    图形渲染.图像.比例 = 比例;
};

function 移动图片(x, y) {
    let 比例 = 图形渲染.图像.比例;
    图形渲染.图像.顶点_x = x;
    图形渲染.图像.顶点_y = y;
    图形渲染.图像.比例 = 比例;
};

function 裁剪图片() {
    let xy1 = 计算坐标(图形渲染.指针.x1, 图形渲染.指针.y1);
    let xy2 = 计算坐标(图形渲染.指针.x2, 图形渲染.指针.y2);
    x = xy1.x;
    y = xy1.y;
    w = xy2.x - xy1.x;
    h = xy2.y - xy1.y;
    try {
        数据存储.图片 = images.clip(图形渲染.图像.图片, x, y, w, h);
        悬浮窗.裁剪预览.setSource(数据存储.图片);
    } catch (e) {
        系统提示("面积过小,无法继续裁剪");
    };
};

function 找图测试() {
    try {
        let t = new Date().getTime();
        let img = 图形渲染.图像.图片;
        let p = findImage(img, 数据存储.图片, {
            threshold: [0.9],
        });
        if (p) {
            系统提示("找到图片:" + p + " 耗时:" + (new Date().getTime() - t) + "毫秒");
            图片定位(p);
        } else {
            系统提示("没有找到图片,测试失败");
        };
    } catch (e) {
        系统提示("异常错误:" + e);
    };
};

function 取色() {
    let xy = {x: 点色.x, y: 点色.y};
    let 颜色 = 点色.颜色字符串;
    数据存储.颜色列表.push({
        颜色数据: [xy.x.toFixed(0), xy.y.toFixed(0), 颜色]
    });
};

function 多点找色编码() {
    let 编码 = []

    let 基准点 = 数据存储.颜色列表[0]["颜色数据"];

    for (var 元素 of 数据存储.颜色列表) {
        元素 = 元素["颜色数据"];
        let X = 元素[0] - 基准点[0];
        let Y = 元素[1] - 基准点[1];
        let 颜色 = 元素[2];
        编码.push([X, Y, 颜色]);
    };
    编码.shift();
    数据存储.找色编码 = [基准点[2], 编码];
    return true;
};

function 找色测试() {
    try {
        let t = new Date().getTime();
        let img = 图形渲染.图像.图片;
        var p = images.findMultiColors(img, 数据存储.找色编码[0], 数据存储.找色编码[1], {
            threshold: [4],
        });

        if (p) {
            系统提示("找到点阵:" + p + " 耗时:" + (new Date().getTime() - t) + "毫秒");
            点阵定位(p);
        } else {
            系统提示("没有找到点阵,测试失败");
        };
    } catch (e) {
        系统提示("异常错误:" + e);
    };
};

function 截图模式() {
    模式 = "截图";
    图形渲染.指针.操作半径 = 40;
    图形渲染.指针.中心点 = [图形渲染.指针.x1 + (图形渲染.指针.x2 - 图形渲染.指针.x1) / 2, 图形渲染.指针.y1 + (图形渲染.指针.y2 - 图形渲染.指针.y1) / 2];
    悬浮窗.颜色记录.setVisibility('8');
    悬浮窗.图片记录.setVisibility('0');
    功能列表[1].图标 = "@drawable/ic_crop_free_black_48dp";
};

function 取色模式() {
    模式 = "取色";
    图形渲染.指针.中心点 = 图形渲染.画布.中心点;
    图形渲染.指针.操作半径 = 0;
    悬浮窗.图片记录.setVisibility('8');
    悬浮窗.颜色记录.setVisibility('0');
    功能列表[1].图标 = "@drawable/ic_colorize_black_48dp";
};

function 图片定位(坐标) {
    let sX = 坐标.x - 图形渲染.图像.图片.getWidth() / 2;
    let sY = 坐标.y - 图形渲染.图像.图片.getHeight() / 2;
    图形渲染.焦点.x = sX - (图形渲染.指针.x1 - 图形渲染.指针.中心点[0]) / 图形渲染.图像.比例;
    图形渲染.焦点.y = sY - (图形渲染.指针.y1 - 图形渲染.指针.中心点[1]) / 图形渲染.图像.比例;
    缩放图片(图形渲染.图像.比例);
};

function 点阵定位(坐标) {
    let sX = 坐标.x - 图形渲染.图像.图片.getWidth() / 2;
    let sY = 坐标.y - 图形渲染.图像.图片.getHeight() / 2;
    图形渲染.焦点.x = sX;
    图形渲染.焦点.y = sY;
    缩放图片(图形渲染.图像.比例);
};

function 隐藏主界面() {
    布局属性.主界面.显示 = false;
    ui.run(() => {
        悬浮窗.setTouchable(false);
    });
    缩放动画("缩小", () => {
        ui.run(() => {
            悬浮窗.setTouchable(true);
        });
    });
};

function 显示主界面() {
    布局属性.主界面.显示 = true;
    ui.run(() => {
        悬浮窗.setTouchable(false);
    });
    缩放动画("放大", () => {
        ui.run(() => {
            悬浮窗.setTouchable(true);
        });
    });
};

function 隐藏悬浮窗(回调) {
    let 帧 = 10;

    let 目标 = [0, 0];
    var 边距 = 计算边距();
    var 最小值 = 求最小值([边距.上, 边距.下, 边距.左, 边距.右]);
    if (最小值[0] == 0) {
        目标 = [悬浮窗.getX(), 0 - 屏幕属性.状态栏高度 - 悬浮窗.getHeight()];
    } else if (最小值[0] == 1) {
        目标 = [悬浮窗.getX(), 屏幕属性.h + 悬浮窗.getHeight()];
    } else if (最小值[0] == 2) {
        目标 = [0 - 悬浮窗.getWidth(), 悬浮窗.getY()];
    } else if (最小值[0] == 3) {
        目标 = [屏幕属性.w + 悬浮窗.getWidth(), 悬浮窗.getY()];
    } else {
        目标 = [0 - 屏幕属性.状态栏高度 - 悬浮窗.getWidth(), 悬浮窗.getY()];
    };

    let fpsXY = [(目标[0] - 悬浮窗.getX()) / 帧, (目标[1] - 悬浮窗.getY()) / 帧];
    let dX = 悬浮窗.getX();
    let dY = 悬浮窗.getY();

    threads.start(function() {
        for (var i = 0; i <= 帧; i++) {
            ui.run(() => {
                悬浮窗.setPosition(dX + fpsXY[0] * i, dY + fpsXY[1] * i);
            });
            sleep(100 / 帧);
        };
        回调(true);
    });
};

function 显示悬浮窗(回调) {
    let 帧 = 10;
    let 目标 = [布局属性.全局.x, 布局属性.全局.y];
    let 当前坐标 = [悬浮窗.getX(), 悬浮窗.getY()];
    let fpsXY = [(目标[0] - 悬浮窗.getX()) / 帧, (目标[1] - 悬浮窗.getY()) / 帧];

    threads.start(function() {
        for (var i = 0; i <= 帧; i++) {
            ui.run(() => {
                悬浮窗.setPosition(当前坐标[0] + fpsXY[0] * i, 当前坐标[1] + fpsXY[1] * i);
            });
            sleep(100 / 帧);
        };
        回调(true);
    });
};

function 悬浮窗复位() {
    let 帧 = 60;
    var 目标 = [布局属性.全局.初始x, 布局属性.全局.初始y];
    let 当前坐标 = [悬浮窗.getX(), 悬浮窗.getY()];
    let fpsXY = [(目标[0] - 悬浮窗.getX()) / 帧, (目标[1] - 悬浮窗.getY()) / 帧];

    threads.start(function() {
        for (var i = 0; i <= 帧; i++) {
            let sX = 当前坐标[0] + fpsXY[0] * i;
            let sY = 当前坐标[1] + fpsXY[1] * i
            布局属性.全局.x = sX;
            布局属性.全局.y = sY;
            布局属性.全局.锁定x = sX;
            布局属性.全局.锁定y = sY;
            ui.run(() => {
                悬浮窗.setPosition(布局属性.全局.x, 布局属性.全局.y);
            });
            sleep(100 / 帧);
        };
    });
};

function 缩放动画(动作, 回调) {
    var 帧 = 5;
    var fpsW, fpsH, 当前w, 当前h, w, h;
    var x, y;

    x = 布局属性.全局.锁定x;
    y = 布局属性.全局.锁定y;

    if (动作 == "放大") {
        当前w = 布局属性.状态栏.w;
        当前h = 布局属性.状态栏.h;
        fpsW = (布局属性.全局.w - 当前w) / 帧;
        fpsH = (布局属性.全局.h - 当前h) / 帧;

        ui.run(() => {
            悬浮窗.标题.setText(布局属性.状态栏.标题);
        });
    } else {
        当前w = 布局属性.全局.w;
        当前h = 布局属性.全局.h;
        fpsW = (布局属性.状态栏.w - 当前w) / 帧;
        fpsH = (布局属性.状态栏.h - 当前h) / 帧;
        ui.run(() => {
            悬浮窗.标题.setText("");
        });
    };
    threads.start(function() {
        for (var i = 0; i <= 帧; i++) {
            ui.run(() => {
                let w = 当前w + fpsW * i;
                let h = 当前h + fpsH * i;
                if (动作 == "放大") {
                    if (布局属性.全局.x + w > 屏幕属性.w) x = 屏幕属性.w - w;
                    if (布局属性.全局.y + h > 屏幕属性.h) y = 屏幕属性.h - h;
                    悬浮窗.setPosition(x, y);
                } else {
                    let fpsX = (布局属性.全局.锁定x - 布局属性.全局.x) / 帧;
                    let fpsY = (布局属性.全局.锁定y - 布局属性.全局.y) / 帧;
                    悬浮窗.setPosition(布局属性.全局.x + fpsX * i, 布局属性.全局.y + fpsY * i);
                };
                悬浮窗.setSize(w, h);
            });
            sleep(50 / 帧);
        };
        ui.run(() => {
            布局属性.全局.x = 悬浮窗.getX();
            布局属性.全局.y = 悬浮窗.getY();
        });
        回调(true);
    });
};

function 保存图片(回调) {
    dialogs.build({
        title: "请输入图片名称",
        inputPrefill: "图片1",
        negative: "取消",
        positive: "保存",
        canceledOnTouchOutside: false,
    }).on("input", (名称) => {
        if (名称 == null || 名称 == "") {
            系统提示("名称不可为空");
        } else {
            var 路径 = files.getSdcardPath() + "/图色助手Pro/图片/" + device.width + "*" + device.height + "/" + 名称 + ".png"
            files.createWithDirs(路径);
            images.saveImage(数据存储.图片, 路径);
            系统提示("图片保存成功");
        };
        回调(true);
    }).on("negative", () => {
        回调(true);
    }).show();
};

function 保存颜色数据(回调) {
    dialogs.build({
        title: "请输入点阵名称",
        inputPrefill: "点阵1",
        negative: "取消",
        positive: "保存",
        canceledOnTouchOutside: false,
    }).on("input", (名称) => {
        if (名称 == null || 名称 == "") {
            系统提示("名称不可为空");
        } else {
            var 路径 = files.getSdcardPath() + "/图色助手Pro/点阵/" + device.width + "*" + device.height + "/" + 名称 + ".txt"
            files.createWithDirs(路径);
            var 颜色 = [];
            for(元素 of 数据存储.颜色列表){
                颜色.push(元素.颜色数据);
            };
            var 编码 = {多点找色: 数据存储.找色编码, 多点比色: 颜色};
            var s = JSON.stringify(编码);
            files.write(路径, s);
            系统提示("点阵保存成功");
        };
        回调(true);
    }).on("negative", () => {
        回调(true);
    }).show();
};

function 计算坐标(X, Y) {
    var X = X - 图形渲染.图像.顶点_x,
        Y = Y - 图形渲染.图像.顶点_y;
    var x = X / 图形渲染.图像.比例;
    var y = Y / 图形渲染.图像.比例;
    x = Math.floor((0 <= x && x < 图形渲染.图像.图片.getWidth()) ? x : (0 <= x ? 图形渲染.图像.图片.getWidth() - 1 : 0));
    y = Math.floor((0 <= y && y < 图形渲染.图像.图片.getHeight()) ? y : (0 <= y ? 图形渲染.图像.图片.getHeight() - 1 : 0));
    return {
        x: x,
        y: y,
    };
};

function 计算边距() {
    return {
        上: 悬浮窗.getY(),
        下: 屏幕属性.h - (悬浮窗.getY() + 悬浮窗.getHeight()),
        左: 悬浮窗.getX(),
        右: 屏幕属性.w - (悬浮窗.getX() + 悬浮窗.getWidth()),
    };
};

function 求最小值(数组) {
    var 最小值 = 数组[0];
    var n = 0;
    var 元素 = n;
    for (var i of 数组) {
        if (i < 最小值)(最小值 = i, 元素 = n);
        n++;
    };
    return [元素, 最小值];
};

function 计算状态栏高度() {
    var w = floaty.rawWindow(
        <frame w="{{device.width}}" h="{{device.height}}"/>
    );

    ui.run(function() {
        w.setTouchable(false);
    });
    var 显示分辨率 = [w.getWidth(), w.getHeight()];
    var 物理分辨率 = [device.width, device.height];
    var 状态栏高度 = 物理分辨率[1] - 显示分辨率[1];
    w.close();
    return 状态栏高度;
};

function 系统提示(s){
    提示.内容 = s;
    if (提示.计时 != null){
        clearTimeout(提示.计时);
    };
    提示.计时 = setTimeout(() => {
        提示.内容 = null;
        提示.计时 = null;
    }, 3000);
};


function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};

function 获取屏幕方向() {
    let config = context.getResources().getConfiguration();
    let ori = config.orientation;
    if (ori == config.ORIENTATION_LANDSCAPE) {
        return "横屏";
    } else if (ori == config.ORIENTATION_PORTRAIT) {
        return "竖屏";
    };
};

function 旋转监听() {
    屏幕属性.方向 == "竖屏" ? (屏幕属性.w = device.width, 屏幕属性.h = device.height - 屏幕属性.状态栏高度) : (屏幕属性.h = device.width, 屏幕属性.w = device.height - 屏幕属性.状态栏高度);
    setInterval(() => {
        var 获取方向 = 获取屏幕方向()
        if (获取方向 != 屏幕属性.方向) {
            屏幕属性.方向 = 获取方向;
            悬浮窗复位();
            屏幕属性.方向 == "竖屏" ? (屏幕属性.w = device.width, 屏幕属性.h = device.height - 屏幕属性.状态栏高度) : (屏幕属性.h = device.width, 屏幕属性.w = device.height - 屏幕属性.状态栏高度);
        };
    }, 100);
};


function 缩放(n) {
    return Math.floor((屏幕属性.X / 1080) * n);
};


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------