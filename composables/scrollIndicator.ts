import { onMounted, onBeforeUnmount } from "vue";

export function useScrollIndicator() {
  let observer: MutationObserver | null = null;
  let resizeObservers: ResizeObserver[] = [];

  // Setup function to initialize scroll indicators for elements
  function setupScrollIndicators() {
    const scrollables = document.querySelectorAll(
      ".scrollable:not([data-scroll-initialized])"
    );

    console.log(`Setting up ${scrollables.length} scrollable indicators`);

    scrollables.forEach((scrollable) => {
      // Mark as initialized to avoid duplicate listeners
      scrollable.setAttribute("data-scroll-initialized", "true");

      // Initial check
      updateScrollIndicators(scrollable);

      // Check on scroll
      scrollable.addEventListener("scroll", () => {
        updateScrollIndicators(scrollable);
      });

      // Add a resize observer for more reliable size detection
      const resizeObserver = new ResizeObserver(() => {
        updateScrollIndicators(scrollable);
      });
      resizeObserver.observe(scrollable);
      resizeObservers.push(resizeObserver);
    });
  }

  // Update function to manage CSS classes based on scroll position
  function updateScrollIndicators(element: Element) {
    // Show top arrow if scrolled down
    element.classList.toggle("can-scroll-up", element.scrollTop > 20);

    // Show bottom arrow if can scroll more
    element.classList.toggle(
      "can-scroll-down",
      element.scrollHeight > element.clientHeight &&
        element.scrollTop < element.scrollHeight - element.clientHeight - 20
    );
  }

  // Initialize everything when component is mounted
  onMounted(() => {
    console.log("Setting up scroll indicators");

    // Initial setup
    setupScrollIndicators();

    // Set up mutation observer to detect new scrollable elements
    observer = new MutationObserver((mutations) => {
      let hasNewNodes = false;

      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewNodes = true;
          break;
        }
      }

      if (hasNewNodes) {
        const newScrollables = document.querySelectorAll(
          ".scrollable:not([data-scroll-initialized])"
        );

        if (newScrollables.length > 0) {
          setupScrollIndicators();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

  // Clean up when component is unmounted
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }

    resizeObservers.forEach((observer) => {
      observer.disconnect();
    });

    // Remove event listeners from all initialized elements
    document
      .querySelectorAll('[data-scroll-initialized="true"]')
      .forEach((el) => {
        el.removeEventListener("scroll", () => updateScrollIndicators(el));
      });
  });

  // Return any methods that might be useful externally
  return {
    updateScrollIndicators,
    setupScrollIndicators,
  };
}
