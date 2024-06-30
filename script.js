function startCall() {
    const topic = document.getElementById('topics').value;
    alert(`Starting voice call about ${topic}`);
    // Implement the logic to start a voice call here
}

function startVideo() {
    const topic = document.getElementById('topics').value;
    alert(`Starting video call about ${topic}`);
    // Implement the logic to start a video call here
}

function joinCall() {
    const topic = document.getElementById('topics').value;
    alert(`Joining voice call about ${topic}`);
    // Implement the logic to join a voice call here
}

function joinVideo() {
    const topic = document.getElementById('topics').value;
    alert(`Joining video call about ${topic}`);
    // Implement the logic to join a video call here
}
let localStream;
let peer;
let call;

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        const localVideo = document.getElementById('local-video');
        localVideo.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

function startCall(type) {
    const topic = document.getElementById('topics').value;
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'block';

    peer = new Peer(`${topic}-${type}-call`);

    peer.on('open', id => {
        console.log('Peer ID: ', id);
    });

    peer.on('call', call => {
        call.answer(localStream);
        call.on('stream', remoteStream => {
            const remoteVideo = document.getElementById('remote-video');
            remoteVideo.srcObject = remoteStream;
        });
    });
}

function joinCall(type) {
    const topic = document.getElementById('topics').value;
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'block';

    peer = new Peer();

    peer.on('open', id => {
        console.log('Peer ID: ', id);
        call = peer.call(`${topic}-${type}-call`, localStream);
        call.on('stream', remoteStream => {
            const remoteVideo = document.getElementById('remote-video');
            remoteVideo.srcObject = remoteStream;
        });
    });
}
