const WHATSAPP="41783201098";

function openWhatsApp(message){
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,"_blank");
}

function sendAppointment(e){
  e.preventDefault();
  const m=`Bonjour Garage Sica Vevey,

Je souhaite prendre un rendez-vous.

Nom : ${document.getElementById("appt-name").value}
Téléphone : ${document.getElementById("appt-phone").value}
Véhicule : ${document.getElementById("appt-car").value}
Service : ${document.getElementById("appt-service").value}
Date : ${document.getElementById("appt-date").value}
Heure : ${document.getElementById("appt-time").value}`;
  openWhatsApp(m);
}

function sendQuote(e){
  e.preventDefault();
  const m=`Bonjour Garage Sica Vevey,

Je souhaite demander un devis gratuit.

Nom : ${document.getElementById("quote-name").value}
Téléphone : ${document.getElementById("quote-phone").value}
Véhicule : ${document.getElementById("quote-car").value}
Service : ${document.getElementById("quote-service").value}
Message : ${document.getElementById("quote-message").value}`;
  openWhatsApp(m);
}

function showVideoInfo(){
  document.getElementById("video-modal").classList.remove("hidden");
}
function hideVideoInfo(){
  document.getElementById("video-modal").classList.add("hidden");
}