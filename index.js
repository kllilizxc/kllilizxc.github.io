var canvas;
var GL;


function initGL() {
  canvas = document.getElementById("mainCanvas");

  try {
    GL = canvas.getContext("experimental-webgl", {antialias: false});
  } catch (e) {
    alert("WebGL not supported!");
    return false;
  }
}

function initShader() {
  //shaders
  var shader_vertex_source="\n\
  attribute vec2 position; //the position of the point\n\
  void main(void) { //pre-built function\n\
  gl_Position = vec4(position, 0., 1.); //0. is the z, and 1 is w\n\
  }";

  var shader_fragment_source="\n\
  precision mediump float;\n\
  \n\
  \n\
  \n\
  void main(void) {\n\
  gl_FragColor = vec4(0.,0.,0., 1.); //black color\n\
  }";

  var shader_vertex = getShader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment = getShader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  var SHADER_PROGRAM = GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
  GL.enableVertexAttribArray(position);
  GL.useProgram(SHADER_PROGRAM);
}

function getShader(source, type, typeString) {
  var shader = GL.createShader();
  GL.shaderSource(shader, source);
  GL.compileShader(shader);
  if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
    alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
    return false;
  }
  return shader;
}

function drawTriangle() {
  //points
  var triangleVertexes = [
    -1, -1,
    1, -1,
    1, 1
  ];

  var TRIANGLE_VERTEX = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangleVertexes), GL.STATIC_DRAW);

  //faces
  var triangleFaces = [0, 1, 2];
  var TRIANGLE_FACES = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleFaces), GL.STATIC_DRAW);
}

function redraw() {
  GL.viewport(0, 0, canvas.width, canvas.height);
  GL.clear(GL.COLOR_BUFFER_BIT);
  //draw
  GL.flush();
  window.requestAnimationFrame(redraw);
}

function render() {
  GL.clearColor(0, 0, 0, 0);
  redraw();
}
