<template>
  <div class="card-outer">
    <div class="card" v-if="weather.cod === 200">
      <h1 class="city">{{ weather.name }}</h1>
      <div class="date">{{ date }}</div>
      <div
        class="weather-icon"
        :style="{
          backgroundImage: `url(${require('@/assets/icons/' + iconType)})`,
        }"
      />
      <div class="description">{{ weather.weather[0].description }}</div>
      <div>Температура {{ Math.round(weather.main.temp) }} °C</div>
      <div>Влажность {{ weather.main.humidity }} %</div>
    </div>
    <ui-alert v-else></ui-alert>
  </div>
</template>

<script>
import UiAlert from "./UiAlert.vue";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import inRange from "lodash/inRange";
export default {
  name: "WeatherCard",
  components: { UiAlert },
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      return format(new Date(), "EEEE, dd MMMM yyyy", {
        locale: ru,
      });
    },
    iconType() {
      const code = this.weather.weather[0].id;
      if (code === 800) {
        return "clear_sky.png";
      }
      if (code === 804) {
        return "scattered_clouds.png";
      }
      if (inRange(code, 801, 804)) {
        return "few_clouds.png";
      }
      if (inRange(code, 200, 300)) {
        return "thunderstorm.png";
      }
      if (inRange(code, 300, 400)) {
        return "rain.png";
      }
      if (inRange(code, 500, 600)) {
        return "shower_rain.png";
      }
      if (inRange(code, 600, 700)) {
        return "snow.png";
      }
      if (inRange(code, 700, 800)) {
        return "mist.png";
      }
      return null;
    },
  },
};
</script>

<style>
.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 450px;
  box-sizing: border-box;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  color: #1b1c21;
}

.card-outer {
  box-sizing: border-box;
  padding-top: 80px;
}

.date::first-letter,
.description::first-letter {
  text-transform: capitalize;
}

.city {
  margin: 24px 0;
}

.weather-icon {
  margin: 12px 0;
  width: 180px;
  height: 180px;
  background-size: cover;
  background-position: center;
}
</style>
