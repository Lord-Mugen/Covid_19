
let top10cards=document.getElementById("top10-cards");
let top10countries=document.getElementById("top10-countries");
let tracker2select=document.getElementById("Tracker2-select");
let Tracker2imgcarddata=document.querySelectorAll('#Tracker2-imgcard-data');
let Tracker2block3data=document.querySelectorAll('#Tracker2-block3-data');
let Datef=document.getElementById("current_date");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date_now=new Date();
console.log(date_now);
let day=date_now.getDate();
let month=date_now.getMonth();
let year=date_now.getFullYear();
Datef.innerHTML = "update: "+months[month]+" "+day+","+" "+year;

fetch('https://disease.sh/v3/covid-19/all')
.then(response => response.json())
.then(json => {
    top10cards.innerHTML=
    '<li class="top10list1-danger top10-cardslist1">'+
        '<p class="small-title">Total Case</p>'+
        '<p class="small-text">+'+json.todayCases+'</p>'+
        '<p class="medium-number c-danger">'+json.cases+'</p>'+
    '</li>'+
    '<li class="top10list1-danger top10-cardslist2">'+
        '<p class="small-title">Active Case</p>'+
        '<p class="small-text ">+0</p>'+
        '<p class="medium-number c-warning">'+json.active+'</p>'+
    '</li>'+
    '<li class="top10list1-success top10-cardslist3">'+
        '<p class="small-title">Recovered Case</p>'+
        '<p class="small-text">+'+json.todayRecovered+'</p>'+
        '<p class="medium-number c-success">'+json.recovered+'</p>'+
    '</li>'+
    '<li class="top10list1-success top10-cardslist4">'+
        '<p class="small-title">Deaths Case</p>'+
        '<p class="small-text ">+'+json.todayDeaths+'</p>'+
        '<p class="medium-number c-primary">'+json.deaths+'</p>'+
    '</li>';

    console.log(Tracker2imgcarddata);
    /*Rellenar tarjetas de la parte inferior del tracker2 */
    Tracker2block3data[0].innerHTML=json.cases;
    Tracker2block3data[1].innerHTML=json.recovered;
    Tracker2block3data[2].innerHTML=json.deaths;
    Tracker2block3data[3].innerHTML=json.todayDeaths;

});


let countries = funCountries();

console.log(countries);

async function funCountries(){
    var respuesta = await fetch('https://disease.sh/v3/covid-19/countries');
    var response = await respuesta.json();
    return response;        
}

countries.then(list => {
    let listCountries=list;
    console.log(list);
    /*for para rellenar los nombre del combobox*/
    for(x of listCountries){
        tracker2select.innerHTML+='<option value="'+x.country+'">'+x.country+'</option>';
    }
    /*FIN for para rellenar los nombre del combobox*/

    
    console.log(listCountries)
    listCountries.sort(function (a, b) {
        return a.cases - b.cases;
    });
    listCountries.reverse();
    console.log(listCountries)
    top10countries.innerHTML="";
    /*For para rellenar banderas*/ 
    let cont=1;
    for(x of listCountries){
        if(cont==11){
            break
        }
        top10countries.innerHTML+=
        '<li>'+
            '<div>'+
                '<img src="'+x.countryInfo.flag+'" alt="">'+
                '<span class="small-span">'+x.country+'</span>'+
            '</div>'+
            '<h5 class="medium-title">'+x.cases+'</h5>'+
        '</li>';
        cont++;
    }

})


function selectCountry(){/*
    console.log(tracker2select);
    console.log(tracker2select.value);*/
    let name_country=tracker2select.value;
    let url=('https://disease.sh/v3/covid-19/countries/'+name_country)
    fetch(url)
    .then(response => response.json())
    .then(json=>{
        console.log(json);
        /**/
        Tracker2imgcarddata[0].innerHTML=json.cases;
        Tracker2imgcarddata[1].innerHTML=json.deaths;
        Tracker2imgcarddata[2].innerHTML=json.recovered;
        Tracker2imgcarddata[3].innerHTML=json.active;
        Tracker2imgcarddata[4].innerHTML=json.todayCases;
        Tracker2imgcarddata[5].innerHTML=json.todayDeaths;
    })
    console.log(url);
}













