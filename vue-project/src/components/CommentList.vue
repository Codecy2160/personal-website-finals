<template>
    <div class="comment-list">
      <h2>Comments</h2>
      <div v-if="loading">Loading comments...</div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <p><strong>{{ comment.name || 'Anonymous' }}</strong> ({{ comment.email || 'No email' }})</p>
          <p>{{ comment.message }}</p>
          <p><small>{{ new Date(comment.created_at).toLocaleString() }}</small></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { supabase } from '../lib/supabaseClient.js';
  
  export default {
    data() {
      return {
        comments: [],
        loading: true,
      };
    },
    async created() {
      await this.fetchComments();
    },
    methods: {
      async fetchComments() {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false });
  
        if (error) {
          console.error('Error fetching comments:', error);
        } else {
          this.comments = data;
        }
        this.loading = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .comment-list {
    max-width: 600px;
  }
  .comment {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  small {
    color: #888;
  }
  </style>