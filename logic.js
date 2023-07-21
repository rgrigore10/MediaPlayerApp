window.addEventListener("load",function(){

var nr_videoclip=document.createElement("div");
var video=document.createElement("video");
document.body.appendChild(nr_videoclip);
nr_videoclip.appendChild(video);
var canvas=document.getElementById("player-video");
var context=canvas.getContext("2d");
let handler;
var btnautoplay=document.getElementById("autoplay");
var btnSterge1=document.getElementById("stergevideo1");
var btnSterge2=document.getElementById("stergevideo2");
var btnSterge3=document.getElementById("stergevideo3");
var btnSterge4=document.getElementById("stergevideo4");
var btnSterge5=document.getElementById("stergevideo5");
var autoplay=true; 
let effect = "normal";

const buttons = document.querySelectorAll("[data-effect]");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        context.restore();
        context.save();
        effect = this.dataset.effect;
    });
}

   //creare playlist cu videoclipurile
var playlist=document.getElementById("lista-videoclipuri");
var li1=playlist.getElementsByTagName("li")[0];
var li2=playlist.getElementsByTagName("li")[1];
var li3=playlist.getElementsByTagName("li")[2];
var li4=playlist.getElementsByTagName("li")[3];
var li5=playlist.getElementsByTagName("li")[4];

li1.addEventListener("click",function(){
document.getElementById("numar-videoclip").innerHTML="Video 1";
video.setAttribute("src","media/video1.mp4");
id_video=1;
video.play();
});
li2.addEventListener("click",function(){
    document.getElementById("numar-videoclip").innerHTML="Video 2";
    video.setAttribute("src","media/video2.mp4");
    id_video=2;
    video.play();
});
li3.addEventListener("click",function(){
    document.getElementById("numar-videoclip").innerHTML="Video 3";
    video.setAttribute("src","media/video3.mp4");
    id_video=3;
    video.play();
});
li4.addEventListener("click",function(){
    document.getElementById("numar-videoclip").innerHTML="Video 4";
    video.setAttribute("src","media/video4.mp4");
    id_video=4;
    video.play();
});
li5.addEventListener("click",function(){
    document.getElementById("numar-videoclip").innerHTML="Video 5";
    video.setAttribute("src","media/video5.mp4");
    id_video=5;
    video.play();
});
  


    desenareCanvas(video,context);
    //stergere video din lista
    btnSterge1.addEventListener("click",function(e){
      li1.parentNode.removeChild(li1);
      btnSterge1.remove();
    });
    btnSterge2.addEventListener("click",function(e){
        li2.parentNode.removeChild(li2);
        btnSterge2.remove();
      });
    btnSterge3.addEventListener("click",function(e){
        li3.parentNode.removeChild(li3);
        btnSterge3.remove();
      });
    btnSterge4.addEventListener("click",function(e){
        li4.parentNode.removeChild(li4);
        btnSterge4.remove();
      });
      btnSterge5.addEventListener("click",function(e){
        li5.parentNode.removeChild(li5);
        btnSterge5.remove();
      });
    //functii necesare efectului de ninsoare
	  var fulgi=[];
	  function adaugaFulg(){
		  var x=Math.floor(Math.random()*(canvas.width-10))+7;
		  var y = 7;
		  var s= Math.floor(Math.random()*3)+1;
		   fulgi.push({"x":x,"y":y,"s":s});
	   }
	   function ninge(){
		  adaugaFulg();
		  for(var i=0;i<fulgi.length;i++){
			  context.fillStyle="rgba(255,255,255,.75)";
			  context.beginPath();
			  context.arc(fulgi[i].x,fulgi[i].y+=fulgi[i].s*.5,fulgi[i].s*.5,0,Math.PI*2,false);
			  context.fill();
			  if(fulgi[i].y>canvas.height-40){
				  fulgi.splice(i,1);
			  }
  
		  }
	  }

	  //desenarea canvasului
