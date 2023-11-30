video= "";
status1 = "";
object_detector = "";
objects = [];
function preload(){
    video = createVideo('video.mp4')
    video.hide()

}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center()
}
function draw(){
    image(video,0,0,480,380)
    if(status1 != ""){
        object_detector.detect(video, gotResults);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            document.getElementById("#ofobjects").innerHTML = " Number Of Objects Detected are"+ objects.length +" ";
            fill("#E10600")
            percent = floor(objects[i].confidence*100)
            text(objects[i].label+" "+ percent+"%",objects[i].x,objects[i].y) ;
            noFill()
            stroke("#E10600")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(results,error){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects = results;
    }
}
function start(){
    object_detector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status: Model is detecting objects"
}
 
function modelloaded(){
    console.log("model is loaded")
    status1 = true;
    video.speed(1)
    video.loop()
    video.volume(0)
}

