"use strict";
/*
 * MTD280 Online Multimedia
 * http://www.fh-ooe.at/mtd
 *
 * Simple Vue.js 3 Application Template
 *
 */


Vue.createApp({
    data() {
        return {
            hasChatServerConnection: false,
            name: "",
            text: "",
            messages: [],
        }
    },
    methods: {
        sendHandler() {
            let message = this.prepareMessage(this.text);
            this.socket.send(message);
            this.text = "";
        },

        joinHandler() {
            if (this.socket) {
                this.reconnectToServer();
            } else {
                this.connectToServer();
            }
        },

        connectToServer() {
            this.socket = io.connect("http://localhost:9942");
            this.socket.on('message', data => {
                this.messages.push(data);
            })
            this.joinServer();
        },

        reconnectToServer() {
            this.socket.connect();
            this.joinServer();
        },

        disconnectServer() {
            let message = this.prepareMessage(this.text, false, true);
            this.socket.send(message);
            this.socket.disconnect();
            this.messages = [];
            this.hasChatServerConnection = false;
        },

        prepareMessage(text, join = false, leave = false) {
            let message;
            message = {
                name: this.name,
                text: text,
                join: join,
                leave: leave
            }
            return message;
        },

        joinServer() {
            let message = this.prepareMessage(this.text, true);
            this.socket.send(message);
            this.hasChatServerConnection = true;
        }

    },
    mounted() {

    }
}).mount('#app');