function desenareCanvas(video,context){
    //desenare dreptunghi pe canvas
    context.fillStyle="#D2691E";
    context.fillRect(0,0,canvas.width,canvas.height);
    //desenare chenar dreptunghi
    var gradient = context.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");


    context.strokeStyle = gradient;
    context.lineWidth = 5;
    context.strokeRect(5, 5, canvas.width-10, canvas.height-10);
  salvareWebStorageApi(video);
	
    switch (effect) {
        case "normal":
			context.drawImage(video,6,6,canvas.width-10,canvas.height-10);
            break;
        case "ninsoare":
			context.clearRect(6,6,canvas.width-10,canvas.height-10);
			context.drawImage(video,6,6,canvas.width-10,canvas.height-10);
		
			function animate(){
				if(!video.paused){
				desenareCanvas(video,context);	
				}
			   
		   }  
			var animateI=setInterval(animate,30);
			if(!video.paused){
				ninge();
				
				}
			window.clearInterval(animateI);
			break;
		case "magenta":
			context.drawImage(video,6,6,canvas.width-10,canvas.height-10);
			const imageData=context.getImageData(6,6,canvas.width-10,canvas.height-10);
			const pixels=imageData.data;
			for (var i = 0; i < pixels.length; i += 4) {
			pixels[i+1]=0;
				}
			context.putImageData(imageData, 6, 6);
			break;


			

	}
	
	
	setTimeout(desenareCanvas, 30,video,context);
   

	

    desenareCerc(35, 366, 15, "white"); //primul cerc de stanga jos
    desenareButonInapoi("black");
	desenareCerc(80, 366, 15, "white"); 
		if (video.paused) {
            desenareButonPlay("black");
            //desenare cerc mijloc
            desenareCerc(307, 195, 30, "rgba(199, 199, 198, 0.5)");
			//desenare triunghi din  mijloc
            context.beginPath(); 
            context.fillStyle = "red"; 
            context.moveTo(325,195);
            context.lineTo(300,215);
            context.lineTo(300,178);
            context.fill(); 
	     	context.closePath();
             //desenare ton de gri la pauza
			context.beginPath(); 
			context.rect(7, 7,canvas.width,canvas.height); 
			context.fillStyle = "rgba(0, 0, 0, 0.5)"; 
			context.fill();  
			context.closePath();
			
			
		}
		else {
			//desenare bare play 
            context.beginPath(); 
			context.rect(73,358,4,18); 
			context.fillStyle = '#000000'; 
			context.fill();  
			context.closePath();

            context.beginPath(); 
			context.rect(83,358,4,18); 
			context.fillStyle = '#000000'; 
			context.fill();  
			context.closePath();

            
		}
	
		desenareCerc(580, 366, 15, "white"); 
        desenareButonInainte("black");
		context.beginPath(); 
		context.rect(113, 357, 437, 20); 
		context.fillStyle = "#868686"; 
		context.fill(); 
		context.lineWidth = 0.6; 
		context.strokeStyle = 'black'; 
		context.stroke(); 
		context.closePath();
		
		var intSecundar = window.setInterval(progress(), 20);
		function progress() {
			
			var procent = Math.floor((100 / video.duration) * video.currentTime) / 100;
			context.beginPath(); 
			context.fillStyle = "#999999"; 
			context.fillRect(113, 357, 437 * procent, 20); 
			context.closePath();
		}
		window.clearInterval(intSecundar); 
		
    }
    
    function desenareButonInainte(culoare){
        context.beginPath(); 
		context.fillStyle = culoare; 
        context.moveTo(590,366);
        context.lineTo(575,377);
        context.lineTo(575,353);
		context.fill(); 
		context.closePath();
    }
	function desenareCerc(x, y, r, culoare) {
		context.beginPath(); 
		context.arc(x, y, r, 0, 2 * Math.PI, false); 
		context.fillStyle = culoare; 
		context.fill(); 
		context.lineWidth = 0.6; 
		context.strokeStyle = "black"; 
		context.stroke(); 
		context.closePath();
	}
	
	function desenareButonPlay(culoare) {
		context.beginPath(); 
		context.fillStyle = culoare; 
        context.moveTo(90,366);
        context.lineTo(75,377);
        context.lineTo(75,353);
		context.fill(); 
		context.closePath();
	}
	
	function desenareButonInapoi(culoare) {
		context.beginPath(); 
		context.fillStyle = culoare; 
        context.moveTo(25,366);
        context.lineTo(40,377);
        context.lineTo(40,353);
		context.fill(); 
		context.closePath();
	}
	//salvare setari utilizand Web Storage API
    function salvareWebStorageApi(video){
		localStorage.setItem("pozitie curenta",video.currentTime);
		localStorage.setItem("Efectul utilizat",effect);
		localStorage.setItem("Titlu videoclip",document.getElementById("numar-videoclip").textContent);
	}


	canvas.addEventListener("mousedown", function(e) {
		var x = e.pageX - canvas.offsetLeft; 
		var y = e.pageY - canvas.offsetTop; 
		//functionalitate buton inapoi
		if (x >= 20 && x <= 50 && y >= 350 && y <= 380) {
			
			if (id_video == 1 ) {
                document.getElementById("numar-videoclip").innerHTML = "Video 5";
				video.setAttribute("src", "media/video5.mp4");
                id_video = 5;
			}
			else if (id_video == 2) {
				document.getElementById("numar-videoclip").innerHTML = "Video 1";
				video.setAttribute("src", "media/video1.mp4");
                id_video = 1;
			}
			else if (id_video == 3) {
				document.getElementById("numar-videoclip").innerHTML = "Video 2";
				video.setAttribute("src", "media/video2.mp4");
				id_video = 2;
			}
			else if (id_video == 4) {
				document.getElementById("numar-videoclip").innerHTML = "Video 3";
				video.setAttribute("src", "media/video3.mp4");
				id_video = 3;
			}
			else if (id_video == 5) {
				document.getElementById("numar-videoclip").innerHTML = "Video 4";
				video.setAttribute("src", "media/video4.mp4");
				id_video = 4;
			}
			video.play(); 
		} 
        //functionalitate buton play
		else if (x >= 65 && x <= 95 && y >= 350 && y <= 380) {
			if (video.paused) { 
				video.play(); 
			}
			else {
				video.pause();
			}
		} 
        //functionalitate buton inainte
		else if (x >= 560 && x <= 590 && y >= 350 && y <= 385) { 
			if (id_video == 1) {
				document.getElementById("numar-videoclip").innerHTML = "Video 2";
				video.setAttribute("src", "media/video2.mp4");
				id_video = 2;
			}
			else if (id_video == 2) {
				document.getElementById("numar-videoclip").innerHTML = "Video 3";
				video.setAttribute("src", "media/video3.mp4");
				id_video = 3;
			}
			else if (id_video == 3) {
				document.getElementById("numar-videoclip").innerHTML = "Video 4";
				video.setAttribute("src", "media/video4.mp4");
				id_video = 4;
			}
			else if (id_video == 4) {
				document.getElementById("numar-videoclip").innerHTML = "Video 5";
				video.setAttribute("src", "media/video5.mp4");
				id_video = 5;
			}
			else if (id_video == 5) {
				document.getElementById("numar-videoclip").innerHTML = "Video 1";
				video.setAttribute("src", "media/video1.mp4");
				id_video = 1;
			}
			video.play(); 
		} 
        //functionalitate buton mijloc
		else if (x >= 275 && x <= 335 && y >= 160 && y <= 220) {
			if (video.paused) { 
				video.play(); 
			}
			else { 
				video.pause();
			}
		} 
        //functionalitate bara pt deplasare video
		else if (x >= 113 && x <= 550 && y >= 357 && y <= 377) {  
			video.currentTime = video.duration * (x - 113) / 437;
		} 
		else {
			video.pause();
		}
	});
 
    



