var unicodeHelper = (function () {
        function UnicodeHelper() {
        }

        UnicodeHelper.prototype.enUnicode = function (str) {
            var rs = "";
            for (var i = 0; i < str.length; i++) {
                //补零。不补有些库无法正常解析。保持4位
                //slice负数参数，与其方向相反。start=-1为最后一个元素，end=-1为第一个元素。start必须
                rs += "\\u" + ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
            }
            return rs;
        }
        UnicodeHelper.prototype.deUnicode = function (str) {
            var strArray = str.split("\\u");
            //防止\u开头或结尾，导致解析空串产生的“□”的结果
            if (str.startsWith("\\u")) {
                strArray = strArray.slice(1, strArray.length);
            }
            if (str.endsWith("\\u")) {
                strArray = strArray.slice(0, strArray.length - 1);
            }

            var rs = "";
            for (var i = 0; i < strArray.length; i++) {
                rs += String.fromCharCode(parseInt(strArray[i], 16));
            }
            return rs;
        }
        UnicodeHelper.prototype.deUnicode2 = function (str) {
            str = str.replace(/\\/gi, "%");
            //过时的语法
            return unescape(str);

        }

        return new UnicodeHelper();
    }());
    
    
  toast(unicodeHelper.enUnicode("测试"))