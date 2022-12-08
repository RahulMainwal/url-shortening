const loading = () => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
};

const postUrl = async (link) => {
  document.getElementById("generate-btn").setAttribute("disabled", true);
  document.getElementById("generate-btn").innerText = "Loading....";
  try {
    const data = await fetch("/url", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        link,
      }), //
    });

    const response = await data.json();
    console.log();
    if (response.error) {
      document.getElementById("generate-btn").removeAttribute("disabled");
      document.getElementById("generate-btn").innerText = "Generate";
      document.getElementById("generated-link").innerText = "";
      document.getElementById("generated-link").removeAttribute("href");
      alert("Please enter something here");
    } else {
      document.getElementById("generate-btn").removeAttribute("disabled");
      document.getElementById("generate-btn").innerText = "Generate";
      document.getElementById("generated-link").innerText =
        "https://" + window.location.hostname + "/" + response.urlId;
      document
        .getElementById("generated-link")
        .setAttribute(
          "href",
          "https://" + window.location.hostname + "/" + response.urlId
        );
    }
  } catch (error) {
    alert("Something went wrong & try again!");
  }
};

document.getElementById("generate-btn").onclick = () => {
  postUrl(document.getElementById("generate-input").value);
};
