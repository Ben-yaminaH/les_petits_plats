// Recurperation données

let dataArray;

async function getRecipes() {
    const reponse = await fetch("js/recipes.json");
    const recipes = await reponse.json();



    my_array = Object.entries(recipes).map(function (entry) {
        key = entry[0];
        value = entry[1];

        nested_object = value;
        nested_object.key = key;

        return nested_object;
    });

    dataArray = orderList(nested_object)
    
    createSelect(dataArray);
    createSelect2(dataArray);
    createSelect3(dataArray);

    filteredArr = dataArray;

    return recipes

}


// Affichage des datas

async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes_section");

    recipes.forEach((recipes) => {
        const recipesModel = recipesTemplate(recipes);
        const userCardDOM = recipesModel.getUserCardDOM();
        recipesSection.appendChild(userCardDOM);
    });

    if (recipes.length == 0) {

        recipesSection.innerHTML = " Ooops, aucune recette n'a été trouvée !";
    }
}

async function init() {


    const { recipes } = await getRecipes();
    displayData(recipes);
}

init();


// Filtre en barre de recherche

const searchInput = document.querySelector("#Form_Search")
const searchResult = document.querySelector(".recipes_section")

searchInput.addEventListener("input", filterData)

let filteredArr;

function filterData() {

    searchResult.innerHTML = "";

    var cv = document.getElementById("Form_Search").value;
    const searchedString = cv.toLowerCase().replace(/\s/g, "");

    filteredArr = dataArray.filter(el => el.name.toLowerCase().replace(/\s/g, "").includes(searchedString) ||
        el.description.toLowerCase().replace(/\s/g, "").includes(searchedString) ||

        el.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().replace(/\s/g, "").includes(searchedString)) ||
        `${el.name + el.ingredients}`.toLowerCase().replace(/\s/g, "").includes(searchedString)
    )

    filterData3(ingredient_array);
}

// Tri alphabetique

function orderList(data) {
    return data.sort((a, b) => {
        const lastNameA = a.name.toLowerCase();
        const lastNameB = b.name.toLowerCase();

        if (lastNameA < lastNameB) {
            return -1;
        }
        if (lastNameA > lastNameB) {
            return 1;
        }
        return 0;
    });
}

let sel;


//  Select options 01 liste

var array_ingredients = [];

function createSelect() {


    sel = document.getElementById("select1");
    for (var i = 0; i < dataArray.length; i++) {

        for (var x = 0; x < dataArray[i].ingredients.length; x++) {

            var ingredient_exist = "false";
            for (var y = 0; y < array_ingredients.length; y++) {

                if (array_ingredients[y] == dataArray[i].ingredients[x].ingredient) {
                    ingredient_exist = "true";
                }

            }

            if (ingredient_exist == "false") {
                array_ingredients.push(dataArray[i].ingredients[x].ingredient);
               
                const opt = document.createElement("option");
                opt.value = dataArray[i].ingredients[x].ingredient;
                opt.text = dataArray[i].ingredients[x].ingredient;
                sel.add(opt, null);
            }


        }

    }

}


//  Select options 02 liste

var array_appliance = [];

function createSelect2() {


    sel = document.getElementById("select2");
    for (var i = 0; i < dataArray.length; i++) {


        for (var x = 0; x < dataArray[i].appliance.length; x++) {

            var appliance_exist = "false";
            for (var y = 0; y < array_appliance.length; y++) {

                if (array_appliance[y] == dataArray[i].appliance) {
                    appliance_exist = "true";
                }

            }

            if (appliance_exist == "false") {
                array_appliance.push(dataArray[i].appliance);
                
                const opt = document.createElement("option");
                opt.value = dataArray[i].appliance;
                opt.text = dataArray[i].appliance;
                sel.add(opt, null);
            }

        }

    }
}




//  Select options 03 liste

var array_ustensils = [];

function createSelect3() {

    sel = document.getElementById("select3");
    for (var i = 0; i < dataArray.length; i++) {


        for (var x = 0; x < dataArray[i].ustensils.length; x++) {

            var ustensils_exist = "false";
            for (var y = 0; y < array_ustensils.length; y++) {

                if (array_ustensils[y] == dataArray[i].ustensils[x]) {
                    ustensils_exist = "true";
                }

            }

            if (ustensils_exist == "false") {
                array_ustensils.push(dataArray[i].ustensils[x]);
                const opt = document.createElement("option");
                opt.value = dataArray[i].ustensils[x];
                opt.text = dataArray[i].ustensils[x];
                sel.add(opt, null);
            }


        }

    }

}



// Récupération de l'option

let option_zone;

function getOption(thisValue, liste) {


    option_zone = document.querySelector("#liste" + liste);
    let option = thisValue

    var ingredient_exist = "non";

    for (var i = 0; i < ingredient_array.length; i++) {
        if (thisValue == ingredient_array[i]) {
            ingredient_exist = "oui";
        }
    }


    if (ingredient_exist == "oui") {
    }
    else {
        ingredient_array.push(thisValue);

        var base = document.getElementById("liste" + liste).innerHTML;
        document.getElementById("liste" + liste).innerHTML = base + "<div class='yellow_option' id='item_" + liste + "_" + ingredient_array.length + "' >" + thisValue + "<span class='yellow_cross' onclick='deleteOption(\"item_" + liste + "_" + ingredient_array.length + "\",\"" + thisValue + "\")'> X</span></div>";

    }

    filterData3(ingredient_array);

}



// Supprimer option

function deleteOption(valeur, nom) {


    document.getElementById(valeur).remove();

    var array_provisoire = [];
    for (var i = 0; i < ingredient_array.length; i++) {

        if (ingredient_array[i] != nom) {
            array_provisoire.push(ingredient_array[i]);
        }

    }

    ingredient_array = array_provisoire;
    filterData();
    console.log(ingredient_array);
}



// Filtres des 3 bouttons select


var ingredient_array = [];


function filterData3(ingredient_array) {


    searchResult.innerHTML = "";


    for (var i = 0; i < ingredient_array.length; i++) {

        const searchedString = ingredient_array[i].toLowerCase().replace(/\s/g, "");


        filteredArr = filteredArr.filter(el => el.name.toLowerCase().replace(/\s/g, "").includes(searchedString) ||
            el.description.toLowerCase().replace(/\s/g, "").includes(searchedString) ||
            el.appliance.toLowerCase().replace(/\s/g, "").includes(searchedString) ||
            el.ustensils.toString().toLowerCase().replace(/\s/g, "").includes(searchedString) ||

            el.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().replace(/\s/g, "").includes(searchedString)) ||
            `${el.name + el.description}`.toLowerCase().replace(/\s/g, "").includes(searchedString)
        )

    }


    displayData(filteredArr);

}