
var i = 0;
var j = 0;
var k = 0;
var l = 0;
var m = 0;
var choice_text;
var txt = "Hey there! Welcome to our demo. Just a heads up - this webpage was created for a full screen desktop. My name is mark.ai, and I'm going to take you through our model. If you want, I'll even check if you're wearing your mask properly. Which would you prefer?";
var speed = 30;
var buttondiv = document.getElementById("buttons")
var uploaddiv = document.getElementById("uploadbutton")
var imagediv = document.getElementById("threeimages")
var finalbutt = document.getElementById("fbutton")
var resultsdiv = document.getElementById("results")
var restart = document.getElementById("restart")
var chooserand;
var chooseupload;
var uploaded = false;
var randomizer = "true";

var uploadtxt = "Oh you want to upload your own? Got it. Go on then. For best results, upload an image of yourself with your face as the focal point of the picture. It should be up close and personal. Don't be shy."
var randomtxt = "Oh you want to look at a random image? Okay let me look in my vast collection of images. Just kidding, I only have a couple. But I chose them just for you."
var randomimg = "Okay... Cool... Finding you an Image...Putting it through our model... This might take a bit ... Just sit tight... Don't leave me... While we wait, how about a joke? What did the artificial intelligence say to the other artificial intelligence? I'll tell you - Oh would you look at that! Your images are ready."
var rresults = "I determined... drumroll please... that you are NOT the father! Just kidding. I believe that the first image has a properly covered face. The next two images are my GradCAM outputs, which tells you where I looked to come to this decision. How'd I do?"
var rresults2 = "I determined... drumroll please... that you are NOT the father! Just kidding. I believe that the first images has only a covered chin but uncovered nose and mouth. It is improper face mask usage. The next two images are my GradCAM outputs, which tells you where I looked to come to this decision. How'd I do?"
var goodtext = "Whew! Glad to hear it. Next step: take over the human race. If you want me to try again, just refresh the page!                                                                                                            "
var badtext = "Hmm... interesting. We're still working out some of the kinks in our model. It looks like we ran into one of them. I'll be sure to log this so I can look into it later! If you want me to try again, just refresh the page! "

function typeWriter() {
    
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }

  if(i == txt.length & buttondiv.childNodes.length == 1){ 
      choose();
  }

  if(localStorage.getItem("randomizer") == null){
    localStorage.setItem("randomizer", JSON.stringify(randomizer))
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
 
};

function openUpload() {
    document.getElementById('uploadbut').click()
}
function randChoose(){
    choice_text = randomtxt;
    typeWriter2();
    // var random = document.getElementById('demorand')
    // random.addEventListener('click', disableFirstChoice)
};

function uploadChoose(){
    choice_text = uploadtxt
    typeWriter2();
    uploaded = true;
    // var ub = document.getElementById('demoupload')
    // ub.addEventListener('click', disableFirstChoice)
};
// function disableFirstChoice() {
//     var upload = document.getElementById('demoupload')
//     var random = document.getElementById('demorand')
//     upload.setAttribute(disabled=true)
//     random.setAttribute(disabled=true)
// }
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

function upload(){
    var ubtn = document.createElement("input");
    var ubtn2 = document.createElement('input');
    ubtn.innerHTML = "Upload"
    ubtn2.innerHTML = "Submit";
    
    ubtn.className += "btn btn-primary btn-sm";
    ubtn2.className += "btn btn-primary btn-sm";

    ubtn.id = "uploadbut";
    ubtn2.id = "uploadbut2";
    var att = document.createAttribute("type")
    var att2 = document.createAttribute("accept")
    var att3 = document.createAttribute("type")
    ubtn.setAttributeNode(att);
    ubtn.setAttributeNode(att2);
    ubtn2.setAttributeNode(att3);
    att.value = "file"
    att2.value = "image/*"
    att3.value = "submit"
    uploaddiv.appendChild(ubtn2)
    uploaddiv.appendChild(ubtn)
 

}

function beginrandom(){
    var rbtn = document.createElement("button");

    rbtn.innerHTML = "I like it. Continue."
    
    
    rbtn.className += "btn btn-primary btn-sm";


    rbtn.id = "randombut";
    rbtn.addEventListener("click", randomimage);
    

    uploaddiv.appendChild(rbtn)

}

function randomimage(){
    document.getElementById( 'randombut' ).scrollIntoView();    
    
    choice_text = randomimg;
    // speed = 40;
    typeWriter3();
  //  showImages();

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
    console.log(uploaddiv.childNodes.length)
    if (j == choice_text.length & uploaded == false & uploaddiv.childNodes.length == 1){
        console.log("beginrandomtripped")
        beginrandom();
    }
};

