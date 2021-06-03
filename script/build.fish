cd (dirname (status --current-filename))
cd ..
rm go.mod
rm go.sum
set -ax PATH $GOPATH/bin
echo $PATH
go mod init InvolutionKing
go get github.com/gin-gonic/gin
go get github.com/spf13/viper
go get google.golang.org/grpc
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative -I. CrawlService/crawl_service/crawl_service.proto
cd src
rm -rf pb
mkdir pb
cd ..
cp CrawlService/crawl_service/crawl_service.pb.go src/pb/crawl_service.pb.go
cp CrawlService/crawl_service/crawl_service_grpc.pb.go src/pb/crawl_service_grpc.pb.go
rm CrawlService/crawl_service/crawl_service.pb.go
rm CrawlService/crawl_service/crawl_service_grpc.pb.go
cd (dirname (status --current-filename))
