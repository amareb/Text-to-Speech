const inputText = document.getElementById("input-text");
const speakButton = document.getElementById("speak-button");
const stopButton = document.getElementById("stop-button");
const audio = document.getElementById("audio");

const synth = window.speechSynthesis;

let currentUtterance = null;

// Function to handle speech synthesis
const handleSpeech = () => {
  const text = inputText.value.trim();
  if (text) {
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
      audio.src = URL.createObjectURL(new Blob([text], { type: "audio/wav" }));
      audio.style.display = "block";
    };

    synth.speak(utterance);
    inputText.style.borderColor = "";
    inputText.style.backgroundColor = "";
  } else {
    inputText.style.borderColor = "red";
    inputText.style.backgroundColor = "#f7a3b7";
  }
};

// Event listener for the speak button
speakButton.addEventListener("click", handleSpeech);

// Event listener for the stop button
stopButton.addEventListener("click", () => {
  if (currentUtterance) {
    synth.cancel();
    currentUtterance = null;
  }
});

// Event listener for when the speech synthesis ends
synth.addEventListener("end", () => {
  if (currentUtterance) {
    audio.src = URL.createObjectURL(
      new Blob([currentUtterance.text], { type: "audio/wav" })
    );
    audio.style.display = "block";
  }
});

// Function to handle key press (Enter key to start speaking)
inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSpeech();
  }
});

// Function to clear the input text
const clearInput = () => {
  inputText.value = "";
  inputText.style.borderColor = "";
  inputText.style.backgroundColor = "";
  audio.style.display = "none";
  audio.src = "";
};

// Adding a clear button for convenience
const clearButton = document.createElement("button");
clearButton.textContent = "Clear";
clearButton.addEventListener("click", clearInput);
document.body.appendChild(clearButton);
