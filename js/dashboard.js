document.getElementById("cargoForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const cargoType = document.getElementById("cargoType").value;
    const tradeType = document.getElementById("tradeType").value;
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const description = document.getElementById("description").value;

    const response = await fetch("http://localhost:3000/cargo", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            cargoType,
            tradeType,
            origin,
            destination,
            description
        })

    });

  const data = await response.json();

alert(data.message);

const feed = document.getElementById("cargoFeed");

feed.innerHTML += `

<div class="dash-card">

    <h3>📦 ${cargoType}</h3>

    <p><b>Trade:</b> ${tradeType}</p>

    <p><b>Origin:</b> ${origin}</p>

    <p><b>Destination:</b> ${destination}</p>

    <p>${description}</p>

  <button onclick="window.location.href='applications.html'">
        Interested
    </button>

</div>

`;

document.getElementById("cargoForm").reset();


});

// Load Marketplace Feed

window.onload = async function () {

    const response = await fetch("http://localhost:3000/cargo");

    const cargoRequests = await response.json();

    const feed = document.getElementById("cargoFeed");

    feed.innerHTML = "";

    cargoRequests.forEach(cargo => {

        feed.innerHTML += `

<div class="dash-card">

<h3>📦 ${cargo.cargoType}</h3>

<p><b>Trade:</b> ${cargo.tradeType}</p>

<p><b>Origin:</b> ${cargo.origin}</p>

<p><b>Destination:</b> ${cargo.destination}</p>

<p>${cargo.description}</p>

<button onclick="window.location.href='applications.html'">

Interested

</button>

</div>

`;

    });

};