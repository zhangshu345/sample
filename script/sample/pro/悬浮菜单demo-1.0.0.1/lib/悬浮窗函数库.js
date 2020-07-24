// Relative  相对

// Absolutely  绝对

var getWindowPosition = function(window) {
  var left = window.getX();
  var top = window.getY();
  var height = window.getHeight();
  var width = window.getWidth();
  var right = left + width;
  var bottom = top + height;

  var result = {
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    height: height,
    width: width,
    centerX: parseInt(left + width / 2),
    centerY: parseInt(top + height / 2),
    screenRightSide: false,
    screenLeftSide: false
  };
  if (result.centerX > device.width / 2) {
    result.screenRightSide = true;
  } else {
    result.screenLeftSide = true;
  }
  return result;
};
module.exports = {
  getWindowPosition: getWindowPosition,
  吸附(window, intervalTime) {
    intervalTime = intervalTime || 1000;
    setInterval(function() {
      var windowPosition = getWindowPosition(window);
      if (windowPosition.screenLeftSide) {
        window.setPosition(-parseInt(windowPosition.width / 3), windowPosition.top);
      } else {
        window.setPosition(device.width - parseInt((windowPosition.width / 3) * 2), windowPosition.top);
      }
    }, intervalTime);
  },
  悬浮控制(window, windowid, ar) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.isAutoIntScreen = true;
    this.Click = function() {};
    this.Move = function() {};
    this.LongClick = function() {};
    this.setClick = fun => {
      fun = fun || function() {};
      this.Click = fun;
    };
    this.setMove = fun => {
      fun = fun || function() {};
      this.Move = fun;
    };
    this.setLongClick = (fun, ji) => {
      fun = fun || function() {};
      this.LongClick = fun;
      if (parseInt(ji)) {
        this.Tjitime = parseInt(ji) / 50;
      }
    };
    this.TX = 0;
    this.TY = 0;
    this.Tx = 0;
    this.Ty = 0;
    this.Tyidong = false;
    this.Tkeep = false;
    this.Tjitime = 12;
    this.Ttime = 0;
    setInterval(() => {
      if (this.Tkeep) {
        this.Ttime++;
        if (!this.Tyidong && this.Ttime > this.Tjitime) {
          //非移动且按下时长超过1秒判断为长按
          this.Tkeep = false;
          this.Ttime = 0;
          this.LongClick(windowid);
        }
      }
    }, 50);
    if (windowid) {
      windowid.setOnTouchListener(
        new android.view.View.OnTouchListener((view, event) => {
          this.Move(view, event);
          switch (event.getAction()) {
            case event.ACTION_DOWN:
              this.Tx = event.getRawX();
              this.Ty = event.getRawY();
              this.TX = window.getX();
              this.TY = window.getY();
              this.Tkeep = true; //按下,开启计时
              break;
            case event.ACTION_MOVE:
              var sx = event.getRawX() - this.Tx;
              var sy = event.getRawY() - this.Ty;
              if (!this.Tyidong && this.Tkeep && this.weiyi(sx, sy) >= 10) {
                this.Tyidong = true;
              }
              if (this.Tyidong && this.Tkeep) {
                window.setPosition(this.TX + sx, this.TY + sy);
              }
              break;
            case event.ACTION_UP:
              if (!this.Tyidong && this.Tkeep && this.Ttime < 7) {
                this.Click(view);
              }
              this.Tkeep = false;
              this.Ttime = 0;
              if (this.Tyidong) {
                if (this.isAutoIntScreen) {
                  threads.start(
                    new java.lang.Runnable(() => {
                      this.windowyidong(this.IntScreen());
                    })
                  );
                } else {
                  threads.start(
                    new java.lang.Runnable(() => {
                      this.windowyidong(this.ViewIntScreen());
                    })
                  );
                }
                this.Tyidong = false;
              }
              break;
          }
          return true;
        })
      );
    }
    this.G = (win, view) => {
      //返回悬浮窗的坐标范围。
      var K = 36, //悬浮窗的隐形边矩
        H = 66; //手机通知栏的高度
      var ary;
      if (!ar) {
        if (view) {
          ary = [
            [-view.getX(), -view.getY()],
            [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight()) - H - K]
          ];
        } else {
          ary = [
            [0, 0],
            [this.Width - win.getWidth() + K * 2, this.Height - win.getHeight() - H + K * 2]
          ];
        }
      } else {
        if (view) {
          ary = [
            [-view.getX(), H - view.getY()],
            [this.Width - (view.getX() + view.getWidth()), this.Height - (view.getY() + view.getHeight())]
          ];
        } else {
          ary = [
            [0, H],
            [this.Width - win.getWidth(), this.Height - win.getHeight()]
          ];
        }
      }
      return ary;
    };
    this.weiyi = function() {
      //平方和开方
      var num = 0;
      for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
      }
      return Math.round(Math.sqrt(num) * 1000) / 1000;
    };
    this.windowGXY = function(x, y, k) {
      //修正坐标的所在范围。如果坐标超出了范围，则修正回来。
      x = k[0][0] < x && x < k[1][0] ? x : k[0][0] < x ? k[1][0] : k[0][0];
      y = k[0][1] < y && y < k[1][1] ? y : k[0][1] < y ? k[1][1] : k[0][1];
      return {
        x: x,
        y: y
      };
    };
    this.windowyidong = (A, s, w) => {
      //移动悬浮窗的动画效果。
      w = w || window;
      s = s || 10;
      var sx = A[1][0] - A[0][0],
        sy = A[1][1] - A[0][1];
      var sd = this.weiyi(sx, sy) / s;
      var X = sx / sd,
        Y = sy / sd;
      var x = 0,
        y = 0;
      for (var i = 0; i < sd; i++) {
        x += X;
        y += Y;
        sleep(1);
        w.setPosition(A[0][0] + x, A[0][1] + y);
      }
      w.setPosition(A[1][0], A[1][1]);
    };
    this.OutScreen = () => {
      //算出最短的距离到达屏幕之外。
      var F = this.G(window);
      var x = window.getX(),
        y = window.getY();
      var sx = window.getX() + window.getWidth() / 2,
        sy = window.getY() + window.getHeight() / 2 + 66;
      var cx =
          Math.abs(sx < this.Width - sx ? sx : this.Width - sx) < Math.abs(sy < this.Height - sy ? sy : this.Height - sy)
            ? sx < this.Width / 2
              ? F[0][0] - window.getWidth()
              : F[1][0] + window.getWidth()
            : x,
        cy =
          Math.abs(sx < this.Width - sx ? sx : this.Width - sx) < Math.abs(sy < this.Height - sy ? sy : this.Height - sy)
            ? y
            : sy < this.Height / 2
            ? F[0][1] - window.getHeight()
            : F[1][1] + window.getHeight();
      return [
        [x, y],
        [cx, cy]
      ];
    };
    this.toScreenEdge = d => {
      //返回到屏幕边缘的坐标。d为浮点数0.1~1之间。
      d = d || 0;
      var F = this.G(window);
      var x = window.getX(),
        y = window.getY();
      var sw = window.getWidth() * d;
      var sx = window.getX() + window.getWidth() / 2,
        sy = window.getY() + window.getHeight() / 2 + 66;
      var cx = sx < this.Width - sx ? -sw : this.Width + sw - window.getWidth() + 72;
      return [
        [x, y],
        [cx, y]
      ];
    };
    this.centerXY = F => {
      //返回距离中心位置的一个方形两个坐标。
      var w = window.getWidth();
      var h = window.getHeight();
      return [
        [F[0] + w / 2, F[1] + h / 2],
        [F[0] - w / 2, F[1] - h / 2]
      ];
    };
    this.IntScreen = () => {
      //当悬浮超出屏幕之外之后进入的坐标。
      var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
      return [
        [window.getX(), window.getY()],
        [A.x, A.y]
      ];
    };
    this.ViewIntScreen = () => {
      //当悬浮超出屏幕之外之后进入的坐标。
      var A = this.windowGXY(window.getX(), window.getY(), this.G(window, windowid));
      return [
        [window.getX(), window.getY()],
        [A.x, A.y]
      ];
    };
    // 这个线程会将悬浮按钮放到左上角
    // threads.start(
    //   new java.lang.Runnable(() => {
    //     this.windowyidong(this.IntScreen());
    //   })
    // );
  }
};
