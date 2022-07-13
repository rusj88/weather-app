<template>
  <slot :name="status" :result="result" :error="error"></slot>
</template>

<script>
export default {
  name: "PromiseWrapper",

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      status: null,
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      handler() {
        this.updateData();
      },
      immediate: true,
    },
  },

  methods: {
    updateData() {
      this.status = "pending";
      this.result = null;
      this.error = null;
      this.promise
        .then((result) => {
          this.result = result;
          this.status = "fulfilled";
        })
        .catch((error) => {
          this.error = error;
          this.status = "rejected";
        });
    },
  },
};
</script>
