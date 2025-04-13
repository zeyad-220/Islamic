(function(){
               emailjs.init({
                 publicKey: "bVz_AOZpAbCR2gADo",
               });
            })();

function showSection(sectionId) {
            document.querySelectorAll('.content').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');

            if (sectionId === 'prayer-times') {
                fetchPrayerTimes();
            }
        }

        function fetchPrayerTimes() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=5`)
                        .then(response => response.json())
                        .then(data => {
                            const timings = data.data.timings;
                            const prayerTimesContent = document.getElementById('prayer-times-content');
                            prayerTimesContent.innerHTML = `
                                <p>الفجر: ${timings.Fajr}</p>
                                <p>الشروق: ${timings.Sunrise}</p>
                                <p>الظهر: ${timings.Dhuhr}</p>
                                <p>العصر: ${timings.Asr}</p>
                                <p>المغرب: ${timings.Maghrib}</p>
                                <p>العشاء: ${timings.Isha}</p>
                            `;
                        });
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

emailjs.init("bVz_AOZpAbCR2gADo");
    
    function sendMessage() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var responseMessage = document.getElementById("response-message");
    
        // Check if fields are filled
        if (!name || !email || !message) {
            responseMessage.style.display = "block";
            responseMessage.innerText = "Please fill in all fields.";
            responseMessage.style.backgroundColor = "orange";
            return;
        }
    
        // Send email via EmailJS
        emailjs.send("service_ug6050e", "template_bge8w3g", {
            name: name,
            email: email,
            message: message
        }).then(function(response) {
            responseMessage.style.display = "block";
            responseMessage.innerText = "Message sent successfully!";
            responseMessage.style.backgroundColor = "green";
        }, function(error) {
            responseMessage.style.display = "block";
            responseMessage.innerText = "Failed to send message. Check console for details.";
            responseMessage.style.backgroundColor = "red";
            console.error("EmailJS Error:", error);
        });
    }