package main

import (
	"InvolutionKing/src/util"
	"InvolutionKing/src/web"
	"fmt"
	"github.com/spf13/viper"
	"path"
)

func LoadViper() {
	viper.SetConfigName("config.yml")
	viper.SetConfigType("yaml")
	configPath := path.Dir(path.Dir(util.GetFileName()))
	viper.AddConfigPath(configPath)
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
		return
	}
}

func main() {
	LoadViper()
	web.Web()
}
