
//search function 
document.querySelector('input').addEventListener('keypress', function(event) {
    if(event.key === 'Enter'){
        getDrink()
    }
})


//fetch and input data from API 
function getDrink() {
    let drink = document.querySelector('input').value;
    
    //reset ingredients for each entry
    document.querySelector('ul').innerText = ''

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json()) //parse response as JSON
        .then(data => {
            var drinkArray = data.drinks
            var drinkIndex = 0

            //display of carousel 
            if ( drinkArray.length <= 1 ) {
                document.querySelector('.carousel').style.display = 'none'
            } else {
                document.querySelector('.carousel').style.display = 'block'
            }

            //carousel button function
            document.getElementById("nextBtn").addEventListener('click', function () {
                drinkIndex++
                if (drinkIndex > drinkArray.length - 1) {
                  drinkIndex = 0
                }
                displayDrink(drinkIndex)
            })

            document.getElementById("prevBtn").addEventListener('click', function () {
                drinkIndex--
                if (drinkIndex < 0) {
                  drinkIndex = drinkArray.length - 1
                }
                displayDrink(drinkIndex)
            })
            
            //insert drink into DOM
            function displayDrink(drinkIndex) {
            document.querySelector('h2').innerText = drinkArray[drinkIndex].strDrink
            document.querySelector('img').src = drinkArray[drinkIndex].strDrinkThumb
            document.getElementById('instructions').innerText = drinkArray[drinkIndex].strInstructions
            }

            displayDrink(drinkIndex)

            //create an object for the ingredients and measurements
            var index = 1
            var ingredientArray = []
            
            while ( drinkArray[drinkIndex]['strIngredient' + index] ) {
                ingredientArray.push({name: drinkArray[drinkIndex]['strIngredient' + index], amount: drinkArray[drinkIndex]['strMeasure' + index]})
                index++
                
            }

            //insert ingredients into DOM
            ingredientArray.forEach((ingredient) => {
                const li = document.createElement('li')
                li.textContent = ingredient.amount + ingredient.name
                document.querySelector('ul').appendChild(li)
            
            })
            }
            )

        .catch(err => {
            console.log(`error ${err}`)
        });
    
    }

    


