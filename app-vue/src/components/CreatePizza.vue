<template>
  <div id="pizzaWrapper">
    <h2>Create Pizza</h2>
    <div class="form-group">
      <label for="PizzaNameInput">PizzaName:</label>
      <input v-model="pizzaName" type="text" id="PizzaNameInput">
      <label  >Select Ingredients:</label>
      <select  class="ingredientsDropDown" @change="onChange($event)" v-model="ingredients.name">
        <option :value="ingredient.name" v-for="(ingredient) in ingredients" :key="ingredient.code">
          {{ ingredient.name }}
        </option>
      </select>

      <button @click="addIngredient()"> Add Ingredient to Pizza</button>
      <button @click="removeSelectedIngredients()">Remove all Ingredients</button>
    </div>
    <table id="ingredientsTable">

      <thead>

      <tr>
        <th>Name</th>
        <th>Brand</th>
        <th>Amount</th>
        <th>Calories</th>
        <th>CountryOrigin</th>
        <th>nutritionscore</th>
        <th>Price</th>
        <th>Weight</th>
        <th>ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(ingredient, index) in pizzaIngredients" :key="index">

        <td v-text="ingredient.name"></td>
        <td v-text="ingredient.brand"></td>
        <td v-text="ingredient.amount"></td>
        <td v-text="ingredient.calories"></td>
        <td v-text="ingredient.countryOrigin"></td>
        <td v-text="ingredient.nutritionScore"></td>
        <td v-text="ingredient.price"></td>
        <td v-text="ingredient.weight"></td>
        <td v-text="ingredient.id"></td>
      </tr>
      </tbody>

    </table>
    <h2>Price:{{pizzaPrice}} {{currency}}</h2>

    <button @click="createPizza()">Create Pizza</button>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "CreatePizza",
  data() {
    return {
      msg: "hi",
      currency:"EUR",
      pizzaName:"",
      pizzaPrice:0,
      toggle: false,
      selectedIngredient: '',
      ingredients: [],
      pizzaIngredients: []

    }
  },
  methods: {
    async loadIngredients(currency) {
      this.currency=currency;
      var tokenStr = localStorage.getItem('vue-token')
      var url = 'http://localhost:8090/ingredients/'+this.currency;
      await axios.get(url, {headers: {"Authorization": `Bearer ${tokenStr}`}}).then((response) => {
        if (response.status == 200) {
          this.ingredients = response.data;
        } else alert("failed to load ingredientList of Create Pizza. Please refresh the Page.")
      })


    }, onChange(event) {
      this.selectedIngredient = event.target.value;

    }, addIngredient() {
      if (this.selectedIngredient=='') {
        return;
      }
      const getSelectedIngredient = this.ingredients.find(ingredient => ingredient.name === this.selectedIngredient);
      this.pizzaPrice+=getSelectedIngredient.price;
      this.pizzaIngredients.push(getSelectedIngredient);

    },
    removeSelectedIngredients() {
      this.pizzaPrice=0;
      this.pizzaIngredients = [];


    }, async createPizza() {
      if(this.pizzaIngredients.length==0 || this.pizzaName==''){
        console.log(this.pizzaIngredients.length);
        console.log(this.pizzaName);
        return alert("Make sure to have ingreadients and Pizzaname added");
      }
      const map1 = new Map();
      for (const ingredient of this.pizzaIngredients) {
        map1.set(ingredient.id, ingredient.price);

      }
      var obj = Object.fromEntries(map1);
      const data = JSON.stringify({
        name: this.pizzaName,
        ingredientIdToPrice: obj
      });

      var url = 'http://localhost:8090/createPizza/';
      var tokenStr = localStorage.getItem('vue-token');
      await axios.post(url, data, {
        headers: {
          "Authorization": `Bearer ${tokenStr}`,
          "content-type": "application/json"
        }
      }).then((response) => {
        if (response.status == 200) {
          alert("Pizza has been created");
          this.$parent.fetchAllData();
        } else {
          alert("Error try again");
        }
      });


    }


  }
}
</script>

<style scoped>




#pizzaWrapper {
  align-content: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
  margin-top: 50px;

}

#ingredientsTable {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  align-content: center;
  background-color: #04AA6D;
  color: #f6efef;
  width: 50%;
  margin: auto;

}

Button {
  border-color: rgb(74, 107, 78);
  background-color: rgb(91, 255, 110);
  align-content: center;
  margin: auto;

}
.ingredientsDropDown {
  background-color: rgb(91, 255, 110);
  border-color: rgb(42, 126, 52);
}

.form-group {

}
</style>
