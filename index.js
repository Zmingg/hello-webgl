function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type); // 创建着色器对象
  gl.shaderSource(shader, source); // 提供数据源
  gl.compileShader(shader); // 编译 -> 生成着色器
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

// Get A WebGL context
var canvas = document.getElementById("canvas");
var gl = canvas.getContext('webgl');;
 
// Get shaders 
var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
 
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);
 
// look up where the vertex data needs to go.
var positionLocation = gl.getAttribLocation(program, "a_position");

// Create a buffer and put a single clipspace rectangle in
// it (2 triangles)
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    -1.0, 1.0,
    -1.0, -1.0,
    0, 1.0,
    0, -1.0,
    // 1.0, 1.0,
    // 1.0, -1.0,
  ]),
  gl.STATIC_DRAW
);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const randomColorArray = (count) => {
  const colorCount = count * 3;
  return (new Array(colorCount)).fill().map(v => Math.random());
}

var colorLocation = gl.getAttribLocation(program, "a_color");
console.log(randomColorArray(6))

var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    1.0, 1.0, 0,
    1.0, 1.0, 0,
    1.0, 1.0, 0,
    0, 1.0, 0,
  ]),
  gl.STATIC_DRAW
);
gl.enableVertexAttribArray(colorLocation);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
 
// draw
// gl.drawArrays(gl.TRIANGLES, 0, 4); 
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
