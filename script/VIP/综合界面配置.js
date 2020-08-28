"ui";
//#region UI和系统变量
var rootUrl = "http://114.115.220.1:91";//各位大神小弟自己的服务器别黑谢谢
var storageSign = "hongshuyuedu@163.com";
var woolStorage = storages.create(storageSign);//创建本地存储
var videoArray = new Array(
    "抖音极速版", "微视", "快手极速版", "火山极速版", "火火视频极速版", "刷宝短视频",
    "彩蛋视频", "快音", "中青看点", "爱走路", "闪电盒子极速版", "欢乐盒子", "趣铃声",
    "闪鸭短视频", "长豆短视频",
    "快逗短视频", "有颜短视频");
var taskArray = new Array("今日头条极速版", "京东", "多多步", "猫扑运动", "步多多");
var havedVideoChecked = new Map();//已经被选择的小视频集合
var havedVideoTimes = new Map(); //
var havedTaskChecked = new Map();
var videoBrushThread = null;
var videoSignThread = null;
var videoItems = [];//小视频集合
var probabilityValue = 10; //系统默认概率
var CommentKeyWord = [
    '我是App小助手关注了你你要关注我哦！',
    '山高路远坑深，大军纵横驰奔，谁敢横刀立马？惟有点赞加关注大军！',
    '我的未来不是梦我相信你也是！',
    '身同感受',
    '风雨送春归,飞雪迎春到。',
    '俏也不争春，只把春来报。',
    '天若有情天亦老...',
    '...人间正道是沧桑',
    '...喜欢的人喜欢的事亦不能表达喜欢的心...',
    '三分春色二分愁，更一分风雨',
];
ui.layout(
    <drawer id="drawer">
        <relative id="mainWindows">
            <viewpager id="viewpager">
                <vertical id="startpage" >
                    <vertical>
                        <appbar>
                            <toolbar bg="#FF5c50e6" id="toolbar" title="红薯阅读v1.0.0" paddingTop="2dp" h="auto" >
                            </toolbar>
                            <tabs id="drawerTabs" />
                        </appbar>
                        <viewpager id="woolView" >
                            <frame id="frameFirstTab">
                                <scroll>
                                    <vertical gravity="center">
                                        <list id="videoList">
                                            <card w="*" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                                <horizontal gravity="center_vertical">
                                                    <horizontal h="auto" w="0" layout_weight="1">
                                                        <input id="appIndex" text="{{this.AppIndex}}" inputType="number" padding="8 8 8 8" w="40" gravity="center" />
                                                        <text id="appName" text="{{this.AppName}}" textColor="#222222" textSize="16sp" maxLines="1" />
                                                        <text id="isSign" text="{{this.IsSign}}" textColor="{{SignColor}}" textSize="16sp" maxLines="1" />
                                                    </horizontal>
                                                    <input id="execTimes" text="{{this.ExecTimes}}" inputType="number" padding="8 8 8 8" w="45" gravity="center" />
                                                    <text color="#228B22" size="16" text="分 " />
                                                    <text color="#228B22" size="16" text="{{this.ExecTimesMessage}}" />
                                                    <checkbox id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" />
                                                </horizontal>
                                            </card>
                                        </list>
                                        {/* 占位符 */}
                                        <card h="40" w="*" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                        </card>
                                    </vertical>
                                </scroll>
                                <horizontal gravity="right|bottom">
                                    <button style="Widget.AppCompat.Button.Colored" id="allCheck" text="全选" padding="12dp" w="auto" />
                                    <button style="Widget.AppCompat.Button.Colored" id="woolVideo" text="挂机" padding="12dp" w="auto" />
                                    <button style="Widget.AppCompat.Button.Colored" id="closeVideo" text="关闭线程" />
                                </horizontal>
                            </frame>
                            <frame id="frameSecondTab">
                                <scroll>
                                    <vertical>
                                        <list id="taskList">
                                            <card w="*" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                                <horizontal gravity="center_vertical">
                                                    <horizontal h="auto" w="0" layout_weight="1">
                                                        <input id="appIndex" text="{{this.AppIndex}}" inputType="number" padding="8 8 8 8" w="50" gravity="center" />
                                                        <text id="appName" text="{{this.AppName}}" textColor="#222222" textSize="16sp" maxLines="1" />
                                                        <text id="isSign" text="{{this.IsSign}}" textColor="{{SignColor}}" textSize="16sp" maxLines="1" />
                                                    </horizontal>
                                                    <checkbox id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" />
                                                </horizontal>
                                            </card>
                                        </list>
                                    </vertical>
                                </scroll>
                                <horizontal gravity="right|bottom">
                                    <button style="Widget.AppCompat.Button.Colored" id="execTask" text="执行任务" />
                                    <button style="Widget.AppCompat.Button.Colored" id="closeTask" text="关闭线程" />
                                </horizontal>
                            </frame>
                            <frame id="frameThreeTab">
                                <scroll>
                                    <vertical>
                                        {/* 是否开启控制台 */}
                                        <vertical>
                                            <horizontal >
                                                <img w="45" h="45" padding="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAZklEQVRYR+2WQQrAMAgEJy9v+vKWQAmhN0VIKePZXWUQ1gZ04CBW56NbVSmfBlyx2bN7aNdK+biABCQgAQl8gkAqRCrDKJlFNbJ3otW4BlxcYBDYfoSpTwbwI5KABCQggf8Q2BpGNzebPgmO8w3jAAAAAElFTkSuQmCC"></img>
                                                <Switch id="autoService" paddingTop="12" text="开启无障碍服务" checked="{{auto.service != null}}" textColor="red" textSize="15sp" />
                                            </horizontal>
                                        </vertical>
                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,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"></img>
                                                <Switch id="switchEnbleFloating" paddingTop="16" text="开启悬浮窗权限" checked="{{auto.service != null}}" textSize="15sp" textColor="red" />
                                            </horizontal>
                                        </vertical>
                                        {/* 是否开启控制台 */}
                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,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"></img>
                                                <Switch id='switchIsShowConsole' text="是否开启控制台" paddingTop="16" textColor="black" />
                                            </horizontal>
                                        </vertical>
                                        {/* 是否显示Toast */}
                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,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"></img>
                                                <Switch id='switchIsShowToast' text="是否开启Toast提示" paddingTop="16" textColor="black" />
                                            </horizontal>
                                        </vertical>

                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,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"></img>
                                                <Switch id='switchIsAutoSign' text="是否自动签到" paddingTop="16" textColor="black" />
                                            </horizontal>
                                        </vertical>
                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,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"></img>
                                                <Switch id='switchIsAutoComment' text="是否自动评论" paddingTop="16" textColor="black" />
                                            </horizontal>
                                        </vertical>
                                        {/* 是否自动清理缓存 */}
                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,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"></img>
                                                <Switch id='switchIsClearCache' text="是否自动清理缓存" paddingTop="16" textColor="black" />
                                            </horizontal>
                                        </vertical>
                                        {/* 是否自动提现 */}
                                        <vertical>
                                            <horizontal >
                                                <img w="50" h="50" padding="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACACAYAAAAs/Ar1AAAVCUlEQVR4Xu2dBbDsthWG/3JTppQxZYY0pWnKKaUppMzMmDIzM6WccqfMKTNTmlLKzMzclObbJ+/z9dWRjmx517t3z4xn73uWZcFv6ejgUbShHT8CR9nxI7AZAK0rCE4m6QzhOr2kU0ni/7hO2vn9jaTfSmr/8vfPJf1I0g/Dxf+tJa0DCJjsK4XrnGHijzPCbP0tgOHrkt4h6YOSfjDCexZe5aqC4PKSriCJ330WPmq7X3i4pPdJ+rikj0n64xLb0vvVqwSCy0m6mqT9JZ2td4/He5AthRXi0HD9fbxX1a156iC4eJh0Jv/8dbs+am0/CUBoQDHqy4ZWPlUQMOm3k3TA0A5O4PnPS3pBuCbQnO1NmBoIak3+fyQdEa6vhF+4+79GruNKgpFs//L3ecJ13vB7goEzOFkwTAUEQyf/i5IOC8wZv18bOGGxxzlqXkDSRcN1sQCc0ldNDgzLBsGFJB0k6SaFI/llSW+WxIB+WtKvC5+vUfwYAQwXCXwLjGsJfVjS0yS9reShMcouCwR7SrpnAMCxnB3j+PWmcMGBT41YGQ6UdC1JZylo3CsDGDhuLoWWAYI7BQCc2dljvvaXhMlHijd1YoUADDcuYGz/GYDwGEl/WXQHFwmCU0h6kqSbOjs5ub3T2e52sVJe55OS7iOJ34XRokBwxQCA8zl6tg6T3+1mCRhYCQDC8xxjVaXIIkBw7wCAXIN/Jukpkp6aK7jC968XtkJOGDkCBIBh9O1hTBCwNx7iXP6fFQCAxq4WcaQ7hySUSvxyHT9cx2v9zSA315/D39+X9I1woTDi71p0tACEe0lii0wR28Ldw/G31vu31TMWCBCswPXmJH4cj/j6P1qhh5zhLyPp0uH3RBXqbFfxHklcHEk/VaHuvQIY7pyp65eSYKY5GY1CY4DglGGwcvv/gyQ9dkCv9pC0nyT4DbSJfOmLInQDH5H0rnD9bsCLbyDp8UEFnqrm1pJePOA95qO1QQC6v5tp6Bck3V/Se3t0iKX0+q3JP3WPOmo/AgAaMLxe0r96vAC5AkC4duZZZCsImKpSTRBcKnwdqQa+MACg9Ms5oaRbhiu3wlQdoMLK4B/YBl8h6ceFz1Kcj+NxmeceIenhPeoefSVAzYv8PkVwuk8ubPxJwn54K0lnKnx2mcV/H4DwUkmsfCV0XUmvyzyAMAqxeRWqsRIwOShsjp1o0c0lvbywxUjcHiDp3IXPTak4pw74ntzX3W2zBwjoKj5Uo7NDQcCXCqecsvS5iqR3FzT2XJIeGMSuBY9NuiimZwAB3sFLezuOhugrPuOt0Co3BARHD53C1s+iy0pCW+alO0hCfg641pGeKOl+BR07saQU/wQTztaAVrU3DQHBcyUxaRYhHYNb9hDCG/QKqfo89axCGc77d5P0U2djMXBJSQ0RKGFt3Vuy2BcETBYgsAgu9wnOTl4iAIDfnUJ8uUgCvaskfNf3EoODiPmOfQevDwiYLCRnfL0xKjnC3EjS8xN19e3XKjyHNTJA4NjsIfQNSCstAgS9lE6lIGDiAYD11ZYA4PZ9G+0ZsRUqg8IMPYKHri7prUZBtgO2hWI1dCkIUnzAayTd0NMTSTBIyA02tGsE3hIskjzjkRIo9eIPSkBwM0kvM1r5neAR5NECfkBSqT2eZ3BWvQyeTOhBPPSGhIi59ATidkhFRo/CxLKdu46kNzpajyQMQciG4iPwbEl3dQwO8/D+hNLpkpI+4ahnVsS7EsBwsIfHCMUHkr0cPUrSg3OFNvfl5avQPr7aGC9U9NfwjqUHBHzl1nkfSRiKoxxhUo5SZUO+EfACgZXDskdwq55zIEBixVnW0txdOZwWUl3jWdTGOSsa3/DsnFLwYLkPB9U9zGBsbL8piW0hG1chBwKWecvw4+nBbyA3LRwpvQxPrq6ddB+LIsYtJxLmlAUzGKOHSmIbTlIKBEcNDYhp8dCbsw3kUIYoGEPTDfUbAVZQzv4pwtAGJjBmvMppDS+vpP1GCgT4B1jqX+5hPJGi1PP9hmRnPoUNRk6mgp7mtcbwZO04UiBA/RtDoQed2BnCNJa4Y+3MKfb1GuPZnDEuJ4KYYS+W0qwGZtAMCwQIcxDqxAhO/1WZtj/Ted61quE0EvMs/l/iWPsw33hWKQX3XkLYSAyRj2BFhMo4RTi4vN0ocBdJB1sPWyDAXwCTri5hKgWqUoQRyTtLRsgoi/CJgWPiPeSxxvHUkyvzEEmPzhVq3a8lIEMuYC35zeus1SA5bzEQ4LTxVUOzhxs5p4IUsWztWzBIqaJ8AUwuQSc8NDYQsHgqMRWrBQD6jgaR8D0pSq0GplQ3BgLMmnEI6RLWszh4pDhNLIJr28ajNWNyj/SgIJTNGWo6q9pSDIsg6ygWq68mAJr6k8t6KGStBqaCLwYCjhsxVTHAyB33aq4C7YFlrwMIuHB7qPaKQL9jH4bVljEAwLvgkzgKpqyI8MtgwrvER8Rx/9vdG10Q4MmDYiJGOaVE7YHvtoFIYLzDGxquVns8W2C7rWMBoHlHzmoLH1DAEjuZRbezLggsewFExxiNpghmEKZwTMJal8klAJWHhgIBW0CcZb00NgBoB6F2WQ1+kWiUZa+B2/+FUysBTqTYBRBKpkuYQXHss8jjfeQdyFw5xNBMLh7EHuoLBBQzz/G8IJRZBACa5uTAiSm65TS7Td/TXgkwHcewoUsMNudcnDAtekawoC0Ys0FFaSeT6w0jWwoEDGmxffTSIgFAm1gRr5ppnGW8gy4BncKc2iDASzh2/s2ZjeEnyJHyNN4Rq1SOTjK5uHx5yAsEmFBs+by0aAA07TprWLmtdmK3GHP7IzA3vF8UBKCLpaJLOStWhEoIl5ZBuGExucQV9lAOCDCdnIxyfpXNu5YFAN6f2xLg4ZjwLnHCInbDP5obzUoAR8mx45iRh4j0kYrUAdeeW5o8E9S3DGZvTK43lqEFBBguHGv/4GzIMgFAE3NbAnPJKhkL+4+Ker71NyBAwhdTUHDUSDmEwkwSawgvmWUSyiomFx28h7pA8FpITWEFaNrAqoXtZwq09IujfZe28AUNCPB3jylgcoaPaBlLnE09E9S3DEIuJtcb67ABAupyvKa9tOwVoN1OAmdirm4RPEHMp2HLkb8BAcwfkqYu5V4yNeNRjkVMrtfPj7Jef0nGZkoAoD056y6MTWMgYcVE3T+jBgRfMuwIzy7pWwmkfXbJmUdiTcNVm8ntEykktRpMDQC0FQb2golGny4Il2JFyAU10wM1ICDODsxhl3A/tzR4MBxeyZ13qa1V7nMBCB5nGM87pwiApt3wY+RnsoiJxmC4S3M1ACBAxrxNqRCSPKVCxKBRLA3F4hnwWmUQkaI+HZqsasoAYKxYCVJHWo7RhPbr0m2aoz0gsHTQCGNSAShSdm21JnJoPYAUIKTculdtC+i2F14upTq3pLlzrTAgsEyWcZkmBY1FeBNlzZmHzmKF5+F3AAJ6kRKa+grQ9CVn6YQTyosiHUfhR1KxGU+ApQzqyS7lbNZxjChNVlEyCTXLkgIHIKSY3Pb7VgUAtBmr71TkeEsGNLdUAgTWcsH5MhVseiwDkpqT364L/QZAyMUpXiUA0L+coAubUPijLrFCwtfNVgIydd02UiinM2C/nVWyBELYUWrx2zTzV4kcSTEGytM9nluktXO7TbljIuF+cRbqEoeBWdQ5QMByQszALuV84dhjvdlLPANZUsZj5FJS39CylsR1aL2e54lglvLvsGQFCNRO24CAaFpIBrtEnN1UZG2kTif3tHKEMhsQ7B5UVraUsy9CoZi7IMqlWahAVgLL0ygXhBJB0RiJqT2Y2YBg9yghKEop8Ig0G7PLRKU8i0ILCCwLFGQElhcSz/5bEs6Qy6ANCHaPOhJdJLsWMUfMVZf+28wfIMCSBoFRl1A+pHL2sZzUTizhBdQGBLtHClVyTCzclEDdHzPDw36ETDCzlQDXJqR/XSLGoBUOhbIYYcB0LIO8QSBjbUtZTcPg4fzZh/qeLPq8q/0MijK8xiw6VbD56N6f8xKAgJyDt4jUwLExJmlqimJwgtXRKlFuBVkml993HDn+YQhsUVY3BAgwq46FRL1HECRZlaOyJUXsKtE6ggB1fiq7mpWLYm41Bggs65NcjqJFOJvUBtg6giBna4jhbCyc3dwRBRA8UhJKiC4hTmY1sIhcPKn7tSewRn3rCIKcdZGl7Z2LmwGB5Umci4XHFlLioVNjEofWsY4gIF1eKuK89ZHPbSsBgeWydISk8yZGPeW8OnSycs/nJjP3fO37y2Qoc/IcYjxcM9JhItMRiHR2RMSDKGa2jETQCmfPsyn7tdqD3K1vA4LdI8LxMGVPiaIoplsAGLOI6Y2NIcqEWI5BZNKcJy1CJo1setG0AcGuEZ/L/40JsETGFJ8bETcgsETHuURLRD1H27ho2oBg14gT7TwVEGsfSRwhu7RF1NyAwIqRmzMsWVbM4g0Idk1rzuaDiOmxkAIY2JynQUYDAiuXAX6GMb1C83wuN89YK8QGBLtGFqOQmKV4M+6WldQWr6sGBGeURLr4LuG5inJi7sEaKYPXD9vGKlAOPMvk8kvHzxPNzDL8mZub89J2fAJs72AWupSzKyAODrkMV4HWCQTbgk10JsDSGVBsi2dZGwSWDiGX1ALlBXvMKtA6gYAQQUj9LEILHIs8O7ctbB5sgwBNIhrFLuUUFJS3YudNDRjrAoItjJ0xyBazTxJvpMRzaoMAtXAsnjCFtwQ1iLzUcnDYgGCcEUBvQ9BRixAAMpcx2Q8ORVtyMbZBQIV8KTGjCmTTyKgtOpkkHDzm7s7j9H1wreuyEuT4NEsfhK0h2/cW/8wuCKxzJZbFPJwKaUuGFE9CrMEzOaCCdQABgb9xokmRtT3jNbZNuNcFAaZILCMx28Etx4pIC+BGcUhJ6RsGzF+VR9cBBKQhwNPYInJO4V0Uo7m+oH2zCwLusV8w4V2aOzAmGjA0z0GVmU5UsuogQEwfMwVsd9mSdZBLCSujbRQDAWHssFaJUQ6F+MofPvZMDqh/1UGAOR8BOCxiJT/MYAhNB+MYCHiBFYZm2/Ei0pop8warDIKcBRFTkZJ4EoUuevqzQGAxiGifcELF4MQieAI8llOxdAZ8zIMezTmyLtOxNNUxIrKR8CIVfie1CuB0bGW4NdPk4rCAt2ssXA1p7u6bmYpc5NBBM7kDH/Yk3EitAkQ2j7mnz4bSWglSSwvHRUycc0GhyICyRTK1AyevRpfhsVgFCC5mEVZeKJRiwqHkKpADAasAqwGrQpeyFQePV04UKZv4GoO0znUg3CFkcM7jKmX5nVwFciDgfurIl3Nd53kAABBmLtAbKh6BnBcYFRKKzlIkeT7W5HbAC2DuYPJiAiD2GDRZqRh61EEAjFw21eLR2QEPkL0EXiBHVnwJXM9xPMke2VM8QfNyKw8C9zkOcj9Hq2SskevLIu4TajfmJNx9d+oDy5kAzOvygIDE2Sw3sQxpVLQtnYoxSng4k+BxQ+kR8AIAZR2pgBATd4kQNjCTrvD/HhDwglTSRXTbRDv3BJVmaZqi/GAqwPRkoG3aisEIhiMxKsrf5AUBL7IypXGPGAfer3yZYW6mMtmxduTCzrSfSZn05aSi295dAgI8XUinYkUsywW/bL98mQEupggE0vdgk+EhK3x982wuwswgEPAwUc5SEc2QFOIQ4aH3StrPU3DNy2CME9vXY90m+RXKPetDJLYjTHgRlawETcUpTh/TdOQH3qzpqxY9tGhwHYX5EOCnPEQqAvxArA8Hx9MDPRV1y/QBAXVYZ1PuYX2EksmbdGLRORX7jNMYz2DdDQPnJRxGrBjGnAYAE7/F1BcELEccT6xliUSaJUGtOBPjRx/zeyju1MQfYP8noHgqHlS3C6TqJWO6RawArAS9qC8IeFmOPyjZ66iP5JoAgTyL60okI0cKmJXitQYgl2eqFx/QHuAhIKAe0smmomRgBVMa3AopGAarqVR8qwYSYgYiXSWtQAnlBGyDAUBjhoKAOoh3xBdsER4vMDM51XP7eRROnIVj6dxKBnEKZZEAMvmlqYI4jqdiLlYBQC0QUE9ON4D4kjQtKSvZ2IQREgcni2VmYO0LJBRsBxteXak68TTGNDy1gsJPxNIT9GprjZWgeXEOCMTXhRtGvVlKMI48i9Zy6sTk08c+/cSQF/V9aiuEr6gqX6kJAibHE9HMYzBpTTRMI25UUzRUIbgn1lR9Jp/+AnKMQ2KpCZvxKBYJe76Y2iDgnR77Qo6XBxkZOTztRgmFfyRfxJY08J6HK5Zh4kkVgBSPv/sQk87k52QGuZCCfd49e2YMEHiBAKPIfp8SQ3s6xh4KA8VWwTXL5jES/SnIRwjM8ckBE980DzATUZZtIEWsMDj9jkJjgcALBMohCSPhluU6VdpxpJWYjiOPJ/8PVyoUvFU/ljkE7mguVi8mvwZx+uHkw0cwSzyRIK+FUe92jQkCGgXCHx0MHFKNRI1KskbAkEoF37ejhOLD9R4zOWL8t68/S+Ic374I3dM3oWaujXD1ACAnHf2FJHJPHpKrcOj9sUFA+/YI4WzgAXKEhwy6hL7MVa7+Zd7HMAenHniZHJHpHLM9K15E7vmi+4sAQdMgGEZWhVkatgwNOWbl6l70fSafE80BjhcfGb5+toCF0SJBQKdg2pAuep1SVhkMJZPP2BBQFClgKg7RKMBYNAiaTmBzgH5gb2evCMXGMay5nI8tvBjyC6KIYHzrlWUgTcUyOJWNdtSOLAsEdApeASCgVk0JSLoD0AYEwpNYurdRB61TOTEcmfSSiW+qIN4AeoVvLrLB3XctEwRNWxhEgIBtXCkR4JmsHiyhCG0IxDA2YerNEZQLQVUqO6nVFrY59v1Uyvux+zGvfwogaBpTuofGBgmzd9TXHO845jUX/05FZY3VhS/mXsEzm7+5iNsUjfbhnLFJ8jhTAkFNMMTmhFWDsP3da09J7YvUv/y7Jk1y8psOThEEbTDcMDi+xDyja07SWHUhZUQsPmm5x5RB0EwMe/D+AQz8ljCRY01uql74k0PDtRBhz9BOrgII2n1kX4Z3IOAmvpGEaFk2IeaGOSVgFJPP70rRqoGgO7icLPYNFxpEwrmOTUw6R9OPBC0ijGgsIfXY7ahW/6qDoDsQZwhaQ5RF7cvr4tWuj/xOpKBtX2gUS2wlq03UmBX9H0QdBL0FMiBQAAAAAElFTkSuQmCC"></img>
                                                <Switch id='switchIsCashOut' text="是否自动提现" paddingTop="16" textColor="black" />
                                            </horizontal>
                                        </vertical>
                                        {/* 专业版App运行多少天 */}
                                        <vertical>
                                            <horizontal >
                                                <text text="执行天数(天):" textColor="red" padding="8 8 8 8" />
                                                <input id="txtForeachDays" text="30" hint="App运行多少天" inputType="number" padding="8 8 8 8" />
                                            </horizontal>
                                        </vertical>
                                        <vertical>
                                            <horizontal >
                                                <text text="屏幕滑动时间间隔(秒):" textColor="red" padding="8 8 8 8" />
                                                <input id="txtScreenSileTimesInterval" text="8" hint="视频之间的滑动时间间隔" inputType="number" padding="8 8 8 8" />
                                            </horizontal>
                                        </vertical>
                                        <vertical>
                                            <horizontal >
                                                <text text="随机概率:" textColor="red" padding="8 8 8 8" />
                                                <seekbar id="seekbarProbability" text="点赞关注评论随机概率" range="5 50" sum="10" padding="8 8 8 8" w="*" />
                                            </horizontal>
                                        </vertical>

                                        <vertical padding="8 8 8 8">
                                            <text color="#228B22" size="16" text="如果我帮助到了你,希望你也帮助我.毕竟您的支持才是我前进最大的动力。"></text>
                                            <vertical padding="8 8 8 8">
                                                <img src="http://114.115.220.1:91/app/Resources/Images/zhifubao.jpg" />
                                            </vertical>
                                         </vertical>
                                        <horizontal>
                                            <button style="Widget.AppCompat.Button.Colored" id="btnSaveWoolConfig" text="保存配置" padding="12dp" w="*" />
                                        </horizontal>
                                    </vertical>
                                </scroll>
                            </frame>
                        </viewpager>
                    </vertical>
                </vertical>
            </viewpager>
        </relative>
        {/* drawer */}
        <vertical id="drawWindows" layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="{{rootUrl}}/app/Resources/Images/weixin.jpg" />
            <scroll>
                <list id="menu">
                    <horizontal bg="?selectableItemBackground" w="*">
                        <img w="50" h="50" padding="16" src="{{icon}}" />
                        <text textColor="black" textSize="15sp" text="{{title}}" layout_gravity="center" />
                    </horizontal>
                </list>
            </scroll>
        </vertical>
    </drawer>
);
//#endregion

