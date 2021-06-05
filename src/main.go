package main

import (
	"InvolutionKing/src/util"
	"InvolutionKing/src/web"
	"github.com/spf13/viper"
	"log"
	"path"
)

func LoadViper() {
	viper.SetConfigName("config.yml")
	viper.SetConfigType("yaml")
	configPath := path.Dir(path.Dir(util.GetFileName()))
	viper.AddConfigPath(configPath)
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalln(err.Error())
		return
	}
}

func main() {
	LoadViper()
	web.Web()
}
