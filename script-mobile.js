function getHTML(tag) {
    return document.querySelector(tag)
}

function getHTMLs(tag) {
    return document.querySelectorAll(tag)
}

function navScroll(elementDirection) {
    let target = (elementDirection.offsetTop)
    
    window.scroll({
        behavior : "smooth",
        left: 0,
        top: target
    })
}

function darkNav(navbarItem,navbarLine,socmedLink,socmedLine) {
    navbarItem.forEach(e => {
        e.style.color = "#1B1C1E"
    })
    
    navbarLine.forEach(e => {
        e.style.backgroundColor = "#1B1C1E"
    })
    
    socmedLink.forEach(e => {
        e.style.color = "#1B1C1E"
    })

    socmedLine.style.backgroundColor = "#1B1C1E"
}

function lightNav(navbarItem, navbarLine, socmedLink, socmedLine) {
    navbarItem.forEach(e => {
        e.style.color = "white"
        e.style.fontWeight = "normal"
        
    })

    navbarLine.forEach(e => {
        e.style.backgroundColor = "white"
    })

    socmedLink.forEach(e => {
        e.style.color = "white"
    })

    socmedLine.style.backgroundColor = "white"
}

function getSkillData(url, success, index) {
    let dataSkill = new XMLHttpRequest();

    dataSkill.onreadystatechange = () => {

        if (dataSkill.readyState === 4) {
            if (dataSkill.status === 200) {
                success(dataSkill.response, index);
            } else if (dataSkill.status === 404) {
                alert("can't found data skill");
            }
        }
    }

    dataSkill.open("get", url);
    dataSkill.send();
}

function success(response, index) {
    let rsp = JSON.parse(response)

    let temporary = ""

    rsp[index].forEach((e,i) => {
        temporary += renderSkill(e,i)
        skillContainer.innerHTML = temporary
        skillContainer.style.opacity = "1"
    })
}

function renderSkill(response,index){
    return `<div class="kotak" >
                <img src="${response.img}" id="${index}" data-skill="${response.name}">
                <div class="skill-desc">
                    <h3 class="data-skill-name">${response.name}</h3>
                    <h4 class="data-rate">${response.rate}</h4>
                    <div class="data-rate-graph ${response.class}"></div>
                </div>
            </div>`
}


const burgerNavbar = getHTML(".line-box");

const lineBurgerNavbar = getHTMLs(".navbar-line");

const hiddenNavbar = getHTMLs(".navbar-item")

const socmedLink =  getHTMLs(".link-item")

const socmedLine = getHTML(".socmed-line")

const skillViewport = getHTML(".skill-viewport")

const skillbtn = getHTMLs(".skill-btn")

const skillContainer = getHTML(".skill-container")

const skillDesc = getHTML(".skill-desc")

const label = getHTMLs(".form-grouped label")

const submitBtn = getHTML(".submit-btn")

burgerNavbar.addEventListener("touchstart", function(){
    hiddenNavbar.forEach(x => {
        x.classList.toggle("unhide");
     })
    
    lineBurgerNavbar.forEach(b => {
        b.classList.toggle("putar");
    })
})

hiddenNavbar.forEach(e => {
    e.addEventListener("click", function(){
        e.href = "javascript: void (0)";
        let direction = e.innerHTML;
        let elementDirection = document.getElementById(direction)

        navScroll(elementDirection);
    })
})

document.addEventListener("scroll", function () {
    let scrollY = window.pageYOffset;
    let area = screen.height - screen.height*2/3
    
    if(scrollY > area*1.5){
        darkNav(hiddenNavbar, lineBurgerNavbar, socmedLink, socmedLine)
        if(scrollY > area*4){
            lightNav(hiddenNavbar, lineBurgerNavbar, socmedLink, socmedLine)
            if(scrollY > area*7.5){
                darkNav(hiddenNavbar, lineBurgerNavbar, socmedLink, socmedLine)
                if(scrollY > area*10){
                    lightNav(hiddenNavbar, lineBurgerNavbar, socmedLink, socmedLine)
                    if(scrollY > area*13.5){
                        darkNav(hiddenNavbar, lineBurgerNavbar, socmedLink, socmedLine)
                    }
                }
            }
        }
    }else{
        lightNav(hiddenNavbar, lineBurgerNavbar, socmedLink, socmedLine)
    }
})

skillbtn.forEach(e => {
    e.addEventListener("click", function(){
        let target = e.dataset.idbtn

        setTimeout(() => {
            getSkillData("./data.json", success, target)
        }, 100);
    })
})

label.forEach(e => {
    e.innerHTML = e.innerHTML
        .split('')
        .map((latter, index) => `<span style = "transition-delay: ${index * 30}ms">${latter}</span>`).join("");
})

