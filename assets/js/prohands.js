/* Email js */
var emailjs=function(e){"use strict";class t{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Network Error";this.status=e,this.text=t}}const i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},r=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://api.emailjs.com";if(!e)return;const o=r(e);i.publicKey=o.publicKey,i.blockHeadless=o.blockHeadless,i.storageProvider=o.storageProvider,i.blockList=o.blockList,i.limitRate=o.limitRate,i.origin=o.origin||t},a=async function(e,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const a=await fetch(i.origin+e,{method:"POST",headers:o,body:r}),s=await a.text(),n=new t(a.status,s);if(a.ok)return n;throw n},s=(e,t,i)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||"string"!=typeof i)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},n=e=>e.webdriver||!e.languages||0===e.languages.length,l=()=>new t(451,"Unavailable For Headless Browser"),c=(e,t)=>{if((e=>!e.list?.length||!e.watchVariable)(e))return!1;((e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"})(e.list,e.watchVariable);const i=(r=t,o=e.watchVariable,r instanceof FormData?r.get(o):r[o]);var r,o;return"string"==typeof i&&e.list.includes(i)},d=()=>new t(403,"Forbidden"),m=async(e,t,i)=>{if(!t.throttle||!i)return!1;((e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"})(t.throttle,t.id);const r=t.id||e,o=await(async(e,t,i)=>{const r=Number(await i.get(e)||0);return t-Date.now()+r})(r,t.throttle,i);return o>0||(await i.set(r,Date.now().toString()),!1)},h=()=>new t(429,"Too Many Requests"),p=async(e,t,o,p)=>{const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=u.storageProvider||i.storageProvider,w={...i.blockList,...u.blockList},y={...i.limitRate,...u.limitRate};if(g&&n(navigator))return Promise.reject(l());if(s(b,e,t),(e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"})(o),o&&c(w,o))return Promise.reject(d());if(await m(location.pathname,y,f))return Promise.reject(h());const v={lib_version:"4.4.1",user_id:b,service_id:e,template_id:t,template_params:o};return a("/api/v1.0/email/send",JSON.stringify(v),{"Content-type":"application/json"})},u=async(e,t,o,p)=>{const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=i.storageProvider||u.storageProvider,w={...i.blockList,...u.blockList},y={...i.limitRate,...u.limitRate};if(g&&n(navigator))return Promise.reject(l());const v=(e=>"string"==typeof e?document.querySelector(e):e)(o);s(b,e,t),(e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"})(v);const j=new FormData(v);return c(w,j)?Promise.reject(d()):await m(location.pathname,y,f)?Promise.reject(h()):(j.append("lib_version","4.4.1"),j.append("service_id",e),j.append("template_id",t),j.append("user_id",b),a("/api/v1.0/email/send-form",j))};var b={init:o,send:p,sendForm:u,EmailJSResponseStatus:t};return e.EmailJSResponseStatus=t,e.default=b,e.init=o,e.send=p,e.sendForm=u,Object.defineProperty(e,"__esModule",{value:!0}),e}({});

/* Toast Notification */
function showToast({title,message,type,removeAfter} = opts){
    const toastContainer = document.getElementById('toast-container');
    if(!toastContainer){
        const newToastContainer = document.createElement('div');
        newToastContainer.id = 'toast-container';
        newToastContainer.className = 'fixed inset-0 flex flex-col items-end px-4 py-6 space-y-4 sm:items-end sm:p-6 h-min';
        document.body.appendChild(newToastContainer)
    }
    const svgSuccess = `<svg class="size-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`;
    const svgFailed = `<svg class="size-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" /></svg>`;
    const toast = document.createElement('div');
    toast.setAttribute('aria-live',"assertive");
    toast.className = `pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5`;
    toast.innerHTML = `
    <div class="p-4">
        <div class="flex items-start">
            <div class="shrink-0 mt-[1px]">${type==="success"?svgSuccess:svgFailed}</div>
            <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">${title}</p>
                <p class="mt-1 text-sm text-gray-500">${message}</p>
            </div>
            <div class="ml-4 flex shrink-0">
                <button type="button" class="inline-flex rounded-md bg-white text-gray-700 focus:outline-none cursor-pointer" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                    <span class="sr-only">Close</span>
                    <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>`;
    document.getElementById('toast-container').appendChild(toast);
    if(removeAfter && typeof removeAfter === "number"){
        setTimeout(() => toast.remove(),removeAfter);
    }
}

