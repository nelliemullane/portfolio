document.addEventListener("DOMContentLoaded", function() {
  const text = [
    ">> Hi! I'm a recent graduate of UC Berkeley with a double major in Mathematics and Computer Science and a minor in Spanish. I have a deep love for math, particularly pure mathematics, including mathematical logic and computation theory, and I enjoy applying these concepts to complex computing problems.\n\n",
    
    ">> I thrive in collaborative environments where teamwork fuels innovation. Whether leading development, teaching others, or tackling new challenges, I’m always eager to grow and contribute to meaningful projects.\n\n",
    
    ">> Beyond coding, I immerse myself in the arts—singing in a classical chorus, playing guitar, and exploring visual arts like charcoal drawing and fiber art. Creativity shapes my approach to problem-solving, and I'm excited to bring my skills and passion to a dynamic software development team.\n"
  ];
  
  
    const asciiArt = `<pre class="ascii-art">
      __________
    / ___________ \\
    | | -       | |
    | |         | |
    | |_________| |________________________
    \\=____________/  Thanks for visiting!  )
    / """"""""""" \\                       /
   / ::::::::::::: \\                  =D-'
  (_________________)
  </pre>`;
  
    const asciiArt2 = `<pre class="ascii-art">
    ___  _                 _    ___  ___     
   / _ \\| |               | |   |  \\/  |     
  / /_\\ \\ |__   ___  _   _| |_  | .  . | ___ 
  |  _  | '_ \\ / _ \\| | | | __| | |\\/| |/ _ \\
  | | | | |_) | (_) | |_| | |_  | |  | |  __/
  \\_| |_/_.__/ \\___/ \\__,_|\\__| \\_|  |_/\\___|
  </pre>`;
  
    let i = 0;
    let j = 0;
    let isTag = false;
    const speed = 10;
    const target = document.getElementById("about-terminal");
    const cursor = document.querySelector(".cursor");
  
    // Clear any existing cursor and add ASCII title at the start
    target.innerHTML = asciiArt2 + '<span class="cursor"></span>';
  
    function typeWriter() {
      const currentText = text[i].trimStart(); // Trim start to avoid indentation
      if (j < currentText.length) {
        const char = currentText.charAt(j);
        if (char === '<') {
          isTag = true;
        }
        if (!isTag) {
          target.innerHTML = target.innerHTML.replace('<span class="cursor"></span>', '') + char + '<span class="cursor"></span>';
        }
        if (char === '>') {
          isTag = false;
        }
        j++;
        setTimeout(typeWriter, speed);
      } else if (i < text.length - 1) {
        i++;
        j = 0;
        setTimeout(typeWriter, speed);
      } else {
        // Append ASCII art after text
        target.innerHTML = target.innerHTML.replace('<span class="cursor"></span>', '') + asciiArt + '>> ' + '<span class="cursor blink"></span>';
      }
    }
  
    typeWriter();
  });


  // Define the Tape and TuringMachine classes
  class Tape {
    constructor(tapeString = "", blankSymbol = " ") {
        this.tape = {};
        for (let i = 0; i < tapeString.length; i++) {
            this.tape[i] = tapeString[i];
        }
        this.blankSymbol = blankSymbol;
    }
  
    toString() {
        const maxIndex = Math.max(...Object.keys(this.tape).map(Number), -1);
        let result = "";
        for (let i = 0; i <= maxIndex; i++) {
            result += this.tape[i] || this.blankSymbol;
        }
        return result;
    }
  
    fancyPrint(headPosition, currentState) {
        const maxIndex = Math.max(...Object.keys(this.tape).map(Number), headPosition);
        const tapeContent = [];
        const tapeMarkers = [];
  
        for (let i = 0; i <= maxIndex; i++) {
            tapeContent.push(this.tape[i] || this.blankSymbol);
            tapeMarkers.push(i === headPosition ? "^" : " ");
        }
  
        return `State: ${currentState}\n` +
               tapeContent.join(" ") + "\n" +
               tapeMarkers.join(" ");
    }
  
    get(pos) {
        return this.tape[pos] || this.blankSymbol;
    }
  
    set(pos, char) {
        this.tape[pos] = char;
    }
  }
  

