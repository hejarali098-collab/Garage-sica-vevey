const GARAGE_EMAIL="contact@garagesica.ch";let currentCalendarData=null;
function pad(n){return String(n).padStart(2,"0")}
function toICSDate(date){return date.getUTCFullYear()+pad(date.getUTCMonth()+1)+pad(date.getUTCDate())+"T"+pad(date.getUTCHours())+pad(date.getUTCMinutes())+"00Z"}
function showModal(text,withCalendar=false){document.getElementById("confirmation-text").textContent=text;document.getElementById("calendar-actions").classList.toggle("hidden",!withCalendar);document.getElementById("confirmation").classList.remove("hidden")}
function closeModal(){document.getElementById("confirmation").classList.add("hidden")}
function sendMail(subject,body){window.location.href=`mailto:${GARAGE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}

document.getElementById("appointment-form").addEventListener("submit",function(e){
e.preventDefault();
const name=document.getElementById("appt-name").value,email=document.getElementById("appt-email").value,phone=document.getElementById("appt-phone").value,car=document.getElementById("appt-car").value;
const serviceSelect=document.getElementById("appt-service"),service=serviceSelect.value,duration=Number(serviceSelect.selectedOptions[0].dataset.duration||60);
const dateValue=document.getElementById("appt-date").value,timeValue=document.getElementById("appt-time").value,message=document.getElementById("appt-message").value;
const start=new Date(`${dateValue}T${timeValue}:00`),end=new Date(start.getTime()+duration*60000);
currentCalendarData={name,email,phone,car,service,start,end,message};
const body=`Nouvelle demande de rendez-vous

Nom : ${name}
E-mail : ${email}
Téléphone : ${phone}
Véhicule : ${car}
Service : ${service}
Date : ${dateValue}
Heure : ${timeValue}
Message : ${message||"-"}

Merci de confirmer ce rendez-vous au client.`;
const g=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Garage Sica - "+service)}&dates=${toICSDate(start)}/${toICSDate(end)}&details=${encodeURIComponent("Demande de rendez-vous chez Garage Sica Vevey. Rendez-vous à confirmer par le garage.")}&location=${encodeURIComponent("Av. de Gilamont 24, 1800 Vevey")}`;
document.getElementById("google-calendar-link").href=g;
showModal(`Merci ${name}. Votre demande est prête à être envoyée au garage. Vous pouvez aussi l’ajouter à votre calendrier.`,true);
sendMail("Demande de rendez-vous - Garage Sica",body);
});

document.getElementById("quote-form").addEventListener("submit",function(e){
e.preventDefault();
const name=document.getElementById("quote-name").value,email=document.getElementById("quote-email").value,phone=document.getElementById("quote-phone").value,car=document.getElementById("quote-car").value,service=document.getElementById("quote-service").value,message=document.getElementById("quote-message").value;
const body=`Nouvelle demande de devis

Nom : ${name}
E-mail : ${email}
Téléphone : ${phone}
Véhicule : ${car}
Service : ${service}
Message : ${message}`;
showModal(`Merci ${name}. Votre demande de devis est prête à être envoyée à contact@garagesica.ch.`,false);
sendMail("Demande de devis - Garage Sica",body);
});

function downloadCalendar(){
if(!currentCalendarData)return;
const d=currentCalendarData;
const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Garage Sica Vevey//Rendez-vous//FR","BEGIN:VEVENT",`UID:${Date.now()}@garagesica.ch`,`DTSTAMP:${toICSDate(new Date())}`,`DTSTART:${toICSDate(d.start)}`,`DTEND:${toICSDate(d.end)}`,`SUMMARY:Garage Sica - ${d.service}`,"LOCATION:Av. de Gilamont 24, 1800 Vevey","DESCRIPTION:Demande de rendez-vous chez Garage Sica Vevey. Rendez-vous à confirmer par le garage.","END:VEVENT","END:VCALENDAR"].join("\r\n");
const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
a.href=url;a.download="rendez-vous-garage-sica.ics";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
}