function playVideo() {
    document.getElementById("thumb").style.display = "none";
    document.querySelector(".play-btn").style.display = "none";

    let video = document.getElementById("video");
    video.style.display = "block";
    video.play();
}