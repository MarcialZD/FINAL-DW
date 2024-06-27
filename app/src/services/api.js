class Servicios {
    fetchData(callback) {
        const apiurl = 'app/json/ingredientes.json';        
        fetch(apiurl)
            .then(response => response.json())
            .then(data => {
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching filtered data:', error);
            });        
    }
    fetchDatar(callback) {
        const apiurl = 'app/json/recetas.json';        
        fetch(apiurl)
            .then(response => response.json())
            .then(data => {
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching filtered data:', error);
            });        
    }
}

export default Servicios;