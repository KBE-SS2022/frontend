<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li>
            <button class="navButton" id="logout" @click="logout()">Log Out</button>
          </li>
          <li><a href="javascript:;" @click="toggleIngredientsComponent=!toggleIngredientsComponent">Show
            Ingredients</a></li>
          <li><a href="javascript:;" v-on:click.prevent.stop="togglePizzaComponent=!togglePizzaComponent">Show
            Pizzas </a></li>
          <li><a href="javascript:;" @click="toggleCreatePizzaComponent=!toggleCreatePizzaComponent">Create Pizzas</a>
          </li>
          <li>
            <label class="currencySelector"> Select Currency:</label>
            <select @change="changeCurrency($event)" class="currencySelector" id="currency">
              <option value="EUR">Euro</option>
              <option value="USD">Dollar</option>
              <option value="GBP">GBP</option>
              <option value="RUB">RUB</option>
              <option value="CHF">CHF</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
    <div id="ingredientWrapper" v-show="!toggleIngredientsComponent">
      <h2>IngredientList</h2>
      <table id="ingredients">
        <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Amount</th>
          <th>Calories</th>
          <th>CountryOrigin</th>
          <th>NutritionScore</th>
          <th>Price</th>
          <th>Weight</th>
          <th>ID</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(ingredient, index) in ingredients" :key="index">

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
    </div>
    <div id="pizzaTable" v-show="!togglePizzaComponent">
      <pizza-table/>
    </div>
    <div v-show="!toggleCreatePizzaComponent" id="createPizzaWrapper">
      <create-pizza/>
    </div>
  </div>

</template>

<script>
import 'regenerator-runtime/runtime'
import axios from 'axios';
import PizzaTable from './components/PizzaTable.vue'
import CreatePizza from "./components/CreatePizza";

export default {
  name: 'app',
  props: ['keycloak'],
  components: {
    PizzaTable,
    CreatePizza,

  },
  data() {
    return {
      msg: "hi",
      currency:"EUR",
      toggle: false,
      ingredients: [],
      message: "hi",
      toggleIngredientsComponent: false,
      togglePizzaComponent: false,
      toggleCreatePizzaComponent: false,
    }
  }, mounted: function () {
    this.$nextTick(async function () {
      console.log("mounting");
      await this.fetchAllData();

    })
  }


  ,
  methods: {
    async fetchAllData() {
      var response
      var tokenStr = localStorage.getItem('vue-token')
      var url = 'http://localhost:8090/ingredients/'+this.currency
      response = await axios.get(url, {headers: {"Authorization": `Bearer ${tokenStr}`}}).then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.ingredients = response.data;
        } else alert("loading Error Reload Page ");

      })
      response = await this.$children[0].loadPizzas(this.currency)
      response = await this.$children[1].loadIngredients(this.currency)


    },
    async changeCurrency(event) {
      this.currency = event.target.value;
      await this.fetchAllData();
    }, logout() {
      this.keycloak.logout();
    },



  }


}
</script>

<style>

h2 {
  align-content: center;
}

ul {
  list-style-type: none;
}

li {
  display: inline-block;


}


nav ul {
  margin: 10px;
  background-color: rgb(91, 255, 110);
  border-radius: 10px;
  justify-content: space-around;
  display: flex;

}



#currency {
  background-color: rgb(91, 255, 110);
  border-color: rgb(42, 126, 52);
}

.navButton {
  border-color: rgb(74, 107, 78);
  background-color: rgb(91, 255, 110);
  align-content: center;

}

.navButton:hover {

  color: #e4fffa;

}


#ingredients tr:nth-child(even) {
  background-color: #f53e3e;
}

#ingredients tr:hover {
  background-color: #c2b3b3;
}

#ingredientWrapper {
  align-content: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
  margin-top: 50px;

}

#ingredients {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  align-content: center;
  background-color: #04AA6D;
  color: #f6efef;
  width: 50%;
  margin: auto;
}

#pizzaTable {
  margin: auto;

}

.currencySelector {
  left: auto;
}
</style>
