import axios from "axios";

class Locale {
    data = {};

    init(completeCallback) {
        axios.get('/locale.json')
            .then(result => {
                this.data = result.data;
                completeCallback && completeCallback();
            });
    }

    get(key, ...args) {
        if (!this.data.hasOwnProperty(key)) {
            return;
        }
        let value = this.data[key];
        
        for (let i = 0; i < args.length; i++) {
            value = value.replace('{' + i + '}', args);
        }
        return value;
    }
}

const locale = new Locale();

export default locale;