(function() {
  // copy vertexes
  window.duplicate = (positions) => {
    const curRet = [];
    const prevRet = [];
    const nextRet = [];
    const cornerRet = [];
    positions.forEach((position, idx) => {
      if (idx % 2 === 1) {
        const prevX = idx - 2 < 0 ? positions[idx - 1] : positions[idx - 3];
        const prevY = idx - 2 < 0 ? position : positions[idx - 2];
        const curX = positions[idx - 1];
        const curY = position;
        const nextX = idx + 2 > positions.length ? positions[idx - 1] : positions[idx + 1];
        const nextY = idx + 2 > positions.length ? position : positions[idx + 2];
        const corner = [
          -1, -1,
          1, -1, 
          -1, 1,
          1, 1, 
        ];
        curRet.push(curX, curY, curX, curY, curX, curY, curX, curY);
        prevRet.push(prevX, prevY, prevX, prevY, prevX, prevY, prevX, prevY);
        nextRet.push(nextX, nextY, nextX, nextY, nextX, nextY, nextX, nextY);
        cornerRet.push(...corner);
      }
    });
    return {
      current: curRet,
      prev: prevRet,
      next: nextRet,
      corner: cornerRet
    };
  }

  window.createProgram = (gl, vertexShader, fragmentShader) => {
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
  
  window.createShader = (gl, type, source) => {
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

  window.enableVertex = (gl, locationName, array, size) => {
    var location = gl.getAttribLocation(program, locationName);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(array),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  }
})();