video.addEventListener("canplay",function(){
    
canvas.width=600+14;
canvas.height=340+50;
nr_videoclip.setAttribute("style","display:none;");
desenareCanvas(video,context);
});



//functionalitate play
video.addEventListener("play", function() { 
    desenareCanvas(video,context);
});
//functionalitate pause
video.addEventListener("pause",function(){
    cancelAnimationFrame(handler);
});
//functionalitate buton autoplay
btnautoplay.addEventListener("click",function(e){
    
    if(autoplay==false)
    {
      btnautoplay.style.color="red";
      btnautoplay.textContent="Opreste autoplay";
      autoplay=true;
    }
    else
    {
        btnautoplay.style.color="green";
        btnautoplay.textContent="Porneste autoplay";
        autoplay=false;
    }
});
video.addEventListener("ended",function(){
    if(autoplay==true){
        if(id_video==1)
        {
            document.getElementById("numar-videoclip").innerHTML="Video 2";
            video.setAttribute("src","media/video2.mp4");
            id_video=2;
        }
        else if(id_video==2)
        {
            document.getElementById("numar-videoclip").innerHTML="Video 3";
            video.setAttribute("src","media/video3.mp4");
            id_video=3;
        }
        else if(id_video==3)
        {
            document.getElementById("numar-videoclip").innerHTML="Video 4";
            video.setAttribute("src","media/video4.mp4");
            id_video=4;
        }
        else if(id_video==4)
        {
            document.getElementById("numar-videoclip").innerHTML="Video 5";
            video.setAttribute("src","media/video5.mp4");
            id_video=5;
        }
        else if(id_video==5)
        {
            document.getElementById("numar-videoclip").innerHTML="Video 1";
            video.setAttribute("src","media/video1.mp4");
            id_video=1;
        }

        video.play();
    }
});
});
