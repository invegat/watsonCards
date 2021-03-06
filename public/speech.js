// Filename: public/hearit.js

angular.module('HearItApp', [])
.controller('HearItCtrl', ['$scope', function($scope) {
  var wordList = ['a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for', 'funny', 'go', 'help', 'here', 'I', 'in', 'is', 'it', 'jump', 'little', 'look', 'make', 'me', 'my', 'not', 'one', 'play', 'red', 'run', 'said', 'see', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 'yellow', 'you'];
  var audio = document.getElementById('audio');
  var wavsource = document.getElementById('wavsource');
  var tryAgain =document.getElementById('tryAgain');
  var goodJob =document.getElementById('goodJob');
  $scope.score = 0;
  $scope.attempt = 0;

  $scope.loadSet = function() {
    // Shuffle the word list.
    for(var j, x, i = wordList.length; i; j = Math.floor(Math.random() * i), x = wordList[--i], wordList[i] = wordList[j], wordList[j] = x);

    $scope.wordSet = wordList.slice(0,4);
    $scope.selectedWord = $scope.wordSet[Math.floor(Math.random()*$scope.wordSet.length)];
    $scope.attempt = 0;

    wavsource.src = '/api/speak?text=Click+the+word+'+$scope.selectedWord;
    wavsource2.src='/api/speak?text=Please+Try+Again!';
    wavsource3.src='/api/speak?text=good+job';

    audio.load();
    setTimeout(function(){
       audio.play();
   }, 1000);

  }

  $scope.loadSet();

  $scope.checkAnswer = function(word) {
    if(word == $scope.selectedWord) {
      goodJob.play();
      if($scope.attempt == 0)
        $scope.score++;
      $scope.loadSet();
    } else {
      tryAgain.play();
      $scope.attempt++;
    }
  }
}]);
