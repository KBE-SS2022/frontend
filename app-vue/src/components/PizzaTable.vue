<template>
  <div>

    <div  id="pizzaWrapper">
      <h2>Pizzas</h2>
      <button @click="showIngredients=!showIngredients">Show ingredients</button>

  <table id="pizzaTable">


    <tr  v-show="showIngredients">
      <th >Pizza name</th>
      <th>Pizza Price</th>
    </tr>
    <template  v-for="(pizza, index) in pizzas">

          <tr v-show="!showIngredients" >
        <th >Pizza name</th>
        <th>Pizza Price</th>
        </tr>
      <tr id="pizzaTr":key="index">

        <td>{{pizza.name}}</td>
        <td>{{pizza.price}}</td>
      </tr>



      <tr v-show="!showIngredients">
        <th>Ingrediients</th>
        <th>Brand</th>
        <th>amount</th>
        <th>Calories</th>
        <th>CountryOrigin</th>
        <th>NutritionScore</th>
        <th>Price</th>
        <th>Weight</th>
        <th>Identification</th>
      </tr>


      <template   v-for="(ingredient, index2) in pizza.ingredients" >


        <tr v-show="!showIngredients" :key="'B'+index2*150+pizza.id+ingredient.id+Math.random()">


          <td v-text="ingredient.name"></td>
          <td v-text="ingredient.brand"></td>
          <td v-text="ingredient.amount" ></td>
          <td v-text="ingredient.calories"></td>
          <td v-text="ingredient.countryOrigin"></td>
          <td v-text="ingredient.nutritionScore"></td>
          <td v-text="ingredient.price"  ></td>
          <td v-text="ingredient.weight"></td>
          <td v-text="ingredient.id"></td>
        </tr>
        </template>


    </template>
  </table>
      </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: "IngredientTable",
  props: {
    message: "hi"
  },
  data() {

    return {
      showIngredients:true,
      msg: "hi",
      currency:"EUR",
      toggle: false,
      pizzas: []
    }

  },


  methods: {
    async loadPizzas(currency) {
      this.currency=currency
      var tokenStr = localStorage.getItem('vue-token')
      var url = 'http://localhost:8090/hello/pizzas/'+this.currency;
      var response = await axios.get(url, {headers: {"Authorization": `Bearer ${tokenStr}`}})

      if(response.status==200){
        this.pizzas = response.data;

      }
      else{
        alert("failed to load PizzaTable. Refresh the  Page please.")
      }

      console.log(this.pizzas);

    }
  }
}
</script>

<style scoped>
h2 {
 align-content: center;
}
#pizzaWrapper{
  align-content: center;
  text-align: center;
  justify-content: center;
  width:100%;
  margin-bottom: 50px;
  margin-top: 50px;

}
#pizzaTable {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  align-content: center;
  background-color: #04AA6D;
  color: #f6efef;
  width: 50%;
  margin:auto;

}
table, th, td {
  border: 1px solid black;
  padding: 5px;
}

#pizzaTr td{background-color: #f53e3e}

#pizzaTable tr:hover {background-color: #c2b3b3;}

</style>
