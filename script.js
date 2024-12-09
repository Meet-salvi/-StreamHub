async function youtubapi(params) {
    const url = 'https://yt-api.p.rapidapi.com/channel/shorts?id=UCMhe8jmac-tWKU0Vj_OXDvA';
        const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '969e850623mshaeefd98a1c5a46fp114733jsn21d35431569e',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        } catch (error) {
            console.error(error);
    }
}


// function fetchvideo(){
//     let videos = document.getElementById('video');

// }