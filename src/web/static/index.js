let platforms = [
    "codeforces",
    "atcoder",
    "nowcoder",
    "luogu",
    "vjudge",
];

function newInput() {
    let ret = {
        "name": "",
    };
    for (let platform of platforms) {
        ret[platform] = "";
    }
    return ret;
}

new Vue({
    delimiters: ["!{", "}!"],
    el: "#app",
    data: {
        inputs: [newInput()],
        platforms: platforms,
        gaoStatus: "OK",
    },
    methods: {
        addMember: function () {
            this.$data.inputs.push(newInput());
        },
        gao: function () {
            if (this.$data.gaoStatus === "OK") {
                let qs = Qs;
                let app = this;
                this.$data.gaoStatus = "RUN";
                axios.post("/api/get_user_record", qs.stringify({
                    data: JSON.stringify({
                        users: this.$data.inputs,
                    }),
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                }).then(function (response) {
                    app.$data.gaoStatus = "OK";
                });
            }
        },
    },
})