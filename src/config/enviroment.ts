interface Enviroment {
    apiURL: {
        investree: string
    }
    homeURL: string
}

const enviroment:Enviroment = {
    apiURL: {
        investree: 'http://localhost:9001/'
    },
    homeURL: 'http://localhost:9000/'
}

export default enviroment