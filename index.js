// Get A WebGL context
var canvas = document.getElementById("canvas");
var gl = canvas.getContext('webgl');
// canvas.width = 300;
// canvas.height = 200;
 
// Get shaders 
var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
 
var vertexShader = window.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = window.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = window.createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

const path = [
  10, 0,
  50, 100,
  100, -100,
  140, 0,
  150, 100,
  160, 0,
  300, 0,
];
const { current, prev, next } = window.duplicate(path);
window.enableVertex(gl, "a_prev", prev, 2);
window.enableVertex(gl, "a_next", next, 2);
window.enableVertex(gl, "a_position", current, 2);
window.enableVertex(gl, "a_corner", [
  -1, 0,
  1, 0,
  -1, 0,
  1, 0,
  -1, 0,
  1, 0,
  -1, 0,
  1, 0,
  -1, 0,
  1, 0,
  -1, 0,
  1, 0,
  -1, 0,
  1, 0,
], 2);
console.log(current)


// Create a buffer and put a single clipspace rectangle in
// it (2 triangles)
// var positionLocation = gl.getAttribLocation(program, "a_position");
// var buffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// gl.bufferData(
//   gl.ARRAY_BUFFER,
//   new Float32Array([
//     10, 0,
//     20, 0,
//     50, 50,
//     60, 50,
//     100, -50,
//     110, -50,
//     140, 0,
//     150, 0
//   ]),
//   gl.STATIC_DRAW
// );
// gl.enableVertexAttribArray(positionLocation);
// gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// draw
// gl.drawArrays(gl.TRIANGLES, 0, 4); 
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
var colorUniformLocation = gl.getUniformLocation(program, "u_color");
gl.uniform3fv(colorUniformLocation, new Float32Array([0.0, 0.0, 0.0]));
var lineWidthUniformLocation = gl.getUniformLocation(program, "u_lineWidth");
gl.uniform1f(lineWidthUniformLocation, 4.0);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, path.length); 
