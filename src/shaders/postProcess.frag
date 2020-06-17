uniform sampler2D tDiffuse;
uniform float u_vignetteIntensity;
uniform float u_vignetteColorMode;
uniform float u_time;
uniform float u_inte;
varying vec2 vUv;
void main() {
  vec2 nUv = vUv;
  nUv.y+=sin(nUv.x*10.+u_time*0.001)*u_inte;
  vec4 rTex = texture2D(tDiffuse, nUv);

  float d = distance(vec2(.5), vUv);
  rTex = rTex + ((d * .5) * exp(u_vignetteIntensity)) * u_vignetteColorMode;

  gl_FragColor = vec4(rTex);
}