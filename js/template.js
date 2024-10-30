var numero=-1;

function recipesTemplate(data) {
    const { id, image, name, servings, ingredients, time, description, applicance, ustensils } = data;
    const picture = `assets/recipes/${image}`;

    function getUserCardDOM() {
       

        const div = document.createElement('div');
        div.className = "recipes_cards"

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const div2 = document.createElement('div');
        div2.className = "time"
        const p = document.createElement('p');
        p.textContent = time+" min";
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const div3 = document.createElement('div');
        div3.className = "recette"
        const h3 = document.createElement('h3');
        h3.textContent = "Recettes";
        const p2 = document.createElement('p');
        p2.textContent = description;

        const div4 = document.createElement('div');
        div4.className = "ingredient"
        const h3_2 = document.createElement('h3');
        h3_2.textContent = "Ingrédients";
        const div5 = document.createElement('div');
        div5.className = "ingredient_table";

let p3;

        p3 = document.createElement('p');

        
        numero =numero+1;
       
        
        var liste_ingredients="";
        for(var i=0;i<ingredients.length;i++){
          var ingredient_temp =  ingredients[i].ingredient;
          var quantity_temp="";
          var unit_temp ="";
          
          if(ingredients[i].quantity){
            quantity_temp=ingredients[i].quantity;
          }

          if(ingredients[i].unit){
            unit_temp=ingredients[i].unit;
          }

          liste_ingredients = liste_ingredients+"<div class='ing'><div class='line1'>" + ingredient_temp+"</div><div class='line2'>"+quantity_temp+" "+unit_temp+"</div></div>";
        }
        
        p3.innerHTML = liste_ingredients;


        div.appendChild(img);
        div.appendChild(div2);
        div.appendChild(h2);
        div2.appendChild(p);

        div.appendChild(div3);
        div3.appendChild(h3);
        div3.appendChild(p2);

        div.appendChild(div4);
        div4.appendChild(h3_2);
        div4.appendChild(div5);
        div5.appendChild(p3);


        div.tabIndex = 0;


        return (div);
    }

    return { getUserCardDOM, data }
}







