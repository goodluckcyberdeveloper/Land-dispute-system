document.getElementById("disputeForm").addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        street_name: document.getElementById("street_name").value,
        description: document.getElementById("description").value,
        location_lat: document.getElementById("lat").value,
        location_lng: document.getElementById("lng").value
    };

    fetch("http://127.0.0.1:8000/api/create-dispute/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Dispute submitted successfully!");
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});