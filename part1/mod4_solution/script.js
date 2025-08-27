(function () {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();
    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  function generateGreeting(name) {
    var firstLetter = name.charAt(0).toLowerCase();
    return firstLetter === "j"
      ? byeSpeaker.speakSimple(name)
      : helloSpeaker.speakSimple(name);
  }

  var greetings = names.map(generateGreeting);
  for (var g = 0; g < greetings.length; g++) {
    console.log(greetings[g]);
  }
})();
