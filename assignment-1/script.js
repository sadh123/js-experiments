var images= document.getElementById('slider-container');
var number=countimage().length;
max=number-1;
// console.log(max);
width=800;
var x= 0;
var index=0;
var speed = 1;
var dir = 1;

main();

function countimage(){
   return images.getElementsByTagName('img');
}

function slider(){
  images.style.marginLeft=-x+'px';
  x = x+speed* dir;
  // console.log(x);

  if(x>width*max){
    dir=-1;
  }
  if(x<0){
    dir=1;
    }

  if(x% 800==0){
    index++;
    dotActive(x/800);
    timeout();
   
   
  }

  
 
}


function main(){
running=setInterval(slider,0.00000001);
}

function goPhoto(i){
 images.style.marginLeft = -(i * width) + 'px';
 dotActive(i);
}

function timeout(){
  clearInterval(running);
  setTimeout(main,4000);
}


function leftclk(){
  index--;
  if(index<0) {index = max;}
  else if(index>max) {index = 0;}
  // console.log(index);
  goPhoto(index);
}

function rightclk(){
  index++;
  if(index<0) {index =max;}
  else if(index>max) {index = 0;}
  console.log(index);
  goPhoto(index);

}


leftClick=document.getElementById("leftArrow");
leftClick.addEventListener('click',function(){
// console.log("left click");
leftclk();

})

rightClick=document.getElementById("rightArrow");
rightClick.addEventListener('click',function(){
// console.log("right click");
rightclk();

})


var dots=document.getElementsByClassName('dot');
dots[0].addEventListener('click',function(){goPhoto(0)});
dots[1].addEventListener('click',function(){goPhoto(1)});
dots[2].addEventListener('click',function(){goPhoto(2)});
dots[3].addEventListener('click',function(){goPhoto(3)});


function dotActive(x) {
 for (var i = 0; i < 4; i++) {

   if (i === x) {
      console.log(x / 800);
     dots[i].style.backgroundColor = 'white';
   } else {
     dots[i].style.backgroundColor = 'black';
   }
 }

 
}
function dotinActive(){
  dots[x/800].style.backgroundColor="grey";
}
