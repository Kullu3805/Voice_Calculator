const inputText = document.getElementById("inputText");
    const resultText = document.getElementById("resultText");

    // Converts spoken words to math symbols
    function wordsToMath(expression) {
      return expression
        .toLowerCase()
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/times|into|multiply by/g, "*")
        .replace(/divided by|divide by|over/g, "/")
        .replace(/modulo|mod/g, "%")
        .replace(/power of|to the power of/g, "**")
        .replace(/[^0-9+\-*/%.() ]/g, ""); // Remove unknown words
    }

    function startListening() {
      if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported. Try Chrome.");
        return;
      }

      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        inputText.textContent = "🗣 " + spoken;

        try {
          const mathExpr = wordsToMath(spoken);
          const result = eval(mathExpr);
          resultText.textContent = result;
        } catch (e) {
          resultText.textContent = "❌ Error";
        }
      };

      recognition.onerror = (event) => {
        inputText.textContent = "❌ Error: " + event.error;
        resultText.textContent = "0";
      };
    }