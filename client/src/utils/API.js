import axios from 'axios';

export default {
  // Gets charities from the Orghunter API
  getCharities: function(q) {
    return axios.get("/api/orghunter", { params: { q: "charityName:" + q } });
  },
  // Gets all saved charities
  getSavedCharities: function() {
    return axios.get("/api/charities");
  },
  // Deletes the saved charity with the given id
  deleteCharity: function(id) {
    return axios.delete("/api/charities/" + id);
  },
  // Saves an charity to the database
  saveCharity: function(charityData) {
    return axios.post("/api/charities", charityData);
  }
};