//#region 初始化方法

initializeUI();
initializeData();
initializeEvent();

/**
 * 初始化UI
 */
function initializeUI() {
    ui.woolView.setTitles(["自动刷",  "系统配置"]);//设置滑动页面的标题
    ui.drawerTabs.setupWithViewPager(ui.woolView);//让滑动页面和标签栏联动
    activity.setSupportActionBar(ui.toolbar);
    activity.window.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);//设置全屏
    ui.viewpager.overScrollMode = android.view.View.OVER_SCROLL_NEVER;//删除滑动到底时的边缘阴影
    //为页面设置渐变色背景
    permissionpage = ui.viewpager.childCount - 1 - 1;//授权页下标（启动页前一页）（启动页固定最后一页）
    initializeFirstFrame();
    initializeThreeFrame();
    initializeRightMenu();
    initializeHeaderMenu();
}
/**
 * 初始化第一个Tab页面的内容
 */
function initializeFirstFrame() {
    for (let i = 0; i < videoArray.length; i++) {
        let appName = videoArray[i];
        let signMessage = "未签";
        let signValue = getSignTime(appName);
        let signColor = "#FF0000";
        if (getDate() == signValue) {
            signMessage = "已签";
            signColor = "#228B22";
        }
        //今日薅羊毛时间 1440 1400 1605-20=1585-1440=145-60=85-20=65-60
        let execTimesMessage = "";
        let key = appName + storageSign + getDate();
        let havedRunTimes = woolStorage.get("" + key + "");
        if (havedRunTimes == null) {
            execTimesMessage = ("已刷:0分");
        } else {
            if (parseInt(havedRunTimes) < 1000 * 60) {
                execTimesMessage = ("已刷时间小于1分钟");
            }
            let havedMinute = (havedRunTimes / 1000) / 60;//读取到的时间是毫秒需要转换成秒，转换成秒后在转换成分钟
            execTimesMessage = ("已刷:" + havedMinute.toFixed(2) + "分");
        }
        if (appName == "微视") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "65", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "抖音极速版") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "30", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "快手极速版") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "180", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "火山极速版") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "120", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "闪电盒子极速版") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "50", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "欢乐盒子") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "50", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "火火视频极速版") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "120", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "刷宝短视频") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "60", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "彩蛋视频") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "120", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "快音") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "120", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "中青看点") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "100", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "趣铃声") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "120", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "爱走路") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "120", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "闪鸭短视频") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "60", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else if (appName == "长豆短视频") {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "80", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        } else {
            let row = { SignColor: signColor, AppName: videoArray[i], AppIndex: (i + 1), ExecTimes: "15", IsSign: signMessage, done: false, ExecTimesMessage: execTimesMessage };
            videoItems.push(row);
        }
    }
    ui.videoList.setDataSource(videoItems);
    //小视频绑定check事件 火火视频极速版 长豆短视频 
    ui.videoList.on("item_bind", function (itemView, itemHolder) {
        itemView.done.on("check", function (checked) {
            let item = itemHolder.item;
            item.done = checked;
            let appName = item.AppName;
            let appIndex = itemView.appIndex.getText();
            item.AppIndex = appIndex;

            item.ExecTimes = itemView.execTimes.getText();
            let brushTimes = itemView.execTimes.getText();
            if (checked) {
                havedVideoChecked.put(appName, appIndex);
                havedVideoTimes.put(appName, brushTimes);
            } else {
                havedVideoChecked.remove(appName);
                havedVideoTimes.remove(appName);
            }
        });
    });
   
    ui.videoList.on("item_click", function (item, i, itemView, listView) {
        itemView.done.checked = !itemView.done.checked;
    });
}

/**
 * 初始化第三个frame页
 */
function initializeThreeFrame() {
    ui.seekbarProbability.setMax(50);
    ui.seekbarProbability.setOnSeekBarChangeListener({
        onProgressChanged: function (seekBar, progress, fromUser) {
            probabilityValue = parseInt(progress);
        }
    });
}
/**
 * 初始化权限菜单
 */
