let submit = document.getElementById("submit");
let languageSelect = document.getElementById("language");
let inputBox = document.getElementById("code");
let input = document.getElementById("input")
let submitButton = document.getElementById("submit-button");
let question = document.getElementById("question")
let outputArea = document.getElementById("out")

inputBox.focus()

let data = "";
let testIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];

localStorage.clear()
localStorage.setItem("1", "[ [1, 2, 3],[4, 5, 6],[7, 8, 9] ]=21\n");
localStorage.setItem("2", "eeshwarakarunyavannaaamvallabhan=9\n");
localStorage.setItem("3", "100=927372692193078999175\n");
localStorage.setItem("4", "E F G K=+ 75 32 71 10 70 32 69\n");
localStorage.setItem("5", "Hello Juliet=Ecjjm Gsjgcr\n");
localStorage.setItem("6", "6 [3,1,4,6,2,3]=2\n");
localStorage.setItem("7", "{ {2, 1, 0, 2, 1}, {1, 0, 1, 2, 1}, {1, 0, 0, 2, 1}}=2\n");
localStorage.setItem("8", "2 5 1 2 1 3 3 4 3 5 8 1 2 2 3 3 4 1 5 5 6 5 7 7 8=6 11\n");
localStorage.setItem("9", "7 [3, 1, 4, 1, 5, 9, 2]=6\n");
localStorage.setItem("10","4=hii\n")

let language = languageSelect.options[languageSelect.selectedIndex].value;

languageSelect.addEventListener("change", () => {
  language = languageSelect.options[languageSelect.selectedIndex].value;
});

submitButton.addEventListener("click", () => {
  data = `${inputBox.value}`;
  let inp = input.value;
  get(data, language,inp);
  input.value = ""
});

let final_out = "";
let inp;
let q_id;
// q_id = question.innerText
console.log(question.textContent.split(".")[0])
submit.addEventListener("click", () => {
  data = `${inputBox.value}`;
  q_id = question.textContent.split(".")[0]
//   q_id = "10"
  inp = localStorage.getItem(q_id.trim());
  let ip = inp.split("=")[0]
  let ot = inp.split("=")[1]
  console.log(ip,ot)
  hidden(data, language, ip,ot);
});

async function get(data, language,inp) {

  let code = Qs.stringify({
    code: data,
    language: language,
    input: inp
  });
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: code,
  };

  axios(config)
    .then(function (response) {
      let json = JSON.stringify(response.data);
      console.log(json);
      outputArea.innerText = JSON.parse(json).output;
    })
    .catch(function (error) {
      console.log(error);
    });
}


function failed(msg,color) { 
 
  Swal.fire({
    title: msg,
    background: "#19191a",
    color: color,
    showCancelButton: true,
  });
}


async function hidden(data, language, ip ,op) {
    console.log(ip,op)
  let code = Qs.stringify({
    code: data,
    language: language,
    input: ip,
  });
  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: code,
  };

  axios(config)
    .then(function (response) {
      let json = JSON.stringify(response.data);
      // console.log(json)
      let out = JSON.parse(json).output;

    //   let t1 = localStorage.getItem(ip);
      let green ="green"
      let red ="red"
      if (language == "c") {
        // console.log(op,out)
        final_out = op.split("\n")[0];
        
        final_out == out ? failed("success",green) : failed("testcase failed",red);
      } else {
        // console.log(op,out)
        op == out ? failed("success",green) : failed("testcase failed",red);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
