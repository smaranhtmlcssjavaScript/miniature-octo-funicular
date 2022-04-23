song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("poseNet is intialized");
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist: " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X - " + leftWristX + ", Left Wrist Y - " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X - " + rightWristX + ", Right Wrist Y - " + rightWristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);

    if (scoreleftWrist > 0.2) {
    fill("#eb4034");
    stroke("#eb4034");
    circle(leftWristX, leftWristY, 20);
    ConvertedNumber = Number(leftWristY);
    removedecimals = floor(ConvertedNumber);
    volume = removedecimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function playbtn() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}