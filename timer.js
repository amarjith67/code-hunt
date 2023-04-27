// Set the date and time to countdown to (in UTC)
      var countdownDate = new Date("April 28, 2023 16:00:00").getTime();

      // Update the countdown every second
      var x = setInterval(function() {

        // Get the current date and time (in UTC)
        var now = new Date().getTime();

        // Calculate the difference between the current date and time and the countdown date and time
        var distance = countdownDate - now;

        // Calculate the hours, minutes, and seconds remaining
        var hours = Math.floor(distance / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the remaining time in the format of "hr:min:sec"
        document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds;

        // If the countdown is finished, redirect to specified local file
        if (distance < 0) {
          clearInterval(x);
          window.location.href = "last.html";
        }
      }, 1000);