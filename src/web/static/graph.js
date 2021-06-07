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
                            1860,
                            "yzn cup 591",
                            "https://codeforces.com"
                        ],
                        [
                            1357488000000,
                            1891,
                            "yzn cup 606",
                            "https://codeforces.com"
                        ],
                        [
                            1403798400000,
                            2233,
                            "yzn cup 86",
                            "https://codeforces.com"
                        ],
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
    let vis = new Map();
    for (let user_data of data["datas"]) {
        for (let rating_info of user_data["rating_list"]) {
            if (!vis.get(rating_info[0])) {
                vis.set(rating_info[0], true);
                contests.push([rating_info[0], rating_info[2], rating_info[3]]);
            }
        }
    }
    contests.sort(function cmp(lhs, rhs) { return lhs[0] - rhs[0] }); // 对去重后的比赛列表排序

    let Xs = []; // 横坐标列表（每个比赛对应一个横坐标点
    for (let contest of contests) Xs.push(contest[0]);

    // 绘制背景颜色
    series_list.push(get_background_series(data["oj_name"]));

    for (let user_data of data["datas"]) {
        let ratings = []; //每个点的数据 [比赛时间, 分数0, 分数1, 比赛名称， 比赛网址] 分数0用于绘图，分数0为undefined时在折线上不显示这个点，分数1用于在tooltip上显示真实分数
        let i = 0;
        let last = 0;
        for (let contest of contests) {
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
                overflow: 'break',
                width: 80,
                formatter: function (params) {
                    return user_data["username"] + '\n' + params.value[2];
                },
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            lineStyle: {
                shadowBlur: 2,
                shadowColor: "white",
            },
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

/*
let data = {
    oj_name: "codeforces",
    datas: [
        {
            username: "cppisgood",
            user_url: "https://codeforces.com/profile/cppisgood",
            solved_list: [
                [800, 10],
                [900, 12],
                [1900, 123],
            ],
        },
        {
            username: "yzn",
            user_url: "https://codeforces.com/profile/yzn",
            solved_list: [
                [800, 10],
                [900, 12],
                [1900, 23],
                [2300, 88],
                [2500, 58],
            ],
        },
    ],
}
*/

function draw_bar_graph(dom, data) {
    let myChart = echarts.init(dom);
    myChart.clear();

    let ratings = [];
    let Ys = [];
    let vis = new Map();
    for (let user_data of data["datas"]) {
        Ys.push(user_data["username"]);
        for (let rating of user_data["solved_list"]) {
            if (!vis.get(rating[0])) {
                vis.set(rating[0], true);
                ratings.push(rating[0]);
            }
        }
    }
    ratings.sort(function (lhs, rhs) { return lhs - rhs; });
    let min_val = ratings[0];
    let max_val = ratings[ratings.length - 1];
    // console.log(min_val, max_val);
    let series_list = [];
    let pieces = [];
    for (let rating of ratings) {
        pieces.push({ value: parseInt(rating), });
        let serie = [];
        for (let user_data of data["datas"]) {
            let have = false;
            for (let solved of user_data["solved_list"]) {
                if (rating === solved[0]) {
                    have = true;
                    serie.push([solved[1], user_data["username"], parseInt(rating)]);
                    break;
                }
            }
            if (!have) serie.push([undefined, user_data["username"], parseInt(rating)]);
        }
        series_list.push({
            name: rating,
            type: "bar",
            stack: "total",
            label: {
                show: true,
            },
            emphasis: {
                focus: 'series'
            },
            data: serie,
        })
    }
    // console.log(ratings, series_list, min_val, max_val);
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: Ys,
        },
        visualMap: {
            show: false,
            type: 'piecewise',
            dimension: 2,
            min: min_val,
            max: max_val,
            orient: 'horizontal',
            left: 'center',
            top: 'bottom',
            // categories: ratings,
            pieces: pieces,
            inRange: {
                color: ['green', 'yellow', 'red'],
            }

        },
        series: series_list,
    };

    myChart.setOption(option, true);
}