function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let tripName = document.getElementById('tripName').value,
        tripLocation = document.getElementById('tripLocation').value;
    var tripDepart = document.getElementById('tripDepart').valueAsNumber,
        comment=[];
        tripDepart = new Date(tripDepart);
        tripDepart = tripDepart.toUTCString().slice(0,16);
    let postalCode = document.getElementById('postalCode').value,
        countryCode = document.getElementById('countryCode').value,
        trips = document.getElementById('trips'),
        card,
        close,
        tripCards,
        weather;
    var Temperature=[];    
    let API_Dark = '25d15a18d73c79e8b70a5ad7d650d51c',
        username = "aelsherif",
        baseURL_Dark ,
        API_pixa = "15352178-37da8c63872b212a3195d8046",
        baseURL_Pixa = `https://pixabay.com/api/?key=${API_pixa}&q=${tripLocation}&image_type=photo`,
        baseURL_Geo = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${postalCode}&country=${countryCode}&username=${username}`;
        if (trips.childElementCount==0){
          trips.innerHTML="";
          trips.style.textAlign= "left";
          trips.style.opacity = "1";
        }
    //---------------------------------------------------------//
    getPixabay(baseURL_Pixa)
    .then(function(data){
      if (typeof data.hits !== 'undefined' && data.hits.length > 0){
        postData('http://localhost:8081/photo',{
          photo:data.hits[0].largeImageURL,
        })
        .then(function(data){
          console.log("::: Form Submitted :::")
          fetch('http://localhost:8081/testt')
          .then(res => res.json())
          .then(function(res) {

              let last = res.length-1;
              card = document.createElement('div');
              card.className='card';
              let image = document.createElement("div");
              let photo = document.createElement('img');
              image.appendChild(photo);
              photo.className='photo';
              photo.setAttribute('src',`${res[last].photo}`);
              photo.setAttribute('alt','photo');
              close = document.createElement('button');    
              image.className="image";
              close.className="deleteCard";
              close.innerHTML=`Delete`;
              close.onclick=function(){
                //close.parentElement.style.display='none';
                let parent = close.parentElement;
                parent.parentNode.removeChild(parent)
                if(trips.innerHTML==""){
                  trips.innerHTML = "Empty";
                  trips.style.textAlign= "center";
                  trips.style.opacity = "0.6";
                }
              };
              
              card.appendChild(close);
              card.appendChild(image);
              let modal = document.getElementById("myModal");
              modal.style.display = "none";

          })   
        })    
      }else{
        console.log(' X X X no search results for "',tripLocation,'"')
        let defaultImage = "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large-600x600.png";
        card = document.createElement('div');
        card.className='card';
        let image = document.createElement("div");
        let photo = document.createElement('img');
        image.appendChild(photo);
        photo.className='photo';
        photo.setAttribute('src',`${res[last].photo}`);
        photo.setAttribute('alt','photo');
        image.style.backgroundImage=`url(${defaultImage})`;
        close = document.createElement('button');    
        image.className="image";
        close.className="deleteCard";
        close.innerHTML=`Delete`;
        close.onclick=function(){
          //close.parentElement.style.display='none';
          let parent = close.parentElement;
          parent.parentNode.removeChild(parent)
          if(trips.innerHTML==""){
            trips.innerHTML = "Empty";
            trips.style.textAlign= "center";
            trips.style.opacity = "0.6";
          }
        };
        card.appendChild(close);
        card.appendChild(image);
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
      }
    })
    .then(function(data){
      getGeoNames(baseURL_Geo)
      .then(function(data){
        let index = 0;
        baseURL_Dark = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_Dark}/${data.postalcodes[index].lat},${data.postalcodes[index].lng}`;
        getDarkSky(baseURL_Dark)
        .then(function(data){
          if (tripDepart=="Invalid Date"){
            tripDepart=new Date(data.currently.time *1000)
            tripDepart = tripDepart.toUTCString().slice(0,16)
          }
          comment[0] = data.currently.summary;
          comment[1] = data.daily.summary;
          Temperature[0]=data.currently.temperature;
          weather = document.createElement('div');
          weather.className = 'weather';
          console.log('the date is :::::',tripDepart)
          data.daily.data.forEach(element => {
            let Time = new Date(element.time * 1000);
            Time = Time.toUTCString().slice(0,16);
            let weatherDay = document.createElement('div');
            weatherDay.innerHTML = `Day:${Time} <br>
            High: ${element.temperatureMax}&deg; F<br>
            Low: ${element.temperatureMin}&deg; F`
            if (Time == tripDepart){
              weatherDay.className="today";
              weatherDay.innerHTML+=` <span>Today</span>`;
            }else{
              weatherDay.className="weatherDay"
            }
            weather.appendChild(weatherDay)
          });
          postData('http://localhost:8081/in',{
            name:tripName,
            location:tripLocation,
            date:tripDepart,
          })
          .then(function(data){
            console.log("::: Form Submitted :::")
            fetch('http://localhost:8081/test')
            .then(res => res.json())
            .then(function(res) {
                let last = res.length-1;
                tripCards= document.createElement("div");
                tripCards.className="tripCard";
                tripCards.innerHTML =  
                `<span class="bold">Trip Name :</span>   ${res[last].tripName} <br> 
                <span class="bold">Location :</span>   ${res[last].tripLocation}<br>
                <span class="bold">Departing :</span>   ${res[last].tripDate} <br>
                <span class="bold">Temperature :</span> ${Temperature[0]} &deg; F <br>
                <span class="bold">Summary :</span>   ${comment[0]} <br>"${comment[1]}"
                `;
                card.appendChild(tripCards);
                card.appendChild(weather)
                trips.appendChild(card);
                let modal = document.getElementById("myModal");
                modal.style.display = "none";
            })   
          })  
        })
      })
    })        
}   
/*---------------------------------------------------------------------------*/
/*-------------------------------Helper Functions----------------------------*/
/*---------------------------------------------------------------------------*/ 
const getDarkSky = async (baseURL_Dark)=>{

  const res = await fetch(baseURL_Dark)
  //const res = await fetch('/fakeAnimalData');
  try {
    const data = await res.json();
    console.log('DarkSky !!!',data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
const getPixabay = async (baseURL_Pixa)=>{

  const res = await fetch(baseURL_Pixa)
  //const res = await fetch('/fakeAnimalData');
  try {
    const data = await res.json();
    console.log('Pixabay !!!',data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
const getGeoNames = async (baseURL_Geo)=>{

  const res = await fetch(baseURL_Geo)
  //const res = await fetch('/fakeAnimalData');
  try {
    const data = await res.json();
    console.log(data)
    console.log(data.postalcodes[10])
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log('the new data is \n'+newData);
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}
    
export { handleSubmit }
