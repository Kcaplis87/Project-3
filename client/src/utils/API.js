import axios from "axios";

const baseURL = "http://data.orghunter.com/v1/charitysearch?";
const user_key = "user_key=6df46cdb01f8d1e0479ada556c86e59c";

// Example PostMan Request
// http://data.orghunter.com/v1/charitysearch?user_key=6df46cdb01f8d1e0479ada556c86e59c&searchTerm=cancer

export default {
    searchCharity: function(charity) {
        const searchTerm = charity.split(" ").join("+");
        return axios.get(baseURL + user_key + "&searchTerm=" + searchTerm);
        //return axios.post(baseURL + user_key + "&searchTerm=" + searchTerm);
    },
    saveCharity: function() {
        const charityData = {
            url: url,
            donationUrl: donationUrl,
            state: state,
            score: score,
            category: category,
            website: website,
            missionStatement: missionStatement
        }
        return axios.post("/api/", charityData);
    }

};