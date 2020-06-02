uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
  vec4 rTex = texture2D(tDiffuse, vUv);

  float d = distance(vec2(.5), vUv);
  rTex+=d*.5;

  gl_FragColor = vec4(rTex);
}