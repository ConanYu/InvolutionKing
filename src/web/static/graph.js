/*
绘制多个用户的rating折线图
let data = {
            oj_name: "codeforces",
            datas: [
                {
                    username: "cppisgood",
                    user_url: "https://codeforces.com/profile/cppisgood",
                    // time    rating   contest name     contest url
                    rating_list: [
                        [
                            1283270400000,
                            1432,
                            "yzn cup 392",
                            "https://codeforces.com"
                        ],
                        [
                            1297526400000,
                            1426,
                            "yzn cup 770",
                            "https://codeforces.com"
                        ],
                        [
                            1335283200000,
                            1467,
                            "yzn cup 817",
                            "https://codeforces.com"
                        ],
                        [
                            1374336000000,
                            1447,
                            "yzn cup 199",
                            "https://codeforces.com"
                        ],
                        [
                            1392912000000,
                            1438,
                            "yzn cup 90",
                            "https://codeforces.com"
                        ],
                        [
                            1436457600000,
                            1454,
                            "yzn cup 877",
                            "https://codeforces.com"
                        ],
                        [
                            1478908800000,
                            1570,
                            "yzn cup 203",
                            "https://codeforces.com"
                        ],
                        [
                            1503763200000,
                            1558,
                            "yzn cup 887",
                            "https://codeforces.com"
                        ],
                        [
                            1536508800000,
                            1665,
                            "yzn cup 963",
                            "https://codeforces.com"
                        ],
                        [
                            1550505600000,
                            1605,
                            "yzn cup 320",
                            "https://codeforces.com"
                        ],
                        [
                            1597075200000,
                            1622,
                            "yzn cup 740",
                            "https://codeforces.com"
                        ],
                        [
                            1615132800000,
                            1570,
                            "yzn cup 885",
                            "https://codeforces.com"
                        ],
                        [
                            1658505600000,
                            1600,
                            "yzn cup 252",
                            "https://codeforces.com"
                        ],
                        [
                            1678204800000,
                            1527,
                            "yzn cup 819",
                            "https://codeforces.com"
                        ],
                        [
                            1708099200000,
                            1494,
                            "yzn cup 803",
                            "https://codeforces.com"
                        ],
                        [
                            1753113600000,
                            1496,
                            "yzn cup 712",
                            "https://codeforces.com"
                        ],
                        [
                            1782316800000,
                            1501,
                            "yzn cup 635",
                            "https://codeforces.com"
                        ],
                        [
                            1810656000000,
                            1618,
                            "yzn cup 754",
                            "https://codeforces.com"
                        ],
                        [
                            1847808000000,
                            1642,
                            "yzn cup 353",
                            "https://codeforces.com"
                        ],
                        [
                            1866556800000,
                            1699,
                            "yzn cup 724",
                            "https://codeforces.com"
                        ],
                        [
                            1900771200000,
                            1686,
                            "yzn cup 190",
                            "https://codeforces.com"
                        ],
                        [
                            1932825600000,
                            1702,
                            "yzn cup 912",
                            "https://codeforces.com"
                        ],
                        [
                            1967817600000,
                            1745,
                            "yzn cup 535",
                            "https://codeforces.com"
                        ],
                        [
                            1991750400000,
                            1780,
                            "yzn cup 521",
                            "https://codeforces.com"
                        ],
                        [
                            2031667200000,
                            1785,
                            "yzn cup 688",
                            "https://codeforces.com"
                        ],
                        [
                            2060006400000,
                            1808,
                            "yzn cup 105",
                            "https://codeforces.com"
                        ],
                        [
                            2089296000000,
                            1754,
                            "yzn cup 238",
                            "https://codeforces.com"
                        ],
                        [
                            2136729600000,
                            1738,
                            "yzn cup 496",
                            "https://codeforces.com"
                        ],
                        [
                            2160662400000,
                            1662,
                            "yzn cup 548",
                            "https://codeforces.com"
                        ],
                        [
                            2196086400000,
                            1718,
                            "yzn cup 715",
                            "https://codeforces.com"
                        ],
                        [
                            2217081600000,
                            1768,
                            "yzn cup 682",
                            "https://codeforces.com"
                        ],
                        [
                            2241360000000,
                            1768,
                            "yzn cup 280",
                            "https://codeforces.com"
                        ],
                        [
                            2292508800000,
                            1882,
                            "yzn cup 999",
                            "https://codeforces.com"
                        ],
                        [
                            2304518400000,
                            1919,
                            "yzn cup 932",
                            "https://codeforces.com"
                        ],
                        [
                            2363558400000,
                            1842,
                            "yzn cup 625",
                            "https://codeforces.com"
                        ],
                        [
                            2389363200000,
                            1832,
                            "yzn cup 410",
                            "https://codeforces.com"
                        ]
                    ]
                }, {
                    username: "yzn",
                    user_url: "https://codeforces.com/profile/cppisgood",
                    rating_list: [
                        [
                            1271088000000,
                            1483,
                            "yzn cup 833",
                            "https://codeforces.com"
                        ],
                        [
                            1295020800000,
                            1558,
                            "yzn cup 776",
                            "https://codeforces.com"
                        ],
                        [
                            1343232000000,
                            1660,
                            "yzn cup 591",
                            "https://codeforces.com"
                        ],
                        [
                            1357488000000,
                            1591,
                            "yzn cup 606",
                            "https://codeforces.com"
                        ],
                        [
                            1403798400000,
                            1634,
                            "yzn cup 86",
                            "https://codeforces.com"
                        ],
                        [
                            1434384000000,
                            1687,
                            "yzn cup 271",
                            "https://codeforces.com"
                        ],
                        [
                            1473004800000,
                            1743,
                            "yzn cup 591",
                            "https://codeforces.com"
                        ],
                        [
                            1507593600000,
                            1678,
                            "yzn cup 57",
                            "https://codeforces.com"
                        ],
                        [
                            1523116800000,
                            1630,
                            "yzn cup 708",
                            "https://codeforces.com"
                        ],
                        [
                            1546272000000,
                            1677,
                            "yzn cup 809",
                            "https://codeforces.com"
                        ],
                        [
                            1604678400000,
                            1729,
                            "yzn cup 894",
                            "https://codeforces.com"
                        ],
                        [
                            1625241600000,
                            1651,
                            "yzn cup 946",
                            "https://codeforces.com"
                        ],
                        [
                            1652371200000,
                            1688,
                            "yzn cup 823",
                            "https://codeforces.com"
                        ],
                        [
                            1688140800000,
                            1764,
                            "yzn cup 877",
                            "https://codeforces.com"
                        ],
                        [
                            1708704000000,
                            1779,
                            "yzn cup 687",
                            "https://codeforces.com"
                        ],
                        [
                            1742486400000,
                            1751,
                            "yzn cup 953",
                            "https://codeforces.com"
                        ],
                        [
                            1785081600000,
                            1864,
                            "yzn cup 666",
                            "https://codeforces.com"
                        ],
                        [
                            1817136000000,
                            1960,
                            "yzn cup 493",
                            "https://codeforces.com"
                        ],
                        [
                            1852041600000,
                            2059,
                            "yzn cup 223",
                            "https://codeforces.com"
                        ],
                        [
                            1870272000000,
                            2129,
                            "yzn cup 194",
                            "https://codeforces.com"
                        ],
                        [
                            1909152000000,
                            2148,
                            "yzn cup 978",
                            "https://codeforces.com"
                        ],
                        [
                            1940774400000,
                            2202,
                            "yzn cup 601",
                            "https://codeforces.com"
                        ],
                        [
                            1975852800000,
                            2309,
                            "yzn cup 489",
                            "https://codeforces.com"
                        ],
                        [
                            2013897600000,
                            2363,
                            "yzn cup 554",
                            "https://codeforces.com"
                        ],
                        [
                            2020003200000,
                            2358,
                            "yzn cup 241",
                            "https://codeforces.com"
                        ],
                        [
                            2073139200000,
                            2299,
                            "yzn cup 900",
                            "https://codeforces.com"
                        ],
                        [
                            2110492800000,
                            2235,
                            "yzn cup 833",
                            "https://codeforces.com"
                        ],
                        [
                            2114784000000,
                            2314,
                            "yzn cup 284",
                            "https://codeforces.com"
                        ],
                        [
                            2166883200000,
                            2362,
                            "yzn cup 788",
                            "https://codeforces.com"
                        ],
                        [
                            2178460800000,
                            2289,
                            "yzn cup 529",
                            "https://codeforces.com"
                        ],
                        [
                            2216995200000,
                            2220,
                            "yzn cup 139",
                            "https://codeforces.com"
                        ],
                        [
                            2243260800000,
                            2308,
                            "yzn cup 771",
                            "https://codeforces.com"
                        ],
                        [
                            2295360000000,
                            2334,
                            "yzn cup 568",
                            "https://codeforces.com"
                        ],
                        [
                            2310652800000,
                            2340,
                            "yzn cup 39",
                            "https://codeforces.com"
                        ],
                        [
                            2359756800000,
                            2425,
                            "yzn cup 882",
                            "https://codeforces.com"
                        ],
                        [
                            2375539200000,
                            2526,
                            "yzn cup 525",
                            "https://codeforces.com"
                        ]
                    ]
                }
            ]
        }
*/
function draw_line_graph(dom, data) {
    // 初始化并清空dom上可能残留的echarts属性
    let myChart = echarts.init(dom);
    myChart.clear();

    let series_list = []; // 绘制的折线的列表
    let contests = []; // 所有数据中的比赛 [[时间， 比赛名， 链接],]
    for (let user_data of data["datas"]) {
        for (let rating_info of user_data["rating_list"]) {
            contests.push([rating_info[0], rating_info[2], rating_info[3]]);
        }
    }
    let unique_contests = []; // 去重后的比赛列表
    let vis = new Map();
    for (let contest of contests) {
        if (!vis.get(contest[0])) {
            vis.set(contest[0], true);
            unique_contests.push(contest);
        }
    }
    unique_contests.sort(function cmp(lhs, rhs) { return lhs[0] - rhs[0] }); // 对去重后的比赛列表排序

    let Xs = []; // 横坐标列表（每个比赛对应一个横坐标点
    for (let contest of unique_contests) Xs.push(contest[0]);

    // 绘制背景颜色
    series_list.push(get_background_series(data["oj_name"]));

    for (let user_data of data["datas"]) {
        let ratings = []; //每个点的数据 [比赛时间, 分数0, 分数1, 比赛名称， 比赛网址] 分数0用于绘图，分数0为undefined时在折线上不显示这个点，分数1用于在tooltip上显示真实分数
        let i = 0;
        let last = 0;
        for (let contest of unique_contests) {
            if (i !== user_data["rating_list"].length && contest[0] === user_data["rating_list"][i][0]) {
                last = user_data["rating_list"][i][1];
                ratings.push([contest[0], last, last, contest[1], contest[2]]);
                ++i;
            } else ratings.push([contest[0], undefined, last, contest[1], contest[2]]);
        }

        series_list.push({
            type: "line",
            name: user_data["username"],
            data: ratings,
            connectNulls: true,
            endLabel: {
                show: true,
                formatter: function (params) {
                    let last_rating = 0;
                    if (user_data["rating_list"].length > 0) last_rating = user_data["rating_list"][user_data["rating_list"].length - 1][1];
                    return user_data["username"] + ': ' + last_rating;
                },
                itemStyle: {
                    color: "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16),
                    silent: true,
                },
            },
            lineStyle: {
                shadowBlur: 2,
                shadowColor: "white",
            },
            // smooth: true,
        });
    }
    let option = {
        animationDuration: 10000, // 动画速度
        title: {
            text: data["oj_name"],
        },
        legend: {},
        grid: {
            right: "15%",
        },
        xAxis: {
            type: "time",
            data: Xs,
            silent: true,
        },
        yAxis: {
            type: "value",
            show: false,
            silent: true,
            scale: true,
            name: 'rating',
        },
        tooltip: {
            formatter: function (params) {
                let res = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 0px;margin-bottom: 0px">\n'
                    + params[0].value[3] + '<br>' + '<br>';
                for (let user_data of params) {
                    res += user_data.marker
                        + user_data.seriesName
                        + ": "
                        + user_data.value[2]
                        + '<br>';
                }
                return res;
            },
            trigger: 'axis'
        },
        dataZoom: {
            type: 'slider'
        },
        series: series_list,

    }
    myChart.on('click', function (params) {
        window.open(params.value[4]);
    });
    myChart.setOption(option, true);
}