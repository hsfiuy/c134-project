song="";
status="";
objects = [];
function preload(){
    song=loadImage("alarm.wav");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status - Detecting objacts";
}
function modelLoaded(){
    console.log("model is model");
    status = true;
    // objectDetector.detect(video, gotResults);
}
function gotResults(error,results){
    if (error){
        console.log(error + " this is ann error");
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0,0,380,380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "status - Object detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 ,objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "baby found";
                console.log("S T O P");
                song.stop();
                
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "baby not found";
                console.log("PLAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                song.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "baby not found";
            console.log("PLAY");
            song.play();
        }

    }


}
