var encodedString;
var endpoint = "https://api.perka.com/1/communication/job/apply";

function handlefile(e) {

  let file = e.target.files[0];

  let reader = new FileReader();

  reader.onloadend = () => {

    //console.log(reader.result);
    encodedString = reader.result;
  }
  reader.readAsDataURL(file);
}

$("#myForm").submit(function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  let obj = {};

  for (const [key, value] of formData.entries()) {
    if (key === "projects" && value) {
      let arr = value.split(",").map((link) => link.trim());
      obj[key] = arr;
    } else if (key === "resume" && value) {
      obj[key] = encodedString;
    } else {
      if (value) obj[key] = value;
    }
  }

  var job = JSON.stringify(obj);

  console.log(job)


  $.ajax({
    url: endpoint,
    type: "POST",
    data: job,
    dataType: "JSON",
    contentType: "application/json; charset=utf-8",
    success: function () {
      console.log("Posted Sucessfully")
    }
  });

})