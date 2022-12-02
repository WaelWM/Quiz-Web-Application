(function() {
    var questions = [{
      question: "Which country features a maple leaf on its flag?",
      choices: ["Canada", "France", "US", "Germany"],
      correctAnswer: 0
    }, {
      question: "Who wrote the 'Harry Potter' series?",
      choices: ["Enid Blyton", "Roald Dahl", "JK Rowling", "Dr. Seuss"],
      correctAnswer: 2
    }, {
      question: "What chemical element is diamond made of?",
      choices: ["iron", "gold", "hydrogen", "carbon"],
      correctAnswer: 3
    },
    
    {
        question: "What is the largest ocean in the world?",
        choices: ["The Indian ocean", "The Pacific Ocean", "Atlantic Ocean", "The Southern Antarctic Ocean"],
        correctAnswer: 1
    },
    
    
    {
      question: "What is the name of the 'tool' needed to play snooker or billiards to hit the ball?",
      choices: ["cue", "curb", "snooker tool","cue ball"],
      correctAnswer: 0
    }, {
      question: "What part of the body produces insulin?",
      choices: ["liver", "kidney", "pancreas","intestines"],
      correctAnswer: 2
    }];
    
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
    

    displayNext();
    

    $('#next').on('click', function (e) {
      e.preventDefault();

      if(quiz.is(':animated')) {        
        return false;
      }
      choose();

      
      if (isNaN(selections[questionCounter])) {
        alert('You must answer the question before proceeding to the next one!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }

    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
    }
    return radioList;
    }
    
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    

    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          

          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    

    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                questions.length + ' right! Congrats! (;');
      return score;
    }
  })();