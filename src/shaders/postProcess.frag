uniform sampler2D tDiffuse;
uniform float u_vignetteIntensity;
uniform float u_vignetteColorMode;
varying vec2 vUv;
void main() {
  vec4 rTex = texture2D(tDiffuse, vUv);

  float d = distance(vec2(.5), vUv);
  rTex = rTex + ((d * .5) * exp(u_vignetteIntensity)) * u_vignetteColorMode;

  gl_FragColor = vec4(rTex);
}