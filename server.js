const http = require("http");
const express = require("express");
const httpProxy = require("http-proxy");

const upstream = "https://ide.nosadnile.net";

const app = express();
const server = http.createServer(app);
const proxy = httpProxy.createProxyServer({ target: upstream, ws: true, secure: false, hostRewrite: true, xfwd: true, autoRewrite: true, changeOrigin: true, cookieDomainRewrite: true, protocolRewrite: true, toProxy: true });

server.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head, {}, (e) => console.error("Socket hang up error occured while proxying upgrade."));
});

app.get("*", (req, res) => {
    proxy.web(req, res, {}, (e) => console.error("Socket hang up error occured while proxying get."));
});

app.post("*", (req, res) => {
    proxy.web(req, res, {}, (e) => console.error("Socket hang up error occured while proxying post."));
});

app.put("*", (req, res) => {
    proxy.web(req, res, {}, (e) => console.error("Socket hang up error occured while proxying put."));
});

app.delete("*", (req, res) => {
    proxy.web(req, res, {}, (e) => console.error("Socket hang up error occured while proxying delete."));
});

server.listen(3000, () => console.log("Server listening on port 3000!"));
