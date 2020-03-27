#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_th;
uniform float u_border;

void main() {
  vec4 col = texture2D(u_tex, vUv);
  float n = snoise3(vec3(vUv*5., u_time*0.001));

  float a = 0.;
  if(n<u_th){
    a = 1.;
  }
  if(n>u_th-u_border && n<u_th){
    col = vec4(1.); 
  }

  // if(n<0){
  //   col = vec4(0.);
  // }

  gl_FragColor = vec4(col.xyz, a);
}