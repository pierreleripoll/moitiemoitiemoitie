<template>
  <span class="hamburger-box"
    ><span :class="`hamburger-inner ${$props.open ? 'open' : ''}`"></span>
  </span>
</template>
<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
</script>
<style>
.hamburger-box {
  width: 32px;
  height: 26px;
  display: inline-block;
  position: relative;
}

.hamburger-inner,
.hamburger-inner:before,
.hamburger-inner:after {
  width: 32px;
  height: 3px;
  background-color: black;
  position: absolute;
  transition: transform 0.1s ease, top 0.1s ease, bottom 0.1s ease;
}

/* Position the middle line */
.hamburger-inner {
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

/* Default positions for pseudo elements */
.hamburger-inner:before,
.hamburger-inner:after {
  content: "";
  display: block;
}

.hamburger-inner:before {
  top: -10px;
}

.hamburger-inner:after {
  bottom: -10px;
}

/* Open state: transform to X icon */
.hamburger-inner.open {
  background-color: transparent;
}

.hamburger-inner.open:before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger-inner.open:after {
  bottom: 0;
  transform: rotate(-45deg);
}
</style>
