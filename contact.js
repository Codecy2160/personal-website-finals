import axios from 'axios';

// export default {
//   data() {
//     return {
//       email: ''
//     }
//   },
//   methods: {
//     sendEmail() {
//       axios.post('codecyvt@gmail.com', {
//         email: this.email
//       })
//       .then(response => {
//         console.log(response);
//         alert('Email sent successfully!');
//       })
//       .catch(error => {
//         console.error(error);
//         alert('Error sending email!');
//       });
//     }
//   }
// }

// All of that assuming I have a working email backend
// Instead a pop up will display whenever the user submits an email

const app = new Vue({
    el: "app",
    data: {
      email: '',
      showPopup: false
    },
    methods: {
      sendEmail() {
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 2000); 
      }
    }
  })