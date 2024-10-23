function setEchoCount(val){
  stringCount = int(map(val, 0, 100, 1, 20));

  createStringPoints();

  document.getElementById("echoCountText").textContent = "Echo Count " + stringCount;
}