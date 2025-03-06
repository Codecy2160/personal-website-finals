<template>
    <div class="comment-form">
      <h2>Leave a Comment</h2>
      <form @submit.prevent="submitComment">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" placeholder="Your name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Your email" />
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea id="message" v-model="message" placeholder="Your message" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { supabase } from '../lib/supabaseClient.js';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: '',
        subject: '',
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      async submitComment() {
        if (!this.message) {
          this.errorMessage = 'Message is required.';
          return;
        }
  
        const { error } = await supabase
          .from('comments')
          .insert([{ name: this.name, email: this.email, message: this.message, subject: this.subject }]);
  
        if (error) {
          this.errorMessage = 'Failed to submit comment. Please try again.';
          console.error(error);
        } else {
          this.successMessage = 'Comment submitted successfully!';
          this.name = '';
          this.email = '';
          this.message = '';
          this.subject = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .comment-form {
    max-width: 80%;
    margin: 0 auto;
  }
  label {
    display: block;
    margin-top: 10px;
  }
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>