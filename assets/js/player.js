const ironman = document.createElement('img').innerHTML="<img src='assets/images/ironman-logo2.png'/>";
const captainAmerica = document.createElement('img').innerHTML="<img src='assets/images/shield2.png' />";


const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

currentPlayer = getParameterByName('player');