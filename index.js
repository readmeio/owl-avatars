var express = require('express');
var md5 = require('md5');
var fs = require('fs');
var app = express();

app.get('/', function (req, res, next) {
    var hash = md5("HELLO" + Math.random());
    res.send("<img src='"+hash+".svg'><style>img { height: 400px;display:block;margin:150px auto 0; }</style>");
});

app.get('/:avatar.svg', function (req, res, next) {
  var colors = [
    ['#f9A02D', '#47AE5F', '#318348', '#184E26'],
    ['#D92D28', '#CAE242', '#656623', '#314E2A'],
    ['#E27E25', '#EDBD7F', '#A6855C', '#6A553D'],
    ['#D92D28', '#BE9F5C', '#D9D593', '#51321C'],
    ['#E89E38', '#ACA07E', '#53493E', '#781353'],
    ['#EEF64A', '#7C7A78', '#C5C6BE', '#D91A1B'],
    ['#E27E25', '#3C312C', '#ACA07E', '#EDBD7F'],
    ['#D92D28', '#445EA4', '#171417', '#1E1F81'],
    ['#D92D28', '#A5CD43', '#6FAA49', '#314E2A'],
    ['#EEF64A', '#D9D593', '#D12073', '#1E1980'],
    ['#D92D28', '#E6B5AE', '#DB6F90', '#A4121D'],
    ['#E89E38', '#A78151', '#664129', '#51321C'],
    ['#E27E25', '#CAE242', '#679F82', '#DB6F90'],
    ['#EEF64A', '#D92D28', '#E89E38', '#A4121D'],
    ['#D92D28', '#679F82', '#E0E1DB', '#344E60'],
    ['#D92D28', '#EDF686', '#B4CB37', '#656623'],
    ['#D92D28', '#6C9FC5', '#1E1F81', '#E89E38'],
    ['#EEF64A', '#E89E38', '#A4121D', '#679F82'],
    ['#E27E25', '#B6DCCC', '#679F82', '#3A5763'],
    ['#A4121D', '#D15868', '#E4D6A9', '#A54754'],
  ];
  var hash = md5(req.params.avatar);
  var owlId = getId(20, hash.substr(0, 16)) + 1;
  var colorId = getId(colors.length, hash.substr(16, 32));
  var color = colors[colorId];
  var avatar = fs.readFileSync('./avatars/owl'+owlId+'.svg').toString();
  avatar = avatar.replace(/\[a\]/g, color[1]);
  avatar = avatar.replace(/\[b\]/g, color[2]);
  avatar = avatar.replace(/\[c\]/g, color[3]);
  avatar = avatar.replace(/\[beak\]/g, color[0]);
  avatar = avatar.replace(/<title>(.*)<\/title>/, '<title>'+req.params.avatar+'</title>');
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(avatar);
});

function getId(count, hash) {
  return hash.split('').map((i) => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % count;
}

var port = process.env.PORT || 4008;

app.listen(port, function () {
  console.log('Hooter avatar app listening on port ' + port + '!');
});
