//应用卸载
auto.waitFor()
auto.setMode("normal")
var fw=floaty.rawWindow(
    <vertical background="#ffffff">
  <text id="toolbar" background="#009687" h="30sp" text="应用自动卸载" gravity="center|bottom" textSize="18sp" textColor="white" />
  <relative w="*"  margin="5" h="75dp">
     <checkbox id="cb_select_defualt" margin="5" text="选中默认无用应用" checked="true" ></checkbox>
    
     <checkbox id="cb_select_all" text="全选" checked="false"  margin="5" layout_alignParentRight="true"></checkbox>
     
   </relative>
    <list id="appList">
                        <card w="*" h="75" margin="5" cardCornerRadius="5dp"
                            cardElevation="1dp" foreground="?selectableItemBackground">
                            <relative w="*" h="*">
                                <img id="icon" margin="10" w="55" h="55"></img>
                                <text id="title" text="{{this.title}}" textColor="#222222" maxLines="1" marginLeft="4" marginRight="6" />
                                <text text="下载" textColor="blue" maxLines="1" marginLeft="3" marginRight="3" />
                                <text text="今日已读:" textColor="green" maxLines="1" />
                                <input id="abd" maxLines="1" text="0" textColor="green" />
                                <text text="总时长:" textColor="blue" maxLines="1" />
                                <input id="{{this.tid}}" maxLines="1" text="{{this.allsum}}" inputType="number" />
                                <text text="分钟" textColor="blue" maxLines="1" />
                                <checkbox id="{{this.chid}}" marginLeft="3" marginRight="3" checked="{{this.done}}" />
                            </relative>
                        </card>
                    </list>

    </vertical>
)
var myapplist=[]
var appstr=app.getallthirdAppPackageName()
var apps=JSON.parse(appstr)
apps.forEach(app => {
    
});