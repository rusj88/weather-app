<template>
  <div class="autocomplete">
    <div class="input-container">
      <input
        class="input"
        v-model="search"
        @input="onChange"
        type="text"
        @keydown.enter="onEnter"
        @keydown.escape="onEscape"
        placeholder="Введите город..."
      />
      <i class="fa fa-search icon" @click="onEnter"></i>
    </div>

    <ul v-show="isOpen && results.length > 0" class="autocomplete-results">
      <li
        v-for="(result, ind) in results"
        :key="ind"
        class="autocomplete-result"
        @click="setResult(result)"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AutocompleteInput",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  emits: ["updateQuery"],
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
    };
  },
  methods: {
    onEscape() {
      this.isOpen = false;
    },
    onEnter() {
      this.$emit("updateQuery", this.search);
      this.isOpen = false;
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit("updateQuery", this.search);
    },
    filterResults() {
      this.results = this.items.filter((item) =>
        item.toLowerCase().startsWith(this.search.toLowerCase())
      );
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
  margin-bottom: 80px;
}

.input-container {
  position: relative;
}

.icon {
  position: absolute;
  top: 2px;
  right: 4px;
}
.icon:hover {
  cursor: pointer;
}

.input {
  box-sizing: border-box;
  width: 100%;
}
.autocomplete-results {
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid #eaeaea;
  max-height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #32ccff;
  color: #fff;
}
</style>
