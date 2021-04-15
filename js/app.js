const config = {
    "url": "https://somtoday.nl",
    "files": ["favicon-16x16.png", "favicon-32x32.png"],
    "timeout": 5000
}

const session = []

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
    if (session.includes(true)) {

    }
}

status.check = function() {

    for (let i = 0; i < config.files.length; i++) {
        const file = `${config.url}/${config.files[i]}`

        status.get(file, config.timeout, found => {
            session.push(found);
            console.log(`${config.files[i]}: ${found}`)
        })
    }

    const interval = setInterval(_ => {
        if (session.length === config.files.length) {
            clearInterval(interval)
            status.display()
        }
    })
}

window.onload = status.check;