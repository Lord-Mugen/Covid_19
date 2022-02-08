let top10cards = document.getElementById("top10-cards");
let top10countries = document.getElementById("top10-countries");
let tracker2select = document.getElementById("Tracker2-select");
let Tracker2imgcarddata = document.querySelectorAll('#Tracker2-imgcard-data');
let Tracker2block3data = document.querySelectorAll('#Tracker2-block3-data');
let Datef = document.getElementById("current_date");
let Tracker3paginationul = document.getElementById('Tracker3-pagination-ul');
let Tracker3tabledata = document.getElementById('Tracker3-table-data');
let Tracker3filtervalue = document.getElementById('Tracker3-filter-value');
let Tracker3TableCaption=document.getElementById('Tracker3-table-caption');


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date_now = new Date();
/*console.log(date_now);*/
let day = date_now.getDate();
let month = date_now.getMonth();
let year = date_now.getFullYear();
Datef.innerHTML = "update: " + months[month] + " " + day + "," + " " + year;

fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(json => {
        top10cards.innerHTML =
            '<li class="top10list1-danger top10-cardslist1">' +
            '<p class="small-title">Total Case</p>' +
            '<p class="small-text">+' + json.todayCases + '</p>' +
            '<p class="medium-number c-danger">' + json.cases + '</p>' +
            '</li>' +
            '<li class="top10list1-danger top10-cardslist2">' +
            '<p class="small-title">Active Case</p>' +
            '<p class="small-text ">+0</p>' +
            '<p class="medium-number c-warning">' + json.active + '</p>' +
            '</li>' +
            '<li class="top10list1-success top10-cardslist3">' +
            '<p class="small-title">Recovered Case</p>' +
            '<p class="small-text">+' + json.todayRecovered + '</p>' +
            '<p class="medium-number c-success">' + json.recovered + '</p>' +
            '</li>' +
            '<li class="top10list1-success top10-cardslist4">' +
            '<p class="small-title">Deaths Case</p>' +
            '<p class="small-text ">+' + json.todayDeaths + '</p>' +
            '<p class="medium-number c-primary">' + json.deaths + '</p>' +
            '</li>';

        /*console.log(Tracker2imgcarddata);*/
        /*Rellenar tarjetas de la parte inferior del tracker2 */
        Tracker2block3data[0].innerHTML = json.cases;
        Tracker2block3data[1].innerHTML = json.recovered;
        Tracker2block3data[2].innerHTML = json.deaths;
        Tracker2block3data[3].innerHTML = json.todayDeaths;

    });


let countries = funCountries();

/*console.log(countries);*/

async function funCountries() {
    var respuesta = await fetch('https://disease.sh/v3/covid-19/countries');
    var response = await respuesta.json();
    for(x of response){
        delete x.updated;
        delete x.activePerOneMillion;
        delete x.casesPerOneMillion;
        delete x.continent;
        delete x.countryInfo.lat;
        delete x.countryInfo.long;
        delete x.countryInfo._id;
        delete x.criticalPerOneMillion;
        delete x.deathsPerOneMillion;
        delete x.oneCasePerPeople;
        delete x.oneDeathPerPeople;
        delete x.oneTestPerPeople;
        delete x.population;
        delete x.recoveredPerOneMillion;
        delete x.testsPerOneMillion;
    }
    return response;
}

countries.then(list => {
    let listCountries = list;
    /*console.log(list);*/
    /*for para rellenar los nombre del combobox*/
    for (x of listCountries) {
        tracker2select.innerHTML += '<option value="' + x.country + '">' + x.country + '</option>';
    }
    /*FIN for para rellenar los nombre del combobox*/


    /*console.log(listCountries)*/
    listCountries.sort(function(a, b) {
        return a.cases - b.cases;
    });
    listCountries.reverse();
    /*console.log(listCountries)*/
    top10countries.innerHTML = "";
    /*For para rellenar banderas*/
    let cont = 1;
    for (x of listCountries) {
        if (cont == 11) {
            break
        }
        top10countries.innerHTML +=
            '<li>' +
            '<div>' +
            '<img src="' + x.countryInfo.flag + '" alt="">' +
            '<span class="small-span">' + x.country + '</span>' +
            '</div>' +
            '<h5 class="medium-title">' + x.cases + '</h5>' +
            '</li>';
        cont++;
    }

})

