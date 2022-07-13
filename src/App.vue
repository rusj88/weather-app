<template>
  <main>
    <AutocompleteInput :items="$options.cities" @update-query="updateQuery" />

    <promise-wrapper v-if="searchQuery" :promise="fetchWeatherPromise">
      <template #pending>
        <ui-alert>Загрузка...</ui-alert>
      </template>

      <template #rejected="{ error }">
        <ui-alert>{{ error.message }}</ui-alert>
      </template>

      <template #fulfilled="{ result }">
        <WeatherCard :weather="result" />
      </template>
    </promise-wrapper>
  </main>
</template>

<script>
import WeatherCard from "./components/WeatherCard.vue";
import AutocompleteInput from "./components/AutocompleteInput.vue";
import PromiseWrapper from "./components/PromiseWrapper.vue";
import UiAlert from "./components/UiAlert.vue";
import cities from "./cities";
import { fetchWeather } from "./apiservice.js";

export default {
  name: "App",
  cities,
  components: { WeatherCard, AutocompleteInput, PromiseWrapper, UiAlert },
  data() {
    return {
      searchQuery: "",
      fetchWeatherPromise: null,
    };
  },
  methods: {
    updateQuery(query) {
      this.searchQuery = query;
    },
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery) {
        this.fetchWeatherPromise = fetchWeather(newQuery);
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #f8f8f8;
}

main {
  box-sizing: border-box;
  padding: 60px 10px;
  min-width: 400px;
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
}
</style>
