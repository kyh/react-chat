package main

import (
    "flag"
    "fmt"
    "log"
    "net/http"
)

const PORT int = 1337
const DIRECTORY string = "public/dist/"

func main() {
    // command line flags
    port := flag.Int("port", PORT, "port to serve on")
    dir := flag.String("directory", DIRECTORY, "directory of web files")
    flag.Parse()

    // handle all requests by serving a file of the same name
    fs := http.Dir(*dir)
    fileHandler := http.FileServer(fs)
    http.Handle("/", fileHandler)
    // http.HandleFunc("/ws", wsHandler)

    log.Printf("Running on port %d\n", *port)

    addr := fmt.Sprintf("127.0.0.1:%d", *port)
    // this call blocks -- the progam runs here forever
    err := http.ListenAndServe(addr, nil)
    fmt.Println(err.Error())
}