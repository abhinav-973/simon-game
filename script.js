const button = ["green", "red", "yellow", "blue"];
let list = [];
let started = false;
let level = 1;
let userStep = 0;

const randomBtn = () => {
  let idx = Math.floor(Math.random() * 4);
  return button[idx]; // return the color directly
};

function playNextSequence() {
  const color = randomBtn();
  list.push(color);

  let text = document.getElementById("level-title");
  text.innerHTML = `Level ${level}`;

  let btn = document.getElementById(color);
  btn.classList.add("pressed");

  var audio = new Audio(`sounds/${color}.mp3`);
  audio.play();

  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 160);
}

document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    playNextSequence();
  }
});

const btns = document.getElementsByClassName("btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    if (!started || level > 10) return;

    const clickedColor = this.id;
    const expectedColor = list[userStep];

    if (clickedColor === expectedColor) {
      // Correct step
      this.classList.add("pressed");
      var audio = new Audio(`sounds/${clickedColor}.mp3`);
      audio.play();
      setTimeout(() => {
        this.classList.remove("pressed");
      }, 160);

      userStep++;

      if (userStep === list.length) {
        level++;
        userStep = 0;

        if (level > 10) {
          document.getElementById("level-title").innerHTML = "🎉 You WON! 🎉";
          return;
        }

        setTimeout(() => {
          playNextSequence();
        }, 500);
      }
    } else {
      // Wrong step
      document.getElementById("level-title").innerHTML = "❌ Game Over!";
      document.body.classList.add("game-over");
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 100);
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      started = false;
      list = [];
      level = 1;
      userStep = 0;
    }
  });
}
