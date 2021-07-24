/* Global Variables */
const generate = document.getElementById("generate");
const back = document.getElementsByClassName("back")[0];
const navButton = document.querySelector(".nav-bar button");
const closeButton = document.querySelector("div.closebutton");
const dataHolderList = document.querySelector("div.dataholder ul");

// Create a new date instance dynamically with JS

let dateInstance = new Date();  

/*
start helper function
*/

// performing post request function
const postData = async (url="",data={})=>{
    let response = await fetch(url,{
        method: "POST",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        return newData;
    }catch(err){
        console.log("error is " + err);
    }
};

// performing get request function
const getData = async (url="")=>{
    const response = await fetch(url);
    try{
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err);
    }
};

// updating UI based on the data fetched from the /data route
const updateUi = (data)=>{
    console.log(data);
    const listItem = document.createElement("li");
    const tempDate = document.createElement("div");
    tempDate.innerHTML = `It was ${data.temprature * 10 % 10 > 5 ? Math.ceil(data.temprature):Math.floor(data.temprature)}<sup>o</sup>C and it feels like, "${data.userFeeling}".`;
    const dateHolder = document.createElement("div");
    dateHolder.textContent = data.myDate;
    dateHolder.classList.add("date");
    listItem.appendChild(tempDate);
    listItem.appendChild(dateHolder);
    dataHolderList.appendChild(listItem);
}


// the main funciton for perfroming the sequesnces of get and post requests
const startMagic = ()=>{
    const apiKey = "1473a40b440e600eb9f3678ca651f52b&units=metric";
    const base = "http://api.openweathermap.org/data/2.5/forecast?";
    let date = dateInstance.getMonth()+'.'+ dateInstance.getDate()+'.'+ dateInstance.getFullYear();
    const zip = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    const data = {zip:zip,feeling:feeling};
    const url = `${base}zip=${zip}&appid=${apiKey}`; //http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

    getData(url).then(retreivedData=>{
        let data = {
            temprature:retreivedData.list[0].main.temp,
            myDate:date,
            userFeeling:feeling
        };
        return data;
    }).then((data)=>{
        postData("/data",data);
    }).then((data)=>{
        getData("/data").then(updateUi);
    }).then(hideForm);
};

// hide .back element
const hideForm = event=>{
    fadeOut(back);
}

// show .back element
const showForm = event=>{
    fadeIn(back);
};


/*
end helper functions
start custom functions
*/

// showing element with animation
const fadeIn = (element)=>{
    element.style.display = "grid";
    element.style.opacity = 0;
    const id = setInterval(()=>{
        if(element.style.opacity < 1){
            element.style.opacity = Number(element.style.opacity) + 0.1;
        }else{
            element.style.opacity = 1;
            clearInterval(id);
        }
    },15);
};


// hiding element with animation
const fadeOut = (element)=>{
    element.style.opacity = 1;
    const id = setInterval(()=>{
        if(element.style.opacity > 0){
            element.style.opacity -= 0.1;
        }else{
            element.style.opacity = 0;
            element.style.display = "none";
            clearInterval(id);
        }
    },20);
};

/*
end custom function
start event listeners
*/

generate.addEventListener("click",startMagic);
navButton.addEventListener("click", showForm);
closeButton.addEventListener("click", hideForm);

/*
end event listeners
*/