function typeWriter3() {
    if (k < choice_text.length) {
        document.getElementById("ritext").innerHTML += choice_text.charAt(k);
        k++;
        setTimeout(typeWriter3, speed);
        }
    if(k == choice_text.length & imagediv.childNodes.length == 1){ 
            showImages();
        }
        
    }

function showImages(){
    var img = document.createElement('img'); 
    var img1 = document.createElement('img'); 
    var img2 = document.createElement('img'); 
    
    randomizer = JSON.parse(localStorage.getItem("randomizer"))
    console.log(randomizer)
    if (randomizer == "false"){
        console.log("falsetripped")
        img.src = "img/download-1.png";
        img1.src = "img/chingrad1.jpg";
        img2.src = "img/chingrad2.jpg";
        randomizer = "true";
        localStorage.setItem("randomizer", JSON.stringify(randomizer))
        console.log(randomizer)
        choice_text = rresults2;
        l=0;

    }
    else {
        console.log("truetripped")
        img.src = "img/download.png";
        img1.src = "img/covered1.jpg";
        img2.src = "img/covered2.jpg";
        randomizer = "false";
        localStorage.setItem("randomizer", JSON.stringify(randomizer))
        console.log(randomizer)
        choice_text = rresults;
        l=0;
    }
   
    
    img.className += "demoimg"
    img1.className += "demoimg"
    img2.className += "demoimg"
    document.getElementById('threeimages').appendChild(img);
    document.getElementById('threeimages').appendChild(img2);
    document.getElementById('threeimages').appendChild(img1);
    document.getElementById( 'threeimages' ).scrollIntoView(); 
    
    typeWriter4();


}

function typeWriter4() {
    if (l < choice_text.length) {
        document.getElementById("results").innerHTML += choice_text.charAt(l);
        l++;
        setTimeout(typeWriter4, speed);
        }
    if(l == choice_text.length & finalbutt.childNodes.length == 1){ 
            choosefinal();
        }
        
    }
function choosefinal(){
        console.log("final")

        var btn = document.createElement("BUTTON");
        var btn2 = document.createElement('BUTTON');
        btn.innerHTML = "I think you messed up"
        btn2.innerHTML = "Looks good!"
        btn.className += "btn btn-primary btn-sm";
        btn2.className += "btn btn-primary btn-sm"; 
        btn.id = "badbut";
        btn2.id = "goodbut";
        finalbutt.appendChild(btn)
        finalbutt.appendChild(btn2)
        badout = document.getElementById("badbut")
        goodout = document.getElementById("goodbut")
        badout.addEventListener("click", finalbad);
        goodout.addEventListener("click", finalgood);
    };

    function finalbad(){
        choice_text = badtext;
        typeWriter5();
    };
    
    function finalgood(){
        choice_text = goodtext
        typeWriter5();
    };
    

    function typeWriter5() {
        if (m < choice_text.length) {
            document.getElementById("final").innerHTML += choice_text.charAt(m);
            m++;
            setTimeout(typeWriter5, speed);
            }
        // if(m == choice_text.length & restart.childNodes.length == 1){ 
        //         restartf();
        //     }
       
    };


// function restartf(){

//         var rbtn = document.createElement("button");
    
//         rbtn.innerHTML = "Restart"
        
        
//         rbtn.className += "btn btn-primary btn-sm";
    
    
//         rbtn.id = "restartbut";
//         rbtn.addEventListener("click", deletef);
    
//         restart.appendChild(rbtn)
    
// }

// function deletef(){
//     const node1 = document.getElementById("second");
//     node1.innerHTML = '';
//     const node2 = document.getElementById("uploadbutton");
//     node2.innerHTML = '';
//     const node3 = document.getElementById("ritext");
//     node3.innerHTML = '';
//     const node4 = document.getElementById("threeimages");
//     node4.innerHTML = '';
//     const node5 = document.getElementById("results");
//     node5.innerHTML = '';
//     const node6 = document.getElementById("fbutton");
//     node6.innerHTML = '';
//     const node7 = document.getElementById("final");
//     node7.innerHTML = '';
//     const node8 = document.getElementById("restart");
//     node8.innerHTML = '';
//     i = 0;
//     j = 0;
//     k = 0;
//     l = 0;
//     m = 0;



// }

typeWriter();




