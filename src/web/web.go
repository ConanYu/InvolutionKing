package web

import (
	"InvolutionKing/src/pb"
	"InvolutionKing/src/service"
	"InvolutionKing/src/util"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"log"
	"net/http"
	"path"
)

func IndexPage(context *gin.Context) {
	context.HTML(http.StatusOK, "index.html", gin.H{})
}

func UserContestRecordHandle(platform string, handle string, promises *[]*service.UserContestRecordResponse) {
	if handle == "" {
		return
	}
	log.Println(platform, handle)
	var response service.UserContestRecordResponse
	response.Platform = platform
	response.Handle = handle
	var emptyResponse pb.UserContestRecord
	response.Response = &emptyResponse
	*promises = append(*promises, &response)
	service.AsyncGetUserContestRecord(platform, handle, &response)
}

func UserSubmitRecordHandle(platform string, handle string, promises *[]*service.UserSubmitRecordResponse) {
	if handle == "" {
		return
	}
	log.Println(platform, handle)
	var response service.UserSubmitRecordResponse
	response.Platform = platform
	response.Handle = handle
	var emptyResponse pb.UserSubmitRecord
	response.Response = &emptyResponse
	*promises = append(*promises, &response)
	service.AsyncGetUserSubmitRecord(platform, handle, &response)
}

func GetUserRecord(context *gin.Context) {
	type Handles struct {
		Codeforces string `json:"codeforces"`
		Atcoder    string `json:"atcoder"`
		Nowcoder   string `json:"nowcoder"`
		Luogu      string `json:"luogu"`
		Vjudge     string `json:"vjudge"`
	}
	type Request struct {
		Users []Handles `json:"users"`
	}
	var request Request
	source := context.PostForm("data")
	err := json.Unmarshal([]byte(source), &request)
	if err != nil {
		fmt.Println(err.Error())
		context.JSON(http.StatusBadRequest, err.Error())
		return
	}
	var userContestRecordResponses []*service.UserContestRecordResponse
	var userSubmitRecordResponses []*service.UserSubmitRecordResponse
	for _, user := range request.Users {
		UserContestRecordHandle("codeforces", user.Codeforces, &userContestRecordResponses)
		UserContestRecordHandle("atcoder", user.Atcoder, &userContestRecordResponses)
		UserContestRecordHandle("nowcoder", user.Nowcoder, &userContestRecordResponses)
		UserSubmitRecordHandle("codeforces", user.Codeforces, &userSubmitRecordResponses)
		UserSubmitRecordHandle("luogu", user.Luogu, &userSubmitRecordResponses)
		UserSubmitRecordHandle("vjudge", user.Vjudge, &userSubmitRecordResponses)
	}
	log.Println("promise init ok")
	for _, response := range userContestRecordResponses {
		for response.Status == "" {
		}
	}
	for _, response := range userSubmitRecordResponses {
		for response.Status == "" {
		}
	}
	log.Println(userContestRecordResponses)
	log.Println(userSubmitRecordResponses)
	type ContestRecord struct {
		Platform string                `json:"platform"`
		Handle   string                `json:"handle"`
		Data     *pb.UserContestRecord `json:"data"`
	}
	type SubmitRecord struct {
		Platform string               `json:"platform"`
		Handle   string               `json:"handle"`
		Data     *pb.UserSubmitRecord `json:"data"`
	}
	type UserRecord struct {
		Contest []ContestRecord `json:"contest_record"`
		Submit  []SubmitRecord  `json:"submit_record"`
	}
	var result UserRecord
	result.Contest = make([]ContestRecord, 0)
	result.Submit = make([]SubmitRecord, 0)
	for _, response := range userContestRecordResponses {
		var data ContestRecord
		data.Platform = response.Platform
		data.Handle = response.Handle
		data.Data = response.Response
		result.Contest = append(result.Contest, data)
	}
	for _, response := range userSubmitRecordResponses {
		var data SubmitRecord
		data.Platform = response.Platform
		data.Handle = response.Handle
		data.Data = response.Response
		result.Submit = append(result.Submit, data)
	}
	context.JSON(http.StatusOK, result)
}

func RunWeb(router *gin.Engine) {
	ip := viper.GetString("web.ip")
	port := viper.GetInt("web.port")
	if port == 0 {
		port = 8080
	}
	_ = router.Run(fmt.Sprintf("%s:%d", ip, port))
}

func LoadStaticFile(router *gin.Engine) {
	staticDir := path.Join(path.Dir(util.GetFileName()), "static")
	router.Static("/static", staticDir)
}

func Web() {
	router := gin.Default()
	dir := path.Join(path.Dir(util.GetFileName()), "templates/*")
	router.LoadHTMLGlob(dir)
	router.GET("/", IndexPage)
	router.POST("/api/get_user_record", GetUserRecord)
	LoadStaticFile(router)
	RunWeb(router)
}
