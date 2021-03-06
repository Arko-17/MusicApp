song="";
scoreleftWrist=0;
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);
}
function draw(){
image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
if (scoreleftWrist > 0.2){

circle(leftwristX, leftwristY,20);
INnumberleftWristY=Number(leftwristY);
remove_decimals=floor(INnumberleftWristY);
volume=remove_decimals/500;
document.getElementbyId("vol").innerHTML="Volume=" + volume;
song.setVolume(volume);
}
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function modelLoaded(){
    console.log("The model has loaded, thank you for your patience:)");
}
function gotPoses(results){
if (results.length>0){
console.log(results);
scoreleftWrist=results[0].pose.keypoints[9].score;
console.log("ScoreleftWrist="+ scoreleftWrist);
leftwristX=results[0].pose.leftWrist.x;
leftwristY=results[0].pose.leftWrist.y;
rightwristX=results[0].pose.rightWrist.x;
rightwristY=results[0].pose.rightWrist.y;
console.log("leftWristX="+leftwristX+", LeftWristY="+leftwristY+", rightWristX="+rightwristX+", rightWristY="+rightwristY);
}
}