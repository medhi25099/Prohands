
const navbarFR = {
    proHandsLogoPath : './img/cropped-car-1-white.webp',
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
        path: './reservation.html',
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