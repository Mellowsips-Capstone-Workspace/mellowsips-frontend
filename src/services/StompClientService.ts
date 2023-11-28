import { Client } from '@stomp/stompjs';
import NotificationHelper from 'helpers/notification';
import CryptoLocalStorageHelper, { CRYPTO_STORAGE_KEY } from 'helpers/storage';
import { isUndefined } from 'lodash';
import SockJS from 'sockjs-client';

export type StompMessage = {
    id: string
    key: string
    subject: string
    shortDescription: string | null
    content: string
    metadata: object
    isSeen: boolean
    seenAt: string | null
    createdAt: string
}

type SubscribeChannel = ((message: StompMessage) => void) | ((message: StompMessage) => void)

const PUBLIC_CHANNEL_SUB: SubscribeChannel[] = []
const PRIVATE_CHANNEL_SUB: SubscribeChannel[] = []

class StompClientService {
    static socket: Client | undefined
    static connecting = false

    static PRIVATE_CHANNEL = "/user/topic/notifications"
    static PUBLIC_CHANNEL = "/topic/notifications"


    static subscribe(channel: string, subscribe: SubscribeChannel) {
        if (this.PRIVATE_CHANNEL === channel) {
            PRIVATE_CHANNEL_SUB.push(subscribe)
        }

        if (this.PUBLIC_CHANNEL === channel) {
            PUBLIC_CHANNEL_SUB.push(subscribe)
        }
    }

    static unsubscribe(channel: string, unsubscribe: SubscribeChannel) {

        if (this.PRIVATE_CHANNEL === channel) {
            PRIVATE_CHANNEL_SUB.splice(PRIVATE_CHANNEL_SUB.indexOf(unsubscribe)!, 1)
        }

        if (this.PUBLIC_CHANNEL === channel) {
            PUBLIC_CHANNEL_SUB.splice(PUBLIC_CHANNEL_SUB.indexOf(unsubscribe)!)
        }
    }

    static connect() {
        if (this.connecting) {
            return
        }

        if (isUndefined(this.socket)) {
            this.socket = new Client(
                {
                    brokerURL: import.meta.env.VITE_APP_STOMP_URL,
                    webSocketFactory: () => {
                        const sock = new SockJS(import.meta.env.VITE_APP_SOCKET_URL)
                        return sock
                    },
                    connectHeaders: {
                        Authorization: CryptoLocalStorageHelper.getItem(CRYPTO_STORAGE_KEY.TOKEN)!.substring("Bearer ".length)
                    },
                    onConnect: () => {
                        this.connecting = false

                        this.socket!.subscribe(
                            this.PUBLIC_CHANNEL,
                            (payload) => {
                                NotificationHelper.play()
                                const message = JSON.parse(payload.body) as StompMessage
                                PUBLIC_CHANNEL_SUB.forEach(
                                    subscribe => {

                                        subscribe(message)

                                    }
                                )

                            }
                        )

                        this.socket!.subscribe(
                            this.PRIVATE_CHANNEL,
                            (payload) => {
                                NotificationHelper.play()
                                const message = JSON.parse(payload.body) as StompMessage
                                PRIVATE_CHANNEL_SUB.forEach(
                                    subscribe => {
                                        subscribe(message)
                                    }
                                )

                            }
                        )
                    },
                    onWebSocketError: (error) => {
                        this.connecting = false
                        console.error("WebSocket connection error:", error);
                    },
                    onDisconnect: () => {
                        this.socket = undefined
                    }
                }
            )
        }

        this.connecting = true
        this.socket.activate()
    }

    static disconnect() {
        if (this.socket && this.socket.active) {
            this.socket.deactivate()
        }
    }
}

export default StompClientService;