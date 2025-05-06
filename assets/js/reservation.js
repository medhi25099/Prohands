const setPriceElement = (elem, value) => elem.setAttribute('data-price', value);
const setTimeElement = (elem, value) => elem.setAttribute('data-time', value);

function closeCollapse(elementID){
    let stepContainer = document.getElementById(elementID);
    stepContainer.querySelector('[data-type="collapse"]').classList.add('hidden');
    stepContainer.querySelector('svg').classList.add('rotate-180');
}

scrollIntoSection = e => { 
    setTimeout(()=> document.getElementById(e).scrollIntoView({ behavior:"smooth" }), 250);
};

function resetVehiculeType(){
    let stepSelectVehiculeType = document.getElementById('select-vehicule-type');
    if (stepSelectVehiculeType) {
        //Reset selected vehicule type
        stepSelectVehiculeType.querySelectorAll('.vehicule-type').forEach(v => v.classList.remove('bg-blue-500', 'text-white'));
        //Uncheck optionnal option vehicule
        stepSelectVehiculeType.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        //Hide additionnal option
        document.getElementById('select-vehicule-additionnal-options-container').classList.add('hidden');
    }
}

function resetLavageType(type){
    let stepSelectLavageType = document.getElementById(`select-lavage-${type}-global-container`);
    if(stepSelectLavageType){
        //Reset selected type
        document.querySelectorAll(`.lavage-${type}-option`).forEach(element => element.classList.remove('bg-blue-100', 'border-blue-500'));
        //Uncheck optionnal option lavage interieur
        stepSelectLavageType.querySelectorAll('input[type="checkbox"]').forEach(checkbox => { checkbox.checked = false });
        stepSelectLavageType.querySelectorAll('input[type="text"]').forEach(input => { 
            input.setAttribute('value',"0");
            setPriceElement(input, 0);
            setTimeElement(input, 0);
        });
        //Hide additionnal option
        document.getElementById(`select-lavage-${type}-additionnal-options-container`).classList.add('hidden');
        //Hide le container
        stepSelectLavageType.classList.add('hidden');
    }
}

function resetAllCollapseElements(){
    document.querySelectorAll('[data-type="collapse"]').forEach(e => {
        e.classList.remove('hidden');
        e.parentElement.querySelector('svg').classList.remove('rotate-180');
    });
}

function resetAllElements() {
    resetVehiculeType();
    resetLavageType('interieur');
    resetLavageType('exterieur');
    resetAllCollapseElements();
    //Hide price and formulaire
    document.getElementById('total-container').classList.add('hidden');
    document.getElementById('formulaire-contact').classList.add('hidden');
}

function createBtnCollapse(stepNumber, title) {
    let h2 = document.createElement('h2');
    h2.className = "flex justify-between items-center text-xl font-bold mb-4";
    h2.setAttribute('data-type', 'btn-collapse');
    h2.setAttribute('state','open');
    h2.innerHTML = `
    <span>${stepNumber}. ${title}</span>
    <svg class="w-3 h-3 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
    </svg>`;
    h2.addEventListener('click',() => {
        h2.parentElement.querySelector('[data-type="collapse"]').classList.toggle('hidden');
        h2.querySelector('svg').classList.toggle('rotate-180');
    });
    return h2;
}

function createPriceElement(price){
    const priceTag = document.createElement('p');
    priceTag.className = 'price-display text-sm font-semibold text-blue-600 mt-2';
    priceTag.textContent = `CHF ${price}`;
    return priceTag;
}

