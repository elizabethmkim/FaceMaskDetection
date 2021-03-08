
var i = 0;
var j = 0;
var choice_text;
var txt = "Hey there! Welcome to our demo. My name is mark.ai, and I'm going to take you through our model. If you want, I'll even check if you're wearing your mask properly. Which would you prefer?";
var speed = 3;
var buttondiv = document.getElementById("buttons")
var uploaddiv = document.getElementById("uploadbutton")
var chooserand;
var chooseupload;
var uploaded = false;

var uploadtxt = "Oh you want to upload your own? Got it. Go on then. For best results, upload an image of yourself with your face as the focal point of the picture. It should be up close and personal. Don't be shy."
var randomtxt = "Oh you want to look at a random image? Okay let me look in my vast collection of images. Just kidding. I'm going to use the same photo every time."

function typeWriter() {
    console.log("first func start")
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }

  if(i == txt.length & buttondiv.childNodes.length == 1){ 
      choose();
  }


};

function randChoose(){
    choice_text = randomtxt;
    typeWriter2();
};

function uploadChoose(){
    choice_text = uploadtxt
    typeWriter2();
    uploaded = true;
};

function choose(){
    var btn = document.createElement("BUTTON");
    var btn2 = document.createElement('BUTTON');
    btn.innerHTML = "Demo me a Random Image"
    btn2.innerHTML = "I'll upload my own"
    btn.className += "btn btn-primary btn-sm";
    btn2.className += "btn btn-primary btn-sm"; 
    btn.id = "demorand";
    btn2.id = "demoupload";
    buttondiv.appendChild(btn)
    buttondiv.appendChild(btn2)
    chooserand = document.getElementById("demorand")
    chooseupload = document.getElementById("demoupload")
    chooserand.addEventListener("click", randChoose);
    chooseupload.addEventListener("click", uploadChoose);
};



function openUpload() {
    document.getElementById('uploadbut').click()
}

function beginrandom(){
    var rbtn = document.createElement("button");

    rbtn.innerHTML = "I like it. Continue."
  
    
    rbtn.className += "btn btn-primary btn-sm";


    rbtn.id = "randombut";

    uploaddiv.appendChild(rbtn)

}

function typeWriter2() {
    if (j < choice_text.length) {
        document.getElementById("second").innerHTML += choice_text.charAt(j);
        j++;
        setTimeout(typeWriter2, speed);
        }
    if (j == choice_text.length & uploaded == true & uploaddiv.childNodes.length == 1){
        upload();
    }
    if (j == choice_text.length & uploaded == false & uploaddiv.childNodes.length == 1){
        beginrandom();
    }
};

function upload() {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.id = 'form'
    form.setAttribute('enctype', "multipart/form-data");
    form.setAttribute("action", "http://localhost:5000/demo.html");

    var img = document.createElement("input"); 
    img.className += "btn btn-primary btn-sm";
    img.setAttribute("type", "file");
    img.setAttribute("name", "file");
    img.onchange = function() {
        document.getElementById("form").submit();
    }
    form.appendChild(img)
    uploaddiv.appendChild(form)
    
}

// function upload(){
//     var ubtn = document.createElement("input");
//     var ubtn2 = document.createElement('input');
   
//     ubtn.hidden = true;
//     ubtn.className += "btn btn-primary btn-sm";
//     ubtn.setAttribute('method', 'POST')
//     ubtn.setAttribute('action', 'http://localhost:5000/demo.html/')

//     ubtn2.innerHTML = "Upload";
//     ubtn2.className += "btn btn-primary btn-sm";
    
    

//     ubtn2.addEventListener('click', openUpload);
//     ubtn.id = "uploadbut";
//     ubtn2.id = "uploadbut2";

//     ubtn.setAttribute('type', 'file');
//     ubtn.setAttribute('accept', 'image/*');
//     ubtn2.setAttribute('type','submit');

//     uploaddiv.appendChild(ubtn2)
//     uploaddiv.appendChild(ubtn)
 

// }







typeWriter();




