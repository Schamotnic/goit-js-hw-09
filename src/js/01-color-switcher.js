


const bodyColor = document.querySelector("body")
const buttonStart = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")


function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

 buttonStart.addEventListener('click', onClick =>{
    document.body.style.backgroundColor = getRandomHexColor()
   });
    


   buttonStart.addEventListener("click", () => {
      // buttonStart.disabled = true; 
      onClick = setInterval(() => {
         if(buttonStart){
            stopBtn.removeAttribute("disabled") 
         }
         buttonStart.setAttribute("disabled", "disabled")
         document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    });
      
    stopBtn.addEventListener("click", () => {
       if(stopBtn){
         buttonStart.removeAttribute("disabled")
       };
       stopBtn.setAttribute("disabled", "disabled")
       clearInterval(onClick,);
       console.log(`Interval with id ${onClick} has stopped!`);
      });  
         
  




   
 
    

   
  

   
  
    
   //   buttonStart.setAttribute(disabled);
     
  