class TuringMachine {
  constructor(tape = "", blankSymbol = " ", initialState = "", finalStates = new Set(), transitionFunction = {}) {
      this.tape = new Tape(tape, blankSymbol);
      this.headPosition = 0;
      this.currentState = initialState;
      this.finalStates = finalStates;
      this.transitionFunction = transitionFunction;
      this.stepCount = 0;
  }

  step() {
      const charUnderHead = this.tape.get(this.headPosition);
      const transition = this.transitionFunction[`${this.currentState},${charUnderHead}`];

      if (!transition || this.finalStates.has(this.currentState)) return;

      const [newState, writeChar, moveDirection] = transition;
      this.tape.set(this.headPosition, writeChar);
      this.currentState = newState;

      if (moveDirection === "R") {
          this.headPosition += 1;
      } else if (moveDirection === "L") {
          this.headPosition -= 1;
      }

      this.stepCount++;
  }

  run() {
      while (!this.finalStates.has(this.currentState)) {
          this.step();
      }
      return this.currentState;
  }

  getTape() {
      return this.tape.toString();
  }

  getSteps() {
      return this.stepCount;
  }
  final() {
    // Checks if the current state is a final state
    return this.finalStates.has(this.currentState);
}
}

document.addEventListener("DOMContentLoaded", () => {
  const tmsConfig = {
    "tm-section-1": {
      
      initialState: "q0",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "q0,0": ["q0", "0", "R"],
        "q0,1": ["q1", "1", "R"],
        "q1,0": ["q1", "0", "R"],
        "q1,1": ["q0", "1", "R"],
        "q1, ": ["accept", " ", "R"],
        "q0, ": ["reject", " ", "R"],
      },
    },
    "tm-section-2": {
      initialState: "qs",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "qs,0": ["q0", "$", "R"],
        "qs,1": ["q1", "$", "R"],
        "q0,0": ["q0", "0", "R"],
        "q0,1": ["q1", "0", "R"],
        "q0, ": ["accept", "0", "R"],
        "q1,1": ["q1", "1", "R"],
        "q1,0": ["q0", "1", "R"],
        "q1, ": ["accept", "1", "R"],
      },
    },
    "tm-section-3": {
      initialState: "read",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "read,0": ["runr0", "X", "R"],
        "read,1": ["runr1", "X", "R"],
        "read,#": ["checkend", "#", "R"],
        "runr0,0": ["runr0", "0", "R"],
        "runr0,1": ["runr0", "1", "R"],
        "runr1,0": ["runr1", "0", "R"],
        "runr1,1": ["runr1", "1", "R"],
        "runr0,#": ["findr0", "#", "R"],
        "runr1,#": ["findr1", "#", "R"],
        "findr0,X": ["findr0", "X", "R"],
        "findr1,X": ["findr1", "X", "R"],
        "findr0,0": ["runl", "X", "L"],
        "findr1,1": ["runl", "X", "L"],
        "findr0,1": ["reject", "1", "R"],
        "findr1,0": ["reject", "0", "R"],
        "findr0, ": ["reject", " ", "R"],
        "findr1, ": ["reject", " ", "R"],
        "runl,X": ["runl", "X", "L"],
        "runl,#": ["findl", "#", "L"],
        "findl,0": ["findl", "0", "L"],
        "findl,1": ["findl", "1", "L"],
        "findl,X": ["read", "X", "R"],
        "checkend,X": ["checkend", "X", "R"],
        "checkend,0": ["reject", "0", "R"],
        "checkend,1": ["reject", "1", "R"],
        "checkend, ": ["accept", " ", "R"],
      },
    },

    "tm-section-4": {
      initialState: "q0",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "q0, ": ["accept", "1", "R"],
        "q0,0": ["accept", "1", "R"],
        "q0,1": ["q1", "0", "R"],
        "q1,1": ["q1", "0", "R"],
        "q1, ": ["accept", "1", "R"],
        "q1,0": ["accept", "1", "R"],
      },
    },

    "tm-section-5": {
      initialState: "q0",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "q0, ": ["accept", "0", "R"],
        "q0,1": ["q1", "S", "R"],
        "q1,1": ["q1", "1", "R"],
        "q1, ": ["q2", "E", "R"],
        "q2, ": ["q3", "1", "R"],
        "q3, ": ["q3", " ", "L"],
        "q3,1": ["q3", "1", "L"],
        "q3,0": ["q3", "0", "L"],
        "q3,X": ["q4", "X", "R"],
        "q3,S": ["q4", "S", "R"],
        "q3,E": ["q7", "E", "L"],
        "q4,1": ["q5", "X", "R"],
        "q5,1": ["q5", "1", "R"],
        "q5,E": ["q6", "E", "R"],
        "q6,1": ["q6", "0", "R"],
        "q6,0": ["q3", "1", "L"],
        "q6, ": ["q3", "1", "L"],
        "q7,S": ["q8", "S", "R"],
        "q7,X": ["q8", "X", "R"],
        "q7,1": ["q3", "1", "L"],
        "q8,E": ["q9", "E", "R"],
        "q9,X": ["q9", "X", "R"],
        "q9,1": ["q10", "X", "L"],
        "q9,0": ["q11", "X", "L"],
        "q9, ": ["q17", " ", "L"],
        "q10,X": ["q10", "X", "L"],
        "q10,E": ["q12", "E", "L"],
        "q11,X": ["q11", "X", "L"],
        "q11,E": ["q13", "E", "L"],
        "q12,X": ["q12", "X", "L"],
        "q12,S": ["q16", "1", "R"],
        "q12,0": ["q14", "0", "R"],
        "q12,1": ["q14", "1", "R"],
        "q13,X": ["q13", "X", "L"],
        "q13,0": ["q15", "0", "R"],
        "q13,1": ["q15", "1", "R"],
        "q13,S": ["q16", "0", "R"],
        "q14,X": ["q16", "1", "R"],
        "q15,X": ["q16", "0", "R"],
        "q16,0": ["q16", "0", "R"],
        "q16,1": ["q16", "1", "R"],
        "q16,X": ["q16", "X", "R"],
        "q16,E": ["q9", "E", "R"],
        "q17,X": ["q18", " ", "L"],
        "q18,X": ["q18", " ", "L"],
        "q18,E": ["q19", " ", "L"],
        "q19,X": ["q19", " ", "L"],
        "q19,0": ["accept", "0", "L"],
        "q19,1": ["accept", "1", "L"],
      },
    },

    "tm-section-6": {
      initialState: "q0",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "q0,a": ["qS", "S", "R"],
        "q0,b": ["reject", "b", "R"],
        "q0,c": ["reject", "c", "R"],
        "q0, ": ["reject", " ", "R"],
        "qS,a": ["q1", "a", "R"],
        "qS,b": ["q2", "b", "R"],
        "qS,c": ["reject", "c", "R"],
        "q1,a": ["q1", "a", "R"],
        "q1,c": ["reject", "c", "R"],
        "q1,b": ["q2", "b", "R"],
        "q1, ": ["reject", " ", "R"],
        "q2,b": ["q2", "b", "R"],
        "q2,a": ["reject", "a", "R"],
        "q2,c": ["q3", "c", "R"],
        "q2, ": ["reject", " ", "R"],
        "q3,c": ["q3", "c", "R"],
        "q3,a": ["reject", "a", "R"],
        "q3,b": ["reject", "b", "R"],
        "q3, ": ["q4", " ", "L"],
        "q4,b": ["q4", "b", "L"],
        "q4,a": ["q4", "a", "L"],
        "q4,c": ["q4", "c", "L"],
        "q4,S": ["q5", "S", "R"],
        "q5,a": ["q5", "a", "R"],
        "q5,b": ["q6", "X", "R"],
        "q5,X": ["qX", "X", "R"],
        "qX,X": ["qX", "X", "R"],
        "qX,b": ["q6", "X", "R"],
        "qX,c": ["q7", "X", "R"],
        "qX, ": ["reject", " ", "R"],
        "q6,b": ["q6", "b", "R"],
        "q6,c": ["q7", "X", "R"],
        "q6,X": ["qX", "X", "R"],
        "q7,c": ["q7", "c", "R"],
        "q7, ": ["q8", " ", "L"],
        "q8,X": ["q8", "X", "L"],
        "q8,a": ["q8", "a", "L"],
        "q8,b": ["q8", "b", "L"],
        "q8,c": ["q8", "c", "L"],
        "q8,S": ["q9", "S", "R"],
        "q9,a": ["q5", "X", "R"],
        "q9,c": ["reject", "c", "R"],
        "q9, ": ["reject", " ", "R"],
        "q9,X": ["q9", "X", "R"],
        "q9,b": ["q10", "X", "R"],
        "q10,b": ["q10", "b", "R"],
        "q10,X": ["q11", "X", "R"],
        "q11,X": ["q11", "X", "R"],
        "q11,c": ["q12", "X", "R"],
        "q12,c": ["q12", "c", "R"],
        "q12, ": ["q13", " ", "L"],
        "q13,c": ["q13", "c", "L"],
        "q13,b": ["q13", "b", "L"],
        "q13,X": ["q13", "X", "L"],
        "q13,S": ["q14", "S", "R"],
        "q14,X": ["q14", "X", "R"],
        "q14,c": ["accept", "c", "R"],
        "q14,b": ["q10", "X", "R"],
        "q14, ": ["reject", " ", "R"],
      },
    },

    "tm-section-7": {
      initialState: "q1",
      finalStates: new Set(["accept", "reject"]),
      transitionFunction: {
        "q1, ": ["reject", " ", "R"],
        "q1,X": ["reject", "X", "R"],
        "q1,a": ["q2", " ", "R"],
        "q2,X": ["q2", "X", "R"],
        "q2, ": ["accept", " ", "R"],
        "q2,a": ["q3", "X", "R"],
        "q3,X": ["q3", "X", "R"],
        "q3,a": ["q4", "a", "R"],
        "q3, ": ["q5", " ", "L"],
        "q4,X": ["q4", "X", "R"],
        "q4, ": ["reject", " ", "R"],
        "q4,a": ["q3", "X", "R"],
        "q5,X": ["q5", "X", "L"],
        "q5,a": ["q5", "a", "L"],
        "q5, ": ["q2", " ", "R"],
      },
    },
    
  };

  Object.keys(tmsConfig).forEach((sectionId) => {
    const runButton = document.querySelector(`#${sectionId} .tm-run-btn`);
    const inputField = document.querySelector(`#${sectionId} .tm-input`);
    const tapeLogContainer = document.querySelector(`#${sectionId} .tm-log`);
    const stateField = document.querySelector(`#${sectionId} .tm-state`);
    const tapeField = document.querySelector(`#${sectionId} .tm-tape`);
    const stepsField = document.querySelector(`#${sectionId} .tm-steps`);
    const resultField = document.querySelector(`#${sectionId} .tm-result`);

    if (!runButton || !inputField || !tapeLogContainer || !stateField || !tapeField || !stepsField || !resultField) {
      console.error(`Missing elements in ${sectionId}`);
      return;
    }

    runButton.addEventListener("click", () => {
      const input = inputField.value.trim();
      if (!input) {
        alert("Please enter a valid tape input.");
        return;
      }

      tapeLogContainer.innerHTML = "";
      stateField.innerText = "";
      tapeField.innerText = "";
      stepsField.innerText = "";
      resultField.innerText = "";

      const { initialState, finalStates, transitionFunction } = tmsConfig[sectionId];
      const turingMachine = new TuringMachine(input, " ", initialState, finalStates, transitionFunction);

      const delay = 500;

      const stepInterval = setInterval(() => {
        if (turingMachine.finalStates.has(turingMachine.currentState)) {
          clearInterval(stepInterval);

          stateField.innerText = turingMachine.currentState;
          tapeField.innerText = turingMachine.getTape();
          stepsField.innerText = turingMachine.getSteps();
          resultField.innerText = turingMachine.currentState === "accept" ? "Accepted" : "Rejected";
        } else {
          const logEntry = document.createElement("pre");
          logEntry.textContent = turingMachine.tape.fancyPrint(turingMachine.headPosition, turingMachine.currentState);
          tapeLogContainer.appendChild(logEntry);

          turingMachine.step();
        }
      }, delay);
    });
  });
});
