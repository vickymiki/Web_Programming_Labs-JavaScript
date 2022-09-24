const axios = require("axios");
const md5 = require("blueimp-md5");

const exportedMethods = {
    async search(characterName) {
        const publickey = "84829834bfbb7e446d7cd37af690fd7e";
        const privatekey = "441baf575b1607f9eecb4884d82666365f3d5c91";
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
        const url =
            baseUrl + '?nameStartsWith=' + characterName + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
        
        // const data = await axios.get(url);
        const {data} = await axios.get(url);

        if((data.data.results).length < 1) {
            throw error;
        }

        return data.data.results.slice(0,20);
    
    },

    async findCharacterSearch(id) {
        const publickey = "84829834bfbb7e446d7cd37af690fd7e";
        const privatekey = "441baf575b1607f9eecb4884d82666365f3d5c91";
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/";
        const url =
            baseUrl + id + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
        
        // const data = await axios.get(url);
        const {data} = await axios.get(url);

        if((data.data.results).length < 1) {
            throw error;
        }

        // console.log("test")
        // console.log(data.data.results[0])
        // console.log("testwww")
        // console.log(data.data.results)

        return data.data.results[0];

    
    },

    async getData() {
        console.log("url");
        console.log(url);

        let { data } = await axios.get(url);
    
        return data;
    }
}; 




module.exports = exportedMethods;

