/*globals console, Snap, setTimeout, mina*/

var tree = {};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var redLeaves = function() {
  setTimeout(function() {
    var i = leaves.length;
    while (i--) {
      setTimeout((function(l) {
        l.animate({
          fill: 'rgba(255, 112, 0, 1)',
          stroke: 'rgba(255, 112, 0, 1)'
        }, getRandomInt(1000, 4000))
      })(leaves[i]), getRandomInt(1000, 4000))
    }
  }, getRandomInt(1000, 4000))
}


var leaves = [];

var s = Snap(800, 600);
var bg = s.rect(0, 0, 800, 600).attr({
  fill: '#9FDAED'
})
var sun = s.circle(-100, 300, 50).attr({
  fill: '#E1F50A'
})
var bg2 = s.rect(0, 400, 800, 600).attr({
  fill: '#145409'
})
sun.animate({
  cx: 600,
  cy: 40
}, 1000)
console.log(sun);

var createLeaf = function(elem, count) {
  var i, leave;
  if (!count) return;

  setTimeout(function() {
    var x = elem.tmpx2 + getRandomInt(-20, 20);
    leave = s.circle(x, elem.tmpy2 + getRandomInt(-20, 20), 0).attr({
      stroke: "#2BCC40",
      fill: "#2BCC40"
    }).animate({
      r: getRandomInt(1,7)
    }, 10, function() {
      createLeaf(elem, count - 1);
    });
    leave.x = x;
    leaves.push(leave);
  }, 5)
}

var createBranches = function(elem, parent) {
  var i, level,
    count = getRandomInt(1, 3),
    new_branch;

  elem.branches = [];
  elem.length = getRandomInt(40, 50);
  level = elem.level || 0;
  if (!level) {
    elem.x1 = 200;
    elem.y1 = 400;
  } else {
    elem.x1 = parent.tmpx2;
    elem.y1 = parent.tmpy2;
  }
  elem.x2 = elem.x1;
  elem.y2 = elem.y1;
  elem.tmpx2 = elem.x1 - elem.length + getRandomInt(10, 100);
  elem.tmpy2 = elem.y1 - elem.length + getRandomInt(-20, 20);
  elem.level = level + 1;

  var strokeWidth = 10 - level;

  var ln = s.line(elem.x1, elem.y1, elem.x2, elem.y2).attr({
    stroke: "#361605",
    strokeWidth: 1
  });

  Snap.animate(1, strokeWidth, function(width) {
    ln.attr({
      strokeWidth: width
    })
  }, 2000);

  ln.animate({
      x2: elem.tmpx2,
      y2: elem.tmpy2
    },
    500,
    null,
    function() {
      var circle2 = s.circle(elem.tmpx2, elem.tmpy2, 1).attr({
        stroke: "#361605",
        fill: "#361605"
      });

      circle2.animate({
        r: strokeWidth / 2
      }, 2000)

      createLeaf(elem, level * 2);

      for (i = 0; i < count; i++) {
        new_branch = {
          level: level + 1
        }
        if ((5 - level) >= 0) {
          createBranches(new_branch, elem)
          elem.branches.push(new_branch);
        }
      }
    })
};

createBranches(tree);
setTimeout(redLeaves, 10000);
var fallLeaves = function() {
  setTimeout(function() {
    var i = leaves.length;
    while (i--) {
      setTimeout((function(l) {
                    if(!getRandomInt(0, 2)) return;
        l.animate(
          {cy: 400, cx: l.x + getRandomInt(-100, 100)},
          getRandomInt(100, 10000))
      })(leaves[i]), getRandomInt(100, 20000))
    }
  }, 15000)
}
fallLeaves()
setTimeout(function() {
  bg2.animate({fill: 'rgba(133, 86, 51, 1)'}, 10000)
}, 10000)

setTimeout(function() {
  bg.animate({fill: 'rgba(54, 100, 126, 1)'}, 10000)
}, 10000)

setTimeout(function() {
  sun.animate({cy: 200}, 10000)
}, 10000)
