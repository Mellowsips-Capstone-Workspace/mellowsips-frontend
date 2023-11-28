class NotificationHelper {
    static play() {
        const audio = document.createElement("audio")
        audio.src = "/audio/notification.mp3"
        audio.autoplay = true
        audio.onended = () => {
            audio.remove()
        }
    }
}

export default NotificationHelper