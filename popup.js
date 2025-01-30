const sendButton = document.getElementById('send-button')
const okButton = document.getElementById('popup-b')
const popup = document.getElementById('popup-container')
const player = document.querySelector('lottie-player')

sendButton.onclick = () => {
    popup.classList.add('active');
    player.play()
}

okButton.onclick = () => {
    popup.classList.remove('active')
    player.stop()
}