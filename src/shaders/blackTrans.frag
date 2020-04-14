#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;

uniform float u_time;
uniform float u_height;

void main() {
  vec3 col = vec3(0.);
  float n = snoise3(vec3(vUv*5., u_time*0.001));
  float n2 = snoise3(vec3(vUv*50., u_time*0.001));

  float a = 0.;
  float amp = 0.1;
  float borderSize = 0.05;

  float noiseWave = u_height+amp*sin(n+vUv.x*10.+u_time*0.01);

  if(vUv.y>noiseWave){
    a = 1.;
    col = vec3(1.);

  }

   if(vUv.y>noiseWave+borderSize){
    col = vec3(0.);
  }


  gl_FragColor = vec4(col, a);
}