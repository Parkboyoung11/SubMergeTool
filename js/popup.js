/* 
* Author    : 9fury
* Facebook  : fb.com/sonvuhong9fury
*/

$("#merge").on('click', function(){
    MergeSub();
})

function MergeSub(){
    var timeFile = document.getElementById("time-file").files[0];
    var textFile = document.getElementById("text-file").files[0];

    var timeReader = new FileReader();
    timeReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var timeArray = textFromFileLoaded.split(/\r?\n/);

        var textReader = new FileReader();
        textReader.onload = function(fileLoadedEvent){
            var textFromFileLoaded = fileLoadedEvent.target.result;
            var textArray = textFromFileLoaded.split(/\r?\n/);

            var merged_text = '';
            for (var i = 0; i < timeArray.length; i++) {
                if(timeArray[i].includes('Dialogue')) {
                    timeArray[i] = ReplaceText(timeArray[i], textArray[0]);
                    textArray.shift();
                }
                merged_text = merged_text + timeArray[i] + "\n";
            }
            CreateDownload('sub.ass', merged_text);
        };

        textReader.readAsText(textFile, "UTF-8");
        
    };

    timeReader.readAsText(timeFile, "UTF-8");
}

function CreateDownload(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function ReplaceText(old, correct) {
  var count = 0;
  var index = 0;
  while(count < 9 ) {
    index = old.indexOf(',', (index + 1));
    count++;
  }
  var head = old.slice(0, index + 1);
  return head + correct;
}













