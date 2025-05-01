<template>
  <div class="newsletter-component">
    <form
      method="post"
      action="https://newsletter.infomaniak.com/external/submit"
      target="_blank"
      class="newsletter-form"
      @submit="handleSubmit"
    >
      <!-- Hidden fields for Infomaniak configuration -->
      <input type="email" name="email" style="display: none" />
      <input
        type="hidden"
        name="key"
        value="eyJpdiI6IkpxcWUrcitWcnBIclFteHZuNWlneUJ5enB2NHlHZHhKR2FyRWxBQTBjYWM9IiwidmFsdWUiOiJ0K2xQZ3ZCQjE1YzA0UFIrcGt6ZVwvQXhsOVJac3lkWXNnRVZBNlk3TWxhaz0iLCJtYWMiOiI4YWM0N2ZlZmQ3ZDI0ZDU4NDJkZDBhZjIzODcxZjFlMTI5NzI1ZjBlZDBjMjFkOWQwMmY4OGZhMDcyMGIyNmU2In0="
      />
      <input type="hidden" name="webform_id" value="20157" />

      <!-- Form header -->
      <h2 class="newsletter-title">Newsletter</h2>
      <p class="newsletter-subtitle">
        Recevez des nouvelles du collectif directement dans votre boîte mail en
        vous inscrivant à notre newsletter avec le formulaire ci-dessous :
      </p>

      <!-- Success message -->
      <div v-if="submitted" class="newsletter-success">
        <h4>Votre inscription a été enregistrée avec succès !</h4>
        <button @click="resetForm" class="newsletter-button">
          &laquo; Retour
        </button>
      </div>

      <!-- Form fields -->
      <div v-else class="newsletter-content">
        <!-- Email field -->
        <div class="form-group">
          <div class="form-label">
            <label for="email">Email</label>
            <span class="required">*</span>
          </div>
          <input
            type="text"
            id="email"
            name="inf[1]"
            data-inf-meta="1"
            data-inf-error=""
            v-model="email"
            required="required"
          />
        </div>

        <!-- First name field -->
        <div class="form-group">
          <div class="form-label">
            <label for="firstname">Prénom</label>
          </div>
          <input
            type="text"
            id="firstname"
            name="inf[2]"
            data-inf-meta="2"
            data-inf-error=""
            v-model="firstname"
          />
        </div>

        <!-- Last name field -->
        <div class="form-group">
          <div class="form-label">
            <label for="lastname">Nom</label>
          </div>
          <input
            type="text"
            id="lastname"
            name="inf[3]"
            data-inf-meta="3"
            data-inf-error=""
            v-model="lastname"
          />
        </div>

        <!-- RGPD notice -->
        <div class="newsletter-rgpd">
          (Votre adresse de messagerie est uniquement utilisée pour vous envoyer
          notre lettre d'information ainsi que des informations concernant nos
          activités. Vous pouvez à tout moment utiliser le lien de désabonnement
          intégré dans chacun de nos mails.)
        </div>

        <!-- Submit button -->
        <div class="form-submit">
          <button type="submit" :disabled="loading" class="newsletter-button">
            {{ loading ? "Envoi..." : "Valider" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Form state
const email = ref("");
const firstname = ref("");
const lastname = ref("");
const submitted = ref(false);
const loading = ref(false);

// Handle form submission
const handleSubmit = async (event) => {
  loading.value = true;

  // Since the form opens in a new tab (target="_blank"),
  // we can show the success message immediately
  setTimeout(() => {
    submitted.value = true;
    loading.value = false;
  }, 1000);
};

// Reset the form
const resetForm = () => {
  submitted.value = false;
  email.value = "";
  firstname.value = "";
  lastname.value = "";
};
</script>

<style scoped>
.newsletter-component {
  margin: 0 auto;
  margin-top: 1rem;
}

.newsletter-form {
  text-transform: lowercase; /* Matching your site's style */
}

.newsletter-title {
  margin: 0 0 1rem 0;
}

/* .newsletter-subtitle {
  margin-bottom: 1rem;
} */
.newsletter-content {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: flex;
  margin-bottom: 0.5rem;
}

.required {
  color: red;
  margin-left: 4px;
}

input {
  width: 100%;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  padding-left: 0.5rem;
  box-sizing: border-box;
  background-color: white;
}

input:focus {
  outline: none;
  border-color: #444;
}

.newsletter-rgpd {
  font-size: smaller;
  margin: 0rem 0 1rem;
  line-height: 1.2;
}

.form-submit {
  display: flex;
  justify-content: flex-end;
}

.newsletter-button {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  font-size: 1em;
  text-transform: lowercase;
}

.newsletter-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.newsletter-button:hover:not(:disabled) {
  background-color: #444444;
}

.newsletter-success {
  text-align: center;
  padding: 2rem 0;
}
</style>
