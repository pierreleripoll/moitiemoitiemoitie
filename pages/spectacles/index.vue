<template>
  <div class="container scrollable-container">
    <div class="list-shows scrollable">
      <div v-for="show in shows" :key="show._path">
        <div class="show content-maxed-padded">
          <NuxtLink class="show-title" :to="show.path">
            <h2 :style="{ 'text-decoration-color': 'transparent' }">
              {{ show.title }}
            </h2>
          </NuxtLink>
          <div class="show-details">
            <NuxtLink class="show-title" :to="show.path">
              <h2 :style="{ 'text-decoration-color': 'transparent' }">
                {{ show.title }}
              </h2>
            </NuxtLink>
            <MDC
              v-if="show.description_short"
              :value="show.description_short"
            />
            <ContentRenderer
              v-else
              class="show-description"
              :value="show.body"
            />
            <show-dates
              v-if="show.dates"
              class="show-dates"
              :dates="show.dates"
              :max="maxDatesForShort"
              :sitemap="show.path"
            ></show-dates>
            <NuxtLink class="show-plus-infos" :to="show.path">
              <h3 :style="{ 'text-decoration-color': 'transparent' }">
                + infos
              </h3>
            </NuxtLink>
          </div>
          <div class="show-img-wrapper">
            <NuxtPicture
              class="show-img"
              :src="show.images[0].src"
              format="avif,webp"
              sizes="450px md:650px xl:900px"
              densities="x1 x2"
              quality="90"
              loading="lazy"
              :imgAttrs="{ alt: show.images[0].caption, loading: 'lazy' }"
            />
          </div>
          <show-dates
            v-if="show.dates"
            class="show-dates"
            :dates="show.dates"
            :sitemap="show.path"
          ></show-dates>
        </div>
        <span class="line-limit"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: shows } = await useAsyncData("spectacles", () =>
  queryCollection("spectacles").all()
);
const maxDatesForShort = 4;

shows.value = Array.isArray(shows.value)
  ? shows.value.sort((a, b) => a.navigation.order - b.navigation.order)
  : [];

onMounted(() => {
  // Existing onMounted code...

  // Setup scroll indicators
  const scrollables = document.querySelectorAll(".scrollable");

  scrollables.forEach((scrollable) => {
    // Initial check
    updateScrollIndicators(scrollable);

    // Check on scroll
    scrollable.addEventListener("scroll", () => {
      updateScrollIndicators(scrollable);
    });

    // Check on content/window changes
    window.addEventListener("resize", () => {
      updateScrollIndicators(scrollable);
    });

    // MutationObserver to detect content changes
    const observer = new MutationObserver(() => {
      updateScrollIndicators(scrollable);
    });

    observer.observe(scrollable, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: true,
    });
  });

  function updateScrollIndicators(element) {
    // Add can-scroll-up class if we can scroll up
    element.classList.toggle("can-scroll-up", element.scrollTop > 20);

    // Add can-scroll-down class if we can scroll down
    element.classList.toggle(
      "can-scroll-down",
      element.scrollHeight > element.clientHeight &&
        element.scrollTop < element.scrollHeight - element.clientHeight - 20
    );
  }
});
</script>

<style scoped>
.list-shows {
  display: flex;
  flex-direction: column;
  text-align: end;
}

.show {
  display: flex;
  flex-direction: row;
  gap: min(5rem, calc(2rem + 4vw));
  padding: 10rem 2rem;
  margin: auto;
  /* justify-content: space-between; */
  justify-content: space-between;
  align-items: flex-start;
  text-transform: lowercase;

  /* border-bottom: solid 1px; */
}

/* Equalize the width of show details, image and dates */
.show-details,
.show-dates {
  flex: 1 1 30%;
  max-width: 30%;
  box-sizing: border-box;
}

.show-img-wrapper {
  flex: 2 1 40%;
  max-width: 40%;
}

.show-title {
  display: none;
  text-align: left;
}

.show-plus-infos {
  text-align: right;
}

.show-details > .show-title {
  display: block;
}
.show-details {
  text-align: justify;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.show-details > .show-dates {
  display: none;
}

:deep(.show-description) {
  /* padding-top: 4rem; */
  text-transform: lowercase;
}

.show-dates {
  display: flex;
  flex-direction: column;
  font-size: smaller;
  gap: 1.5rem;
  text-transform: lowercase;
}
.show-dates .show-date {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: space-between;
}

.show-lieu {
  max-width: 300px;
  text-align: left;
}

.show-dates-text {
  flex-shrink: 0;
}

.show-date.passed {
  color: #6e6e6e;
}

/* Image wrapper and image styles */
.show-img-wrapper {
  /* max-width: 800px;
  max-height: 600px; */
  height: auto;
}
.show-img {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 500px;
}
.show-img:deep(img) {
  height: auto;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.line-limit {
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  width: 100%;
}

@media screen and (max-width: 1400px) {
  .show-details > .show-dates {
    display: flex;
  }
  .show > .show-dates {
    display: none;
  }

  .show-details {
    flex: 1 1 30%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .show-dates {
    flex: 1 1 100%;
    max-width: 100%;
    gap: 0.5rem;
    box-sizing: border-box;
  }

  .show-img-wrapper {
    flex: 2 1 40%;
    max-width: 50%;
  }
}

@media screen and (max-width: 1080px) {
  .list-shows {
    gap: 5rem;
  }
  .line-limit {
    padding-top: 5rem;
  }

  .show-title {
    display: block;
  }

  .show-details > .show-title {
    display: none;
  }

  .show-details > .show-dates {
    display: none;
  }
  .show > .show-dates {
    display: flex;
  }

  .show {
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 2rem;
    padding: 2rem;
    text-align: left;
  }

  .show-img-wrapper {
    order: 1;
    width: 100%;
    max-width: 100%;
  }

  .show-details {
    order: 2;
  }

  .show-dates {
    gap: 1rem;
    order: 3;
    max-width: 100%;
    width: 100%;
  }

  .show-details > .show-title {
    display: none;
  }

  .show-img :deep(img) {
    height: auto;
    width: 100%;
    max-height: 50vh;
    -o-object-fit: cover;
    object-fit: contain;
    -o-object-position: center;
    object-position: left;
  }
}
</style>