function showToastMessage (type,message) {
    showToast({ type, title: "Prohands Carwash", message, removeAfter:5000 });
}

/* Navbar and footer */
const navbarFR = {
    proHandsLogoPath : './img/Logo.jpg',
    activeLanguage:{
        text: "Français",
        flagPath: "./img/flags/ch.svg"
    },
    languagesLinks:[
        { path: "./en/", text: "English", flagPath: "./img/flags/en.svg" },
        { path: "./de/", text: "Deutsch", flagPath: "./img/flags/de.svg" },
        { path: "./it/", text: "Italien", flagPath: "./img/flags/it.svg" },
    ],
    reservationLink: {
        path: './resa.html',
        text: 'Réserver'
    },
    navLinks:[
        { path: "./index.html", text: "Accueil" },
        { path: "./A propos.html", text: "A propos" },
        { path: "./service.html", text: "Nos Services" },
    ]
}

const navbarEN = {
    proHandsLogoPath : '../img/cropped-car-1-white.webp',
    activeLanguage:{
        text: "English",
        flagPath: "../img/flags/en.svg"
    },
    languagesLinks:[
        { path: "./", text: "French", flagPath: "../img/flags/fr.svg" },
        { path: "./de/", text: "Deutsch", flagPath: "../img/flags/de.svg" },
        { path: "./it/", text: "Italien", flagPath: "../img/flags/it.svg" },
    ],
    reservationLink: {
        path: './en/reservation.html',
        text: 'Book'
    },
    navLinks:[
        { path: "./en/index.html", text: "Home" },
        { path: "./en/A propos.html", text: "About Us" },
        { path: "./en/service.html", text: "Services" },
    ]
}

const navbarDE = {
    proHandsLogoPath : '../img/cropped-car-1-white.webp',
    activeLanguage:{
        text: "Deutsch",
        flagPath: "../img/flags/de.svg"
    },
    languagesLinks:[
        { path: "./en/", text: "English", flagPath: "../img/flags/en.svg" },
        { path: "./", text: "Französisch", flagPath: "../img/flags/fr.svg" },
        { path: "./it/", text: "Italienisch", flagPath: "../img/flags/it.svg" },
    ],
    reservationLink: {
        path: './de/reservation.html',
        text: 'Buchen'
    },
    navLinks:[
        { path: "./de/index.html", text: "Startseite" },
        { path: "./de/A propos.html", text: "Über Uns" },
        { path: "./de/service.html", text: "Dienstleistungen" },
    ]
}

const navbarIT = {
    proHandsLogoPath : '../img/cropped-car-1-white.webp',
    activeLanguage:{
        text: "Italiano",
        flagPath: "../img/flags/it.svg"
    },
    languagesLinks:[
        { path: "./en", text: "English", flagPath: "../img/flags/en.svg" },
        { path: "./de/", text: "Deutsch", flagPath: "../img/flags/de.svg" },
        { path: "./", text: "French", flagPath: "../img/flags/fr.svg" },
    ],
    reservationLink: {
        path: './it/reservation.html',
        text: 'Prenota'
    },
    navLinks:[
        { path: "./en/index.html", text: "Home" },
        { path: "./en/A propos.html", text: "About Us" },
        { path: "./en/service.html", text: "Services" },
    ]
}

