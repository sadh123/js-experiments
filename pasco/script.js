function myClickFunction(){
  if(document.getElementsByClassName("hamitems")[0].style.display == 'none'){
    document.getElementsByClassName("hamitems")[0].style.display = 'block';
  }else{
    document.getElementsByClassName("hamitems")[0].style.display = 'none';
  }
}

function myExpandFunction(i){
  if(document.getElementsByClassName("dropdown-container")[i].style.display == 'none'){
    document.getElementsByClassName("dropdown-container")[i].style.display = 'block';
  }else{
    document.getElementsByClassName("dropdown-container")[i].style.display = 'none';
    console.log('n');
  }
  
}
