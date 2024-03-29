function getAtcoderRatingColor(rating = 0) {
    if (rating < 400) {
        return "#808080";
    } else if (rating < 800) {
        return "#804000";
    } else if (rating < 1200) {
        return "#008000";
    } else if (rating < 1600) {
         return "#00C0C0";
    } else if (rating < 2000) {
        return "#0000FF";
    } else if (rating < 2400) {
        return "#C0C000";
    } else if (rating < 2800) {
        return "#FF8000";
    } else {
        return "#FF0000";
    }
}

function getCodeforcesRatingColor(rating = 0) {
    if (rating < 1200) {
        return "gray";
    } else if (rating < 1400) {
        return "green";
    } else if (rating < 1600) {
        return "cyan";
    } else if (rating < 1900) {
        return "blue";
    } else if (rating < 2100) {
        return "violet";
    } else if (rating < 2400) {
        return "orange";
    } else if (rating < 3000) {
        return "red";
    } else {
        return "#7b0000";
    }
}

let atcoder_ratings = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000];

let codeforces_ratings = [1200, 1400, 1600, 1900, 2100, 2400, 3000, 5000];

let nowcoder_ratings = [700, 1200, 1500, 2200, 2800, 4000];

function getNowcoderRatingColor(rating = 0) {
    if (rating < 700) {
        return "#B5B5B5";
    } else if (rating < 1200) {
        return "#C172EA";
    } else if (rating < 1500) {
        return "#5C9FF8";
    } else if (rating < 2200) {
        return "#10BC9A";
    } else if (rating < 2800) {
        return "#FFCE5D";
    } else {
        return "#FF0000";
    }
}

/*
@param ratings: rating point of the different color
@param get_color function map rating to color
@return [the background data of graph, conifg of visual_map which show how rating match color]
*/
function get_line_graph_background_data(ratings, get_color) {
    let color_data = [];
    let markline_data = [];
    let pre = 0;
    for (let x of ratings) {
        color_data.push([
            {
                yAxis: pre,
                itemStyle: {
                    color: get_color(pre),
                    opacity: 0.5,
                }
            },
            {
                yAxis: x
            }
        ]);
        markline_data.push({
            yAxis: x,
            lineStyle: {
                color: getCodeforcesRatingColor(x),
            },
            label: {
                color: getCodeforcesRatingColor(x),
            },
        });
        pre = x;
    }
    return [color_data, markline_data];
}


function get_background_series(oj_name) {
    // 根据oj得到对应的折线图背景颜色层
    let ret = [null, null];
    if (oj_name === 'atcoder') {
        ret = get_line_graph_background_data(atcoder_ratings, getAtcoderRatingColor);
    } else if (oj_name === 'codeforces') {
        ret = get_line_graph_background_data(codeforces_ratings, getCodeforcesRatingColor);
    } else if (oj_name === 'nowcoder') {
        ret = get_line_graph_background_data(nowcoder_ratings, getNowcoderRatingColor);
    }
    let background_data = ret[0], markline_data = ret[1];
    return {
        type: "line",
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
    };
}