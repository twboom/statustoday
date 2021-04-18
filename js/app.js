const config = {
    "url": "https://somtoday.nl",
    "files": ["favicon-16x16.png", "favicon-32x32.png", "favicon-96x96.png", "favicon-160x160.png", "favicon-192x192.png"],
    "timeout": 5000,
    "interval": 600000
};

let session = [];
const status = [];

status.get = async function(file, timeout, callback) {

    const timer = setTimeout(_ => {
        callback(false)
    }, timeout)

    const img = document.createElement('img');

    img.addEventListener('load', _ => {
        clearTimeout(timer)
        callback(true)
    })

    img.addEventListener('error', _ => {
        clearTimeout(timer)
        callback(false)
    })

    img.src = file
}

status.display = function() {
    const total = session.length;
    const map = session.reduce(function(obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
    }, {});

    console.log(`${map.true} of ${total} loaded`)
    const loaded = 100 - map.true / total * 100;
    if (session.includes(true)) {
        document.getElementById('status-display').innerText = ''

        if (map.true < session.length) {
            document.getElementById('status-display').innerText += 'probably '
        }
        
        document.getElementById('status-display').innerText += 'online';
        document.getElementById('error-rate-display').innerText = `${loaded}%`
    } else {
        document.getElementById('status-display').innerText + 'probably offline';
    };
    const now = new Date();
    status.lastCheck = Date.now();
    document.getElementById('last-check').innerText = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()},${now.getMilliseconds()}`
};

status.check = async function() {

    session = [];

    for (let i = 0; i < config.files.length; i++) {
        const file = `${config.url}/${config.files[i]}`

        status.get(file, config.timeout, found => {
            session.push(found);
            console.log(`${config.files[i]}: ${found}`)
        })
    }

    const interval = setInterval(_ => {
        if (session.length === config.files.length) {
            clearInterval(interval);
            console.log(7)
            status.display();
        }
    })
};

window.onload = async function() {
    status.check();

    status.interval = setInterval(_ => {
        status.check();
    }, config.interval);

    status.displayUpdate = setInterval(_ => {
        document.getElementById('since-last-check').innerText = `${(Date.now() - status.lastCheck) / 1000}`
    }, 10)
}