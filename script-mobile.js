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
        e.style.fontWeight = "bold"
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

function getSkillDataDesc(url, success2, target) {
    let dataSkill = new XMLHttpRequest();

    dataSkill.onreadystatechange = () => {

        if (dataSkill.readyState === 4) {
            if (dataSkill.status === 200) {
                success2(dataSkill.response, target);
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
    let defaultDesc = ""

    rsp[index].forEach((e,i) => {
        temporary += renderSkill(e,i)
        skillContainer.innerHTML = temporary
        skillContainer.style.opacity = "1"
    })

    defaultDesc = renderSkillDescDefault(rsp[index][0])
    skillDesc.innerHTML = defaultDesc
    skillDesc.style.opacity = "1"
}

function success2(response, target){
    let rsp = JSON.parse(response)

    let temporary = ""

    rsp.forEach(e => {
        e.forEach(x => {
            if(x.name === target){
                temporary = renderSkillDesc(x)
                skillDesc.innerHTML = temporary
                skillDesc.style.opacity = "1";
            }
        })
    })
}

function renderSkillDescDefault(response) {
    return `
            <h3 class="data-skill-name">${response.name}</h3>
            <h4 class="data-rate">${response.rate}</h4>
            <div class="data-rate-graph ${response.class}"></div>
            `
}


function renderSkill(response,index){
    return `<div class="kotak" >
                <img src="${response.img}" id="${index}" data-skill="${response.name}">
            </div>`
}

function renderSkillDesc(response) {
    return `
                <h3 class="data-skill-name">${response.name}</h3>
                <h4 class="data-rate">${response.rate}</h4>
                <div class="data-rate-graph ${response.class}"></div>
            `
}


const burgerNavbar = getHTMLs(".navbar-line");

const hiddenNavbar = getHTMLs(".navbar-item")

const socmedLink =  getHTMLs(".socmed-link")

const socmedLine = getHTML(".socmed-line")

const skillViewport = getHTML(".skill-viewport")

const skillbtn = getHTMLs(".skill-btn")

const skillContainer = getHTML(".skill-container")

const skillDesc = getHTML(".skill-desc")

burgerNavbar.forEach(e => {
    e.addEventListener("click", function(){
        hiddenNavbar.forEach(x => {
            x.classList.toggle("unhide");
        })
    
        burgerNavbar.forEach(b => {
            b.classList.toggle("putar");
        })
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
        darkNav(hiddenNavbar, burgerNavbar, socmedLink, socmedLine)
        if(scrollY > area*4){
            lightNav(hiddenNavbar, burgerNavbar, socmedLink, socmedLine)
            if(scrollY > area*7.5){
                darkNav(hiddenNavbar, burgerNavbar, socmedLink, socmedLine)
                if(scrollY > area*10){
                    lightNav(hiddenNavbar, burgerNavbar, socmedLink, socmedLine)
                    if(scrollY > area*13.5){
                        darkNav(hiddenNavbar, burgerNavbar, socmedLink, socmedLine)
                    }
                }
            }
        }
    }else{
        lightNav(hiddenNavbar, burgerNavbar, socmedLink, socmedLine)
    }
})

skillViewport.addEventListener("scroll", function (ev) {
    let scrollX = skillViewport.scrollLeft;
    let target = ""
    
    console.log(scrollX)

    skillDesc.style.opacity = "0"

    if(scrollX === 0){
        target = document.getElementById("0").dataset.skill
        setTimeout(() => {
            getSkillDataDesc("./data.json", success2, target)
        }, 100);
    }else if(scrollX === 189){
        target = document.getElementById("1").dataset.skill
        setTimeout(() => {
            getSkillDataDesc("./data.json", success2, target)
        }, 100);    
    } else if (scrollX === 379) {
        target = document.getElementById("2").dataset.skill
        setTimeout(() => {
            getSkillDataDesc("./data.json", success2, target)
        }, 100);
    } else if (scrollX === 569) {
        target = document.getElementById("3").dataset.skill
        setTimeout(() => {
            getSkillDataDesc("./data.json", success2, target)
        }, 100);
    } else if (scrollX === 759) {
        target = document.getElementById("4").dataset.skill
        setTimeout(() => {
            getSkillDataDesc("./data.json", success2, target)
        }, 100);
    }
})

skillbtn.forEach(e => {
    e.addEventListener("click", function(){
        let target = e.dataset.idbtn
        skillContainer.style.opacity = "0"
        skillDesc.style.opacity = "0"
        setTimeout(() => {
            getSkillData("./data.json", success, target)
        }, 100);
    })
})


