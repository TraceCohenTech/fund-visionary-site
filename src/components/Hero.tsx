import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const vertexShaderSource = `#version 300 es
      in vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    const fragmentShaderSource = `#version 300 es
      precision highp float;
      out vec4 outColor;
      uniform vec2 u_resolution;
      uniform float u_time;

      vec3 hsv(float h,float s,float v) {
        vec4 t=vec4(1.,2./3.,1./3.,3.);
        vec3 p=abs(fract(vec3(h)+t.xyz)*6.-vec3(t.w));
        return v*mix(vec3(t.x),clamp(p-vec3(t.x),0.,1.),s);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float t = u_time * 0.5;
        
        vec3 color = vec3(0.0);
        
        for(float i = 0.0; i < 4.0; i++) {
          uv = abs(uv * 1.5) - 1.0;
          float d = length(uv) * exp(-length(uv));
          vec3 col = hsv(t * 0.1 + i * 0.2, 0.8, 1.0);
          d = sin(d * 8.0 + t) / 8.0;
          d = abs(d);
          d = pow(0.02 / d, 1.5);
          color += col * d;
        }

        outColor = vec4(color * 0.15, 0.95);
      }
    `;

    const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      console.error('Shader creation failed');
      return;
    }

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const positionBuffer = gl.createBuffer();
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    const render = (time: number) => {
      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeUniformLocation, time * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-secondary">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 to-secondary"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Pioneering
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Vertical AI </span>
            Investments
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Backing exceptional founders building the next generation of AI companies across the US and Israel
          </p>
          <div className="text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="mb-2">100+ Investments • Decades of Experience • Multiple Successful Exits</p>
          </div>
          <button 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto animate-fade-in" 
            style={{ animationDelay: "0.4s" }}
          >
            Connect With Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;