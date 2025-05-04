let select = document.querySelector(".select-heading");
let arrow = document.querySelector(".select-heading img");
let options = document.querySelector(".options");
let option = document.querySelectorAll(".option");
let selecttext=document.querySelector(".select-heading span")




select.addEventListener("click", () => {
  options.classList.toggle("active-options");
  arrow.classList.toggle("rotate");
});
option.forEach((item)=>{
    item.addEventListener("click",()=>{
        selecttext.innerText=item.innerText
    })
})

//chatboat ai
//chatboat ai
let prompt = document.querySelector(".prompt");
let chatbtn = document.querySelector(".input-area button");
let chatcontainer = document.querySelector(".chat-container");
let h1=document.querySelector(".h1")
let chating=document.querySelector("#chatbotimg")
let chatbox=document.querySelector(".chat-box")

let userMessage=" ";
chating.addEventListener("click",()=>{
  chatbox.classList.toggle("active-chat-box")
})

let Api_url= "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAkzzw7WdFnWIQT4pvnqvfCZeyD8RnHt4g"

async function generateApiResponse(aiChatBox, userChatBox) {
    const textElement=aiChatBox.querySelector(".text")
    try{
        const response=await fetch(Api_url,{
            method:"POST",
            headers:{"content-Type": "application/json"},
            body:JSON.stringify({
                contents:[{
                    "role": "user",
                    "parts":[{text:`${userMessage} in 10 word `}]
                }]
            })
        })
        const data=await response.json()
        const ApiResponse=data?.candidates[0].contents.parts[0].text.trim();
        textElement.innerHTML=ApiResponse
    }
    catch(error){
        console.log(error)
    }
    finally{
         aiChatBox.querySelector(".Loading").style.display="none"
    }

    
}
function createChatBox(html, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}


chatbtn.addEventListener("click", () => {
    let userMessage = prompt.value;
    h1.style.display="none"

   if (userMessage === "") return; // Empty input check

    const html = `<p class="text"></p>`;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatcontainer.appendChild(userChatBox);

    prompt.value = "";

    // Optional: define this function or remove this line if not needed
    setTimeout(showLoading, 500);
});

// Dummy showLoading function (if you don't have one yet)
function showLoading() {
    const html =`<p class="text">Loading...</p>`
    let aiChatBox= createChatBox(html, "ai-chat-box")
    chatcontainer.appendChild(aiChatBox)
    generateApiResponse(aiChatBox)
}

const ctx1 = document.getElementById('caloriesChart');
    new Chart(ctx1, {
      type: 'doughnut',
      data: { labels: ['Used', 'Remaining'], datasets: [{ data: [480, 520], backgroundColor: ['#0d6efd', '#dee2e6'] }] },
      options: { plugins: { legend: { display: false } }, cutout: '70%' }
    });

    const ctx2 = document.getElementById('heartRateChart');
    new Chart(ctx2, {
      type: 'line',
      data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ label: 'BPM', data: [105, 110, 98, 120, 110], borderColor: '#ffc107', tension: 0.4 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });

    const ctx3 = document.getElementById('stepsChart');
    new Chart(ctx3, {
      type: 'bar',
      data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ data: [900, 1100, 1000, 1050, 978], backgroundColor: '#198754' }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });

    const ctx4 = document.getElementById('activityChart');
    new Chart(ctx4, {
      type: 'bar',
      data: { labels: ['5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug'], datasets: [{ label: 'Calories', data: [100, 120, 150, 130, 140], backgroundColor: '#0dcaf0' }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    document.addEventListener('DOMContentLoaded', function () {
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 300
      });
      calendar.render();

      var bar = new ProgressBar.Circle('#progressCircle', {
        color: '#00bcd4',
        trailColor: '#eee',
        strokeWidth: 6,
        trailWidth: 4,
        duration: 1400,
        easing: 'easeInOut',
        text: {
          autoStyleContainer: false
        },
        from: { color: '#00bcd4', width: 6 },
        to: { color: '#00bcd4', width: 6 },
        step: function(state, circle) {
          circle.setText(Math.round(circle.value() * 100) + '%');
        }
      });

      bar.text.style.fontFamily = 'Segoe UI';
      bar.text.style.fontSize = '1.2rem';
      bar.animate(0.75);
    });


// virtucial assistance
let ai = document.querySelector(".virtual-assistance img");
let speakpage = document.querySelector(".speak-page");
let overlay = document.querySelector(".overlay");
let content = document.querySelector(".speak-page h1"); 

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-IN"; 
  window.speechSynthesis.speak(text_speak); // 
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  speakpage.style.display="none"
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript; 
  content.innerHTML = transcript; 
  takeCommand(transcript.toLowerCase())
};

function takeCommand(message){
  if(message.includes("open")&& message.includes("chat")){
    speak("ok sir")
    chatbox.classList.add("active-chat-box")
  }
}
ai.addEventListener("click", () => {
  speakpage.classList.toggle("active-speak-page");
  overlay.classList.toggle("active");
  recognition.start(); // 
});