
let peer;
let call;

let startQueue = [];
let joinQueue = [];

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

    peer = new Peer();
    

    peer.on('open', id => {
        console.log('Peer ID: ', id);
        startQueue.push(id.toString());
        console.log(startQueue);
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
        const startPeerId = startQueue.pop(); 
        if (startPeerId) {
            call = peer.call(startPeerId, localStream);
            call.on('stream', remoteStream => {
                const remoteVideo = document.getElementById('remote-video');
                remoteVideo.srcObject = remoteStream;
            });
        } else {
            console.log('No startPeerId available in startQueue.');
        }
    });
}
