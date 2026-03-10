# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -mod=mod -a -installsuffix cgo -o backend .

# Final stage
FROM alpine:3.18

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/backend .

EXPOSE 3000

CMD ["./backend"]