function createOptionnalOptions(option){
    let container = document.createElement('label');
    container.className = `flex items-center`;
    if (option.type === "checkbox") {
        let inputEl = document.createElement('input');
        inputEl.setAttribute('type', 'checkbox');
        inputEl.className = "mr-2";
        setPriceElement(inputEl, option.price);
        setTimeElement(inputEl, option.estimatedTime);
        container.appendChild(inputEl);
    }
    else if (option.type === "input") {
        let inputEl = document.createElement('input');
        inputEl.setAttribute('type', 'text');
        inputEl.className = "shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[1.5rem] text-center";
        inputEl.setAttribute('value', '0');
        setPriceElement(inputEl, 0);
        setTimeElement(inputEl, 0);

        let btnDown = document.createElement('button');
        btnDown.setAttribute('type', 'button');
        btnDown.className = "shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        btnDown.innerHTML = `
            <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
            </svg>
        `;
        btnDown.addEventListener('click', () => {
            let actualValue = parseInt(inputEl.value);
            if (actualValue > option.minValue) {
                let newValue = actualValue - 1;
                inputEl.setAttribute('value', newValue);
                setPriceElement(inputEl, `${option.price * newValue}`);
                setTimeElement(inputEl, `${option.estimatedTime * newValue}`);
            }
        });

        let btnUp = document.createElement('button');
        btnUp.setAttribute('type', 'button');
        btnUp.className = "mr-2 shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none";
        btnUp.innerHTML = `
            <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
        `;
        btnUp.addEventListener('click', () => {
            let actualValue = parseInt(inputEl.value);
            if (actualValue < option.maxValue) {
                let newValue = actualValue + 1;
                inputEl.setAttribute('value', newValue);
                setPriceElement(inputEl, `${option.price * newValue}`);
                setTimeElement(inputEl, `${option.estimatedTime * newValue}`);
            }
        });
        [btnDown, inputEl, btnUp].forEach(e => container.appendChild(e));
    }
    return container;
}

function updatePrestationElement(el, price){
    //Remove old price
    el.querySelector('.price-display')?.remove();
    //Display price condition
    if(price > 0){
        let priceElement = createPriceElement(price);
        el.appendChild(priceElement);
    }
}

function updateAndDisplayPrestationExterieur(prestationType){
    let lavageExterieurOptionElement = document.querySelectorAll('.lavage-exterieur-option');
    lavageExterieurOptionElement.forEach(element => {
        //Get type of prestation
        let prestation = element.dataset.type;
        //Collect data
        let { price, estimatedTime, additionnalOpts } = prestationType['lavage-exterieur'][prestation];
        updatePrestationElement(element, price);

        //Add click event
        element.addEventListener('click',(e) => {
            closeCollapse('select-lavage-interieur-global-container');
            scrollIntoSection('select-lavage-exterieur-global-container');
            setPriceElement(element, price);
            setTimeElement(element, estimatedTime);

            //remove previous active btn
            lavageExterieurOptionElement.forEach(btn => { btn.classList.remove('bg-blue-100', 'border-blue-500'); });
            //set element active
            element.classList.add('bg-blue-100', 'border-blue-500');
            
            //reset additionnal option
            let optionsContainer = document.getElementById('select-lavage-exterieur-additionnal-options');
            optionsContainer.innerHTML = "";
            
            //update additionnal option
            if(Object.keys(additionnalOpts).length){
                for (let option of Object.values(additionnalOpts)) {
                    let opt = createOptionnalOptions(option);
                    opt.insertAdjacentText("beforeend", `${option.name} (CHF ${option.price})`);
                    if(option.hasOwnProperty('tootips')){
                        let span = document.createElement('span');
                        span.innerHTML = `
                        <div class="relative group">
                            <button class=" text-black rounded scale-80">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                            </button>
                            <div class="absolute w-80 bottom-full left-[-100%] md:left-[50%]  -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                                ${option.tootips}
                            </div>
                        </div>
                        `
                        opt.appendChild(span);
                    }

                    optionsContainer.appendChild(opt);
                }
                document.getElementById('select-lavage-exterieur-additionnal-options-container').classList.remove('hidden');
            } else {
                document.getElementById('select-lavage-exterieur-additionnal-options-container').classList.add('hidden');
                closeCollapse('select-lavage-exterieur-global-container');
                scrollIntoSection('formulaire-contact');
            }
            //Display formulaire
            document.getElementById('formulaire-contact').classList.remove('hidden')
        });
    });
    //Display lavage exterieur
    document.getElementById('select-lavage-exterieur-global-container').classList.remove('hidden')
}

function loadVehiculePrestation(prestationType) {
    resetLavageType('interieur');
    resetLavageType('exterieur');
    closeCollapse('select-vehicule-type');
    scrollIntoSection('select-lavage-interieur-global-container');
    //Build lavage interieur and exterieur with data
    let lavageInterieurOptionElement = document.querySelectorAll('.lavage-interieur-option');
    lavageInterieurOptionElement.forEach(element => {
        //Get type of prestation
        let prestation = element.dataset.type;
        //Collect data
        let { price, estimatedTime, additionnalOpts } = prestationType['lavage-interieur'][prestation];
        updatePrestationElement(element, price);
        
        //Add click event
        element.addEventListener('click',(e) => {
            setPriceElement(element, price);
            setTimeElement(element, estimatedTime);

            //remove previous active btn
            lavageInterieurOptionElement.forEach(btn => { btn.classList.remove('bg-blue-100', 'border-blue-500'); });
            //set element active
            element.classList.add('bg-blue-100', 'border-blue-500');

            //display price
            document.getElementById('total-container').classList.remove('hidden');
            
            //reset additionnal option
            let optionsContainer = document.getElementById('select-lavage-interieur-additionnal-options');
            optionsContainer.innerHTML = "";
            
            //update additionnal option
            if(Object.keys(additionnalOpts).length){
                for (let option of Object.values(additionnalOpts)) {
                    let opt = createOptionnalOptions(option);
                    opt.insertAdjacentText("beforeend", `${option.name} (CHF ${option.price})`);
                    optionsContainer.appendChild(opt);
                }
                document.getElementById('select-lavage-interieur-additionnal-options-container').classList.remove('hidden');
            } else {
                document.getElementById('select-lavage-interieur-additionnal-options-container').classList.add('hidden');
                closeCollapse('select-lavage-interieur-global-container');
                scrollIntoSection('select-lavage-exterieur-global-container');
            }
            //Update and Display lavage exterieur
            updateAndDisplayPrestationExterieur(prestationType);
        });
    });
    //Display lavage interrieur
    document.getElementById('select-lavage-interieur-global-container').classList.remove('hidden')
}

function getElementSelectUserType() {
    const selectUserTypeContainer = document.createElement('div');
    selectUserTypeContainer.id = "select-user-type";
    selectUserTypeContainer.innerHTML = `
    <div class="flex items-center flex-wrap gap-6">
        <h2 class="text-xl font-bold mb-0">${stepSelectUserType.title}</h2>
        <div class="inline-flex gap-6">
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="client-type" value="particulier" class="form-radio text-blue-600">
                <span class="text-gray-800">${stepSelectUserType.choices[0]}</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="client-type" value="professionnel" class="form-radio text-blue-600">
                <span class="text-gray-800">${stepSelectUserType.choices[1]}</span>
            </label>
        </div>
    </div>`;
    const [checkboxParticulier, checkboxProfessionel] = selectUserTypeContainer.querySelectorAll('[type="checkbox"]');
    [checkboxParticulier, checkboxProfessionel].forEach(element => {
        element.addEventListener('change', (e) => {
            if (e.target === checkboxParticulier) {
                checkboxProfessionel.checked = false;
            }
            if (e.target === checkboxProfessionel) {
                checkboxParticulier.checked = false;
            }

            let nextStepContainer = document.getElementById('select-vehicule-type');
            if (nextStepContainer) {
                if (checkboxParticulier.checked || checkboxProfessionel.checked) {
                    if(checkboxParticulier.checked){
                        loadParticulierFormulaire();
                    }
                    if(checkboxProfessionel.checked){
                        loadProfessionelForulaire();
                    }
                    nextStepContainer.classList.remove('hidden');
                } else {
                    nextStepContainer.classList.add('hidden');
                    resetAllElements();
                }
            }
        });
    });
    return selectUserTypeContainer;
}

function getVehiculeSubOptionElement(vehiculeInfo) {
    let suboption = document.createElement('div');
    suboption.className = "flex items-center flex-wrap gap-6";

    let questionElement = document.createElement('label');
    questionElement.className = "text-md mb-0";
    questionElement.innerHTML = vehiculeInfo.additionnalOpts.question;
    suboption.appendChild(questionElement)

    for (let choice of vehiculeInfo.additionnalOpts.choices) {
        let choiceElement = document.createElement('label');
        choiceElement.className = "flex items-center space-x-2 cursor-pointer";
        choiceElement.innerHTML = `
            <input type="checkbox" class="form-radio text-blue-600">
            <span class="text-gray-800">${choice.text}</span>`;

        choiceElement.addEventListener('click', (e) => {
            //Remove checked on other choices
            suboption.querySelectorAll('[type="checkbox"]').forEach(element => {
                element.checked = e.target !== element ? false : true;
            });
            loadVehiculePrestation(choice.services)
        });
        suboption.appendChild(choiceElement);
    }
    return suboption;
}

function createVehiculeCard(vehiculeInfo) {
    let card = document.createElement('div');
    card.className = "vehicule-type border p-4 text-center rounded cursor-pointer transition hover:shadow-lg flex flex-col";
    card.setAttribute('data-type', vehiculeInfo['data-type']);
    card.innerHTML = `
    <div class="flex-grow-[3] flex items-center justify-center">
        <img src="${vehiculeInfo.imgPath}" alt="${vehiculeInfo.name}" class="scale-${vehiculeInfo.imgScale} mb-4 mx-auto">
    </div>
    <div class="flex-grow-[1]">
        <p class="text-sm text-gray-700">${vehiculeInfo.name}</p>
        <p class="text-sm font-semibold text-gray-900">${vehiculeInfo.description}</p>
    </div>`;
    
    card.addEventListener('click', () => {
        resetLavageType('interieur');
        resetLavageType('exterieur');

        //Remove previous active card
        document.querySelectorAll('.vehicule-type').forEach(v => v.classList.remove('bg-blue-500', 'text-white'));
        
        //Set card active
        card.classList.add('bg-blue-500', 'text-white');

        let vehicleAdditionnalOptsContainer = document.getElementById('select-vehicule-additionnal-options-container');
        let vehicleAdditionnalOpts = document.getElementById('select-vehicule-additionnal-options');
        if (vehiculeInfo.additionnalOpts) {
            //Reset sub option
            vehicleAdditionnalOpts.innerHTML = "";
            //Add sub options
            let subOptionElement = getVehiculeSubOptionElement(vehiculeInfo);
            vehicleAdditionnalOpts.appendChild(subOptionElement);
            //Display sub options
            vehicleAdditionnalOptsContainer.classList.remove('hidden');
        } else {
            //Hide sub options
            vehicleAdditionnalOptsContainer.classList.add('hidden');
            loadVehiculePrestation(vehiculeInfo.services);
        }
    });
    return card;
}

function getElementSelectVehiculeType() {
    const selectVehiculeTypeContainer = document.createElement('div');
    selectVehiculeTypeContainer.id = "select-vehicule-type";
    selectVehiculeTypeContainer.className = "mt-8 hidden";
    const h2SelectVehicule = createBtnCollapse(stepSelectVehiculeType.stepNumber, stepSelectVehiculeType.title);
    selectVehiculeTypeContainer.appendChild(h2SelectVehicule);

    const colapseContainer = document.createElement('div');
    colapseContainer.setAttribute('data-type', 'collapse');

    const containerChoiceSelectVehicule = document.createElement('div');
    containerChoiceSelectVehicule.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4";
    for (let vehicule of stepSelectVehiculeType.choices) {
        let vehicleCard = createVehiculeCard(vehicule);
        containerChoiceSelectVehicule.appendChild(vehicleCard);
    }
    colapseContainer.appendChild(containerChoiceSelectVehicule);

    const selectVehiculeTypeAdditionnalOpts = document.createElement('div');
    selectVehiculeTypeAdditionnalOpts.id = 'select-vehicule-additionnal-options-container';
    selectVehiculeTypeAdditionnalOpts.className = "mt-6 hidden";
    selectVehiculeTypeAdditionnalOpts.innerHTML = `
    <h3 class="font-semibold mb-2">${stepSelectVehiculeType.additionnalOptsTitle}</h3>
    <div id="select-vehicule-additionnal-options" class="space-y-2 text-sm"></div>`
    colapseContainer.appendChild(selectVehiculeTypeAdditionnalOpts);
    selectVehiculeTypeContainer.appendChild(colapseContainer)
    return selectVehiculeTypeContainer;
}

function createLavageCardType(lavageInfo, optionType){
    let lavageType = document.createElement('div');
    lavageType.className = `lavage-${optionType}-option border p-4 rounded cursor-pointer hover:shadow`;
    lavageType.setAttribute('data-type', lavageInfo['data-type']);
    lavageType.innerHTML = `
        <h3 class="font-bold text-gray-800 mb-2">${lavageInfo.name}</h3>
        <p class="text-sm text-gray-600">${lavageInfo.description}</p>
    `;
    return lavageType;
}

function getElementSelectLavageType(prestation, stepName){
    const selectLavageTypeContainer = document.createElement('div');
    selectLavageTypeContainer.id = `select-lavage-${stepName}-global-container`;
    selectLavageTypeContainer.className = "mt-8 hidden";
    const h2SelectLavage = createBtnCollapse(prestation.stepNumber, prestation.title);
    selectLavageTypeContainer.appendChild(h2SelectLavage);

    const colapseContainer = document.createElement('div');
    colapseContainer.setAttribute('data-type', 'collapse');

    const containerChoiceSelectLavage = document.createElement('div');
    containerChoiceSelectLavage.className = "grid grid-cols-1 sm:grid-cols-3 gap-4";
    for(let lavageInfo of prestation.choices){
        let lavageType = createLavageCardType(lavageInfo, stepName);
        containerChoiceSelectLavage.appendChild(lavageType);
    }
    colapseContainer.appendChild(containerChoiceSelectLavage);

    const selectLavageTypeAdditionnalOpts = document.createElement('div');
    selectLavageTypeAdditionnalOpts.id = `select-lavage-${stepName}-additionnal-options-container`;
    selectLavageTypeAdditionnalOpts.className = "mt-6 hidden";
    selectLavageTypeAdditionnalOpts.innerHTML = `
    <h3 class="font-semibold mb-2">${prestation.additionnalOptsTitle}</h3>
    <div id="select-lavage-${stepName}-additionnal-options" class="space-y-2 text-sm"></div>`;
    colapseContainer.appendChild(selectLavageTypeAdditionnalOpts);
    selectLavageTypeContainer.appendChild(colapseContainer);
    return selectLavageTypeContainer;
}

function getElementTotalPriceAndTime() {
    const totalContainer = document.createElement('div');
    totalContainer.id = "total-container";
    totalContainer.className = "mt-4 col-span-1 md:col-span-2 hidden";
    totalContainer.innerHTML = `
        <div class="text-right font-bold text-lg mb-2">
            ${totalContainerInfos.messageTime}<span id="total-time">0 min</span>
        </div>
        <div class="text-right font-bold text-lg mb-2">
            ${totalContainerInfos.messagePrice}<span id="total-price">CHF 0.00</span>
        </div>`;
    return totalContainer;
}

const validateField = (value, pattern, errorMessage) => {
    if(!pattern.test(value)){
        showToastMessage("failed", errorMessage);
        return false;
    }
    return true;
}

emailjs.init("J6unhdg87ygbWvXDb");
const regexPatterns = {
    nomPrenom: /^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ-]+)*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    sujet: /^[A-Za-z0-9À-ÖØ-öø-ÿ.,!?()\- ]{3,}$/,
    message: /^.{10,}$/,
    phone: /^(\+|00)?\d{1,4}[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}[\s.-]?\d{2,4}$/,
    date: /^(\d{4}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12][0-9]|3[01])|(?:0[1-9]|[12][0-9]|3[01])[-/.](?:0[1-9]|1[0-2])[-/.]\d{4}|(?:0[1-9]|1[0-2])[-/.](?:0[1-9]|[12][0-9]|3[01])[-/.]\d{4})\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/
}

async function sendEmail(formData) {
    try {
        //Mail for prohands
        await emailjs.send("service_npcac6r","template_4dmofpf", formData);
        
        //Mail confirmation client
        await emailjs.send("service_npcac6r","template_kcuxuk7", { ...formData, to_email: formData.email });
        showToastMessage("success", stepFormulaire.toastMsg.success);
    } catch (e){
        showToastMessage("failed", stepFormulaire.toastMsg.error + JSON.stringify(e));
    }
}

function getSelectedPrestation(){
    let userType = document.querySelector('#select-user-type input[type="checkbox"]:checked').value;
    
    let vehiculeType = document.querySelector('div.vehicule-type.bg-blue-500').dataset.type;
    let vehiculeCatégorieSub = document.querySelectorAll('#select-vehicule-additionnal-options input[type="checkbox"]:checked');
    let vehiculeAdditionnalQuestion = []
    vehiculeCatégorieSub.forEach(choice => {
        let question = choice.parentElement.parentElement.childNodes[0].innerText.trim();
        let text = `${stepFormulaire.template.vehiculeQuestion} ${question.toLowerCase()}`;
        vehiculeAdditionnalQuestion.push(text);

        let response = choice.parentElement.querySelector('span').innerText.trim();
        let answer = `${stepFormulaire.template.vehiculeResponse} ${response}`;
        vehiculeAdditionnalQuestion.push(answer);
    })

    //Lavage intérieur
    let lavageInterieurType = document.querySelector('div.lavage-interieur-option.bg-blue-100').dataset.type;
    let lavageInterieurSelectedOptions = [];
    let allLavageInterieurOptionsCheckbox = document.querySelectorAll('#select-lavage-interieur-additionnal-options input[type="checkbox"]:checked');
    allLavageInterieurOptionsCheckbox.forEach(checkbox => {
        let description = checkbox.parentElement.innerText.trim();
        lavageInterieurSelectedOptions.push(description);
    });
    let allLavageInterieurOptionsInput = document.querySelectorAll('#select-lavage-interieur-additionnal-options input[type="text"]');
    allLavageInterieurOptionsInput.forEach(input => {
        if(input.value != "0"){
            let description = `${input.value} ${input.parentElement.innerText.trim()}`;
            lavageInterieurSelectedOptions.push(description);
        }
    });

    //Lavage exterieur
    let lavageExterieurType = document.querySelector('div.lavage-exterieur-option.bg-blue-100').dataset.type;
    let lavageExterieurSelectedOptions = [];
    let allLavageExterieurOptionsCheckbox = document.querySelectorAll('#select-lavage-exterieur-additionnal-options input[type="checkbox"]:checked');
    allLavageExterieurOptionsCheckbox.forEach(checkbox => {
        let description = checkbox.parentElement.innerText.trim();
        lavageExterieurSelectedOptions.push(description);
    });
    let allLavageExterieurOptionsInput = document.querySelectorAll('#select-lavage-exterieur-additionnal-options input[type="text"]');
    allLavageExterieurOptionsInput.forEach(input => {
        if(input.value == "0"){
            let description = `${input.value} ${input.parentElement.innerText.trim()}`;
            lavageExterieurSelectedOptions.push(description);
        }
    });

    let interventionTime = document.getElementById('total-time').innerText.trim();
    let price = document.getElementById('total-price').innerText.trim();

    //Resumé
    let msg = []
    msg.push(`${stepFormulaire.template.user} ${userType}`);
    msg.push(`${stepFormulaire.template.vehicule} ${vehiculeType}`);
    if(vehiculeAdditionnalQuestion.length){
        vehiculeAdditionnalQuestion.forEach(text => {
            msg.push(text);
        });
    }

    msg.push(`${stepFormulaire.template.lavageInterieur} ${lavageInterieurType}`);
    if(lavageInterieurSelectedOptions.length){
        msg.push(`${stepFormulaire.template.additionnal}`);
        lavageInterieurSelectedOptions.forEach(option => {
           msg.push(`- ${option}`);
        });
    } else {
        msg.push(`${stepFormulaire.template.noAdditionnal}`);
    }

    msg.push(`${stepFormulaire.template.lavageExterieur} ${lavageExterieurType}`)
    if(lavageExterieurSelectedOptions.length){
        msg.push(`${stepFormulaire.template.additionnal}`);
        lavageExterieurSelectedOptions.forEach(option => {
            msg.push(`- ${option}`);
        });
    } else {
        msg.push(`${stepFormulaire.template.noAdditionnal}`);
    }

    msg.push(`${stepFormulaire.template.interventionTime} ${interventionTime}`);
    msg.push(`${stepFormulaire.template.price} ${price}`);
    console.log(msg.join('\n'));//replace per <BR> for template display has HTML
    return msg.join('\r\n');
}

async function checkFormulaire(){
    try {
        let date = document.getElementById('date-heure').value;
        let name = document.getElementById('nom').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('tel').value;
        let plaque = document.getElementById('plaque').value;
        let address = document.getElementById('adresse').value;
        let zip = document.getElementById('zip').value;
        let city = document.getElementById('ville').value;
        let comments = document.getElementById('remarques').value;
        let payment = document.getElementById('payment-method').value;

        if(!validateField(date, regexPatterns.date, stepFormulaire.toastMsg.errors.date )) return false;
        if(!validateField(name, regexPatterns.nomPrenom, stepFormulaire.toastMsg.errors.name)) return false;
        if(!validateField(email, regexPatterns.email, stepFormulaire.toastMsg.errors.email)) return false;
        if(!validateField(phone, regexPatterns.phone, stepFormulaire.toastMsg.errors.phone)) return false;
        if(!validateField(plaque, regexPatterns.sujet, stepFormulaire.toastMsg.errors.plaque)) return false;
        if(!validateField(address, regexPatterns.sujet, stepFormulaire.toastMsg.errors.address)) return false;
        if(!validateField(zip, regexPatterns.sujet, stepFormulaire.toastMsg.errors.zip)) return false;
        if(!validateField(city, regexPatterns.sujet, stepFormulaire.toastMsg.errors.city)) return false;
        if(!validateField(comments, regexPatterns.message, stepFormulaire.toastMsg.errors.comments)) return false;
        if(!validateField(payment, regexPatterns.sujet, stepFormulaire.toastMsg.errors.payment)) return false;

        let prestations = getSelectedPrestation();
        const formData = { date, name, email, phone, plaque, address, zip, city, comments, payment, prestations };
        
        return await sendEmail(formData);
    } catch(error){
        console.log(error)
        showToastMessage("failed", error.message);
    }
}

function loadParticulierFormulaire(){
    const formulaireFormElement = document.getElementById('formulaire-contact-form');
    formulaireFormElement.innerHTML = `
     <!-- Date et heure de réservation -->
    <div class="relative">
        <input type="text" id="date-heure" name="date-heure" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
        <label for="date-heure" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            ${stepFormulaire.particulier.datePicker}
        </label>
    </div>
    <!-- Nom complet et Email -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
            <input type="text" id="nom" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="nom" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                ${stepFormulaire.particulier.name}
            </label>
        </div>
        <div class="relative">
            <input type="email" id="email" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="email" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                ${stepFormulaire.particulier.email}
            </label>
        </div>
    </div>
    <!-- Téléphone et Plaque -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
            <input type="tel" id="tel" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="tel" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                ${stepFormulaire.particulier.phone}
            </label>
        </div>
        <div class="relative">
            <input type="text" id="plaque" class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="plaque" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                ${stepFormulaire.particulier.infos}
            </label>
        </div>
    </div>
    <!-- Adresse, Code postal et Ville -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative col-span-1 md:col-span-3">
            <input type="text" id="adresse" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="adresse" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                ${stepFormulaire.particulier.add}
            </label>
        </div>
    </div>
    <!--Ville COde postale -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
            <input type="tel" id="zip" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="tel" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
               ${stepFormulaire.particulier.nip}
            </label>
        </div>
        <div class="relative">
            <input type="text" id="ville" required class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" " />
            <label for="plaque" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
                ${stepFormulaire.particulier.city}
            </label>
        </div>
    </div>   
    <!-- Remarques -->
    <div class="relative">
        <textarea id="remarques" rows="4" class="peer w-full border border-gray-300 rounded px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent" placeholder=" "></textarea>
        <label for="remarques" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500">
            ${stepFormulaire.particulier.comment}
        </label>
    </div>
    <!-- Moyen de paiement -->
    <div class="relative">
        <label for="payment-method" class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 mb-2">
            ${stepFormulaire.particulier.payments.label}
        </label>
        <select id="payment-method" name="payment-method" required class="peer w-full border border-gray-300 rounded px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled selected>${stepFormulaire.particulier.payments.labelAlt}</option>
        </select>
    </div>
    <!-- Bouton -->
    <div>
        <button id="btn-send-formulaire" class="w-full disabled:bg-gray-500 bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-all" disabled>
            ${stepFormulaire.particulier.button}
        </button>
    </div>`;

    let paymentContainer = document.querySelector('#payment-method');
    for(let option of stepFormulaire.particulier.payments.options){
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', option.name.toLowerCase());
        optionElement.innerHTML = option.name;
        paymentContainer.appendChild(optionElement);
    }

    let btnSendForm = document.getElementById('btn-send-formulaire');
    btnSendForm.addEventListener('click', checkFormulaire);

    /* Datetime picker init */
    flatpickr("#date-heure", {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        time_24hr: true,
        minDate: "today",
        locale: flatpickr.l10ns[stepFormulaire.language],
        disable: [
            function (date) {
                return date.getDay() === 0;
            }
        ]
    });
}

function loadProfessionelForulaire(){
    const formulaireFormElement = document.getElementById('formulaire-contact-form');
    formulaireFormElement.innerHTML = `
    
    `;
}

function getFormulaireElement(){
    let formulaireElement = document.createElement('div');
    formulaireElement.id = 'formulaire-contact';
    formulaireElement.className = "mt-8 hidden";
    formulaireElement.innerHTML = `
    <h2 class="text-xl font-bold mb-6">${stepFormulaire.stepNumber}. ${stepFormulaire.title}</h2>
    <div id="formulaire-contact-form" class="space-y-6"></div>`
    return formulaireElement;
}

const stepsContainer = document.getElementById('steps-container');
stepsContainer.className = "mt-[1.5rem] max-w-6xl mx-auto bg-white p-6 rounded shadow";

//Step select user type
const selectUserTypeContainer = getElementSelectUserType();
stepsContainer.appendChild(selectUserTypeContainer);

//Step select vehicule type
const selectVehiculeTypeContainer = getElementSelectVehiculeType();
stepsContainer.appendChild(selectVehiculeTypeContainer);

//Step lavage interieur
const selectLavageInterieurTypeContainer = getElementSelectLavageType(stepSelectLavageInterieurType ,'interieur');
stepsContainer.appendChild(selectLavageInterieurTypeContainer);

//Step lavage exterieur
const selectLavageExterieurTypeContainer = getElementSelectLavageType(stepSelectLavageExterieurType ,'exterieur');
stepsContainer.appendChild(selectLavageExterieurTypeContainer);

//Step formulaire
const formulaireContainer = getFormulaireElement();
stepsContainer.appendChild(formulaireContainer);

//Container price and time
const totalContainer = getElementTotalPriceAndTime();
stepsContainer.appendChild(totalContainer);

function timeConverter(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h${String(minutes).padStart(2, "0")}m`;
}

function updateTotal() {
    total = 0;
    totalTime = 0;

    const updateElementInfos = (element) => {
        total += parseFloat(element.dataset.price || 0);
        totalTime += parseFloat(element.dataset.time || 0);
    }

    let selectorClassnameArray = [
        '.lavage-interieur-option.bg-blue-100',// Lavage intérieur
        '.lavage-exterieur-option.bg-blue-100' // Lavage extérieur
    ]
    selectorClassnameArray.forEach(className => {
        let element = document.querySelector(className);
        if (element) updateElementInfos(element);
    });

    let selectorAllClassnameArray = [
        // Options intérieures
        '#select-lavage-interieur-additionnal-options input[type="text"]',
        '#select-lavage-interieur-additionnal-options input[type="checkbox"]:checked',
        // Options extérieures
        '#select-lavage-exterieur-additionnal-options input[type="text"]',
        '#select-lavage-exterieur-additionnal-options input[type="checkbox"]:checked'
    ]
    selectorAllClassnameArray.forEach(className => {
        document.querySelectorAll(className).forEach(updateElementInfos);
    });

    let btnSendFormulaire = document.getElementById('btn-send-formulaire');
    if(btnSendFormulaire){
        if( total === 0) btnSendFormulaire.setAttribute('disabled','');
        else btnSendFormulaire.removeAttribute('disabled')
    }

    document.getElementById('total-price').innerText = `CHF ${total.toFixed(2)}`;
    document.getElementById('total-time').innerText = timeConverter(totalTime);
}

// Mise à jour du total à chaque interaction
document.addEventListener('change', updateTotal);
document.addEventListener('click', updateTotal);