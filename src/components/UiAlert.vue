<template>
  <div class="alert">
    <slot>Что-то пошло не так...</slot>
  </div>
</template>

<script>
export default {
  name: "UiAlert",
};
</script>

<style>
.alert {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 28px;
  color: #32ccff;
  border: 2px solid #32ccff;
  border-radius: 8px;
  margin: 32px 0;
}
</style>
