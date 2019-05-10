import axios from 'axios';

export default {
  // Gets books from the Google API
  getCharities: function(q) {
    return axios.get("/api/orghunter", { params: { q: "charityName:" + q } });
  },
  // Gets all saved books
  getSavedCharities: function() {
    return axios.get("/api/charities");
  },
  // Deletes the saved book with the given id
  deleteCharity: function(id) {
    return axios.delete("/api/charities/" + id);
  },
  // Saves an book to the database
  saveCharity: function(charityData) {
    return axios.post("/api/charities", charityData);
  }
};