class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}


let map;

function initMap() {
    var uluru = {
        lat: 47.6062,
        lng: -122.3321
    };
    // Options
    var options = {
        center: uluru,
        zoom: 8,
    }
    // New Map 
    var map = new google.maps.Map(document.getElementById("map"), options);
    // Add Marker
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    // content
    var contentString =
        '<div id="bodyContent">' +
        "<p>New York City Center</p>" +
        "<p>Street Name</p>" +
        "<p>New York City, USA</p>" +
        "</div>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    marker.click(infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
    }));

}