/*Funcion para seleccionar pais por combobox*/
function selectCountry() {
    /*
        console.log(tracker2select);
        console.log(tracker2select.value);*/
    let name_country = tracker2select.value;
    let url = ('https://disease.sh/v3/covid-19/countries/' + name_country)
    fetch(url)
        .then(response => response.json())
        .then(json => {
            /* console.log(json);*/
            /**/
            Tracker2imgcarddata[0].innerHTML = json.cases;
            Tracker2imgcarddata[1].innerHTML = json.deaths;
            Tracker2imgcarddata[2].innerHTML = json.recovered;
            Tracker2imgcarddata[3].innerHTML = json.active;
            Tracker2imgcarddata[4].innerHTML = json.todayCases;
            Tracker2imgcarddata[5].innerHTML = json.todayDeaths;
        })
    console.log(url);
}

/* Tracker 3 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/*Llenado de tabla y paginacion*/
let countries2 = funCountries();
let pagination = {
    'end_size': 255,
    'start_size': 1,
    'limit_show_entries': 10,
    'page': 1,
    'page_start': 1,
    'page_end': 10,
    'pages': 1,
    'order':0,
    'orderNumColum':0,
    'keyword':""
}
loadCountrisTable();
captionTable();
/*Funcion para seleccionar el limite de registros por pagina*/
function selectLimitEntries() {
    pagination.page = 1;
    pagination.limit_show_entries = Tracker3filtervalue.value;
    loadCountrisTable();
    captionTable();
}

function captionTable() {
    Tracker3TableCaption.innerHTML="Showing "+pagination.page_start+" to "+pagination.page_end+" of "+pagination.end_size+" entries";
    
}

/*Funcion para seleccionar pagina*/
function selectBotonPage(page) {
    pagination.page = page;
    loadCountrisTable();

}

function buttonNext(){
    if(pagination.page!=pagination.pages){
        pagination.page++;
        loadCountrisTable();
     
    }
}
function buttonPrevious(){
    if(pagination.page>1){
        pagination.page--;
        loadCountrisTable();
      
    }
}




/* Funcion para ordenar por columnas de la tabla*/
function orderColumn(numColumn,nameOrder) {
    console.log(nameOrder);
    countries2.then(listOrder => {
        console.log(listOrder);
        listOrder.sort(function(a, b) {
            console.log(a[nameOrder]);
            if(nameOrder=="country"){
                console.log("si es igual")
                if(a[nameOrder] < b[nameOrder])
                return -1
            }else{
                return a[nameOrder] - b[nameOrder];
            }
                
                
        });
        if(numColumn==pagination.orderNumColum){
            listOrder.reverse();
            pagination.orderNumColum=0;
        }else{
            pagination.orderNumColum=numColumn;
        }
        console.log(listOrder);
    })
    loadCountrisTable();
}

/* Funcion para buscar por palabra clave SEARCH*/
let contries2provisional=countries2;
function Search(keyword){
    countries2=contries2provisional;
    loadCountrisTable();
    pagination.keyword=keyword;
    console.log(keyword)
    countries2= countries2.then(list=>{
        return list.filter(filterWordTable);
    })
    loadCountrisTable();
    
    
}


function filterWordTable(obj) {
    for(x in obj){
        if(x=="todayRecovered" || x=="countryInfo"){
            continue;
        }
        if(`${obj[x]}`.toLowerCase().includes(pagination.keyword.toLowerCase()))
        {
            return true;
        }
    } 
}
/* Fin funciones ára buscar por palabra */


