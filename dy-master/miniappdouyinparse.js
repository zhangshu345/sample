// 云函数入口文件
const rp = require('request-promise');
const request = require('request');
// const fs = require('fs');


function requestNotRedirect(url) {
    /* 请求url并不允许重定向 */
    return new Promise((resolve, reject) => {
        var options = {
            uri: url,
            headers: {
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
            },
            followRedirect: false,
            resolveWithFullResponse: true,
        };
        request.get(options, function (error, response, body) {
            // console.error('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            resolve(response)
        })
    })

}


async function getParam(url) {
    const res = await requestNotRedirect(url)
    // console.log(res.body)
    var pattern = new RegExp("video\/(.*?)\/.*?mid=(.*?)&");
    if (pattern.test(res.body)) {
        item_id = RegExp.$1;
        mid = RegExp.$2;
        // console.log(item_id, mid);
        return {
            'item_id': item_id,
            'mid': mid
        }
    } else {
        return null
    }

}

async function getItemInfo(item_id, mid) {
    var url = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${item_id}`
    // console.log(url)
    try {
        var options = {
            uri: url,
            headers: {
                'authority': 'www.iesdouyin.com',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                'content-type': 'application/x-www-form-urlencoded',
                'accept': '*/*',
                'referer': `https://www.iesdouyin.com/share/video/${item_id}/?region=CN&mid=${mid}&u_code=15b9142gf&titleType=title&utm_source=copy_link&utm_campaign=client_share&utm_medium=android&app=aweme`,
                'accept-language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7'
            }
        };
        var res = await rp(options)
        return JSON.parse(res);
    } catch (err) {
        console.log(err)
    }
 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
};

function parse(res_json) {
    var playwm = res_json.item_list ? res_json['item_list'][0]['video']['play_addr']['url_list'][0] : null
    if (playwm) {
        var tested = false;
        var try_count = 0;
        var paly_address = playwm.replace('playwm', 'play')
        var cover = res_json['item_list'][0]['video']['origin_cover']['url_list'][0];
        // 尝试5次 使得realAddress尽可能在downloadFile合法域名中
        for (var i = 1; i < 6; i++) {
            try_count += 1;
            var realAddress =  getRealAddress(paly_address);
            console.log(realAddress);
            // fs.writeFile('result.txt', realAddress + '\n', {
            //     flag: 'a'
            // }, (err) => {
            //     console.log(err)
            // })
            var downloadFileUrls = ["http://v6-dy-cold.ixigua.com", "http://v3-dy-cold.ixigua.com", "http://v5-dy-c.ixigua.com", "http://v95-dy-a.ixigua.com", "http://v5-dy-j.ixigua.com", "http://v5-dy-g.ixigua.com", "http://v5-dy-e.ixigua.com", "http://v5-dy-i.ixigua.com", "http://v5-dy-b.ixigua.com", "http://v92-dy.ixigua.com", "http://v9-dy-cold.ixigua.com", "http://v29-dy-cold.ixigua.com", "http://v5-dy-f.ixigua.com", "http://v95-dy.ixigua.com", "http://v5-dy-h.ixigua.com", "http://v26-dy-cold.ixigua.com", "http://v27-dy-cold.ixigua.com"];
            for (var j = 0; j < downloadFileUrls.length; j++) {
                if (realAddress.search(downloadFileUrls[j]) !== -1) {
                    tested = true;
                    break
                }
            }
            if (tested==true) break;
        }
        return {
            'code': 1,
            'tryCount': try_count,
            'tested': tested,
            'playAddress': realAddress,
            'cover': cover
        }
    }
}


function getRealAddress(url) {
    const res =  requestNotRedirect(url);
    // console.log(res.body)
    var pattern = new RegExp('href=\"(.*?)\"');
    if (pattern.test(res.body)) {
        return RegExp.$1;
        // console.log(RegExp.$1)
    }

}


 function main(url) {
    var params =  getParam(url);
    // console.log(params)
    if (params) {
        var res_json =  getItemInfo(params.item_id, params.mid)
        console.log(res_json)
        var result = parse(res_json);
        return result
    } else {
        return {
            'code': 0
        }
    }
}


// !async function () {
//     var res = await main('https://v.douyin.com/JJTDEKL');
//     console.log(res)
// }()
var res =  main('https://v.douyin.com/JJTDEKL');
    console.log(res)


