document.addEventListener("DOMContentLoaded", function() {
    const text = [
        ">> Hi! I'm a soon-to-be graduate of UC Berkeley, where I'm completing a double major in Mathematics and Computer Science, plus a minor in Spanish. I have a deep love for math, particularly pure mathematics including mathematical logic and computation theory, and I enjoy applying these concepts to complex problems in computing.\n\n",
        ">> I find the most rewarding experiences come from working in teams where collaboration sparks innovation. Throughout my academic journey, I’ve had the chance to lead, teach, and learn from others, which drives my passion for continuous growth in the tech world.\n\n",
        ">> Outside the realm of code, I immerse myself in the arts. Whether it’s performing in a classical chorus, playing guitar, studying realism, or learning new crafts like embroidery and knitting, these activities keep my creativity flowing and influence how I approach problem-solving in software.\n\n",
        ">> I’m excited to bring my skills and enthusiasm to a software development role, where I can continue learning and contribute to impactful projects. Let’s build something great together!\n"
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
    let isResized = false;
    
    // Function to set content and height dynamically
    function computeHeight() {
        target.innerHTML = asciiArt2 + text.join("") + asciiArt; // Set the full content temporarily
        const finalHeight = target.scrollHeight; // Calculate height
        target.style.height = `${finalHeight}px`; // Set the height
        target.innerHTML = asciiArt2 + '<span class="cursor"></span>'; // Reset to ASCII Art 2 and clear text
    }

    // Set the height initially
    computeHeight();

    // Resize handler
    window.addEventListener("resize", function() {
        computeHeight(); // Recalculate height on resize
        displayFullText(); // Show the full text without retyping after resize
    });

    // Function to display full text without the typewriter effect (after resize)
    function displayFullText() {
        target.innerHTML = asciiArt2 + text.join("") + asciiArt + '<span class="cursor blink"></span>';
    }

    // Typewriter effect
    function typeWriter() {
        if (isResized) {
            displayFullText(); // Show full text if resized
            return;
        }

        const currentText = text[i].trimStart();
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
            target.innerHTML = target.innerHTML.replace('<span class="cursor"></span>', '') + asciiArt + '<span class="cursor blink"></span>';
        }
    }

    // Initially run the typewriter effect
    typeWriter();
});
