package service

import (
	"InvolutionKing/src/pb"
	"context"
	"fmt"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	"log"
	"os"
	"time"
)

type UserContestRecordResponse struct {
	Status   string
	Platform string
	Handle   string
	Response *pb.UserContestRecord
}

// if error is not nil, remember to close connect.
func GetClient() (*grpc.ClientConn, *pb.CrawlServiceClient, error) {
	conn, err := grpc.Dial(
		fmt.Sprintf("%s:%d", viper.GetString("service.crawl_service.host"), viper.GetInt("service.crawl_service.port")),
		grpc.WithInsecure(),
		grpc.WithBlock(),
	)
	if err != nil {
		return conn, nil, err
	}
	client := pb.NewCrawlServiceClient(conn)
	return conn, &client, nil
}

func AsyncGetUserContestRecord(platform string, handle string, response *UserContestRecordResponse) {
	conn, client, err := GetClient()
	if err != nil {
		_, _ = fmt.Fprintln(os.Stderr, err.Error())
		response.Status = "ERROR"
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	go func() {
		defer conn.Close()
		defer cancel()
		rsp, err := (*client).GetUserContestRecord(ctx, &pb.GetUserContestRecordRequest{
			Platform: platform,
			Handle:   handle,
		})
		if err != nil {
			_, _ = fmt.Fprintln(os.Stderr, err.Error())
			response.Status = "ERROR"
			return
		}
		response.Response = rsp
		log.Printf("platform %s, handle %s, contest crawl OK\n", platform, handle)
		response.Status = "OK"
	}()
}

type UserSubmitRecordResponse struct {
	Status   string
	Platform string
	Handle   string
	Response *pb.UserSubmitRecord
}

func AsyncGetUserSubmitRecord(platform string, handle string, response *UserSubmitRecordResponse) {
	conn, client, err := GetClient()
	if err != nil {
		response.Status = "OK"
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	go func() {
		defer conn.Close()
		defer cancel()
		rsp, err := (*client).GetUserSubmitRecord(ctx, &pb.GetUserSubmitRecordRequest{
			Platform: platform,
			Handle:   handle,
		})
		if err != nil {
			_, _ = fmt.Fprintln(os.Stderr, err.Error())
			response.Status = "ERROR"
			return
		}
		response.Response = rsp
		log.Printf("platform %s, handle %s, submit crawl OK\n", platform, handle)
		response.Status = "OK"
	}()
}
