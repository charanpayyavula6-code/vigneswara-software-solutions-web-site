/**
 * VIGNESWARA SOFTWARE SOLUTIONS
 * System Architecture Visualization & Interactive Network Canvas
 * Aligned with Brand Logo (Royal Blue & Solar Amber/Gold Orbital Systems)
 */

class SystemArchitectureEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.packets = [];
    this.animationFrameId = null;
    this.hoveredNode = null;
    this.activeNode = null;
    this.mouse = { x: -1000, y: -1000, isHovering: false };
    this.time = 0;

    // Preload brand logo for central node
    this.logoImg = new Image();
    this.logoImg.src = 'assets/logo.png';
    this.logoLoaded = false;
    this.logoImg.onload = () => {
      this.logoLoaded = true;
    };

    this.init();
  }

  init() {
    this.setupCanvasDimensions();
    this.createNodes();
    this.bindEvents();
    this.startLoop();
  }

  setupCanvasDimensions() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  createNodes() {
    this.nodes = [];
    // Central Node: VIGNESWARA CORE ENGINE
    this.nodes.push({
      id: 'center',
      label: 'VIGNESWARA',
      sublabel: 'CORE ENGINE',
      x: this.centerX,
      y: this.centerY,
      radius: 46,
      isCenter: true,
      color: '#0052cc',
      goldColor: '#ff8a00',
      accentColor: '#2684ff'
    });

    // Connected satellite nodes
    const satellites = [
      { id: 'web', label: 'WEB', desc: 'Responsive Web Apps', angle: -Math.PI / 2, color: '#2684ff' },
      { id: 'app', label: 'APP', desc: 'iOS & Android Systems', angle: -Math.PI / 6, color: '#38bdf8' },
      { id: 'ai', label: 'AI / ML', desc: 'Intelligent Models', angle: Math.PI / 6, color: '#ff8a00' },
      { id: 'api', label: 'API', desc: 'REST & GraphQL Backend', angle: Math.PI / 2, color: '#818cf8' },
      { id: 'database', label: 'DATABASE', desc: 'Relational & NoSQL', angle: 5 * Math.PI / 6, color: '#10b981' },
      { id: 'cloud', label: 'CLOUD', desc: 'Microservices & DevOps', angle: -5 * Math.PI / 6, color: '#06b6d4' }
    ];

    const orbitRadius = Math.min(this.width, this.height) * 0.38;

    satellites.forEach((sat) => {
      const x = this.centerX + Math.cos(sat.angle) * orbitRadius;
      const y = this.centerY + Math.sin(sat.angle) * orbitRadius;
      this.nodes.push({
        id: sat.id,
        label: sat.label,
        sublabel: sat.desc,
        angle: sat.angle,
        baseAngle: sat.angle,
        distance: orbitRadius,
        x: x,
        y: y,
        radius: 27,
        isCenter: false,
        color: sat.color,
        accentColor: '#ffffff'
      });
    });

    // Spawn initial packets
    this.packets = [];
    for (let i = 0; i < 16; i++) {
      this.spawnPacket();
    }
  }

  spawnPacket() {
    const satelliteNodes = this.nodes.filter(n => !n.isCenter);
    if (satelliteNodes.length === 0) return;

    const targetNode = satelliteNodes[Math.floor(Math.random() * satelliteNodes.length)];
    const toCenter = Math.random() > 0.5;

    this.packets.push({
      fromNode: toCenter ? targetNode : this.nodes[0],
      toNode: toCenter ? this.nodes[0] : targetNode,
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.008,
      size: 2.5 + Math.random() * 1.5,
      color: Math.random() > 0.35 ? targetNode.color : '#ff8a00'
    });
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.setupCanvasDimensions();
      this.createNodes();
    });

    const updateMouse = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = clientX - rect.left;
      this.mouse.y = clientY - rect.top;
      this.mouse.isHovering = true;
      this.checkHover();
    };

    this.canvas.addEventListener('mousemove', (e) => {
      updateMouse(e.clientX, e.clientY);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHovering = false;
      this.hoveredNode = null;
      this.canvas.style.cursor = 'default';
      this.updateTelemetry(null);
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('click', () => {
      if (this.hoveredNode) {
        this.activeNode = this.hoveredNode;
        this.triggerNodeAction(this.hoveredNode);
      }
    });
  }

  checkHover() {
    let found = null;
    for (const node of this.nodes) {
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < node.radius + 8) {
        found = node;
        break;
      }
    }

    this.hoveredNode = found;
    this.canvas.style.cursor = found ? 'pointer' : 'default';
    if (found) {
      this.updateTelemetry(found);
    }
  }

  updateTelemetry(node) {
    const tagEl = document.getElementById('activeTelemetryNode');
    const metricEl = document.getElementById('activeTelemetryStatus');
    if (!tagEl) return;

    if (node) {
      tagEl.textContent = `[NODE: ${node.label}]`;
      if (metricEl) {
        metricEl.textContent = node.isCenter ? 'ONLINE / MASTER CORE' : 'SYNCED / 100% LATENCY 1ms';
      }
    } else {
      tagEl.textContent = '[SYSTEM: CONNECTED]';
      if (metricEl) {
        metricEl.textContent = 'MONITORING 6 NODES';
      }
    }
  }

  triggerNodeAction(node) {
    if (node.id === 'web' || node.id === 'app' || node.id === 'ai' || node.id === 'api' || node.id === 'database') {
      const servicesSec = document.getElementById('services');
      if (servicesSec) {
        servicesSec.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (node.id === 'cloud') {
      const techSec = document.getElementById('technology');
      if (techSec) {
        techSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  startLoop() {
    const loop = () => {
      this.time += 0.02;
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw subtle radar / orbital rings
    const orbitRadius = Math.min(this.width, this.height) * 0.38;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, orbitRadius, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.09)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // 2. Draw outer grid crosshairs & pixel blocks
    this.drawGridAids();

    const centerNode = this.nodes[0];

    // 3. Draw connection lines from center to satellite nodes
    for (let i = 1; i < this.nodes.length; i++) {
      const sat = this.nodes[i];
      const isHighlighted = this.hoveredNode === sat || this.hoveredNode === centerNode;

      this.ctx.beginPath();
      this.ctx.moveTo(centerNode.x, centerNode.y);
      this.ctx.lineTo(sat.x, sat.y);
      this.ctx.strokeStyle = isHighlighted 
        ? 'rgba(38, 132, 255, 0.7)' 
        : 'rgba(0, 82, 204, 0.25)';
      this.ctx.lineWidth = isHighlighted ? 2 : 1;
      this.ctx.stroke();

      // Draw secondary perimeter connections
      const nextIndex = (i === this.nodes.length - 1) ? 1 : i + 1;
      const nextSat = this.nodes[nextIndex];
      this.ctx.beginPath();
      this.ctx.moveTo(sat.x, sat.y);
      this.ctx.lineTo(nextSat.x, nextSat.y);
      this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // 4. Update & Draw Packets
    this.packets.forEach(packet => {
      packet.progress += packet.speed;
      if (packet.progress >= 1) {
        packet.progress = 0;
        const satNodes = this.nodes.filter(n => !n.isCenter);
        const randSat = satNodes[Math.floor(Math.random() * satNodes.length)];
        const toCenter = Math.random() > 0.5;
        packet.fromNode = toCenter ? randSat : this.nodes[0];
        packet.toNode = toCenter ? this.nodes[0] : randSat;
      }

      const px = packet.fromNode.x + (packet.toNode.x - packet.fromNode.x) * packet.progress;
      const py = packet.fromNode.y + (packet.toNode.y - packet.fromNode.y) * packet.progress;

      this.ctx.beginPath();
      this.ctx.arc(px, py, packet.size, 0, Math.PI * 2);
      this.ctx.fillStyle = packet.color;
      this.ctx.shadowColor = packet.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // 5. Draw Satellite Nodes
    for (let i = 1; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const isHovered = this.hoveredNode === node;

      // Outer glow circle
      if (isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(38, 132, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }

      // Base Node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered ? '#13274c' : '#0a1428';
      this.ctx.fill();
      this.ctx.strokeStyle = isHovered ? node.color : 'rgba(148, 163, 184, 0.35)';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Node Label
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(node.label, node.x, node.y);
    }

    // 6. Draw Central Core: VIGNESWARA with Logo Theme
    const pulseOffset = Math.sin(this.time * 2) * 3;
    const isCenterHovered = this.hoveredNode === centerNode;

    // Pulsing Outer Solar Gold Orbital Ring (Matches logo planetary swoop)
    this.ctx.beginPath();
    this.ctx.ellipse(centerNode.x, centerNode.y, centerNode.radius + 14 + pulseOffset, centerNode.radius + 6 + pulseOffset, -Math.PI / 6, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(255, 138, 0, 0.45)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Rotating segment arc
    this.ctx.beginPath();
    this.ctx.arc(centerNode.x, centerNode.y, centerNode.radius + 18, this.time, this.time + Math.PI * 0.75);
    this.ctx.strokeStyle = '#ff8a00';
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    // Core Solid Body
    this.ctx.beginPath();
    this.ctx.arc(centerNode.x, centerNode.y, centerNode.radius, 0, Math.PI * 2);
    const grad = this.ctx.createRadialGradient(
      centerNode.x, centerNode.y, 5,
      centerNode.x, centerNode.y, centerNode.radius
    );
    grad.addColorStop(0, '#0052cc');
    grad.addColorStop(1, '#050b18');
    this.ctx.fillStyle = grad;
    this.ctx.fill();
    this.ctx.strokeStyle = isCenterHovered ? '#ff8a00' : '#2684ff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw logo if loaded
    if (this.logoLoaded) {
      const logoSize = centerNode.radius * 1.35;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(centerNode.x, centerNode.y, centerNode.radius - 2, 0, Math.PI * 2);
      this.ctx.clip();
      this.ctx.drawImage(
        this.logoImg,
        centerNode.x - logoSize / 2,
        centerNode.y - logoSize / 2,
        logoSize,
        logoSize
      );
      this.ctx.restore();
    } else {
      // Fallback text
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '800 8.5px "Plus Jakarta Sans", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('VIGNESWARA', centerNode.x, centerNode.y - 4);

      this.ctx.fillStyle = '#ff8a00';
      this.ctx.font = '600 6.5px "JetBrains Mono", monospace';
      this.ctx.fillText('CORE SYSTEM', centerNode.x, centerNode.y + 7);
    }
  }

  drawGridAids() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    this.ctx.lineWidth = 1;

    // Center Crosshair
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX - 15, this.centerY);
    this.ctx.lineTo(this.centerX + 15, this.centerY);
    this.ctx.moveTo(this.centerX, this.centerY - 15);
    this.ctx.lineTo(this.centerX, this.centerY + 15);
    this.ctx.stroke();

    // Digital Pixel Squares (like the top-right blocks in the logo)
    const blockX = this.centerX + 120;
    const blockY = this.centerY - 110;
    this.drawPixelBlock(blockX, blockY, 7, '#0052cc');
    this.drawPixelBlock(blockX + 9, blockY, 7, '#0052cc');
    this.drawPixelBlock(blockX, blockY + 9, 7, '#0052cc');
    this.drawPixelBlock(blockX + 9, blockY + 9, 7, '#ff8a00');

    // Corner alignment markers
    const pad = 12;
    const len = 8;
    // Top-left
    this.ctx.beginPath();
    this.ctx.moveTo(pad, pad + len);
    this.ctx.lineTo(pad, pad);
    this.ctx.lineTo(pad + len, pad);
    // Top-right
    this.ctx.moveTo(this.width - pad - len, pad);
    this.ctx.lineTo(this.width - pad, pad);
    this.ctx.lineTo(this.width - pad, pad + len);
    // Bottom-left
    this.ctx.moveTo(pad, this.height - pad - len);
    this.ctx.lineTo(pad, this.height - pad);
    this.ctx.lineTo(pad + len, this.height - pad);
    // Bottom-right
    this.ctx.moveTo(this.width - pad - len, this.height - pad);
    this.ctx.lineTo(this.width - pad, this.height - pad);
    this.ctx.lineTo(this.width - pad, this.height - pad - len);
    this.ctx.stroke();
  }

  drawPixelBlock(x, y, size, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, size, size);
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.systemArchitectureEngine = new SystemArchitectureEngine('systemArchitectureCanvas');
});
