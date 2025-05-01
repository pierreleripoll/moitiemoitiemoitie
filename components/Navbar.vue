<template>
  <div class="navbar-container">
    <nav class="navbar content-maxed-padded">
      <!-- Header with title and hamburger button -->
      <div class="navbar-header">
        <NuxtLink to="/" class="navbar-title">
          <h3 class="long-title">collectif moitié moitié moitié</h3>
          <h3 class="short-title">moitié moitié moitié</h3>
        </NuxtLink>
        <!-- Hamburger button visible on mobile only -->
        <button
          class="hamburger-btn"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <HamburgerButton :open="isMobileMenuOpen" />
        </button>
      </div>

      <!-- Navigation list: always rendered, but its display is controlled via CSS on mobile -->
      <ul class="navbar-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <li>
          <NuxtLink to="/spectacles" active-class="router-link-active">
            <h3>spectacles</h3>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/agenda" active-class="router-link-active">
            <h3>agenda</h3>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/collectif" active-class="router-link-active">
            <h3>le collectif</h3>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" active-class="router-link-active">
            <h3>contact</h3>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import HamburgerButton from "./HamburgerButton.vue";

const route = useRoute();
const isMobileMenuOpen = ref(false);

const activeRoute = ref("");

watch(route, (r) => {
  activeRoute.value = r.path;
  console.log(activeRoute.value);
});

const activeMenu = (routeMenu: string) =>
  activeRoute.value.includes(routeMenu) ? "-active" : "";

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<style scoped>
/* Base navbar styling */
.navbar-container {
  border-bottom: solid rgba(0, 0, 0, 0.6) 1px;
  position: relative;
}
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 10;
  background: white;
  justify-content: space-between;
  overflow: visible;
}

.short-title {
  display: none;
}

/* Header styling: title and hamburger button on the same line */
.navbar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Title styling */
.navbar-title {
  /* font-size: 20px;
  font-weight: bold; */
  /* font-weight: bold; */
}

/* Hamburger button: hidden on desktop */
.hamburger-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;
}

/* Navigation list styling */
.navbar-menu {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  width: 500px;
  justify-content: space-between;
}

/* Link styling */
a {
  color: black;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

/* Active route styling */
.router-link-active:not(.navbar-title) {
  text-decoration: underline 1px rgba(0, 0, 0, 0.6);
}

@media screen and (max-width: 920px) {
  .navbar {
    gap: 1rem;
    /* padding: 0px; */
  }
  .navbar-menu {
    gap: 0.7rem;
  }

  .long-title {
    display: none;
  }
  .short-title {
    display: block;
  }
}

/* Mobile-specific styles */
@media screen and (max-width: 800px) {
  .navbar-title > h3 {
    font-size: x-large;
  }
  .navbar {
    position: relative;
    flex-direction: column;
    padding-top: 0rem;
  }
  .long-title {
    display: block;
  }
  .short-title {
    display: none;
  }

  /* Show hamburger button on mobile */
  .hamburger-btn {
    display: block;
  }

  /* On mobile, the menu is hidden by default */
  .navbar-menu {
    flex-direction: column;
    width: 100%;
    display: none;
    gap: 1rem;
  }

  /* When toggled, display the menu as a flex container */
  .navbar-menu.mobile-menu-open {
    display: flex;
  }

  a {
    padding: 0.75rem 0;
    width: 100%;
  }

  .navbar-header {
    width: 100%;
  }
}

@media screen and (max-width: 500px) {
  .long-title {
    display: none;
  }
  .short-title {
    display: block;
  }
}
</style>
