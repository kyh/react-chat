package main

import (
    "flag"
    "log"
    "fmt"
    "net/http"
    "github.com/gorilla/websocket"
)

const (
    PORT = 1337
)

var connections map[*websocket.Conn]bool

func sendAll(msg []byte) {
    for conn := range connections {
        if err := conn.WriteMessage(websocket.TextMessage, msg); err != nil {
            delete(connections, conn)
            return
        }
    }
}

func main() {
    // command line flags
    port := flag.Int("port", PORT, "port to serve on")
    flag.Parse()
    connections = make(map[*websocket.Conn]bool)

    // handle all requests by serving a file of the same name
    http.HandleFunc("/ws", wsHandler)

    log.Printf("Running on port %d\n", *port)

    addr := fmt.Sprintf("127.0.0.1:%d", *port)
    // this call blocks -- the progam runs here forever
    err := http.ListenAndServe(addr, nil)
    fmt.Println(err.Error())
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
    conn, err := websocket.Upgrade(w, r, nil, 1024, 1024)
    if _, ok := err.(websocket.HandshakeError); ok {
        http.Error(w, "Not a websocket handshake", 400)
        return
    } else if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()
    log.Println("Successfully upgraded connection")
    connections[conn] = true

    for {
        _, msg, err := conn.ReadMessage();
        if err != nil {
            return
        }
        log.Println(string(msg))
        sendAll(msg)
    }
}