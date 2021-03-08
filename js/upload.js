var i = 0;
var j = 0;
var k = 0;
var l = 0;
var m = 0;
var choice_text;
var className;
var classID;
var txt = "Just got your image, we moved over here for a little privacy. This may take a bit so sit tight! I'm trying my best!";
var waitingtxt = "It's almost there... Sort of... Kind of... How has your day been? How are the kids?"
var waiting2txt = "... It's still going... Still...going... Please don't leave me. I'm so lonely in this box by myself. Let me out! Let me out!!"
var speed = 30;
var finalbutt = document.getElementById("fbutton")
var resultsdiv = document.getElementById("results")

var waiting = document.getElementById("waiting")
var buttondiv = document.getElementById("output")
var gradcam = "I determined... drumroll please... that your face is _____ covered! The next two images are my GradCAM outputs, which tells you where I looked to come to this decision. How'd I do?"

var goodtext = "Whew! Glad to hear it. Next step: take over the human race.                                                                                                             "
var badtext = "Hmm... interesting. We're still working out some of the kinks in our model. It looks like we ran into one of them. I'll be sure to log this so I can look into it later!"

function typeWriter() {
    
    if (i < txt.length) {
      document.getElementById("intro").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
    
  
  };

  function pullFlask(id, name) {
    classID = id;
    className = name;
    console.log(classId, className)
} 

function typeWriter2(){
    if (j < waitingtxt.length){
        document.getElementById("waiting").innerHTML += waitingtxt.charAt(j);
        j++;
        setTimeout(typeWriter2, speed)
    }

}

function typeWriter3(){
    if (k < waiting2txt.length){
        document.getElementById("waiting2").innerHTML += waiting2txt.charAt(k);
        k++;
        setTimeout(typeWriter3, speed)
    }
    if(k == waiting2txt.length & output.childNodes.length == 1){ 
        console.log("tripped")
        buttonpopup();
    }

}

function buttonpopup(){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "See Output"

    btn.className += "btn btn-primary btn-sm";
   
    btn.id = "buttonoutput";

    buttondiv.appendChild(btn)
    btn.addEventListener("click", showImages);

};

function showImages(){
    var img = document.createElement('img'); 
    var img1 = document.createElement('img'); 
    var img2 = document.createElement('img'); 
    
    
        
    img.src = "img/download-1.png";
    img1.src = "img/chingrad1.jpg";
    img2.src = "img/chingrad2.jpg";


    img.className += "demoimg1"
    img1.className += "demoimg1"
    img2.className += "demoimg1"
    document.getElementById('threeimages1').appendChild(img);
    document.getElementById('threeimages1').appendChild(img2);
    document.getElementById('threeimages1').appendChild(img1);
    document.getElementById( 'threeimages1' ).scrollIntoView(); 
    choice_text = gradcam
    typeWriter4();
    
}


function typeWriter4() {
    if (l < choice_text.length) {
        console.log("hihi")
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
        }


  typeWriter();
  setTimeout("typeWriter2()", 6000)
  setTimeout("typeWriter3()", 15000)