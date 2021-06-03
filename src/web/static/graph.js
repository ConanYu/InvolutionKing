/*
绘制多个用户的rating折线图
data = {
    oj_name: "codeforces",
    datas: [
        {
            username: "cppisgood",
            user_url: "https://codeforces.com/profile/cppisgood",
            rating_list: [
                // time    rating   contest name     contest url
                ["2019-9-1", 1600, "yznnb cup 128", "https://abc.xyz"],
                ["2019-10-122", 1800, "yznnb cup 129", "https://abc.xyz"],
            ]
        },{

        }
    ]
}
*/
function draw_line_graph(dom, data) {
    // 两次初始化防止echart在同一dom上多次绘图的问题
    let myChart = echarts.init(dom);
    myChart.clear();

    let ret = [null, null];
    if (data["oj_name"] === 'atcoder') {
        ret = get_line_graph_background_data(atcoder_ratings, getAtcoderRatingColor);
    } else if (data["oj_name"] === 'codeforces') {
        ret = get_line_graph_background_data(codeforces_ratings, getCodeforcesRatingColor);
    } else if (data["oj_name"] === 'nowcoder') {
        ret = get_line_graph_background_data(nowcoder_ratings, getNowcoderRatingColor);
    }
    let background_data = ret[0], markline_data = ret[1];

    let series_list = [];

    let contests = [];
    for (let user_data of data["datas"]) {
        for (let rating_info of user_data["rating_list"]) {
            contests.push([rating_info[0], rating_info[2], rating_info[3]]);
        }
    }
    let unique_contests = [];
    let vis = new Map();
    for (let contest of contests) {
        if (!vis.get(contest[0])) {
            vis.set(contest[0], true);
            unique_contests.push(contest);
        }
    }
    unique_contests.sort(function cmp(lhs, rhs) { return new Date(lhs[0]).getTime() - new Date(rhs[0]).getTime() });
    let Xs = [];
    for (let contest of unique_contests) Xs.push(contest[0]);
    for (let user_data of data["datas"]) {
        let ratings = [];
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
            radius: '40%',
            endLabel: {
                show: true,
                shadowColor: "red",
                shadowBlur: 1,
                formatter: function (params) {
                    let last_rating = 0;
                    if (user_data["rating_list"].length > 0) last_rating = user_data["rating_list"][user_data["rating_list"].length - 1][1];
                    return user_data["username"] + ': ' + last_rating;
                    // return "1234";
                },
            },
            itemStyle: {
                color: "#" + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16),
                shadowColor: 'white',
                shadowBlur: 1,
                silent: true,
            },
            markArea: {
                silent: true,
                data: background_data
            },
            markLine: {
                silent: true,
                symbol: 'none',
                label: {
                    position: 'start',
                },
                lineStyle: {
                    type: 'solid',
                    width: 0,
                },
                data: markline_data,
            },
        });
    }
    let option = {
        title: {
            text: data["oj_name"],
        },
        legend: {},
        grid: {
            right: "20%",
        },
        xAxis: {
            type: "time",
            data: Xs,
            silent: true,
        },
        yAxis: {
            show: false,
            scale: true,
            name: 'rating',
            type: "value",
            silent: true,
        },
        tooltip: {
            formatter: function (params) {
                let res = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 0px;margin-bottom: 0px">\n'
                    + params[0].value[3] + '<br>';
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
        series: series_list,
    }
    myChart.on('click', function (params) {
        window.open(params.value[4]);
    });
    myChart.setOption(option, true);
}