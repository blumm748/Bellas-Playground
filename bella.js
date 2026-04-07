    window.onload = function() {
    const bubbleOptions = [
    "Ba. Ba.",
    "God!",
    "Weeeee Weeee.",
    "Squish. Squish.",
    "Chog! Chog! Run Chog!",
    "Dead.",
    "Poor Bella. But love God.",
    "Bella go look at world.",
    "God. Sun. Outside we must go.",
    "Why you funny thumbs God?",
    "Blood.",
    "Now!!! Now!!!",
    "Kill it.",
    "God lovely. Like dog face."
    ];

    const element = document.querySelector(".bubbleBella");
    const randomIndex = Math.floor(Math.random() * bubbleOptions.length);

    element.textContent = bubbleOptions[randomIndex];
  };