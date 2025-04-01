
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

      #define PI 3.14159265359

      vec3 usaBlue = vec3(0.0, 0.275, 0.671);      // Deep blue from USA flag
      vec3 israelBlue = vec3(0.0, 0.369, 0.722);   // Blue from Israeli flag
      vec3 deepBlack = vec3(0.02, 0.04, 0.08);     // Almost black with a hint of blue
      vec3 whiteGlow = vec3(0.9, 0.95, 1.0);       // Slightly blue-ish white

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float t = u_time * 1.5;
        
        vec3 finalColor = deepBlack * 0.5;
        
        // Flowing energy field effect (like data streams)
        for(float i = 0.0; i < 3.0; i++) {
          vec2 pos = uv * (1.5 + i * 0.5);
          float plasma = sin(pos.x * 12.0 + t + i) * cos(pos.y * 8.0 - t * 0.5);
          plasma += sin(sqrt(pos.x * pos.x + pos.y * pos.y) * 9.0 - t);
          float intensity = 0.6 - 0.2 * i;
          
          // Alternate between USA and Israeli blues
          vec3 plasmaColor = mix(usaBlue, israelBlue, sin(t * 0.1 + i) * 0.5 + 0.5);
          finalColor += plasmaColor * plasma * intensity * 0.3;
        }

        // Particle system with data streams
        for(float i = 0.0; i < 8.0; i++) {
          // Create particle positions that move downward with varied speeds
          vec2 particlePos = vec2(
            noise(vec2(i, t * 0.2)) * 2.0 - 1.0,
            fract(noise(vec2(i + 43.12, t * 0.3)) - t * (0.1 + i * 0.01)) * 2.0 - 1.0
          );
          float particle = length(uv - particlePos);
          particle = 0.005 / particle;
          
          // Binary-like particles (0s and 1s feeling)
          if (mod(i, 2.0) == 0.0) {
            finalColor += whiteGlow * particle * 0.4;
          } else {
            finalColor += mix(usaBlue, israelBlue, noise(vec2(i, t))) * particle * 0.5;
          }
        }

        // Neural network nodes
        for(float i = 0.0; i < 7.0; i++) {
          vec2 nodePos = vec2(
            sin(t * 0.2 + i * PI / 3.5 + noise(vec2(i, 0.0)) * PI),
            cos(t * 0.3 + i * PI / 3.5 + noise(vec2(0.0, i)) * PI)
          ) * 0.7;
          
          float node = length(uv - nodePos);
          node = smoothstep(0.05, 0.045, node);
          
          // Alternate node colors between USA and Israel blues
          vec3 nodeColor = mix(usaBlue, israelBlue, noise(vec2(i, t * 0.1)));
          finalColor += nodeColor * node * 0.4;

          // Connections between nodes
          for(float j = 0.0; j < 7.0; j++) {
            if (i != j) {
              vec2 nextNodePos = vec2(
                sin(t * 0.2 + j * PI / 3.5 + noise(vec2(j, 0.0)) * PI),
                cos(t * 0.3 + j * PI / 3.5 + noise(vec2(0.0, j)) * PI)
              ) * 0.7;
              
              // Calculate distance to the line segment connecting nodes
              vec2 dir = nextNodePos - nodePos;
              float lineLength = length(dir);
              dir = normalize(dir);
              
              // Data packet moving along connection
              float dataPacket = fract(noise(vec2(i+j, 0.0)) + t * 0.2);
              vec2 packetPos = nodePos + dir * dataPacket * lineLength;
              float packet = length(uv - packetPos);
              packet = smoothstep(0.03, 0.02, packet);
              
              // Line connecting nodes
              vec2 p = uv - nodePos;
              float h = clamp(dot(p, dir) / lineLength, 0.0, 1.0);
              float line = length(p - dir * h * lineLength);
              line = smoothstep(0.01, 0.005, line) * 0.3;
              
              // Pulses traveling along connections
              line *= 0.4 + 0.6 * sin(h * PI * 4.0 + t * 2.0);
              
              finalColor += whiteGlow * line * 0.1;
              finalColor += whiteGlow * packet * 0.5;
            }
          }
        }

        // Background gradients and patterns
        vec2 gradientUV = uv;
        gradientUV *= rotate2D(t * 0.1);
        for(float i = 1.0; i < 3.0; i++) {
          float gradient = sin(gradientUV.x * 6.0 * i + t * 0.5) * cos(gradientUV.y * 6.0 * i + t * 0.7);
          finalColor += mix(usaBlue, israelBlue, 0.5 + 0.5 * sin(t * 0.05)) * gradient * gradient * 0.05;
        }

        // Enhance contrast and add glow
        finalColor = pow(finalColor, vec3(1.2));
        finalColor *= 1.7;
        
        // Add subtle vignette
        float vignette = 1.0 - smoothstep(0.5, 1.8, length(uv));
        finalColor *= vignette;

        outColor = vec4(finalColor, 0.97);
      }

      mat2 rotate2D(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-secondary"></div>
      
      {/* Header-like navigation */}
      <div className="w-full absolute top-0 px-6 py-6 flex justify-between items-center z-20">
        <div className="text-white text-2xl font-bold">
          <span className="text-primary">Venture</span>AI
        </div>
        <div className="hidden md:flex space-x-8 text-sm text-white/80">
          <a href="#focus" className="hover:text-white transition-colors">FOCUS</a>
          <a href="#stats" className="hover:text-white transition-colors">TRACK RECORD</a>
          <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 mt-20 md:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-primary mb-2 animate-fade-in">VENTURE CAPITAL FOR THE AI ERA</p>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 animate-fade-in leading-tight">
            Backing Exceptional <br/>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vertical AI</span> Founders
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Investing in the next generation of AI-first companies transforming industries across the US and Israel
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md flex items-center gap-2 font-medium w-full md:w-auto"
            >
              Get Funding <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#focus" className="text-white hover:text-primary transition-colors font-medium flex items-center gap-1 w-full md:w-auto justify-center">
              Our Investment Thesis <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