const footerFR = {
    backgroundPath: './img/footer.png',
    bloc1:{
        title: 'Prohands Carwash',
        subtitile: 'CRÉÉ AFIN DE RÉVOLUTIONNER LE<br> SOIN AUTOMOBILE',
        logoPath: './img/cropped-car-1-white.webp'
    },
    bloc2: {
        title: 'Informations'
    },
    bloc3: {
        title: 'Pages',
        links: [
            { path: "./index.html",    text: "Page d'accueil" },
            { path: "./A propos.html", text: "À propos de nous" },
            { path: "./service.html",  text: "Nos services" }
        ],
        reservationBtn: {
            path: "./reservation.html",
            text: "Réserver Un Nettoyage"
        }
    }
}

const footerEN = {
    backgroundPath: '../img/footer.png',
    bloc1:{
        title: 'Prohands Carwash',
        subtitile: 'THE AUTOMOTIVE CARE<br>REVOLUTION',
        logoPath: '../img/cropped-car-1-white.webp'
    },
    bloc2: {
        title: 'Informations'
    },
    bloc3: {
        title: 'Pages',
        links: [
            { path: "./en/index.html",    text: "Home" },
            { path: "./en/A propos.html", text: "About Us" },
            { path: "./en/service.html",  text: "Services" }
        ],
        reservationBtn: {
            path: "./en/reservation.html",
            text: "Reserve Now"
        }
    }
}

const footerDE = {
    backgroundPath: '../img/footer.png',
    bloc1:{
        title: 'Prohands Carwash',
        subtitile: 'CENTWICKELT, UM AUTOFLEGE NEU ZU<br>DEFINIEREN',
        logoPath: '../img/cropped-car-1-white.webp'
    },
    bloc2: {
        title: 'Geschäftsinformationen'
    },
    bloc3: {
        title: 'Seiten',
        links: [
            { path: "./de/index.html",    text: "Startseite" },
            { path: "./de/A propos.html", text: "Über Uns" },
            { path: "./de/service.html",  text: "Dienstleistungen" }
        ],
        reservationBtn: {
            path: "./de/reservation.html",
            text: "Reinigungstermin Buchen"
        }
    }
}

const footerIT = {
    backgroundPath: '../img/footer.png',
    bloc1:{
        title: 'Prohands Carwash',
        subtitile: 'CREATO PER RIVOLUZIONARE LA<br> SOIN AUTOMOBILE',
        logoPath: '../img/cropped-car-1-white.webp'
    },
    bloc2: {
        title: 'Informazioni'
    },
    bloc3: {
        title: 'Pagine',
        links: [
            { path: "./it/index.html",    text: "Home" },
            { path: "./it/A propos.html", text: "Chi siamo" },
            { path: "./it/service.html",  text: "I nostri servizi" }
        ],
        reservationBtn: {
            path: "./it/reservation.html",
            text: "Prenota una pulizia"
        }
    }
}

const languageContents = {
    'fr': {
        navbar: navbarFR,
        footer: footerFR
    },
    'en':{
        navbar: navbarEN,
        footer: footerEN
    },
    'de':{
        navbar: navbarDE,
        footer: footerDE
    },
    'it':{
        navbar: navbarIT,
        footer: footerIT
    }
}

function getHtmlPageName(language){
    let pagePath = location.pathname;
    if(pagePath.includes(language)){
        return pagePath.split(language + '/')[1];
    }
    return pagePath.split('/')[1];
}

function getLanguageRedirectionLink(path, activeLanguage){
    return path + getHtmlPageName(activeLanguage);
}

