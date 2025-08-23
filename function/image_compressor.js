let image_url = null;
let compressedBlob = null; // store compressed image globally

function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function(e) {
    img.src = e.target.result;
  };

  img.onload = function() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let width = img.width;
    let height = img.height;

    // Resize if too large
    const MAX_SIZE = 1000;
    if (width > MAX_SIZE || height > MAX_SIZE) {
      if (width > height) {
        height *= MAX_SIZE / width;
        width = MAX_SIZE;
      } else {
        width *= MAX_SIZE / height;
        height = MAX_SIZE;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    // Compress until <= 1MB
    let quality = 0.9;
    let dataUrl = canvas.toDataURL("image/jpeg", quality);

    while (dataURLtoBlob(dataUrl).size > 1024 * 1024 && quality > 0.1) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
    }

    // Save compressed blob for upload
    compressedBlob = dataURLtoBlob(dataUrl);

    // Show preview of compressed image
    document.getElementById("output").src = dataUrl;
  };

  reader.readAsDataURL(file);
}

function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}











// ⬆️ Upload compressed image to Discord
function uploadToDiscord(month, datenow) {
  if (!compressedBlob) {
    alert("Please select an image first!");
    return;
  }

  const webhookURL = receipt_webhook; // <-- replace this

  const formData = new FormData();
  formData.append("file", compressedBlob, "compressed.jpg");
  let label = "📷 receipt upload : "+ month +" , "+ datenow
  formData.append("payload_json", JSON.stringify({ content: label}));

  fetch(webhookURL, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.attachments && data.attachments.length > 0) {
      const fileUrl = data.attachments[0].url; // <-- public Discord CDN URL
      console.log("✅ Public URL:", fileUrl);

      // store it as string
      let storedUrl = fileUrl;  
    //   alert("DONE!");
    
      add_expense_table(spend_description.value, spend_amount.value, storedUrl)


      // you can also send `storedUrl` to your DB, localStorage, etc.
      localStorage.setItem("lastUploadedUrl", storedUrl);
    } else {
      alert("❌ Uploaded, but no file URL returned.");
    }
  })
  .catch(err => {
    console.error(err);
    alert("⚠️ Error uploading to Discord.");
  });
}
