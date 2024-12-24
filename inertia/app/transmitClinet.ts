import { Transmit } from "@adonisjs/transmit-client";

export const transmit = new Transmit({
    baseUrl: 'http://localhost:3333',
    // maxReconnectionAttempts: 5,
    onReconnectAttempt: (attempt) => {
        console.log('Reconnect attempt ' + attempt)
    },
    onReconnectFailed: () => {
        console.log('Reconnect failed')
    },
})