console.log(pagination);
/* Funcion para cargar registro a la tabla*/
function loadCountrisTable() {
    countries2.then(list => {
        pagination.end_size = list.length; /*Agrego la longitud de la lista para saber cuantos registros hay*/
        Tracker3tabledata.innerHTML = "";
        pagination.page_end = pagination.page * pagination.limit_show_entries; /*calculo cuantos registro se mostran al estar en determinada pagina*/
        pagination.page_start = pagination.page_end - pagination.limit_show_entries + 1; /* calculo en donde empieza a contar cada registro en determinada pagina*/
        /*console.log(pagination);*/
        let count = 1;
        for (x of list) {
            /*
            if (count == pagination.limit_show_entries) {
                break;
            }*/
            if (count >= pagination.page_start && count <= pagination.page_end) {
                Tracker3tabledata.innerHTML +=
                    '<tr>' +
                    '<td><img src="' + x.countryInfo.flag + '" alt=""></td>' +
                    '<td>' + x.country + '</td>' +
                    '<td>' + x.cases + '</td>' +
                    '<td>' + x.todayCases + '</td>' +
                    '<td>' + x.deaths + '</td>' +
                    '<td>' + x.todayDeaths + '</td>' +
                    '<td>' + x.recovered + '</td>' +
                    '<td>' + x.active + '</td>' +
                    '<td>' + x.critical + '</td>' +
                    '<td>' + x.tests + '</td>' +
                    '</tr>';
            }
            count++;

        }

        /*rellenar pagination*/
        pagination.pages = Math.ceil(pagination.end_size / pagination.limit_show_entries); /*calculo cuantas paginas tendra*/
        Tracker3paginationul.innerHTML =
            '<li class="page-item "><a class="page-link" onclick="buttonPrevious()" href="#"  aria-disabled="true">Previous</a></li>' +
            '<li class="page-item"><a onclick="selectBotonPage(' + 1 + ')" class="page-link" href="#">' + 1 + '</a></li>' +
            '<li class="page-item disabled"><a class="page-link" href="#">... </a></li>';
        let count2 = 1;
        for (let i = pagination.page; i <= pagination.pages; i++) {
            if (i == 1) {
                continue;
            }
            if (pagination.pages - pagination.page <= 3 && count2 == 1) {
                i = pagination.pages - 3;
            }
            if (count2 > 3) {
                break
            }
            if(i>=1 && i<pagination.pages){
            Tracker3paginationul.innerHTML += '<li class="page-item"><a onclick="selectBotonPage(' + i + ')" class="page-link" href="#">' + i + '</a></li>';
            }
            count2++;
        }
        Tracker3paginationul.innerHTML +=
            '<li class="page-item disabled"><a class="page-link" href="#">... </a></li>' +
            '<li class="page-item"><a onclick="selectBotonPage(' + pagination.pages + ')" class="page-link" href="#">' + pagination.pages + '</a></li>' +
            '<li class="page-item"><a class="page-link" onclick="buttonNext()" href="#">Next</a></li>';
        /*Fin rellenar paginacion*/
        captionTable();
    })
}

console.log("aver aver q paso")
console.log(pagination.end_size)





/* Top 10 Country wise Covid-19 Updates- Tiles */

const cargarAPI = document.querySelector('#tracker4-Top-Cases');
/* cargarAPI.addEventListener('DOMContentLoaded', conseguirDatos); */

let tracker4TopCases = document.getElementById('tracker4-Top-Cases');
let tracker4TodayCases = document.getElementById('tracker4-Today-Cases');

function conseguirDatos() {
    const url = 'https://disease.sh/v3/covid-19/countries';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado =>{
            /* total cases list */
            resultado.sort(function(a,b){return a.cases-b.cases});
            resultado.reverse();
            
            tracker4TopCases.innerHTML = '<h5>Top Cases</h5>';
            
            let cont= 0;

            for(items of resultado) {
                   tracker4TopCases.innerHTML += 

                '   <div class="table-item">'+
                       '<img src="'+items.countryInfo.flag+'" width="30">'+
                      ' <span>'+items.country+'</span>'+
                       '<span>'+ items.cases+'</span>'+
                  ' </div> ';
                
                  cont+=1;

                  if ( cont ==10){
                      break;
                  }
                  /* cont++; */
                /* cont = cont+1; */
            }


             /* Today cases list 
             resultado.sort(function(a,b){return a.todayCases-b.todayCases});
            resultado.reverse();
            
            tracker4TodayCases.innerHTML = '<h5>Today Cases</h5>';
            
            let cont= 0;

            for(items of resultado) {
                tracker4TodayCases.innerHTML += 

                '   <div class="table-item">'+
                       '<img src="'+items.countryInfo.flag+'" width="30">'+
                      ' <span>'+items.country+'</span>'+
                       '<span>'+ items.todayCases+'</span>'+
                  ' </div> ';
                
                  cont+=1;

                  if ( cont ==10){
                      break;
                  }
                 
            }
 */




        });

        

        
}

conseguirDatos();

