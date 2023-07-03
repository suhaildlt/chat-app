function signin(e){
    e.preventDefault()
    const username = document.querySelector("#username").value
    const pass = document.querySelector("#password").value
    const userArray = username.split(" ")
    window.location.href = `http://${APP_URL}:${PORT}/main.html`;
}
async function init() {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if(currentPath == "/login.html" || currentPath == "/"){
        document.querySelector("form").onsubmit = signin
    }
    else if(currentPath == "/main.html"){

    }
}
async function submit(){
    const content = document.querySelector("#content").value;
    if(content == "" ) return
    document.querySelector(".top").innerHTML = ""
    configLoader("show")
    let resp = await fetch(`http://${APP_URL}:${PORT}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: content })
        })
        resp = await resp.json()
        console.log(resp);
        configLoader()
        if(resp.result){
            document.querySelector(".top").textContent = resp.data
        }else{
            const elem  = document.createElement("div");
            elem.classList.add("error");
            elem.innerHTML  = `Error Occured <br>
                                Message : ${resp.message}`;
            document.querySelector(".top").appendChild(elem)
        }
}
function configLoader(config){
    if(config == "show"){
        document.querySelector(".loader").style.display ="flex"
        document.querySelector(".submit-text").style.display ="none"
    }else{
        document.querySelector(".loader").style.display ="none";
        document.querySelector(".submit-text").style.display =""


    }
}
init()