function initializeRightMenu() {
    ui.menu.setDataSource([
        { title: "日志", 
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8klEQVRYR82XT2sTQRjGn3cTaG8mG28eqrATEQ8NePIiFRFURCoigohWVOxORNtP0PQTmKKZHEQoRQQtUpQigmjrBxDqRbGzYj140kziLaXpjszalDSm+bOxxDkF8s7z/N5535nZIfR4UI/90RTAFvJpN4Da1zPFW8n5ZhoNAezc5wzIugngdjcAAE4S4UjBZc52Oo0BhPyuONvTpXkwfff9L0ltrY8XeNJtpPcXwMayzyrOZv8FgNGIC7lQ5OxozwBsId8ozo71EGD5teLJ410BxPKf9qLcXwpE+suxkntgpSoYyy2nQLRri8Fq9ENpfF8Qb+flK+WyE10BJIRc1KABQBvRlOJss39sIZcADNYZjCvOsgGAkC8VZ6dCAZjsLKIrAMbqBLIW4flPly22alZbePOKO6dDASSEN6yh5wB881ejKSNi9VWM6SA0JlWaZVoBJIR8UeDsTCiAjSXUBLwrcDb0p6ZeFlrf8VejcVPnViWIC2+uyJ2zoQDsnMyAMBFM1nqMNK1oC9MAYiCaUq4zZsoUtShWa1ApR5c2m1B4zxR3zoUCiN39Gov2V1K+DkwHNkR+EWhkndaWanfDdqWw83JWuex8KIDqJFssT4OsEnxdAmFYcRb0Q7UkWustuyBCmKw2qJ2TT1SaXegKoFmjmTIRIegPM3xCKQJkNwHy3mPlOhd3DKDlLsjLRwWXXQoFkMgtj2jLHECdDb8cnao2YVzImSJnl0MB2EKaI7djANL6aiGdNI0L0z+KJ0dCAXSWd+NoOy8fKpdd6x2A8B4o7twIBWALaS6frTdde8tScxl1AdDolGvHv+4kDL8C7Zi1irG7KUEr8Xb+j+fk+2KaHQrVA+0YNIsxH6SkdR+IDsPCQTXKPtbG7+hnefC+AKDS+zOxe3LIsvwh87s1QF5OQGO07YeJBU0+VXzQGpFfIdBawXXeGqNEXnrrFVy3IliIaGI/0o7XEqAaUM0gTBlqMzU69ZlXNf/vx2mYzDud8xtjzpswrqCXXwAAAABJRU5ErkJggg=="
        },
        { title: "检查更新", 
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADnUlEQVRYR+2WTWgcZRjHf890k6KoTQ8F6xcRRcXWj9DubKmXFLQoRCtCg1KwTYspFrzYmJ3RwzYHs7PRXvSgCW20wQ9owWDAQ6jS3NZMElqKGkKbUhE/etBCDqE2yTwy484yHbLZ2cS2F9/bzPs8//+f//O8z/sKN3nJTebnfwE1O5Ap6DOesl3gceAJgQWFCWBShG9Hs3KylrImFmDm9RDCC0BTFYLTKEOuLYeSCEkkwCxoDiUO+AfwO+AJrFe4K0Y46FryUjURVQVkHD2p8HQIpEKf4dE3aotve3ll8rrJM2gXpT3y+xvXkpalRCwpwCxoD8pbJYApPNrct6W4FKDZoy3i0Vt2RHjdzcrHlXIWFZA+rPfKPDtQPiwlXnItubOandF909FzwIPBP+ENTfH12EH5JY5xjYDNeW0SoVMImu3WcrDS6tpyohYBfklUGI/kzCoMGcr70fKVBfjHS5VPgLujRH7Nx7KyvxbyMDbt6CmB5miuwG8Ke11Lhv81B9ic12ZDOBUJPIrBd6tSDBfflL+WQx7mPJnThvrVNCO0IrwS/veUbeO2jAQCokoNYcf3WRlaCWml3IyjHQrv+fsKI2OWbJPSgMmVkj5yLTlwPchDzExe21XoDb6VLkk7+qXAyygzri1rrid5iG06OgPcDgyK6egU8BDwo2vJxhshIO3opMAjwLSYBb2M0oBSdG3ZeiMEmI76w2yL77rvwCDwInDRteT+WgXs2pW7Y9Utc40DR7rPJs01Hf0ZuA8Y9h3IojjAVUnRNNohPyUFamuzH/UMjgMbVLVroN+pegNuyWujJ/hlrw+aMJPX7SoEQ6GWPoiSBwNFtfPTfic4Ykut2HB6NpgDpqP+uX++lHh6wWDnRKdMVwKKkyucGDiab61CvFXgc6CxFNfjWpINBDz3ga7+c5YrEYBZFT7Do4jHmbF35Ey4FyefT60ZmWrMdlUiF+EeEZ5C2RvYXloLa6mf2C9z5bugqVvX1Rt8Eb37w2BJsSHsjd37bH9kB/N95rbH+HV9ebpWcz/cn/SUlnFbLgSli2elC3pAlNf8xgLqgqCIgFf32ccFdtYo4KrCDyJ85Wbl3ShnxQfJpl6tkxkerpvnStGW88stQcrg0tw05yf6ZG4xi6o+yRZLWk4TVuyRpIWLx8VFoHL4WH93R614y3JgsXIkHURxgSsS4IPt2ZNr0NTfDxw74lzzSk7qxIoFJCX6z3tgpcRh/j9lvlrSBRsylQAAAABJRU5ErkJggg==" 
        },
        { title: "教程", 
         icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAD4ElEQVRYR+1YXWgcVRg9350UpQ91d5NspIhE3UmqghQS3QqKqaDQ6osgYhUK+mBxkpYWoXlRqNSH4oMVutm2YlX6WKWiD33og11FSJEGxAdLMhsLFtLuJp0NrURMM/fIXXZkMk3qTEeDlVy4cO/wfec797vn/swVhErmkDsgFp4RIG8qyS4A+VY1lnVTRaRGoG6qCL7DdYx6u+yrAVTm4IWMdcf8gIZ6NC1WmJ+YTrb8yyOA/4kAfQBOE6gJ2CSkiGltWXUsAErYQaBThJ1sDkLyAJ8DMEWo/Q3ngSO5I+5D0DgB4GEA3wBSJ/S0gqoTvEzhZYille/ntaCzmRRIlwAmMc8CuKh9bJ/daVfCRE1bug5X89fJGsCPKOr4gvLHr+3onYkaLtVff/Tc2jl9V68FeZnkXhFsJ3Ec1O9S1pxsOPf/FAcnsGkvTRSp8Dogb6wR6aq9WTAz+VeRXNn9AsBaz7G3JgGO2ubK7gmQWyHqZ88pPJYS6xSAOc+xX4yS/VUo718ZLJTSBGgvVd+m4n6A73lOzzupsEaqQxTu9Rz73ihZah+bl9JIkoCZkrtbKRzUGntmh+wPk/hGbc1CVxbOeI7dXFNBMTK4gawxjhssGGQQIDrwNFixyGbL7hkBYhEOAJcja5IRZ+AEKg3H3mxsE2U2DvhyU/ePSCqJDFbJJshAIhkYzcbFjuosKoM0WLEX2G1DNi7RsN1yu0EarFiZTRPgf70bmItUkJzg4pJ4gd3sUIhOT3gjT5rZjtJkj1Z6XEH6Z5zCWOJD4e+OyKXuEbeq2dRkV0KzweCisczMmG+xLzIrRlbpAQLtImrIXP5BXtJaNf8Q/lNkg4TcFjIIk6XSuwVy7JYW2ErI4GYxEm1dq2QTZGDZzGbLrqvI4SuDPScT4N1gmi27wwIcAPRbntP7QSqskcltInrEc+xcGEdy5YmjZsvwBnv3RQN0lKt9PtAn9NcD1m+iWKNGTc+3/TC7577ZsH1uxD0mgldJfSCK1f3phTuv/r6wkeBGIe8O/AhVb4Ocnh4sVBdjje+jqOcbjt2/iGy2XN0i4CmIfCb0vyLUUwSebL3OGNspAhMtp3sEKLTaPwKoCPS3GvK0QHaC/BIiLxA8pIgKRbZA8ASIDS2fCQJTpi2CB8HmK4wpZ0GMao2vlcVt5pEDwEueY3++iKzp5MqTrwF8BaB5nBgF9VmqtnOWssZmdnRfCjus+/hizpr/oyj0ixC1CcDjANYZgg2nZ1cIq5+QihDfa82xtjl/bGZ4w7UwVubw+W6lVRFQRShsAptYMC86S830ov/yNDpbCd9Vsv9Wlv8E0mP+P0I4oqkAAAAASUVORK5CYII="
         },
        { title: "关于",  
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE3ElEQVRYR61Xa4hUZRh+3jOrK1G7M2fGtIug654xS1IqSIpCKKlMtCL3RyCx5YU940oKJmSQCxoUhOU232Sp+K/UH1mkGRiKGV0oumDFzhnTMipx58xgCO26c574zjmj42Vmzkrn38z3vO/7fO/9E0T8EluOtRuet4DkQoF0EEgBkgzEWRRgkEBePG+nnOWBwbW3/BNFtTQDJbP56RDpJfAUgPZm+PC8JMB7IPuLmfQvjWQaEkjk8huE0gugLVRyBsAXAhwmcYpi/K3/F3oTRTCB4D0QmQtibBVPYX+pJ/1iPRJ1CZjK2QVgkS8o8qlHbi6nhvaja8Zwoxu1bT1pxoaHngS4TIA7wxB95trp+68kd0UCpiocBzg5FFjq2tbWiK6/CJZQhWUCbglJDLp2evylei4jYKr8aUBSfmohNrNkd/x4NcarMglVeETAfcFvOeHanVNq9V1EwFT5w4DcpwGubTVN0NEQM5XDEL/bta2uqux5I2HCrQtuLvNKdufHUQyYbzm3soI59PBzudc6VE8moX69XVD5wdcv3FhNTJ+ALjWKfBlme+SYj88evbYirVruNt8wvT43M219PRKmcpYAeAfAGSFn6xINCChHEejR2e72dD4Y5eYaE+935hgxHLyAp+va6bA5XVmLmSscAPmAALmibdk+AVM5vwOY5AELy7b1YVQC120ZSI2pGKfP40V2uD2d3Y3k48pZYAAfAPjTta2bJJ49PsuQke8AlN1TQxPQ17jOL1VuKmeRAIsJDrh2ek1T8ruOjjUHWzXpNhHvbknmCitJvkHInpLd+XhTBf8DwFTOfgAPgVgtZtbZBsEzAqwr2tbLo9Xf/qZzhxBtjSrgUp1J5bxAYCOI7WIq5wiAe0EscTPWtqgEJuQK1w97XAXBKgFam1VArV4z6zwLge6un2sCOh4pwphfsqfujUIgofKbBaJ7+8wafJdrW7ujyR97VOB9BGBw1AT8IUW2VCqyJtaCQtWgERtz4+DyyX+NhgCJ01cdgnY10BGDcSzonPi2ZFt3RTHul30YAgKHrjoJE+q8G5t2wHpJSELpMlxBsh/gXtdOz496i4QqrBHw1aAFjy6Bq2UoZLfoYQIPP0EwPDJm3A1nlkxyo5Aws/m9EJnnYwUPuz3WJ4lcYQb/jf1RXjWlXFdHTSPyZGRKtRUf1QOFkOUlu/PtSASUcw5AS0BAdoDeOAF3Fu1pexrJJ9XAY4TxPsiv3Ex6djgNC+so3BA1mXQPOEeeqjVEcm0pkw5CUueLbzoeN1pH9PCaVb1s4IHNThtaoMfq9CheiGfzswwRrSgOcICM9ZUyU99t5jlTOZsAPFd70ZqFxOkRQgU51Xwh0aNYY6O2YFPluwHZ7keM7C5m0juC9Kn5ajfh/3MlM5UzG4AeQPpdsdW1raVVs5cvpVnnJAQ3R/VEM7fr84RyDgqgPfa158W6yis6fqtLIBT45sJOj9e9oZa+hqXVhIWZHVgPMV4KLsX+kp1e2ZCAPkzmCq+QfD4Efi/w+oqpc/uaPUzqcTGVsxrAa+H5bncEi7HSGmq4eiez+Sc8kd7QfVr2sqcZK97ZKGHwE67Fmyg0gmohj1SET0fa/f1tVtAFYm5UY1Fw/jCKAqxizGxhkgALabCDREpEkiSvGY2OWqyInPgPdzcwBtuCmgYAAAAASUVORK5CYII=" 
        },
        { title: "退出", 
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADd0lEQVRYR+2XS4hcRRSGv7o9pnHR4/TtnoVBhJDUBE2UiLrxEaISV+LCx+DaxBiqJxGi4iNrxQhGzKTLCYLiwoWOsxIRA5r4wo34IFEmXRnduFFmqmOycYaZKqmem9jT3u7b3bZkY8GFpuucU9/969SpcwWXeYjLvD59A8TarAR4W168kvGtS/2+yL8B8AlA/j8DKGmjF5RUaW8Xa9MRoKhrR+pqbH+WMqkKFI/NXcuKe1vADqtkqk1Jmz895G15MVWBBPBjrmC3fUz+2g4kNXiszSfA3UDNKrk5zbkLgNPAFuBTq+Q9XQMUtXlGwEvABbfC/ef2yZN9AUyZ63G8FyA8PFtX8lBanDUKjFR/2RaJ5c+BAvhHrRp7qx15lgLBb+R1c1PkCfG880Pbz1U2fN8abw1ArM0rwAFg2io53imBugEI/iVtnvPwInDYKvlkW4Dhw6fjofy6UwixPoqiW+f3bvxmEAAhRlyt/QzklxeXbjh/YKttjntJgWLVKCGoAu9aJR/JOj7dKtAA0OYNYLf3VOoVqVMBYl07BmKPJ7qvrjZ+OEiAkUmzI8pxAs+btiJ3pSugzYlw7kVu6LqFxzfMZgFkFaJm//LRuTEXuTPAV1bJO9ptwe9CMBrlR4bnd41eGCjAodmCK+TOA/NWydE2W2CCQYFlrrL7ZfjdccTaLCZ3QSHrLoiPmGGG+CPUFqvkcDuAINEYEVvsXvlTFkAv8/FqUfoxrbL+fQqSHADGrZLTvSyQZVuq1h7wQsx4OFlX8q5UBUraVDwc7aYIZS3YOl+smkkhmBBwcEHJUJQujSYFZm8U5H5ozDhusxPy614XSrNP9v8zYFtagWstxe8DDw5ShVjXXgbxNDBjlXyoFXINQFGfuVMQhcsDvHjKVjaFu6HvEU/VduLE8UY43Pa62vxFR4AwGToZgdjXOGJtmpFuiS4Wq3AZ1ZU8mOaX3hFpYwRsShx6PhWxNg9DoxcI4x/VLzUJW+libb4Ebk/+n8bxalZilvXZmx1uT7hTVmXnbF1J2Umxjl1xUZsXBDzfFOAjL3hHCL5jidU+bx3X4BqtV3jr8KymEH6y76a0mThJzCeS09HN9s943GtpCdd1DqQZlqfmbvHO3etgp4D1wNWAEILfvG88H+Q8x+cn5LfdUF606fvDpJdF+s6BQS3yP0AnBf4C4vh6MKas2UAAAAAASUVORK5CYII=" 
        }
    ]);
    ui.menu.on("item_click", item => {
        switch (item.title) {
            case "日志":
                app.openUrl(rootUrl + "/app/WoolUpgradeLog.html");
                break;
            case "检查更新":
                threads.start(function () {
                    let titileAndVersion = ui.toolbar.getTitle();
                    let appNameAndVersionArray = titileAndVersion.split("v");
                    let appName = appNameAndVersionArray[0];
                    let appVersion = appNameAndVersionArray[1];
                    var url = rootUrl + "/app/WebService.asmx/CheckAppVersion";
                    var version = appVersion;
                    var res = http.post(url, { "appName": appName, "version": version });
                    var returnString = res.body.string();
                    let json = JSON.parse(returnString);
                    if (json.success == "true") {
                        if (json.data.upgrade == "true") {
                            app.openUrl(rootUrl + "/app/WebService.asmx/DownLoadWoolUIApk");
                        } else {
                            toast("已经是最新版");
                        }
                    } else {
                        toast("请求远端服务器出现异常！请稍后重试！");
                    }
                });
                break;
            case "教程":
                app.openUrl("https://blog.csdn.net/zy0412326/article/details/104767602");
                break;
            case "关于":
                dialogs.build({
                    title: "关于",
                    positive: "确定",
                    items: ["抖音小助手版纯属个人爱好，如果涉及到侵权请通知作者，作者会尽快解决相应问题。作者邮箱：zy0412326@sina.com"]
                }).on("show", (dialog) => { }).show();
                break;
            case "退出":
                ui.finish();
                break;
        }
    });
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
}
/**
* 创建选项菜单(右上角)右上角菜单事件
*/
function initializeHeaderMenu() {
    ui.emitter.on("create_options_menu", menu => {
        menu.add("日志");
        menu.add("打赏");
        menu.add("教程");
        menu.add("关于");
        menu.add("退出");
    });
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case "日志":
                app.openUrl(rootUrl + "/app/WoolUpgradeLog.html");
                break;
            case "打赏":
                app.openUrl(rootUrl + "/app/index.aspx");
                break;
            case "教程":
                app.openUrl("https://blog.csdn.net/zy0412326/article/details/104767602");
                break;
            case "关于":
                dialogs.build({
                    title: "关于",
                    positive: "确定",
                    items: ["薅羊毛UI版纯属个人爱好，如果涉及到侵权请通知作者，作者会尽快解决相应问题。作者邮箱：zy0412326@sina.com"]
                }).on("show", (dialog) => { }).show();
                break;
            case "退出":
                ui.finish();
                break;
        }
        e.consumed = true;
    });
}
/**
 * 初始化配置数据
 */
