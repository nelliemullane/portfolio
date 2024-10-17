document.addEventListener("DOMContentLoaded", function() {
  const text = [" >> Hi! I'm a soon-to-be graduate of UC Berkeley, where I'm completing a double major in Mathematics and Computer Science, plus a minor in Spanish. I have a deep love for math, particularly pure mathematics including mathematical logic and computation theory, and I enjoy applying these concepts to complex problems in computing.\n\n",
        ">> I find the most rewarding experiences come from working in teams where collaboration sparks innovation. Throughout my academic journey, I’ve had the chance to lead, teach, and learn from others, which drives my passion for continuous growth in the tech world.\n\n",
        ">> Outside the realm of code, I immerse myself in the arts. Whether it’s performing in a classical chorus, playing guitar, studying realism, or learning new crafts like embroidery and knitting, these activities keep my creativity flowing and influence how I approach problem-solving in software.\n\n",
        ">> I’m excited to bring my skills and enthusiasm to a software development role, where I can continue learning and contribute to impactful projects. Let’s build something great together!\n"];

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

  let i = 0;
  let j = 0;
  let isTag = false;
  const speed = 10; // Typing speed in milliseconds
  const target = document.getElementById("about-terminal");
  const cursor = document.querySelector(".cursor");

  // Clear any existing cursor
  target.innerHTML = '<span class="cursor"></span>';

  function typeWriter() {
      const currentText = text[i];
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
          // Add the ASCII art to the terminal after typing out the text
          target.innerHTML = target.innerHTML.replace('<span class="cursor"></span>', '') + asciiArt.trim() + '<span class="cursor blink"></span>';
      }
  }

  typeWriter();
});
