// function

function getHTML(html) {
    return document.querySelector(html);
}

function getHTMLs(html) {
    return document.querySelectorAll(html);
}

function blackNavbar(navbar,navbarLine,socmedLink,socmedLine) {
    navbar.forEach(e => {
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

function whiteNavbar(navbar,navbarLine,socmedLink,socmedLine) {
    navbar.forEach(e => {
        e.style.color = "white"
    })

    navbarLine.forEach(e => {
        e.style.backgroundColor = "white"
    })

    socmedLink.forEach(e => {
        e.style.color = "white"
    })

    socmedLine.style.backgroundColor = "white"
}

function navScroll(direction, index) {

    let containerWidth = getComputedStyle(container).width
    let a = [...containerWidth]
    a.pop()
    a.pop()
    let width = "";
    a.forEach(e => {
        width += e
    })

    let target = ""
    if (width * 1 < 1400) {
        target = 400 * index
    } else {
        target = 600 * index
    }

    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: target
    });
}


function getSkillData(url,success,id){
    let dataSkill = new XMLHttpRequest();

    dataSkill.onreadystatechange = () => {

        if(dataSkill.readyState === 4){
            if(dataSkill.status === 200){
                success(dataSkill.response, id);
            }else if(dataSkill.status === 404){
                alert("can't found data skill");
            }
        }
    }

    dataSkill.open("get", url);
    dataSkill.send();
}

function getSkillDataDesc(url, success2, id, item, target) {
    let dataSkill = new XMLHttpRequest();

    dataSkill.onreadystatechange = () => {

        if (dataSkill.readyState === 4) {
            if (dataSkill.status === 200) {
                success2(dataSkill.response, id, item, target);
            } else if (dataSkill.status === 404) {
                alert("can't found data skill");
            }
        }
    }

    dataSkill.open("get", url);
    dataSkill.send();
}

function success(result, target){
    let data = JSON.parse(result)
    let length = data[target].length;

        if(length === 5){
            length = "five";
        }else if(length === 3){
            length = "three";
        }else if(length === 2){
            length = "two"
        }

    let renderingSkill = []
    data[target].forEach((e,i) => {
        renderingSkill = renderSkill(e, length, i);
        skillContainer.innerHTML += renderingSkill;
        skillContainer.style.opacity = "1";
    })
}

function success2(result, index, item, target){
    let data = JSON.parse(result)
    let renderingSkill = []
    data[index].forEach(e => {
        if (e.name === item){
            renderingSkill += renderSkillDesc(e)
            target.innerHTML = renderingSkill
            target.style.opacity = "1";
        }
    })

}

function renderItem(e){
    e.forEach((el,index) => {
        setTimeout(() => {
            el.style.opacity = "1" 
        }, 500 * index);
        
    })  
}


function renderSkill(e, length, index){
    return `<div class="data ${length}-kotak${index+1}" >
                <img src="${e.img}" class="skill-img" width="100" height="100" data-skill="${e.name}">
            </div>
            <div class="data-desc">
            </div>
            `
}

function renderSkillDesc(e){
    return `
                <h3 class="data-skill-name">${e.name}</h3>
                <h4 class="data-rate">${e.rate}</h4>
                <div class="data-rate-graph ${e.class}"></div>
            `
}

// get element

const socmedLine = getHTML(".socmed-line");

const socmedLink = getHTMLs(".link-item")

const navbar = getHTMLs(".navbar-item");

const navbarLine = getHTMLs(".navbar-line")

const container = getHTML(".container");

const skillbtn = getHTMLs(".skill-btn");

const skillContainer = getHTML(".skill-data");

const darkLayer = getHTML(".dark-layer");

const label = getHTMLs(".form-grouped label");

const submitBtn = getHTML(".submit-btn");

const blogThumb = getHTMLs(".blog-thumb");

const projectBox = getHTMLs(".project-box");

// event listener

document.addEventListener("scroll", function(){
    let scrollY = window.pageYOffset;

    if(scrollY > 250){
        blackNavbar(navbar,navbarLine,socmedLink,socmedLine);
        if(scrollY > 600){
            whiteNavbar(navbar, navbarLine, socmedLink, socmedLine);
           if(scrollY > 1000){
               blackNavbar(navbar, navbarLine, socmedLink, socmedLine);
               renderItem(blogThumb);
                if(scrollY > 1450 ){
                    whiteNavbar(navbar, navbarLine, socmedLink, socmedLine);
                    renderItem(projectBox)
                    if(scrollY > 1900){
                        blackNavbar(navbar, navbarLine, socmedLink, socmedLine);
                    }
                }
            } 
        }
    }else{
        whiteNavbar(navbar, navbarLine, socmedLink, socmedLine);
    }

    if (scrollY > 750){
        setTimeout(() => {
            darkLayer.style.display = "none";
        }, 2500);
    }
})

let targetingItem = ""

skillbtn.forEach(e => {
    e.addEventListener("click", function (e) {
        targetingItem = e.target.dataset.idbtn
        skillContainer.innerHTML = ""
        skillContainer.style.opacity = "0";
        setTimeout(() => {
            getSkillData("./data.json", success, e.target.dataset.idbtn)
        }, 200);
    })
})

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("skill-img")){
        const target = getHTML(".data-desc")
        target.style.opacity = "0";
        setTimeout(() => {
            getSkillDataDesc("./data.json", success2, targetingItem, e.target.dataset.skill, target)
        }, 200);
        target.innerHTML = "";
    }
})


navbar.forEach((e,i) => {
    e.addEventListener("click", function(ev){
        let direction = ev.target.innerHTML;
        let elementDirection = document.getElementById(direction);
        
        navScroll(elementDirection,i);
    })
})

label.forEach(e => {
    e.innerHTML = e.innerHTML
    .split('')
    .map((latter,index) => `<span style = "transition-delay: ${index *30}ms">${latter}</span>`).join("")
})

const input = getHTMLs(".input-form")

submitBtn.addEventListener("click", ()=>{
    alert("successful sending message")
})