function buildHeader(language){
    let headerElement = document.getElementById('header');
    let { proHandsLogoPath, activeLanguage, languagesLinks, reservationLink, navLinks } = languageContents[language].navbar;

    //Build navbar container
    let navElement = document.createElement('nav');
    navElement.className = "flex flex-wrap items-center justify-between gap-4 px-6 py-6 max-w-7xl mx-auto";
    
    //Nav Logo
    let logo = document.createElement('a');
    logo.setAttribute('href', navLinks[0].path);
    logo.className = "flex items-center space-x-2";
    logo.innerHTML = `<img src="${proHandsLogoPath}" alt="Logo voiture" class="h-12" />`
    navElement.appendChild(logo);

    //Desktop menu
    let desktopMenu = document.createElement('div');
    desktopMenu.className = "hidden md:flex flex-1 justify-end space-x-8 text-md font-semibold text-gray-700";
    for(let link of navLinks){
        let a = document.createElement('a');
        a.setAttribute('href', link.path);
        a.className = "text-[16px] font-semibold text-black";
        a.innerHTML = link.text;
        desktopMenu.appendChild(a);
    }
    navElement.appendChild(desktopMenu);

    //Extra menu
    let extraMenu = document.createElement('div');
    extraMenu.className = `flex items-center space-x-3 relative`;

    //lang
    let langMenuContainer = document.createElement('div');
    langMenuContainer.className = "relative flex flex-col items-center";

    //lang btn
    let langBtn = document.createElement('button');
    langBtn.setAttribute('id','langButton');
    langBtn.setAttribute('type','button');
    langBtn.className = "flex items-center text-base text-gray-800 hover:text-gray-600 cursor-pointer"
    langBtn.innerHTML = `
    <span class="hidden md:flex items-center">
        <img src="${activeLanguage.flagPath}" alt="${language.toUpperCase()}" class="w-5 h-5 mr-1" /> ${activeLanguage.text}
    </span>
    <span class="md:hidden">
        <img src="${activeLanguage.flagPath}" alt="${language.toUpperCase()}" class="w-5 h-5" />
    </span>
    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>`;
    
    //lang selector
    let langMenu = document.createElement('ul');
    langMenu.setAttribute('id','langMenu');
    langMenu.className = "absolute hidden left-1/2 -translate-x-1/2 top-full mt-2 w-36 bg-white/70 backdrop-blur-sm rounded z-50 text-sm transition-all duration-300 opacity-0 translate-y-1 pointer-events-none shadow";
    for(let country of languagesLinks){
        let li = document.createElement('li');
        li.innerHTML = `
        <a href="${getLanguageRedirectionLink(country.path, activeLanguage)}" class="flex items-center justify-start px-3 py-2 hover:bg-white/40 rounded">
            <img src="${country.flagPath}" class="w-5 h-5 mr-2" />
            <span class="md:inline">${country.text}</span>
         </a>
        `;
        langMenu.appendChild(li);
    }

    langBtn.addEventListener('click',(e) => {
        e.stopPropagation();
        langMenu.classList.toggle('hidden');
        if (!langMenu.classList.contains('hidden')) {
            langMenu.classList.remove('opacity-0', 'translate-y-1', 'pointer-events-none');
            langMenu.classList.add('opacity-100', 'translate-y-0');
        } else {
            langMenu.classList.add('opacity-0', 'translate-y-1', 'pointer-events-none');
            langMenu.classList.remove('opacity-100', 'translate-y-0');
        }
    });
    langMenuContainer.appendChild(langBtn);
    langMenuContainer.appendChild(langMenu);

    extraMenu.appendChild(langMenuContainer);

    //Reserver
    let reservation = document.createElement('a');
    reservation.setAttribute('href', reservationLink.path);
    reservation.className = "bg-[#5F524F] text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-[#4d4542] transition";
    reservation.innerHTML = reservationLink.text;
    extraMenu.appendChild(reservation);

    //Burger
    let burger = document.createElement('div');
    burger.className = "md:hidden";
    burger.innerHTML = `
    <button class="bg-[#5F524F] p-2 rounded hover:bg-[#4d4542] cursor-pointer">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>`;
    
    extraMenu.appendChild(burger);
    
    navElement.appendChild(extraMenu);

    //Build mobile menu
    let mobileMenu = document.createElement('div');
    mobileMenu.setAttribute('id', 'mobile-menu');
    mobileMenu.className = "md:hidden hidden px-6 pt-4 pb-4 space-y-2 place-items-center text-base font-medium text-gray-700";
    for(let link of navLinks){
        let a = document.createElement('a');
        a.setAttribute('href', link.path);
        a.className = "block hover:text-black";
        a.innerHTML = link.text;
        mobileMenu.appendChild(a);
    }
    burger.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    
    headerElement.appendChild(navElement);
    headerElement.appendChild(mobileMenu);

    //Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.add('hidden', 'opacity-0', 'translate-y-1', 'pointer-events-none');
            langMenu.classList.remove('opacity-100', 'translate-y-0');
        }
    });
}