function initializeData() {
    var IsShowToast = woolStorage.get("IsShowToast");
    if (IsShowToast != null && IsShowToast == "true") {
        ui.switchIsShowToast.setChecked(true);
    } else {
        ui.switchIsShowToast.setChecked(false);
    }
    var ForeachDays = woolStorage.get("ForeachDays");
    if (ForeachDays != null) {
        ui.txtForeachDays.setText(ForeachDays);
    }

    var screenSileTimes = woolStorage.get("screenSileTimes");
    var isShowConsole = woolStorage.get("isShowConsole");
    var timesInterval = woolStorage.get("timesInterval");
    var appInstallDateTime = woolStorage.get("appInstallDateTime");
    var IsAutoSign = woolStorage.get("IsAutoSign");
    var IsClearCache = woolStorage.get("IsClearCache");
    var IsCashOut = woolStorage.get("IsCashOut");
    var IsAutoComment = woolStorage.get("IsAutoComment");
    if (IsAutoComment != null && IsAutoComment == "true") {
        ui.switchIsAutoComment.setChecked(true);
    } else {
        ui.switchIsAutoComment.setChecked(false);
    }
    if (IsAutoSign != null && IsAutoSign == "true") {
        ui.switchIsAutoSign.setChecked(true);
    } else {
        ui.switchIsAutoSign.setChecked(false);
    }
    if (IsClearCache != null && IsClearCache == "true") {
        ui.switchIsClearCache.setChecked(true);
    } else {
        ui.switchIsClearCache.setChecked(false);
    }
    if (IsCashOut != null && IsCashOut == "true") {
        ui.switchIsCashOut.setChecked(true);
    }

    if (screenSileTimes != null) {
        ui.txtScreenSileTimes.setText(screenSileTimes);
    }
    if (isShowConsole != null && isShowConsole == "true") {
        ui.switchIsShowConsole.setChecked(true);
    } else {
        ui.switchIsShowConsole.setChecked(false);
    }
    if (timesInterval != null) {
        ui.txtScreenSileTimesInterval.setText(timesInterval);
    }
    try {
        if (appInstallDateTime != null) {
            var curTime = new Date();
            var currentTime = new Date(parseInt(curTime.getFullYear()), parseInt(curTime.getMonth() + 1), parseInt(curTime.getDate()), parseInt(curTime.getHours()), parseInt(curTime.getMinutes()), parseInt(curTime.getSeconds()));
            var appInstallDate = appInstallDateTime.toString().split("-");
            var getDay = appInstallDate[2].split(" ")[0]; //天
            var hourMM = appInstallDate[2].split(" ")[1];//时分秒
            var appInstallTime = new Date(parseInt(appInstallDate[0]), parseInt(appInstallDate[1]), parseInt(getDay), hourMM.split(":")[0], hourMM.split(":")[1], parseInt(0));
            var seconds = currentTime - appInstallTime;
            if (seconds / (1000 * 60 * 60 * 24) > 3) {
                alert("薅羊毛已经过去3天了,烦请打赏一下作者，您的支持是作者最大的动力！");
                woolStorage.put("appInstallDateTime", "" + getTime() + "");
            }
        } else {
            woolStorage.put("appInstallDateTime", "" + getTime() + "");
        }
    } catch (e) { }
}

//#endregion

//#region 初始化事件
function initializeEvent() {
    ui.allCheck.click(function () {
        let newVideoItems = [];
        havedVideoChecked = new Map();
        for (let i = 0; i < videoItems.length; i++) {
            havedVideoChecked.put(videoItems[i].AppName, videoItems[i].AppIndex);
            havedVideoTimes.put(videoItems[i].AppName, videoItems[i].ExecTimes)
            let row = { SignColor: videoItems[i].SignColor, AppName: videoItems[i].AppName, AppIndex: videoItems[i].AppIndex, ExecTimes: videoItems[i].ExecTimes, IsSign: videoItems[i].IsSign, done: true, ExecTimesMessage: videoItems[i].ExecTimesMessage };
            newVideoItems.push(row);
        }
        videoItems = newVideoItems;
        ui.videoList.setDataSource(videoItems);
    });
    ui.woolVideo.click(function () {
        var appArray = mapSort(havedVideoChecked);//排好序列得app
        if (appArray.length == 0) {
            alert("请选择薅羊毛的app~");
            return;
        }
        var isShowConsole = ui.switchIsShowConsole.isChecked();
        var timesInterval = ui.txtScreenSileTimesInterval.getText();
        var IsAutoSign = ui.switchIsAutoSign.isChecked();
        var IsClearCache = ui.switchIsClearCache.isChecked();
        var IsCashOut = ui.switchIsCashOut.isChecked();
        var IsAutoComment = ui.switchIsAutoComment.isChecked();
        var IsShowToast = ui.switchIsShowToast.isChecked();
        var ForeachDays = ui.txtForeachDays.getText();

        var probability = probabilityValue;
        var consoleMessage = "不开启控制台";
        if (isShowConsole) {
            consoleMessage = "开启控制台";
        }
        var totalTimes = 0;
        for (let x = 0; x < appArray.length; x++) {
            let appName = appArray[x];
            let execTimes = havedVideoTimes.get(appName);//app执行时间 单位分钟
            totalTimes = totalTimes + parseInt(execTimes);
        }
        var totalHour = parseFloat(totalTimes / 60).toFixed(2);//转成小时
        var timesMessage = "";
        if (totalHour > 24) {
            timesMessage = "所选App运行总时间超过24小时，如果点击确定则按照顺序或者排序的App执行，" +
                "超出多余的App将无法被执行！";
        }
        if  (totalHour < 23.5) {
            timesMessage = "所选App运行总时间不足24小时，如果点击确定则按照顺序或者排序的App执行，" +
                "不足时间App将会停止运行，届时无障碍服务可能会被关闭！";
        }
        var tipMessage ="本次共执行:"+totalHour+"小时"+timesMessage
            + "本次共" + appArray.length + "个App参与薅羊毛任务,随机概率为"
            + probabilityValue + ",共执行" + ForeachDays + "天"
            + consoleMessage
            + "确认执行吗？如果配置不正确请点击取消，前往配置页面进行参数修正！";
        confirm(tipMessage).then(value => {
            //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
            if (value) {
                threads.start(function () {
                    //在新线程执行的代码
                    auto.waitFor();
                    toastLog("薅羊毛开始请等待进入第一个程序！");
                    autoBrush(appArray, isShowConsole, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, timesInterval, probability, IsShowToast, ForeachDays);
                });
            } else {
                toastWarn("操作被取消了");
            }
        });
    });
    ui.btnSaveWoolConfig.click(function () {
        woolStorage.put("isShowConsole", "" + ui.switchIsShowConsole.isChecked() + "");
        woolStorage.put("timesInterval", "" + ui.txtScreenSileTimesInterval.getText() + "");
        woolStorage.put("IsAutoSign", "" + ui.switchIsAutoSign.isChecked() + "");
        woolStorage.put("IsClearCache", "" + ui.switchIsClearCache.isChecked() + "");
        woolStorage.put("IsCashOut", "" + ui.switchIsCashOut.isChecked() + "");
        woolStorage.put("IsAutoComment", "" + ui.switchIsAutoComment.isChecked() + "");
        woolStorage.put("IsShowToast", "" + ui.switchIsShowToast.isChecked() + "");
        woolStorage.put("ForeachDays", "" + ui.txtForeachDays.getText() + "");
        //txtForeachDays
        toast("薅羊毛专业版配置保存成功！");
    });
    ui.execTask.click(function () {
        var appArray = mapSort(havedTaskChecked);//排好序列得app
        if (appArray.length == 0) {
            alert("请选择薅羊毛的app~");
            return;
        }
        var isShowConsole = ui.switchIsShowConsole.isChecked();
        var IsAutoSign = ui.switchIsAutoSign.isChecked();
        var IsClearCache = ui.switchIsClearCache.isChecked();
        var IsCashOut = ui.switchIsCashOut.isChecked();
        var IsShowToast = ui.switchIsShowToast.isChecked();
        let appNames = "";
        for (let z = 0; z < appArray.length; z++) {
            appNames = appNames + appArray[z] + ",";
        }
        var tipMessage = "本次共" + appArray.length + "个App参与薅羊毛任务,分别是" + appNames + "任务执行完成后现场自动关闭";
        confirm(tipMessage).then(value => {
            //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
            if (value) {
                threads.start(function () {
                    //在新线程执行的代码
                    auto.waitFor();
                    toastLog("薅羊毛开始请等待进入第一个程序！");
                    autoTask(appArray, isShowConsole, IsAutoSign, IsClearCache, IsCashOut, IsShowToast);
                });
            } else {

            }
        });
    });
    ui.closeVideo.click(function(){
        toast("薅羊毛线程已经被关闭！");
        threads.shutDownAll();
    });
}
//#endregion

//#region 业务方法
/**
 * 自动刷方法
 */
