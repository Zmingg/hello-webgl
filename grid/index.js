// Get A WebGL context
var canvas = document.getElementById("canvas");
var gl = canvas.getContext('webgl');
canvas.width = 200;
canvas.height = 200;

function drawGrid(gl) {

  // Get shaders 
  var vertexShaderSource = document.querySelector("#vertex-shader-grid").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-grid").text;
  
  var vertexShader = window.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = window.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = window.createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  const vertexPosition = [ 
    -1.0, 0.0, 0.0,
    -1.0, 0.4, 0.0, 
    1.0, 0.0, 0.0,
    1.0, 0.4, 0.0, 
  ];
  window.enableVertex(gl, program, "a_position", vertexPosition, 3);

  var colors = [
    0.0, 0.0, 0.0, 0.2,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.2,
    0.0, 0.0, 0.0, 0.0,
  ];
  window.enableVertex(gl, program, "a_color", colors, 4);

  var vpwUniformLocation = gl.getUniformLocation(program, "vpw");
  gl.uniform1f(vpwUniformLocation, 200);
  var vphUniformLocation = gl.getUniformLocation(program, "vph");
  gl.uniform1f(vphUniformLocation, 200);
  var offsetUniformLocation = gl.getUniformLocation(program, "offset");
  gl.uniform2f(offsetUniformLocation, -0.023500000000000434, 0.9794000000000017);
  var pitchUniformLocation = gl.getUniformLocation(program, "pitch");
  gl.uniform2f(pitchUniformLocation, 10, 10);
  
  gl.enable(gl.BLEND);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 

}
 
function drawScanner(gl) {

  // Get shaders 
  var vertexShaderSource = document.querySelector("#vertex-shader-scan").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-scan").text;
  
  var vertexShader = window.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = window.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = window.createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  const vertexPosition = [
    0.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -0.95, 0.1, 0.0,
    -0.4, 0.2, 0.0,
    0.4, 0.2, 0.0,
    0.95, 0.1, 0.0,
    1.0, 0.0, 0.0,  
  ];
  window.enableVertex(gl, program, "a_position", vertexPosition, 3);
  var colors = [
      0.0, 0.0, 1.0, 0.8,
      0.0, 0.0, 1.0, 0.2,
      0.0, 0.0, 1.0, 0.2,
      0.0, 0.0, 1.0, 0.2,
      0.0, 0.0, 1.0, 0.2,
      0.0, 0.0, 1.0, 0.2,
      0.0, 0.0, 1.0, 0.2,
  ];
  window.enableVertex(gl, program, "a_inColor", colors, 4);
  
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 7); 
  
}

drawGrid(gl);
drawScanner(gl);
