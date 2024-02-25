import Loader from './loader';

const API_KEY = '775fca8df4be4549aa2f1bea062b444d';


class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL, {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;