function autoBrush(appNameList, isShowConsole, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, timesInterval, probability, IsShowToast, ForeachDays) {
    /**
    * 是否开启控制台，不建议开启偶尔会遮挡click事件
    */
    threads.start(function () {
        if (isShowConsole) {
            console.show();
            console.setSize(device.width, device.height / 4);
        }
    });
    var execAutoBrushDate=getDate();
    for (let i = 1; i <= ForeachDays; i++) {
        toastInfo("已经执行,第" + i + "天");
        for (let x = 0; x < appNameList.length; x++) {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;//说明是第二天的零点应该重新执行循环
            }
            let appName = appNameList[x];
            if (IsShowToast)
                toastInfo("当前薅羊毛程序" + appName);//系统日志提示
            app.launchApp(appName);//启动App
            sleep(10000);
            adolescentWindows();//关闭青少年窗口

            let execTimes = havedVideoTimes.get(appName);//app执行时间
            let see_second = execTimes * 60;//转换成秒
            let executeCount = parseInt(see_second / parseInt(timesInterval));//分钟转换成秒再除以每次的时间间隔。
            if (appName == "微视") {
                微视(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "抖音极速版") {
                douYinCloseFriendTip();
                抖音极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "快手极速版") {
                kuaiShouCloseInvitationNotice();
                kuaiShouCloseIsLike();
                快手极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "火山极速版") {
                火山极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "火火视频极速版") {
                huoHuoClickVideo();
                火火视频极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "彩蛋视频") {
                彩蛋视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "刷宝短视频") {
                刷宝短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "闪电盒子极速版") {
                闪电盒子极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "欢乐盒子") {
                欢乐盒子(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "趣铃声") {
                趣铃声(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "快音") {
                快音(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "快逗短视频") {
                快逗短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "变身记短视频") {
                变身记短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "趣宠短视频") {
                趣宠短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "小吃货短视频") {
                小吃货短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "有颜短视频") {
                有颜短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "音浪短视频") {
                音浪短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "高手短视频") {
                高手短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "中青看点") {
                中青看点(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "爱走路") {
                爱走路(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "闪鸭短视频") {
                闪鸭短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            } else if (appName == "长豆短视频") {
                长豆短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate);
            }
            //闪电盒子极速版 闪鸭短视频 长豆短视频
        }
    }
}
function autoTask(appNameList, isShowConsole, IsAutoSign, IsClearCache, IsCashOut, IsShowToast) {
    /**
     * 是否开启控制台，不建议开启偶尔会遮挡click事件
     */
    threads.start(function () {
        if (isShowConsole) {
            console.show();
            console.setSize(device.width, device.height / 4);
        }
    });
    for (let x = 0; x < appNameList.length; x++) {
        let appName = appNameList[x];
        if (IsShowToast)
            toastInfo("当前薅羊毛程序" + appName);//系统日志提示
        app.launchApp(appName);//启动App
        sleep(10000);
        adolescentWindows();//关闭青少年窗口 
        if (appName == "今日头条极速版") {
            今日头条极速版(appName, IsAutoSign, IsShowToast);
        } else if (appName == "京东") {
            京东领京豆(appName, IsAutoSign, IsShowToast);
        } else if (appName == "多多步") {
            多多步(appName, IsAutoSign, IsShowToast);
        } else if (appName == "步多多") {
            多多步(appName, IsAutoSign, IsShowToast);
        } else if (appName == "猫扑运动") {
            猫扑运动(appName, IsAutoSign, IsShowToast);
        }
    }
}
function 微视(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    if (id("tv_cancel").exists()) {
        id("tv_cancel").findOnce().click();
    }
    if (className("android.widget.Button").text("知道了").exists()) {
        className("android.widget.ImageView").text("知道了").findOnce().click();
    }
    
    for (var i = 1; i < executeCount; i++) {
        if (checkTimesIsZeroTime(execAutoBrushDate)) {
            return;
        }
        if (computerExctueTime(appName, execTimes)) {
            if (IsAutoSign) {
            }
            toastInfo(appName + "今日时间已到");
            return;//今日时间已到
        }
        toastLog("微视滑动" + i + '次' + "总计:" + executeCount + "次")
        let x1 = device.width / 2;
        let y1 = device.height - (device.height * 0.22)
        let x2 = device.width / 2;
        let y2 = device.height * 0.05
        let pressTime = 300;

        var start = new Date().getTime();//App起始时间
        weiShiCloseAd();
        randomHeart("", probability);
        randomFollow("", probability);
        randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
        randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
        slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
        appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
    }
    function weiShiCloseAd() {
        if (className("android.widget.ImageView").id("jwr").exists()) {
            let b = className("android.widget.ImageView").id("jwr").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
        if (className("android.widget.ImageView").id("close_button").exists()) {
            let b = className("android.widget.ImageView").id("close_button").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
    }
}
function 抖音极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {

    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    douYiSign(appName);//自动签到并记录
                }
                try {
                    if (IsClearCache) {
                        douYinClearAppCache();//自动清理内存
                        sleep(1000);
                    }
                } catch (error) {
                    toastError("抖音极速版清理缓存失败" + error);
                }
                try {
                    if (IsCashOut) {
                        autoCashOut();
                    }
                } catch (error) {
                    toastError("抖音极速版提现失败" + error);
                }
                toastInfo(appName + "今日时间已到");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height - (device.height * 0.2)
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 300;
            var start = new Date().getTime();//App起始时间
            toastLog("抖音极速版滑动" + i + '次' + "总计:" + executeCount + "次")
            douYinCloseFriendTip();
            if (IsAutoComment) {
                douYinAutoComment(parseInt(probability));
            }
            douYinRandomHeart(probability);//随机关注百分之一的概率
            douYinRandomFollow(probability);//随机关注百分之一的概率
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    /**
     * 抖音签到
     */
    function douYiSign(appName) {
        try {

            let ImageView = className("android.widget.ImageView").depth(3).find();
            if (ImageView.length == 3) {
                ImageView[0].click();
                sleep(3000);
                swipe(device.width / 2, device.height - 200, device.width / 2, 500, 700);
                sleep(3000);
                if (text("明日签到").exists()) {
                    console.log("抖音明日签到");
                    let b = text("明日签到").findOnce().bounds();
                    if (click(b.centerX(), b.centerY())) {
                        recordSignTime(appName);
                        sleep(1000);
                        back();//返回到视频页面
                    } else {
                        back();//返回到视频页面
                    }
                }
                if (desc("明日签到").exists()) {
                    console.log("desc抖音明日签到");
                    let b = desc("明日签到").findOnce().bounds();
                    if (click(b.centerX(), b.centerY())) {
                        recordSignTime(appName);
                        sleep(1000);
                        back();//返回到视频页面
                    } else {
                        back();//返回到视频页面
                    }
                }
            }
            sleep(500);
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 清理缓存
     */
    function douYinClearAppCache() {
        if (className("android.widget.TextView").text("我").exists()) {
            let b = className("android.widget.TextView").text("我").findOnce().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            sleep(3000);
            if (clickResult) {
                if (className("android.widget.ImageView").desc("更多").exists()) {
                    let b = className("android.widget.ImageView").desc("更多").findOnce().bounds();
                    let clickResult = click(b.centerX(), b.centerY());
                    if (clickResult) {
                        sleep(5000);
                        if (className("android.widget.TextView").text("设置").exists()) {
                            toastLog("Click设置");
                            let b = className("android.widget.TextView").text("设置").findOnce().bounds();
                            click(b.centerX(), b.centerY());
                        }
                        sleep(3000);
                        swipe(303, 1328, 335, 71, 300);
                        if (className("android.widget.TextView").text("清理缓存").exists()) {
                            let b = className("android.widget.TextView").text("清理缓存").findOnce().bounds();
                            click(b.centerX(), b.centerY());
                        }
                        sleep(3000);
                        if (className("android.widget.TextView").text("清理").exists()) {
                            let b = className("android.widget.TextView").text("清理").findOnce().bounds();
                            let result = click(b.centerX(), b.centerY());
                            if (result) {
                                toastLog("清理成功");
                                if (className("android.widget.ImageView").exists()) {
                                    className("android.widget.ImageView").findOnce().click();
                                } else {
                                    back();
                                }
                            }
                        }
                    }
                }
            } else {
                toastLog("点击我的失败");
            }
        }
    }
    /**
     * 自动评论
     * 这个费劲
     * 1、首先回答按钮不好点击，用ID经常找不到（所以采用遍历的方法）
     * 2、答复框点击不上因为Autojs分析的一团乱根本点不上输入库的区域，只能在周围做文章，以为@和表情的父亲是输入框结果也不行。
     * 后来发现点击表情也弹出评论输入框，就是多了表情，于是乎赋值。赋值直接setText也不行，最后加了个顺序号解决。
     * 3、目前用的是提交按钮的ID，这个ID可能是个坑。
     */
    function douYinAutoComment(probability) {
        try {
            let randomIndex = random(1, parseInt(probability));
            if (randomIndex == 1) {
                let comment = CommentKeyWord[Math.floor(Math.random() * CommentKeyWord.length)];
                if (className("android.widget.FrameLayout").id("pn").exists()) {
                    let clickResult = className("android.widget.FrameLayout").id("pn").findOnce().click();
                    if (clickResult) {
                        sleep(3000);
                        if (className("android.widget.ImageView").desc("表情").exists()) {
                            let b = className("android.widget.ImageView").desc("表情").findOnce().bounds();//获取评论按钮的rect
                            if (click(b.centerX(), b.centerY())) {
                                sleep(1000);
                                setText(0, comment);
                                if (className("android.widget.ImageView").id("q1").exists()) {
                                    className("android.widget.ImageView").id("q1").findOnce().click(); 3
                                }
                                back();
                                sleep(1000);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    function douYinRandomHeart(probability) {
        index = random(1, parseInt(probability));
        if (index == 1) {
            let frameLayouts = className("android.widget.FrameLayout").depth(7).selected(false).clickable(true).find();
            toastLog("FrameLayout" + frameLayouts.length);
            if (frameLayouts.length == 9) {
                frameLayouts[frameLayouts.length - 6].click();
            }
        }
    }
    function douYinRandomFollow(probability) {
        try {
            index = random(1, parseInt(probability));
            if (index == 1) {
                let followMes = className("android.widget.Button").desc("关注").find();
                if (followMes.length > 0) {
                    followMes[followMes.length - 1].click();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    function autoCashOut() {
        if (className("android.view.View").text("元").exists()) {
            toastLog("现金收益");
            let b = className("android.view.View").text("元").findOne().parent().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            sleep(3000);
            if (clickResult) {
                if (className("android.view.View").text("去提现").exists()) {
                    let b = className("android.view.View").text("去提现").findOne().bounds();
                    let clickResult = click(b.centerX(), b.centerY());
                    sleep(3000);
                    if (clickResult) {
                        if (className("android.view.View").text("提现30.00元").exists()) {
                            toastLog("提现30");
                            let b = className("android.view.View").text("提现30.00元").findOnce().parent().bounds();
                            let clickResult = click(b.centerX(), b.centerY());
                            if (clickResult) {
                                if (text("立即提现").exists()) {
                                    toastLog("立即提现");
                                    let clickResult = text("立即提现").findOnce().click();
                                    toastLog(clickResult);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function 快手极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
   
    for (var i = 1; i < executeCount; i++) {
        
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    kuaiShouSign(appName);//自动签到并记录
                }
                if (IsClearCache) {
                    kuaiShouClearAppCache();//自动清理内存
                    sleep(10000);
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height - (device.height * 0.2)
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 300;

            var start = new Date().getTime();//App起始时间
            toastLog("快手极速版滑动" + i + '次' + "总计:" + executeCount + "次")
            if (IsAutoComment) {
                kuaiShouAutoComment(probability);
            }
            randomHeart('slide_play_bottom_follow_button_new', probability);//随机关注百分之一的概率
            randomFollow('like_button', probability);//随机关注百分之一的概率
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }

    function kuaiShouSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        } else {
            if (className("android.widget.FrameLayout").id("redFloat").exists()) {
                console.log("点击redFloat红包");
                let b = id("redFloat").findOne().bounds();
                click(b.centerX(), b.centerY());
                sleep(5000);
            }
            sleep(2000);
            swipe(device.width / 2, device.height - 200, device.width / 2, 500, 700);
            sleep(2000);
            if (className("android.widget.Button").text("去签到").exists()) {
                console.log("快手极速版去签到");
                let b = text("去签到").findOne().bounds();
                click(b.centerX(), b.centerY());
                recordSignTime(appName);
                sleep(1000);
                back();
            }
            if (className("android.widget.Button").text("去查看").exists()) {
                console.log("快手极速版去查看");
                let b = className("android.widget.Button").text("去查看").findOne().bounds();
                click(b.centerX(), b.centerY());
                recordSignTime(appName);
                sleep(1000);
                back();
            }
        }
    }
    /**
     * 自动评论
     */
    function kuaiShouAutoComment(probability) {
        let randomIndex = random(1, parseInt(probability));
        if (randomIndex == 1) {
            let comment = CommentKeyWord[Math.floor(Math.random() * CommentKeyWord.length)];
            let buttons = className("android.widget.LinearLayout").id("comment_button").find();
            if (buttons.length > 0) {
                let clickResult = buttons[0].click();
                if (clickResult) {
                    sleep(3000);
                    if (id("comment_editor_holder_text").exists()) {
                        id("comment_editor_holder_text").findOnce().click();
                        sleep(1000);
                        setText(0, comment);
                        sleep(1000);
                        if (text("发送").exists()) {
                            toastLog("开启自动评论");
                            if (text("发送").findOnce().click()) {
                                toastLog("自动评论成功");
                                back();
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * 清理缓存
     */
    function kuaiShouClearAppCache() {
        if (className("android.widget.ImageView").id("left_btn").exists()) {
            className("android.widget.ImageView").id("left_btn").findOnce().click();
            sleep(3000);
            if (className("android.widget.TextView").text("设置").exists()) {
                toastLog("点击设置");
                let b = className("android.widget.TextView").text("设置").findOne().bounds();
                click(b.centerX(), b.centerY());
                sleep(3000);
                if (className("android.widget.TextView").text("清除缓存").exists()) {
                    let b = className("android.widget.TextView").text("清除缓存").findOnce().bounds();
                    let result = click(b.centerX(), b.centerY());
                    if (result) {
                        toastLog("清理成功");
                    }
                }
            }
        }
    }
}
function 火山极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    click(b.centerX(), b.centerY());
    sleep(10000);
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    huoShanSign(appName);//自动签到并记录
                    sleep(1000);
                }
                if (IsClearCache) {
                    clearAppCache();//自动清理内存
                    sleep(10000);
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 300;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            if (IsAutoComment) {
                huoShanAutoComment(probability);
            }
            huoShanRandomFollow(probability);//随机关注
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }

    /**
     * 火山签到
     */
    function huoShanSign(appName) {
        try {
            let signValue = getSignTime(appName);
            if (getDate() == signValue) {
                toastWarn("已签到本次签到跳过...");
                return;
            }
            if (className("android.widget.TextView").text("红包").exists()) {
                let b = className("android.widget.TextView").text("红包").findOnce().bounds();
                click(b.centerX(), b.centerY());
                sleep(1000);//网速慢等一会
                if (className("android.widget.ImageView").id("a60").exists()) {
                    className("android.widget.ImageView").id("a60").findOnce().click();
                }
                if (className("android.widget.ImageView").id("a5y").exists()) {
                    className("android.widget.ImageView").id("a5y").findOnce().click();
                }
                sleep(1000);
                recordSignTime(appName);//记录时间
                if (className("android.widget.TextView").text("首页").exists()) {
                    let b = className("android.widget.TextView").text("首页").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                    sleep(10000);
                }
            }
            sleep(1000);
        } catch (error) {

        }
    }
    /**
 * 清理缓存
 */
    function clearAppCache() {
        if (className("android.widget.TextView").text("我的").exists()) {
            let b = className("android.widget.TextView").text("我的").findOnce().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            sleep(3000);
            if (clickResult) {
                swipe(350, 1400, 350, 150, 300);
                sleep(5000);
                if (className("android.widget.TextView").text("设置").exists()) {
                    toastLog("Click设置");
                    let b = className("android.widget.TextView").text("设置").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                }
                sleep(3000);
                if (className("android.widget.TextView").text("清理缓存").exists()) {
                    let b = className("android.widget.TextView").text("清理缓存").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                }
                sleep(3000);
                if (className("android.widget.Button").text("确定").exists()) {
                    let b = className("android.widget.Button").text("确定").findOnce().bounds();
                    let result = click(b.centerX(), b.centerY());
                    if (result) {
                        toastLog("清理成功");
                    }
                    back();
                    sleep(3000);
                }
            } else {
                toastLog("点击我的失败");
            }
        }
    }
    /**
     * 自动评论
     * 这个费劲
     * 1、首先回答按钮不好点击，用ID经常找不到（所以采用遍历的方法）
     * 2、答复框点击不上因为Autojs分析的一团乱根本点不上输入库的区域，只能在周围做文章，以为@和表情的父亲是输入框结果也不行。
     * 后来发现点击表情也弹出评论输入框，就是多了表情，于是乎赋值。赋值直接setText也不行，最后加了个顺序号解决。
     * 3、目前用的是提交按钮的ID，这个ID可能是个坑。
     */
    function huoShanAutoComment(probability) {
        let randomIndex = random(1, parseInt(probability));
        if (randomIndex == 1) {
            try {
                let comment = CommentKeyWord[Math.floor(Math.random() * CommentKeyWord.length)];
                if (className("android.widget.RelativeLayout").desc("评论按钮").exists()) {
                    let b = className("android.widget.RelativeLayout").desc("评论按钮").findOnce().bounds();
                    let clickResult = click(b.centerX(), b.centerY());
                    if (clickResult) {
                        sleep(3000);
                        setText(0, comment);
                        sleep(3000);
                        if (className("android.widget.TextView").text("发送").exists()) {
                            toastLog("开启自动评论");
                            if (className("android.widget.TextView").text("发送").findOnce().click()) {
                                toastLog("自动评论成功");
                                back();
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}
function 火火视频极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                    sleep(1000);
                }
                if (IsClearCache) {
                    try {
                        autoClearAppCache();//自动清理内存
                        sleep(10000);
                    } catch (e) { toastError("自动清理内存" + e); }
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.75
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            huoHuoClickGoldEgg();
            if (IsAutoComment) {
                autoComment(probability);
            }
            huoShanRandomFollow(probability);//随机关注
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    /**
     * 自动签到代码
     * @param {APPName} appName 
     */
    function autoSign(appName) {
        sleep(10000);
        if (id("ly").exists()) {
            id("ly").findOnce().click();
        }
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        }
        let bottomMenus = className("android.widget.RelativeLayout").find();
        try {
            toastLog(bottomMenus.length);
            bottomMenus[bottomMenus.length - 1].click();
            sleep(3000);
            if (className("android.widget.ImageView").id("lx").exists()) {
                let clickResult = className("android.widget.ImageView").id("lx").findOnce().click();
            }
            recordSignTime(appName);
            if (className("android.widget.TextView").text("小视频").exists()) {
                toastLog("回到小视频");
                let b = className("android.widget.TextView").text("小视频").findOnce().bounds();
                click(b.centerX(), b.centerY());
            }
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 自动评论
     */
    function autoComment(probability) {
        let randomIndex = random(1, parseInt(probability));
        if (randomIndex == 1) {
            let comment = CommentKeyWord[Math.floor(Math.random() * CommentKeyWord.length)];
            if (className("android.widget.TextView").text("评论").exists()) {
                toastLog("开启自动评论");
                let b = className("android.widget.TextView").text("评论").findOnce().bounds();
                let clickResult = click(b.centerX(), b.centerY());
                if (clickResult) {
                    sleep(3000);
                    setText(0, comment);
                    sleep(3000);
                    if (className("android.widget.TextView").text("发布").exists()) {
                        if (className("android.widget.TextView").text("发布").findOnce().click()) {
                            toastLog("自动评论成功");
                            back();
                        }
                    }
                }
            }
        }
    }
    /**
     * 提现注意延迟必有否则找不到控件
     * 另外网速也是问题
     * 还有设备也是问题
     * 我没写大家子优化吧
     */
    function autoCashOut() {
        let bottomMenus = className("android.widget.RelativeLayout").find();
        try {
            toastLog(bottomMenus.length);
            bottomMenus[bottomMenus.length - 1].click();
            sleep(3000);
            if (className("android.widget.ImageView").id("lx").exists()) {
                let clickResult = className("android.widget.ImageView").id("lx").findOnce().click();
            }
        } catch (error) {
            console.error(error);
        }
        if (className("android.widget.TextView").text("立即提现").exists()) {
            toastLog("立即提现");
            let b = className("android.widget.TextView").text("立即提现").findOne().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            sleep(5000);
            if (clickResult) {
                text("立即提现").waitFor();
                if (className("android.widget.TextView").text("立即提现").exists()) {
                    let b = className("android.widget.TextView").text("立即提现").findOne().bounds();
                    let clickResult = click(b.centerX(), b.centerY());
                    if (clickResult) {
                        console.show(); //开启日志（悬浮窗权限）
                        toastLog("点击提现按钮成功");
                    }
                }
            }
        }
    }
    /**
     * 清理缓存
     */
    function autoClearAppCache() {
        let bottomMenus = className("android.widget.RelativeLayout").find();
        try {
            bottomMenus[bottomMenus.length - 1].click();
            sleep(3000);
            clearMyCache();
        } catch (error) {
            console.error(error);
        }
        /**
         * 清理缓存
         */
        function clearMyCache() {
            if (className("android.widget.FrameLayout").id("q8").exists()) {
                toastLog("点击头像");
                let b = className("android.widget.FrameLayout").id("q8").findOnce().bounds();
                let clickResult = click(b.centerX(), b.centerY());
                sleep(3000);
                if (clickResult) {
                    swipe(350, 1400, 350, 150, 300);
                    sleep(5000);
                    if (className("android.widget.TextView").text("设置").exists()) {
                        toastLog("Click设置");
                        let b = className("android.widget.TextView").text("设置").findOnce().bounds();
                        click(b.centerX(), b.centerY());
                    }
                    sleep(3000);
                    if (className("android.widget.TextView").text("清除缓存").exists()) {
                        let b = className("android.widget.TextView").text("清除缓存").findOnce().bounds();
                        click(b.centerX(), b.centerY());
                    }
                    sleep(3000);
                    if (className("android.widget.Button").text("确定").exists()) {
                        let b = className("android.widget.Button").text("确定").findOnce().bounds();
                        let result = click(b.centerX(), b.centerY());
                        if (result) {
                            toastLog("清理成功");
                            back();
                            sleep(1000);
                            back();
                            back();
                            back();

                        } else {
                            back();
                        }
                    }
                } else {
                    toastLog("点击我的失败");
                }
            }
        }
    }
}
function 彩蛋视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
  
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.05
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
           
            if (IsAutoComment) {
                //autoComment(probability);
            }
            if (text("查看详情").exists()) {
                toastInfo("在边上滑动防止点击！");
                slideScreenDown(device.width * 0.2, y1, device.width * 0.2, y2, pressTime, timesInterval);
                continue;
            }
            closeAd();
            randomHeart('good_count_layout', probability);//随机点赞
            randomFollow('like_button', probability);//随机关注
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function closeAd() {
        try {
            
            if (text("关闭").exists()) {
                text("关闭").findOnce().click();
            }
            if (id("iv_close").exists()) {
                id("iv_close").findOnce().click();
            }
        } catch (error) {
            toastError("关闭广告出现错误" + error);
        }

    }
    /**
     * 自动签到代码
     * @param {APPName} appName 
     */
    function autoSign(appName) {
        try {
            let signValue = getSignTime(appName);
            if (getDate() == signValue) {
                toastWarn("已签到本次签到跳过...");
                return;
            }
            if (className("android.widget.TextView").text("我的").exists()) {
                console.log("彩蛋视频去签到");
                let b = className("android.widget.TextView").text("我的").findOnce().bounds();
                click(b.centerX(), b.centerY());
                sleep(1000);
                recordSignTime(appName);//记录时间
                sleep(3000);
                if (className("android.widget.TextView").text("已签到").exists()) {
                    //记录一下
                    recordSignTime(appName);//记录时间
                }
                b = className("android.widget.TextView").text("首页").findOne().bounds();
                click(b.centerX(), b.centerY());
            }
        } catch (error) {
            console.error("彩蛋视频签到失败" + error);
        }
    }
    /**
     * 自动评论
     */
    function autoComment(probability) {
        let randomIndex = random(1, parseInt(probability));
        if (randomIndex == 1) {
            try {
                let comment = CommentKeyWord[Math.floor(Math.random() * CommentKeyWord.length)];
                if (className("android.widget.LinearLayout").id("ll_commont_show_btn").exists()) {
                    let clickResult = className("android.widget.LinearLayout").id("ll_commont_show_btn").findOnce().click();
                    toastLog(clickResult);
                    text("说点什么吧～").waitFor();
                    if (text("说点什么吧～").exists()) {
                        text("说点什么吧～").findOnce().click();
                        toastLog(comment);
                        setText(0, comment);
                        input(comment);
                        sleep(random(1000, 1200));
                        if (text("完成").exists()) {
                            if (text("完成").findOnce().click()) {
                                toastLog("自动评论成功");
                            }
                            sleep(random(1000, 1200));
                            if (id("iv_close").exists()) {
                                id("iv_close").findOnce().click();
                            }
                        }
                    }
                }
            } catch (error) {
                toastError(error);
            }
        }
    }
    /**
     * 提现注意延迟必有否则找不到控件
     * 另外网速也是问题
     * 还有设备也是问题
     * 我没写大家子优化吧
     */
    function autoCashOut() {
        if (className("android.widget.TextView").text("我的").exists()) {
            let b = className("android.widget.TextView").text("我的").findOne().bounds();
            click(b.centerX(), b.centerY());
            sleep(5000)
            if (id("tv_person_total_gold_title").exists()) {
                id("tv_person_total_gold_title").findOne().click();
            }
            text("立即提现").waitFor();
            if (className("android.view.View").text("立即提现").exists()) {
                let b = className("android.view.View").text("立即提现").findOne().bounds();
                click(b.centerX(), b.centerY());
            }
        }
    }
}
function 闪电盒子极速版(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    closeRandomAd();
    
    clickVideoMenu();
    for (var i = 1; i < executeCount; i++) {
        try {

            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.12
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            closeHongBaoTip();
            randomHeart('layout_like', probability);//随机点赞
            randomFollow('tv_attention', probability);//随机关注
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function autoSign(appName) {
        try {
            if (className("android.widget.TextView").text("任务").exists()) {
                let b = className("android.widget.TextView").text("任务").findOnce().bounds();
                if (click(b.centerX(), b.centerY())) {
                    if (className("android.widget.TextView").text("立即签到").exists()) {
                        className("android.widget.TextView").text("立即签到").findOnce().click();
                        sleep(5000);
                        if (className("android.widget.ImageView").id("img_close").exists()) {
                            toastLog("点击关闭按钮");
                            className("android.widget.ImageView").id("img_close").findOnce().click();
                        }
                        if (className("android.widget.ImageView").text("关闭广告").exists()) {
                            toastLog("点击关闭广告");
                            className("android.widget.ImageView").text("关闭广告").findOnce().click();
                        }
                        recordSignTime(appName);//记录时间
                        sleep(2000);
                    }
                    if (className("android.widget.TextView").text("首页").exists()) {
                        console.show();
                        toastLog("点击首页");
                        let b = className("android.widget.TextView").text("首页").findOnce().bounds();
                        click(b.centerX(), b.centerY())
                    }
                }
            }
        } catch (error) {
            console.error("闪电盒子签到出现错误" + error);
        }
    }
    function autoCashOut() {
        try {
            if (className("android.widget.TextView").text("我的").exists()) {
                toastLog("发现我的");
                let b = className("android.widget.TextView").text("我的").findOne().bounds();
                click(b.centerX(), b.centerY());
                text("我的余额").waitFor();
                b = text("我的余额").findOne().bounds();
                let clickResult = click(b.centerX(), b.centerY());
            }
        } catch (error) {
            console.error("闪电盒子极速版提现" + error);
        }
    }
    function clickVideoMenu() {
        closeRandomAd();
        className("android.widget.TextView").text("小视频").waitFor();
        if (className("android.widget.TextView").text("小视频").exists()) {
            toastLog("点击小视频");
            let b = className("android.widget.TextView").text("小视频").findOnce().parent().bounds();
            click(b.centerX(), b.centerY());
        }
    }
    function closeRandomAd() {
        if (className("android.widget.TextView").text("广告").exists()) {
            sleep(32000);//等待32SAD时间
            if (className("android.widget.TextView").text("确定").exists()) {
                className("android.widget.TextView").text("确定").findOnce().click();
            }
            if (className("android.widget.TextView").text("关闭广告").exists()) {
                className("android.widget.TextView").text("关闭广告").findOnce().click();
            }
        }
        if (className("android.widget.TextView").text("确定").exists()) {
            className("android.widget.TextView").text("确定").findOnce().click();
        }
        if (text("确定").exists()) {
            text("确定").findOnce().click();
        }
        if (className("android.widget.TextView").text("关闭广告").exists()) {
            className("android.widget.TextView").text("关闭广告").findOnce().click();
        }
        if (id("tt_video_ad_close_layout").exists()) {
            id("tt_video_ad_close_layout").findOnce().click();
        }
    }
    function closeHongBaoTip() {
        if (className("android.widget.ImageView").id("img_close").exists()) {
            className("android.widget.ImageView").id("img_close").findOnce().click();
        }
        if (text("继续观看").exists()) {
            text("继续观看").findOnce().click();
        }
    }
}
function 欢乐盒子(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    closeRandomAd();
    closeHongBaoTip();
   
    clickVideo();
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        //autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.12
            let pressTime = 400;
            var start = new Date().getTime();//App起始时间

            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
            closeHongBaoTip();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }

    function clickVideo() {
        closeHongBaoTip();
        try {
            text("小视频").waitFor();
            if (className("android.widget.TextView").text("小视频").exists()) {
                toastLog("点击小视频");
                let b = className("android.widget.TextView").text("小视频").findOnce().parent().bounds();
                sleep(1000)
                click(b.centerX(), b.centerY());
            }
        } catch (error) {
            toastError(error);
            closeHongBaoTip();
            text("小视频").waitFor();
            if (className("android.widget.TextView").text("小视频").exists()) {
                toastLog("点击小视频");
                let b = className("android.widget.TextView").text("小视频").findOnce().parent().bounds();
                sleep(1000)
                click(b.centerX(), b.centerY());
            }
        }

    }
    function autoSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        }
        text("任务").waitFor();
        try {
            if (className("android.widget.TextView").text("任务").exists()) {
                let b = className("android.widget.TextView").text("任务").findOnce().bounds();
                if (click(b.centerX(), b.centerY())) {
                    if (className("android.widget.TextView").text("立即签到").exists()) {
                        className("android.widget.TextView").text("立即签到").findOnce().click();
                        sleep(5000);
                        if (className("android.widget.ImageView").id("img_close").exists()) {
                            toastLog("点击关闭按钮");
                            className("android.widget.ImageView").id("img_close").findOnce().click();
                        }
                        if (className("android.widget.ImageView").text("关闭广告").exists()) {
                            toastLog("点击关闭广告");
                            className("android.widget.ImageView").text("关闭广告").findOnce().click();
                        }
                        recordSignTime(appName);//记录时间
                        sleep(1000);
                    }
                    if (className("android.widget.TextView").text("已领取").exists()) {
                        recordSignTime(appName);//记录时间
                        sleep(1000);
                    }
                    if (className("android.widget.TextView").text("首页").exists()) {
                        console.show();
                        toastLog("点击首页");
                        let b = className("android.widget.TextView").text("首页").findOnce().bounds();
                        click(b.centerX(), b.centerY())
                    }
                }
            }
            closeRandomAd();
            closeHongBaoTip();//
        } catch (error) {
            console.error("欢乐盒子签到出现错误" + error);
        }
    }
    function closeHongBaoTip() {
        if(text("继续观看").exists()){
            text("继续观看").findOnce().click();
        }
        if(id("iv_dialog_close").exists()){
            id("iv_dialog_close").findOnce().click();
        }
        //swipe(device.width / 2, device.height * 0.12, device.width / 2, device.height * 0.8, 400);
        sleep(1000);
    }
    function closeRandomAd() {
        if (className("android.widget.TextView").text("广告").exists()) {
            sleep(32000);//等待32SAD时间
            if (className("android.widget.TextView").text("确定").exists()) {
                className("android.widget.TextView").text("确定").findOnce().click();
            }
            if (className("android.widget.TextView").text("关闭广告").exists()) {
                className("android.widget.TextView").text("关闭广告").findOnce().click();
            }
        }
        if (className("android.widget.TextView").text("确定").exists()) {
            className("android.widget.TextView").text("确定").findOnce().click();
        }
        if (text("确定").exists()) {
            text("确定").findOnce().click();
        }
        if (className("android.widget.TextView").text("关闭广告").exists()) {
            className("android.widget.TextView").text("关闭广告").findOnce().click();
        }
        if (id("tt_video_ad_close_layout").exists()) {
            id("tt_video_ad_close_layout").findOnce().click();
        }
    }
}
function 趣铃声(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
  
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsClearCache) {
                    try {
                        autoClearCache();//自动清理内存
                        sleep(10000);
                    } catch (e) { toastError("自动清理内存" + e); }
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.75
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
            quLingShengCloseRedFloatTip();
            randomHeart('tv_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function quLingShengCloseRedFloatTip() {
        try {
            if (className("android.widget.ImageView").id("iv_close").exists()) {
                className("android.widget.ImageView").id("iv_close").findOnce().click();
            }
            if (className("android.widget.ImageView").id("tt_video_ad_close_layout").exists()) {
                className("android.widget.ImageView").id("tt_video_ad_close_layout").findOnce().click();
            }
            if (className("android.widget.RelativeLayout").id("tt_video_ad_close_layout").exists()) {
                className("android.widget.RelativeLayout").id("tt_video_ad_close_layout").findOnce().click();
            }
            if (className("android.widget.TextView").text("关闭广告").exists()) {
                className("android.widget.TextView").text("关闭广告").findOnce().click();
            }
            if (className("android.widget.TextView").text("暂不领取").exists()) {
                className("android.widget.TextView").text("暂不领取").findOnce().click();
            }
        } catch (e) { }
    }
    function autoSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        }
        text("任务").waitFor();
        quLingShengCloseRedFloatTip();
        if (text("任务").exists()) {
            let b = text("任务").findOnce().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            if (clickResult) {
                sleep(1000);
                recordSignTime(appName);//记录时间
                if (id("iv_close").exists()) {
                    id("iv_close").findOnce().click()
                }
                if (className("android.widget.TextView").text("小视频").exists()) {
                    let b = className("android.widget.TextView").text("小视频").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                }
            }
        }
    }
    function autoClearCache() {
        text("我的").waitFor();
        console.info(text("我的").find().length);
        let b = text("我的").findOnce().parent().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        text("我的喜欢").waitFor();
        let sResult = swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.1, 400);
        toastLog(sResult);
        sleep(1000);
        if (text("设置").exists()) {
            toastLog("Click设置");
            sleep(1000);
            let b = text("设置").findOnce().bounds();
            clickResult = click(b.centerX(), b.centerY());
            if (clickResult) {
                text("清除缓存").waitFor();
                b = text("清除缓存").findOnce().bounds();
                clickResult = click(b.centerX(), b.centerY());
                if (clickResult) {
                    back();
                    text("小视频").waitFor();
                    if (className("android.widget.TextView").text("小视频").exists()) {
                        console.info("趣铃声点击,小视频");
                        let b = className("android.widget.TextView").text("小视频").findOnce().bounds();
                        click(b.centerX(), b.centerY());
                    }
                }
            }
        }
    }
    function autoCashOut() {
        text("我的").waitFor();
        if (text("我的").exists()) {
            let b = text("我的").findOnce().parent().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            if (clickResult) {
                text("我的金币").waitFor();
                if (text("我的金币").exists()) {
                    b = text("我的金币").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                    text("立即提现").waitFor();
                    clickResult = text("立即提现").findOnce().click();
                    if (clickResult) {
                        console.show();
                        toastLog("提现点击按钮成功");
                        back();//返回到主面板
                    }
                }
            }
        }
    }
}
function 快音(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.75
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            if (text("查看详情").exists()) {
                toastInfo("在边上滑动防止点击！");
                slideScreenDown(device.width * 0.2, y1, device.width * 0.2, y2, pressTime, timesInterval);
                continue;
            }
            randomHeart('video_like_parent', probability);//随机点赞
            kuaiYinRandomFollow(probability);
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function autoSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            if (className("android.widget.TextView").text("视频").exists()) {
                console.info("快音点击,视频");
                let video = className("android.widget.TextView").text("视频").findOnce();
                let b = video.bounds();
                click(b.centerX(), b.centerY());
            }
            return;
        }
        text("福利").waitFor();
        if (text("福利").exists()) {
            let b = text("福利").findOnce().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            if (clickResult) {
                recordSignTime(appName);//记录时间
                sleep(10000);
                if (text("视频").exists()) {
                    let video = className("android.widget.TextView").text("视频").findOnce();
                    let b = video.bounds();
                    click(b.centerX(), b.centerY());
                }
            }
            else {
                if (className("android.widget.TextView").text("视频").exists()) {
                    console.info("快音点击,视频");
                    let video = className("android.widget.TextView").text("视频").findOnce();
                    let b = video.bounds();
                    click(b.centerX(), b.centerY());
                }
            }
        }
    }
    function kuaiYinRandomFollow(probability) {
        index = random(1, parseInt(probability));
        if (index == 1) {
            if (text("关注").exists()) {
                text("关注").findOnce().click();
            }
        }
    }
    function autoCashOut() {
        text("福利").waitFor();
        if (text("福利").exists()) {
            let b = text("福利").findOnce().bounds();
            let clickResult = click(b.centerX(), b.centerY());
            if (clickResult) {
                text("提现").waitFor();
                if (text("提现").exists()) {
                    text("提现").findOnce().click();
                    text("去提现").waitFor();
                    clickResult = text("去提现").findOnce().click();
                    if (clickResult) {
                        console.show();
                        toastLog("提现点击按钮成功");
                    }
                }
            }
        }
    }
}
function 快逗短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
   
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSignZhouKouKeJi(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 变身记短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {

    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSignZhouKouKeJi(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 趣宠短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    if (IsAutoSign) {
        autoSignZhouKouKeJi(appName);//自动签到并记录
    }
    for (var i = 1; i < executeCount; i++) {
        try {
            if (computerExctueTime(appName, execTimes)) {
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 小吃货短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    if (IsAutoSign) {
        autoSignZhouKouKeJi(appName);//自动签到并记录
    }
    for (var i = 1; i < executeCount; i++) {
        try {
            if (computerExctueTime(appName, execTimes)) {
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 有颜短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSignZhouKouKeJi(appName);//自动签到并记录
                }
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 音浪短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    if (IsAutoSign) {
        autoSignZhouKouKeJi(appName);//自动签到并记录
    }
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 高手短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    if (IsAutoSign) {
        autoSignZhouKouKeJi(appName);//自动签到并记录
    }
    for (var i = 1; i < executeCount; i++) {
        try {
            if (computerExctueTime(appName, execTimes)) {
                if (IsCashOut) {
                    try {
                        autoCashOutZhouKouKeJi();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次")
            zhouKouKeJiCloseRedFloatTip();
            waitAdForCoin();
            randomHeart('layout_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
}
function 中青看点(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {

    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsClearCache) {
                    try {
                        autoClearCache();//自动清理内存
                        sleep(10000);
                    } catch (e) { toastError("自动清理内存" + e); }
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
            closeAd();
            getCoinWateTime();
            if (text("查看详情").exists()) {
                toastInfo("在边上滑动防止点击！");
                slideScreenDown(device.width * 0.2, y1, device.width * 0.2, y2, pressTime, timesInterval);
                continue;
            }
            randomFollow('tv_attention', probability)//随机点赞
            randomHeart('rg', probability);//随机关注
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function closeAd() {
        try {
            if (id("jt").exists()) {
                id("jt").findOnce().click();
            }
        } catch (error) {
            toastError("中青看点关闭广告出现错误" + error);
        }

    }
    /**
     * 看广告得金币
     */
    function getCoinWateTime() {
        if (className("android.widget.TextView").text("免费领取").exists()) {
            sleep(12000);
            if (className("android.widget.TextView").text("待领取").exists()) {
                console.info("领取金币");
                let b = className("android.widget.TextView").text("待领取").findOnce().bounds();
                click(b.centerX(), b.centerY());
            }
        }
    }
    function autoSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        }
        text("任务").waitFor();
        let b = className("android.widget.TextView").text("任务").findOnce().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        if (clickResult) {
            sleep(3000)
            if (className("android.view.View").text("签到领现金").exists()) {
                console.show();
                toastLog("签到领现金");
                let b = text("签到领现金").findOnce().bounds();
                click(b.centerX(), b.centerY());
                sleep(3000);
                recordSignTime(appName);
                back();
            }
            className("android.widget.TextView").text("小视频").waitFor();
            let b = className("android.widget.TextView").text("小视频").findOnce().bounds();
            click(b.centerX(), b.centerY());
            sleep(1200);
            clickScreen();
        }
    }
    function autoClearCache() {
        text("我的").waitFor();
        let b = className("android.widget.TextView").text("我的").findOnce().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        if (clickResult) {
            toastLog("开启滑动");
            sleep(1000);
            slideScreenDown(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.1, 400);
            className("android.widget.TextView").text("系统设置").waitFor();
            if (className("android.widget.TextView").text("系统设置").exists()) {
                let b = className("android.widget.TextView").text("系统设置").findOnce().bounds();
                click(b.centerX(), b.centerY());
                className("android.widget.TextView").text("清空缓存").waitFor();
                if (className("android.widget.TextView").text("清空缓存").exists()) {
                    className("android.widget.TextView").text("清空缓存").findOnce().click();
                    sleep(300);
                    let clickResult = text("确定").findOnce().click();
                    if (clickResult) {
                        toastLog("清理成功");
                    }
                }
            }
        }
    }
    function autoCashOut() {
        try {
            text("我的").waitFor();
            if (className("android.widget.TextView").text("我的").exists()) {
                toastLog("发现我的");
                let b = className("android.widget.TextView").text("我的").findOne().bounds();
                click(b.centerX(), b.centerY());
                text("我的青豆").waitFor();
                b = text("我的青豆").findOne().bounds();
                click(b.centerX(), b.centerY());
                text("提现").waitFor();
                b = text("提现").findOnce().bounds();
                click(b.centerX(), b.centerY()); 1
                text("立即提现").waitFor();
                text("立即提现").findOnce().click();
            }
        } catch (error) {
            console.error("闪电盒子极速版提现" + error);
        }
    }
}
function 爱走路(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    try {
        aiZouLuCloseAdAndRedFloat();
        aiZouLuClickVideoMenu();
    } catch (error) {
        toastError(error);
    }
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录
                }
                if (IsClearCache) {
                    try {
                        autoClearCache();//自动清理内存
                        sleep(10000);
                    } catch (e) { toastError("自动清理内存" + e); }
                }
                if (IsCashOut) {
                    try {
                        autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
            aiZouLuCloseAdAndRedFloat();
            randomHeart('tv_like', probability);//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function aiZouLuClickVideoMenu() {
        sleep(1200);
        className("android.widget.TextView").text("爱视频").waitFor();
        let b = className("android.widget.TextView").text("爱视频").findOnce().bounds();
        click(b.centerX(), b.centerY());
    }
    function aiZouLuCloseAdAndRedFloat() {
        if (id("tv_cancel").exists()) {
            let b = id("tv_cancel").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
        if (className("android.widget.TextView").text("暂不领取").exists()) {
            className("android.widget.TextView").text("暂不领取").findOnce().click();
        }
        if (className("android.widget.ImageView").id("iv_close").exists()) {
            className("android.widget.ImageView").id("iv_close").findOnce().click();
        }
        if (className("android.widget.TextView").text("放弃兑换").exists()) {
            let b = className("android.widget.TextView").text("放弃兑换").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
        if (className("android.widget.TextView").id("tv_close_btn").exists()) {
            let b = className("android.widget.TextView").id("tv_close_btn").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
        
    }
    function autoSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        }
        //text("爱赚钱").waitFor();
        toastInfo("签到" + appName);
        sleep(1000)
        //点击爱赚钱进行签到
        if (className("android.widget.TextView").text("爱赚钱").exists()) {
            console.info("点击爱赚钱");
            let b = className("android.widget.TextView").text("爱赚钱").findOnce().bounds();
            click(b.centerX(), b.centerY());
            sleep("5000");
            recordSignTime(appName);//记录时间
            if (className("android.view.View").id("dd").exists()) {
                className("android.view.View").id("dd").findOnce().click();
            }
            className("android.widget.TextView").text("爱视频").waitFor();
            b = className("android.widget.TextView").text("爱视频").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
    }
    function autoClearCache() {
        text("我的").waitFor();
        let b = className("android.widget.TextView").text("我的").findOnce().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        if (clickResult) {
            if (id("tv_dialog_close").exists()) {
                id("tv_dialog_close").findOnce().click();
            }
            let systemMenu = className("android.widget.LinearLayout").depth(3).clickable(true).find();
            systemMenu[1].click();
            className("android.widget.TextView").text("清除缓存").waitFor();
            if (className("android.widget.TextView").text("清除缓存").exists()) {
                className("android.widget.TextView").text("清除缓存").findOnce().click();
                sleep(300);
                toastLog("清理成功");
                back();
            }
            className("android.widget.TextView").text("爱视频").waitFor();
            let b = className("android.widget.TextView").text("爱视频").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }
    }
    function autoCashOut() {
        text("我的").waitFor();
        let b = className("android.widget.TextView").text("我的").findOnce().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        text("当前金币数").waitFor();
        b = text("当前金币数").findOne().bounds();
        click(b.centerX(), b.centerY());
        text("立即提现").waitFor();
        text("立即提现").findOnce().click();
        back();
    }
}
function 刷宝短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {
    authorityCancleTip();
    clickScreen();
    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录,网速慢会卡死
                }
                clickScreen();
                if (IsClearCache) {
                    try {
                        //autoClearCache();//自动清理内存
                        sleep(10000);
                    } catch (e) { toastError("自动清理内存" + e); }
                }
                if (IsCashOut) {
                    try {
                        //autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
            randomHeart('praise', probability);//随机点赞
            shuaBaoRandomFollow(probability);
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function shuaBaoRandomFollow(probability) {
        index = random(1, parseInt(probability));
        if (index == 1) {
            if (id('tv_ad_attention').exists()) {
                id("tv_ad_attention").findOnce().click();
            } else {
                if (text("关注").exists()) {
                    text("关注").findOnce().click();
                }
            }
        }
    }
    function autoSign(appName) {
        let signValue = getSignTime(appName);
        if (getDate() == signValue) {
            toastWarn("已签到本次签到跳过...");
            return;
        }

        text("任务").waitFor();
        let b = text("任务").findOnce().bounds();
        click(b.centerX(), b.centerY());
        sleep(1000);

        if (id("imgClose").exists()) {
            id("imgClose").findOnce().click();
        }


        sleep(60000)//1分钟还不行就放弃吧
        toastLog("准备签到");

        if (text("继续赚元宝").exists()) {
            toastLog("继续赚元宝");
            recordSignTime(appName);//记录时间
        } else {
            let sings = text("立即签到").find();
            toastInfo(sings.length);
            if (text("立即签到").exists()) {
                toastLog("立即签到");
                let clickResult = text("立即签到").findOnce().click();
                if (clickResult) {
                    text("看视频签到").waitFor();
                    if (text("看视频签到").exists()) {
                        text("看视频签到").findOnce().click();
                        sleep(32000);
                        recordSignTime(appName);//记录时间
                        id("iv_close").waitFor();
                        id("iv_close").findOnce().click();
                    }
                }
            }
        }
        toastLog("准备首页");
        if (text("首页").exists()) {
            toastLog("首页");
            let b = text("首页").findOnce().bounds();
            click(b.centerX(), b.centerY());
        }else{
            back();
        }
    }
    function autoCashOut() {
        text("我的").waitFor();
        let b = className("android.widget.TextView").text("我的").findOnce().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        text("当前金币数").waitFor();
        b = text("当前金币数").findOne().bounds();
        click(b.centerX(), b.centerY());
        text("立即提现").waitFor();
        text("立即提现").findOnce().click();
        back();
    }
    function authorityCancleTip() {
        if (text("取消").exists()) {
            text("取消").findOnce().click();
        }
        if (id("cancel").exists()) {
            id("cancel").findOnce().click();
        }

        sleep(1000);
    }
    function clickScreen() {
        var x = device.width / 2;
        var y = device.height / 2 - 100;
        click(x, y);
    }
}
function 长豆短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {

    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    autoSign(appName);//自动签到并记录,网速慢会卡死
                }
                if (IsClearCache) {
                    try {
                        //autoClearCache();//自动清理内存
                        sleep(10000);
                    } catch (e) { toastError("自动清理内存" + e); }
                }
                if (IsCashOut) {
                    try {
                        //autoCashOut();
                        sleep(1000)
                    } catch (e) { toastError("提现失败" + e); }
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.05
            let pressTime = 400;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");
            randomHeart('love', probability);//随机点赞 
            randomFollow('btn_follow_view', probability)//随机点赞
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function autoSign(appName) {

    }
}
function 闪鸭短视频(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability,execAutoBrushDate) {

    for (var i = 1; i < executeCount; i++) {
        try {
            if (checkTimesIsZeroTime(execAutoBrushDate)) {
                return;
            }
            if (computerExctueTime(appName, execTimes)) {
                if (IsAutoSign) {
                    //autoSign(appName);//自动签到并记录
                }
                toastInfo(appName + "今日薅羊毛时间已到,进入下一个app...");
                return;//今日时间已到
            }
            let x1 = device.width / 2;
            let y1 = device.height * 0.8
            let x2 = device.width / 2;
            let y2 = device.height * 0.1
            let pressTime = 600;

            var start = new Date().getTime();//App起始时间
            toastLog(appName + "滑动" + i + '次' + "总计:" + executeCount + "次");

            closeVideoTip();
            randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
            randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
            slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval);
            appRunTimeRecord(appName, (new Date().getTime() - start))//记录一次时间
        } catch (error) {
            toastError(appName + "刷刷刷时出现错误！" + error);
        }
    }
    function closeVideoTip() {
        if (text("确定").exists()) {
            text("确定").findOnce().click();
        }
    }
}
function 京东领京豆(appName, IsAutoSign, IsShowToast) {
    toastLog("进入京东");
    sleep(10000);
    if (className("android.view.View").desc("我的").exists()) {
        toast("点击我的");
        className("android.view.View").desc("我的").findOnce().click();
        sleep(3000);
        if (className("android.widget.TextView").text("京豆").exists()) {
            console.info("进入京豆");
            let b = className("android.widget.TextView").text("京豆").findOnce().bounds();
            console.hide();
            click(b.centerX(), b.centerY());
            sleep(2000);
            if (className("android.widget.TextView").text("已签到").exists()) {
                recordSignTime(appName);
            }
            if (className("android.widget.TextView").text("去签到领京豆").exists()) {
                toast("去签到领京豆");
                let b = className("android.widget.TextView").text("去签到领京豆").findOnce().bounds();
                click(b.centerX(), b.centerY());
                sleep(3000);
                if (className("android.widget.TextView").text("签到领京豆").exists()) {
                    let b = className("android.widget.TextView").text("签到领京豆").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                    recordSignTime(appName);
                    sleep(21000);
                }
            } else {
                console.error("领取京豆失败！");
            }
        } else {
            console.error("领取京豆失败！");
        }
    } else {
        toast("查找<我的>menu元素失败，导致领取京豆失败！");
    }
}
function 今日头条极速版(appName, IsAutoSign, IsShowToast) {
    /**
 * 今日头条读新闻
 */
    for (var i = 1; i <= 15; i++) {
        sleep(4000);//保障一下
        toast("今日头条极速版读新闻第" + i + "次");
        if (className("android.widget.TextView").text("历史").exists()) {
            let tabMenu = className("android.widget.TextView").text("历史").findOnce();//推荐里面容易有广告
            click(tabMenu.bounds().centerX(), tabMenu.bounds().centerY());//进入到栏目
            sleep(6000);//保障一下
            let news = id("bz").findOnce();//第二条新闻
            if (news != null) {
                click(news.bounds().centerX(), news.bounds().centerY());//点击第二条新闻
                for (var x = 1; x <= 20; x++) {
                    toast("今日头条极速版读新闻第" + i + "次" + "滑动第" + x + "次");
                    swipe(303, 1200, 335, 150, 300);
                    sleep(2000);
                }
                let textViews = className("android.widget.ImageView").clickable(true).find();
                if (textViews.length > 0) {
                    let b = textViews[0].bounds();
                    click(b.centerX(), b.centerY());
                }
            }
        }
    }
    sleep(1500);//歇一会
    /**
     * 今日头条读小说
     */
    if (className("android.widget.TextView").text("小说").exists()) {
        let storyMenu = className("android.widget.TextView").text("小说").findOnce();
        click(storyMenu.bounds().centerX(), storyMenu.bounds().centerY());
        sleep(6000);
        if (className("android.view.View").text("更多").depth(9).exists()) {
            className("android.view.View").text("更多").depth(9).findOnce().click();
        }
        sleep(4000);
        let views = className("android.view.View").depth(9).find();
        if (views.length > 0) {
            let book = views[views.length - 2].bounds();
            click(book.centerX(), book.centerY());
            //权且算20片是一章
            for (let i = 1; i <= 400; i++) {
                toast("今日头条极速版小说滑动" + i + "次");//这个有点难 一章才给50金币 多少片算一章这个不知道啊
                swipe(750, 1000, 100, 1000, 500);
                sleep(1000);//加速阅读1S读一篇
                if (id("novel_coin_exciting_ad_dismiss_btn").exists()) {
                    id("novel_coin_exciting_ad_dismiss_btn").findOnce().click();
                }
            }
            back();
            sleep(2200);
            back();
            if (id("a_8").exists()) {
                id("a_8").findOnce().click();
            }
        }
    }
    sleep(1000);//歇一会

    /**
     * 今日头条检索关键字
     */
    var searchKeyWord = [
        'AutoJs教程',
        'RNN',
        'CNN',
        'HMM',
        'LSTM',
        '人工智能的出路',
        'Java的出路',
        'AI的出路',
        'DOTNET未来',
        'C#的出路',
        'Android教程',
        'IOS教程',
        'MAC教程',
        'XCODE教程',
        'IOS还有未来吗',
        'uniapp教程',
        '编辑距离',
        '欧式距离',
        '隐马尔可夫链',
        '云计算',
        '云存储',
        'Iaas',
        'AI',
        'AI和教育',
    ];
    let textViews = className("android.widget.TextView").depth(3).find();
    let b = textViews[textViews.length - 1].bounds();
    click(b.centerX(), b.centerY());
    for (i = 0; i < 5; i++) {
        let inputSearchButton = id('gj').findOne();
        if (inputSearchButton != null) {
            let keyWord = searchKeyWord[Math.floor(Math.random() * searchKeyWord.length)];
            setText(keyWord)
            inputSearchButton.click();
            sleep(3000);
        }
    }
    recordSignTime(appName);//记录时间
    sleep(1000);//歇一会
    back();//返回到搜索页面
    sleep(2200);
    back();//返回到首页为下一个任务准备
    sleep(2200);
}
function 多多步(appName, IsAutoSign, IsShowToast) {
    if (className("android.widget.Button").text("领取金币").exists()) {
        console.info("点击领取金币");
        let b = className("android.widget.Button").text("领取金币").findOnce().bounds();
        click(b.centerX(), b.centerY());
        sleep("5500");
        try {
            if (className("android.widget.TextView").id("tv_close").exists()) {
                className("android.widget.TextView").id("tv_close").findOnce().click();
            }
            recordSignTime(appName);//记录时间
        } catch (ex) { }
    }
}
function 步多多(appName, IsAutoSign, IsShowToast) {
    if (IsAutoSign) {
        //autoSign();
    }
    autoGetCoin();
    recordSignTime(appName);//记录时间

    function autoGetCoin() {
        text("走走").waitFor();
        if (className("android.widget.TextView").text("领取金币").exists()) {
            console.info("点击领取金币");
            text("领取金币").findOnce().click();
            sleep("3500");
            let closeButton = className("android.view.View").find();
            if (closeButton.length == 1)
                closeButton[0].click();

        }
    }

    function autoSign() {
        if (className("android.widget.TextView").text("赚赚").exists()) {
            console.info("点击赚赚");
            let b = className("android.widget.TextView").text("赚赚").findOnce().parent().bounds();
            click(b.centerX(), b.centerY());
            if (text("赚赚").findOnce().click()) {
                sleep("5000");
                let closeButton = className("android.view.View").find();
                if (closeButton.length == 1) {
                    closeButton[0].click();
                }
            }
            if (text("走走").exists()) {
                text("走走").findOnce().click();
            }
        }
    }
}


function 示例(appName, executeCount, execTimes, timesInterval, IsAutoSign, IsAutoComment, IsClearCache, IsCashOut, probability) {

}


/**
 * 火山极速版关注
 * @param {概率} probability 
 */
function huoShanRandomFollow(probability) {
    index = random(1, parseInt(probability));
    if (index == 1) {
        if (text("关注").exists()) {
            text("关注").findOnce().click();
        }
    }
}
/**
 * 关闭好友红包提示
 */
function douYinCloseFriendTip() {
    if (className("android.widget.ImageViewid").id("baq").exists()) {
        className("android.widget.ImageViewid").id("baq").findOnce().click();
    }
}
/**
 * 关闭通知
 */
function kuaiShouCloseInvitationNotice() {
    if (className("android.widget.ImageButton").id("close").exists()) {
        className("android.widget.ImageButton").id("close").findOnce().click();
    }
}
/**
 * 快手关闭是否喜欢对话框
 */
function kuaiShouCloseIsLike() {
    if (className("android.widget.TextView").text("不影响").exists()) {
        className("android.widget.TextView").text("不影响").findOnce().click();
    }
}
//#endregion



/**
 * 统一看广告得金币方法
 */
function waitAdForCoin() {
    if (id("tv_timer").exists()) {
        sleep(20000);
    }
}
/**
 * 判断app今日时间否到达
 * @param {app名称} appName 
 * @param {app执行时常 单位分钟} execTimes 
 */
function computerExctueTime(appName, execTimes) {
    let key = appName + storageSign + getDate();
    let havedRunTimes = woolStorage.get("" + key + "");
    if (havedRunTimes == null) {
        return false;
    } else {
        let havedMinute = (havedRunTimes / 1000) / 60;//读取到的时间是毫秒需要转换成秒，转换成秒后在转换成分钟
        if (havedMinute < execTimes) {
            return false;
        } else {
            return true;
        }
    }

}
/**
 * 判断是否是凌晨
 * @param {开始执行脚本的日期} execAutoBrushDate 
 */
function checkTimesIsZeroTime(execAutoBrushDate) {
    let key = "HavedComputerDateIsExec" + getDate();
    let HavedComputerDateIsExec = woolStorage.get(""+key+""); //不存储记录每天的1点将无法执行
    if (HavedComputerDateIsExec == null) {
        //Null本地方存储未存值且不是第一天执行
        if(execAutoBrushDate==getDate()){
            return false;//当天还不用执行
        }else{
            //说明当前日期大于执行日期
            var date= new Date();
            var hour = date.getHours(); 
            var execDate = execAutoBrushDate.toString().split("-");//2020-5-20
            if (hour == 0) {
                woolStorage.put("" + key + "", "true");//记录一下 今天就再也进不来了
                return true;
            } else {
                return false;
            }
        }
    } else {
        if (HavedComputerDateIsExec) {
            //今天已经计算过
            return false;
        }
        else{
            return true;
        }
    }
}
/**
 * 屏幕向下滑动并延迟timesInterval+-秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime, timesInterval) {
    swipe(startX, startY, endX, endY, pressTime);
    let randomMin = timesInterval * 1000;
    let randomMax = (parseInt(timesInterval) + 2) * 1000;
    let delayTime = random(randomMin, randomMax);
    sleep(delayTime);
}
/**
 * 按照指定概率随机上滑
 * @param {*} startX 
 * @param {*} startY 
 * @param {*} endX 
 * @param {*} endY 
 * @param {*} pressTime 
 * @param {*} probability 
 */
function randomUpSildeScreen(startX, startY, endX, endY, pressTime, probability) {
    let randomIndex = random(1, parseInt(probability));
    if (randomIndex == 1) {
        swipe(startX, startY, endX, endY, pressTime);
        delayTime = random(12000, 15000);
        sleep(delayTime);
    }
}
/**
 * 连续下滑对上一个无兴趣
 * 其实得和上滑做个排他，既然无兴趣不要在上滑
 */
function randomDownSildeScreen(startX, startY, endX, endY, pressTime, timesInterval, probability) {
    let randomIndex = random(1, parseInt(probability));
    if (randomIndex == 1) {
        swipe(startX, startY, endX, endY, pressTime);
        sleep(2000);
        swipe(startX, startY, endX, endY, pressTime);
        sleep(timesInterval);
    }
}
/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime) {
    swipe(startX, startY, endX, endY, pressTime);
    let delayTime = random(8000, 12000);
    sleep(delayTime);
}
/**
 * 随机点赞
 * @param {点赞ID}} view_id 
 */
function randomHeart(view_id, probability) {
    index = random(1, parseInt(probability));
    if (index == 1) {
        var target = id(view_id).findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
            sleep(1000);
        }
    }
}
/**
 * 随机关注
 * @param {控件ID} follow_view_id 
 * @param {概率} probability 
 */
function randomFollow(follow_view_id, probability) {
    index = random(1, parseInt(probability));
    if (index == 1) {
        var target = id(follow_view_id).findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
            sleep(1000);
        }
    }
}
/**
 * 输出Tosat和Info日志
 * @param {日志消息} messagge 
 */
function toastInfo(message) {
    toast(message);
    console.info(getTime() + "" + message);
}
/**
 * 输出Tosat和Error日志
 * @param {日志消息} messagge 
 */
function toastError(message) {
    toast(message);
    console.error(getTime() + "" + message);
}
function toastLog(message) {
    toast(message);
    console.log(getTime() + "" + message);
}
function toastWarn(message) {
    toast(message);
    console.warn(getTime() + "" + message);
}
/**
 * 记录App签到时间
 * @param {App名称} appName 
 */
function getSignTime(appName) {
    let key = appName + storageSign;
    let value = woolStorage.get(key);
    return value;
}
function Color(color) {
    return android.graphics.Color.parseColor(color);
}
function GradientDrawable(orientation, color) {
    var colors = [];
    color.forEach(color => colors.push(Color(color)));
    return new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation[orientation], colors);
}
/**
 * 青少年窗口
 */
function adolescentWindows() {
    if (text("我知道了").exists()) {
        text("我知道了").findOnce().click();
    }
    if (text("知道了").exists()) {
        text("知道了").findOnce().click();
    }
}
/**
 * 记录App签到时间
 * @param {App名称} appName 
 */
function recordSignTime(appName) {
    let key = appName + storageSign;
    let value = getDate();
    woolStorage.put(key, value);
}
/**
 * 记录App一次运行的时间
 * @param {appName} appName 
 * @param {本次运行时间} recordTimes 
 */
function appRunTimeRecord(appName, recordTimes) {
    let key = appName + storageSign + getDate();
    var havedRunTimes = woolStorage.get("" + key + "");
    let value = "";
    if (havedRunTimes == null) {
        woolStorage.put(key, parseInt(recordTimes));
    } else {
        value = parseInt(havedRunTimes) + parseInt(recordTimes);
        woolStorage.put(key, value);
    }
}
/**
 * 秒转换成小时
 * @param {*} appCount 
 * @param {*} foreachCount 
 * @param {*} slideTimes 
 * @param {*} timesInterval 
 * @param {*} isExistsLongTimes 
 */
function computerTime(appCount, foreachCount, slideTimes, timesInterval, isExistsLongTimes) {
    let maxSecond = appCount * foreachCount * slideTimes * timesInterval;
    let maxHour = maxSecond / 3600;
    return Math.round(maxHour);
}

/**
 * 获取当前时间格式yyyyMMdd
 */
function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    return year + "-" + month + "-" + day;
}
/**
 * 
 */
function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    var hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    };
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    };
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + "0";
};

/**
 * JS构建Map
 */
function Map() {
    var obj = {};
    this.put = function (key, value) {
        obj[key] = value;//把键值绑定到obj对象上
    }
    //size方法，获取Map容器的个数
    this.size = function () {
        var count = 0;
        for (var attr in obj) {
            count++;
        }
        return count;
    }
    //get方法，根据key获取value的值
    this.get = function (key) {
        if (obj[key] || obj[key] === 0 || obj[key] === false) {
            return obj[key]
        } else {
            return null;
        }
    }
    //remove方法,删除方法
    this.remove = function (key) {
        if (obj[key] || obj[key] === 0 || obj[key] === false) {
            delete obj[key]
        }
    }
    //each方法,遍历方法
    this.eachMap = function (callBack) {
        for (var attr in obj) {
            callBack(attr, obj[attr])
        }
    }

}
/**
 * map排序（核心是冒泡有点笨）
 */
function mapSort(mapTask) {
    var arr = [];
    var result = [];
    mapTask.eachMap(function (key, value) {
        arr.push(parseInt(value));
        result.push(key);
    });
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            // 相邻元素两两对比，元素交换，大的元素交换到后面
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                //value交换key也得换
                var keyTemp = result[j + 1];
                result[j + 1] = result[j];
                result[j] = keyTemp;
            }
        }
    }
    return result;//返回数组  
}
/**
 *点击一下屏幕
 */
function clickScreen() {
    var x = device.width - device.width * 0.2;
    var y = device.height - device.height * 0.2;
    toastLog("点击屏幕" + x + ":" + y);
    let clickResult = click(x, y);
    toastLog(clickResult);
}
//#endregion