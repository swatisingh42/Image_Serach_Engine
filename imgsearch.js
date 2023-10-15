const accessKey ='l8DUE47EEkWW20bJW0RFhYpt7n-qve01nqWXijQNXdY';


const searchForm= document.querySelector('form');
const searchInput= document.querySelector('.search-input');
const imagesContainer= document.querySelector('.image-container');
const showMore= document.querySelector('.show-more');

let page=1;

    


const  fetchImages=async (query,pageNo)=>{
    try {
     if (pageNo===1){
        imagesContainer.innerHTML='';
     }
   

    const url=`https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=${pageNo}&client_id=${accessKey}`;
    
    const response= await  fetch(url);
    const data=await response.json();
    //console.log(data);

    if(data.results.length>0){
        data.results.forEach(photo=>{
            const imageElement=document.createElement('div');
            imageElement.classList.add('imgDiv');
            imageElement.innerHTML= `<img src="${photo.urls.regular}"/>`;
       
            const overlayElement= document.createElement('div');
            overlayElement.classList.add('overlay');
            const overlayText= document.createElement('p');
            overlayText.innerHTML=`${photo.alt_description}`;
            overlayElement.appendChild(overlayText);
       
            imageElement.appendChild(overlayElement);
            imagesContainer.appendChild(imageElement);
          })
       
       
          if(data.total_pages === pageNo){
           showMore.style.display="none";
          }
          else{
           showMore.style.display="block";
          }
    }
    else{
        imagesContainer.innerHTML=`<h5>No matches found<h5>`
    }
} 
catch (error) {
    imagesContainer.innerHTML=`<h5>failed to fetch images.Please try again later<h5>`
    if(showMore.style.display==="block"){
        showMore.style.display="none";
    }
}
  
}

searchForm.addEventListener('submit',(e)=> {
    e.preventDefault();
  const inputText=searchInput.value.trim();
  if (inputText !==''){
     page=1;
    fetchImages(inputText,page);
  }
  else{
    imagesContainer.innerHTML=`<h5>please enter your query<h5>`
    if(showMore.style.display==="block"){
        showMore.style.display="none";
    }
  }
});
showMore.addEventListener('click',()=>{
  fetchImages(searchInput.value.trim(),++page);
});