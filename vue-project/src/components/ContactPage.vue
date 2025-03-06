<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">Contact Form</h1>
                <form @submit.prevent="sendEmail">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" v-model="name" class="form-control" placeholder="Enter your name">
                    </div>
                    <div class="form-group mt-3">
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email"> 
                    </div>
                    <div class="form-group mt-3">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" v-model="subject" class="form-control" placeholder="Enter your subject"> 
                    </div>
                    <div class="form-group mt-3">
                        <label for="message">Message</label>
                        <textarea id="message" v-model="message" class="form-control" placeholder="Enter your message"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
                </form>
                <div v-if="showPopup" class="popup">Email sent successfully!</div>
            </div>
        </div>
    </div>
    <FooterComponent/>
</template>

<script>
import FooterComponent from './Footer.vue';

export default {
    name: 'ContactPage',
    components: {
        FooterComponent,
    },
    data() {
        return {
            name: '',
            email: '',
            subject: '',
            message: '',
            showPopup: false
        }
    },
    methods: {
        sendEmail() {
            this.showPopup = true;
            setTimeout(() => {
                this.showPopup = false;
            }, 2000);
        }
    }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap';

.popup {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
}
</style>