function buildFooter(language){
    let footerElement = document.getElementById('footer');
    let { backgroundPath, bloc1, bloc2, bloc3 } = languageContents[language].footer;

    footerElement.className = `w-full text-black text-sm bg-[#bcbcbc] bg-no-repeat bg-top bg-cover bg-[url('${backgroundPath}')]`;
    footerElement.innerHTML = `
    <div class="relative z-10 py-14 bg-[#bcbcbc]/80 ">
        <div class="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-center md:items-start gap-10">
            <!-- Bloc 1 - Logo & Texte -->
            <div class="flex-1 text-center">
                <h2 class="font-bold text-lg mb-1">${bloc1.title}</h2>
                <p class="uppercase text-base leading-tight">${bloc1.subtitile}</p>
                <div class="my-4">
                    <img src="${bloc1.logoPath}" alt="Voiture" class="mx-auto w-[120px]">
                </div>
                <div class="flex justify-center space-x-4">
                    <a href="https://www.facebook.com/people/Pro-Hands-CarWash/61554807187710/" target="_blank"><i class="fa-brands fa-facebook text-2xl"></i></a>
                    <a href="https://www.instagram.com/pro_hands_carwash" target="_blank"><i class="fa-brands fa-instagram text-2xl"></i></a>
                    <a href="https://www.tiktok.com/@prohands_carwash" target="_blank"><i class="fa-brands fa-tiktok text-2xl"></i></a>
                </div>
            </div>

            <!-- Bloc 2 - Informations -->
            <div class="flex-1 text-center">
                <h3 class="font-bold text-lg mb-2">${bloc2.title}</h3>
                <ul class="space-y-2 text-base">
                    <li class="flex justify-center items-center gap-2"><i class="fa-solid fa-phone"></i><span>+41 79 322 11 75</span></li>
                    <li class="flex justify-center items-center gap-2"><i class="fa-solid fa-envelope"></i><span>info@prohands-carwash.ch</span></li>
                    <li class="flex justify-center items-center gap-2"><i class="fa-solid fa-location-dot"></i><span>villars-sur-Glâne</span></li>
                </ul>
            </div>

            <!-- Bloc 3 - Pages et bouton -->
            <div class="flex-1 text-center">
                <h3 class="font-bold text-lg mb-2">${bloc3.title}</h3>
                <ul class="space-y-2 text-base">
                    <li class="flex justify-center items-center gap-2">
                        <span>›</span>
                        <a href="${bloc3.links[0].path}" class="hover:underline">${bloc3.links[0].text}</a>
                    </li>
                    <li class="flex justify-center items-center gap-2">
                        <span>›</span>
                        <a href="${bloc3.links[1].path}" class="hover:underline">${bloc3.links[1].text}</a>
                    </li>
                    <li class="flex justify-center items-center gap-2">
                        <span>›</span>
                        <a href="${bloc3.links[2].path}" class="hover:underline">${bloc3.links[2].text}</a>
                    </li>
                </ul>
                <div class="mt-4">
                    <a href="${bloc3.reservationBtn.path}" class="inline-block bg-black text-white text-sm font-bold px-5 py-2">${bloc3.reservationBtn.text}</a>
                </div>
            </div>
        </div>
    </div>`;
}

function init(){
    let currentLanguage = document.querySelector('html').lang;
    buildHeader(currentLanguage);
    buildFooter(currentLanguage);
}
init();