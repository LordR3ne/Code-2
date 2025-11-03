// Simple 3D collector game using Three.js
(() => {
  const container = document.getElementById('container');
  const scoreEl = document.getElementById('score');
  const livesEl = document.getElementById('lives');
  const startBtn = document.getElementById('start');
  const restartBtn = document.getElementById('restart');

  let scene, camera, renderer;
  let player, ground;
  let groundY = 0;
  let collectibles = [];
  let projectiles = [];
  let keys = {};
  let score = 0;
  let lives = 3;
  let running = false;
  let lastTime = 0;
  let playerVelocityY = 0;
  const GRAVITY = -30;
  const JUMP_SPEED = 10;
  const PLAYER_HALF_HEIGHT = 0.7; // half of box height (1.4)

  const PLAYER_SPEED = 6; // units per second
  const SPAWN_INTERVAL = 1500; // ms
  let spawnTimer = 0;
  const SHOOT_SPEED = 28;
  const SHOOT_COOLDOWN = 220; // ms
  let lastShot = 0;
  let raycaster;
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  // audio (created on first user gesture)
  let audioCtx = null;
  let masterGain = null;

  // recoil / pushback when shooting
  const RECOIL_STRENGTH = 2.2; // initial pushback magnitude
  const RECOIL_DECAY = 8.0; // how quickly recoil decays (per second)
  // holes / falling
  let holes = []; // { x, z, r, mesh }
  const HOLE_COUNT = 6;
  const HOLE_MIN_R = 1.2;
  const HOLE_MAX_R = 2.4;
  const FALL_RESPAWN_Y = -8; // y threshold where we trigger respawn

  function init() {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202533);

    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 18);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

  // raycaster for shooting
  raycaster = new THREE.Raycaster();

    // lights
    const hemi = new THREE.HemisphereLight(0xffffee, 0x080820, 0.8);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // ground
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x2b3b4d, roughness: 0.9 });
    ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // player
    const playerGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const playerMat = new THREE.MeshStandardMaterial({ color: 0xff8a65 });
    player = new THREE.Mesh(playerGeo, playerMat);
    // place player so its bottom rests on the ground
    groundY = 0;
    player.position.set(0, groundY + PLAYER_HALF_HEIGHT, 0);
  // track applied push velocity from recoil and falling state
  player.userData = { push: new THREE.Vector3(), falling: false, fallV: 0 };
    scene.add(player);

    // camera follow target offset
    camera.lookAt(player.position);

    // resize
    window.addEventListener('resize', onResize);

    // input
    window.addEventListener('keydown', (e) => {
      // jump on Space
      if (e.code === 'Space') {
        // only allow jump when on ground
        const onGround = player.position.y <= groundY + PLAYER_HALF_HEIGHT + 0.001;
        if (onGround && running) {
          playerVelocityY = JUMP_SPEED;
        }
      }
      keys[e.code] = true;
    });
    window.addEventListener('keyup', (e) => keys[e.code] = false);
    // shoot on mouse (or touch) down on renderer canvas
    renderer.domElement.addEventListener('pointerdown', (ev) => {
      const now = performance.now();
      if (now - lastShot < SHOOT_COOLDOWN) return;
      lastShot = now;
      shootAtPointer(ev.clientX, ev.clientY);
    });

    startBtn.addEventListener('click', () => { if (!running) start(); });
    restartBtn.addEventListener('click', () => { reset(); start(); });

    // initial HUD
    updateHud();
    animate(0);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function spawnCollectible() {
    const geo = new THREE.SphereGeometry(0.6, 16, 12);
    const mat = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff, metalness: 0.2, roughness: 0.6 });
    const c = new THREE.Mesh(geo, mat);
    // find a spawn location that is not inside any hole
    let x, z;
    let attempts = 0;
    do {
      x = (Math.random() - 0.5) * 24;
      z = (Math.random() - 0.5) * 24;
      attempts++;
      if (attempts > 30) break; // fail-safe
    } while (isPointInAnyHole(x, z));
    // spawn at roughly player height so they can be collected easily
    c.position.set(x, 1.0, z);
    // no fast downward motion — keep them bobbing in place
    c.userData = { vy: 0 };
    scene.add(c);
    collectibles.push(c);
  }

  function isPointInAnyHole(x, z) {
    for (const h of holes) {
      const dx = x - h.x, dz = z - h.z;
      if (dx*dx + dz*dz < (h.r * h.r)) return true;
    }
    return false;
  }

  function shootAtPointer(clientX, clientY) {
    // convert client coords to normalized device coords
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera({ x, y }, camera);
    // intersect with horizontal plane at player's height
    const target = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, target)) {
      // direction from player to target
      const dir = new THREE.Vector3().subVectors(target, player.position);
      dir.y = Math.max(dir.y, 0.05); // ensure slight upward arc
      dir.normalize();

      // create projectile
      const geo = new THREE.SphereGeometry(0.18, 8, 6);
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffaa });
      const proj = new THREE.Mesh(geo, mat);
      proj.position.copy(player.position);
      proj.position.y = player.position.y + 0.2;
      proj.userData = { v: dir.multiplyScalar(SHOOT_SPEED), life: 3000, born: performance.now() };
      scene.add(proj);
      projectiles.push(proj);

      // ensure audio context and play short shot sound
      ensureAudio();
      playShotSound();

      // apply recoil push to player opposite the shot direction
      // dir was normalized and points from player -> target
      const recoil = dir.clone().multiplyScalar(-RECOIL_STRENGTH);
      player.userData.push.add(recoil);
    }
  }

  // Hole generation and management
  function removeHoles() {
    for (const h of holes) scene.remove(h.mesh);
    holes.length = 0;
  }

  function generateHoles() {
    removeHoles();
    for (let i = 0; i < HOLE_COUNT; i++) {
      const r = HOLE_MIN_R + Math.random() * (HOLE_MAX_R - HOLE_MIN_R);
      const x = (Math.random() - 0.5) * 30; // slightly larger placement area
      const z = (Math.random() - 0.5) * 30;
      // visual: dark circle slightly above ground so it's visible
      const geo = new THREE.CircleGeometry(r, 28);
      const mat = new THREE.MeshStandardMaterial({ color: 0x08121a, roughness: 1.0, metalness: 0.0 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, groundY + 0.01, z);
      scene.add(mesh);
      holes.push({ x, z, r, mesh });
    }
  }

  function playFallSound() {
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(80, t);
    o.frequency.exponentialRampToValueAtTime(28, t + 0.9);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.25, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    o.connect(g);
    g.connect(masterGain);
    o.start(t);
    o.stop(t + 1.2);
  }

  // Lazy-create WebAudio context (must be created on user gesture in many browsers)
  function ensureAudio() {
    if (audioCtx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.6;
    masterGain.connect(audioCtx.destination);
  }

  // Simple synthesized shot sound: a short hi->lo pitch glide + a low thump
  function playShotSound() {
    if (!audioCtx) return;
    const t = audioCtx.currentTime;

    // bright click (short, descending sine)
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(240, t + 0.12);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(t);
    osc.stop(t + 0.2);

    // low thump for recoil (short sine)
    const th = audioCtx.createOscillator();
    const tg = audioCtx.createGain();
    th.type = 'sine';
    th.frequency.setValueAtTime(120, t);
    tg.gain.setValueAtTime(0.0001, t);
    tg.gain.linearRampToValueAtTime(0.18, t + 0.01);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    th.connect(tg);
    tg.connect(masterGain);
    th.start(t);
    th.stop(t + 0.28);
  }

  function start() {
    running = true;
    lastTime = performance.now();
    spawnTimer = 0;
    // ensure holes are present when starting
    generateHoles();
  }

  function reset() {
    score = 0; lives = 3; updateHud();
    // remove collectibles
    for (const c of collectibles) scene.remove(c);
    collectibles.length = 0;
    player.position.set(0, groundY + PLAYER_HALF_HEIGHT, 0);
    camera.position.set(0, 10, 18);
    running = false;
    // reset holes
    generateHoles();
  }

  function updateHud() {
    scoreEl.textContent = `Score: ${score}`;
    livesEl.textContent = `Lives: ${lives}`;
  }

  function distance(a, b) {
    const dx = a.x - b.x; const dy = a.y - b.y; const dz = a.z - b.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  }

  function animate(now) {
    requestAnimationFrame(animate);
    const dt = (now - lastTime) / 1000 || 0;
    lastTime = now;

    if (running) {
      // spawn logic
      spawnTimer += dt * 1000;
      if (spawnTimer > SPAWN_INTERVAL) { spawnTimer = 0; spawnCollectible(); }

      // player movement (disabled while falling)
      if (!player.userData.falling) {
        let moveX = 0, moveZ = 0;
        if (keys['ArrowLeft'] || keys['KeyA']) moveX -= 1;
        if (keys['ArrowRight'] || keys['KeyD']) moveX += 1;
        if (keys['ArrowUp'] || keys['KeyW']) moveZ -= 1;
        if (keys['ArrowDown'] || keys['KeyS']) moveZ += 1;
        // normalize
        const len = Math.hypot(moveX, moveZ) || 1;
        player.position.x += (moveX / len) * PLAYER_SPEED * dt;
        player.position.z += (moveZ / len) * PLAYER_SPEED * dt;
        // clamp to ground area
        player.position.x = Math.max(-18, Math.min(18, player.position.x));
        player.position.z = Math.max(-18, Math.min(18, player.position.z));
      }

      // apply recoil push (from shooting) and decay it
      if (player.userData && player.userData.push) {
        // move player by the push vector scaled by dt
        player.position.x += player.userData.push.x * dt;
        player.position.z += player.userData.push.z * dt;
        // decay push exponentially (approx)
        const decayFactor = Math.max(0, 1 - RECOIL_DECAY * dt);
        player.userData.push.multiplyScalar(decayFactor);
        // zero-out tiny values to avoid drift
        if (player.userData.push.length() < 0.001) player.userData.push.set(0, 0, 0);
      }

      // vertical physics (jump/gravity)
      player.position.y += playerVelocityY * dt;
      playerVelocityY += GRAVITY * dt;
      // ground collision (only if not falling)
      const minY = groundY + PLAYER_HALF_HEIGHT;
      if (player.position.y < minY && !player.userData.falling) {
        player.position.y = minY;
        playerVelocityY = 0;
        // check if standing over a hole -> start falling
        for (const h of holes) {
          const dx = player.position.x - h.x;
          const dz = player.position.z - h.z;
          if (dx*dx + dz*dz < (h.r * h.r * 0.9)) {
            // begin fall
            player.userData.falling = true;
            playerVelocityY = -6;
            ensureAudio();
            playFallSound();
            break;
          }
        }
      }

      // handle falling state: allow player to fall below ground and respawn when too low
      if (player.userData.falling) {
        // when sufficiently below threshold, count as lost life and respawn
        if (player.position.y < FALL_RESPAWN_Y) {
          lives -= 1;
          updateHud();
          // respawn or end
          if (lives > 0) {
            // respawn at origin on ground
            player.userData.falling = false;
            player.userData.push.set(0,0,0);
            player.position.set(0, groundY + PLAYER_HALF_HEIGHT, 0);
            playerVelocityY = 0;
            camera.position.set(0, 10, 18);
          } else {
            // game over: stop running
            running = false;
          }
        }
      }

      // collectibles update & collision
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const c = collectibles[i];
        // simple bob (subtle)
        c.rotation.y += 0.04;

        // collision
        // collision threshold increased so cube and sphere sizes match visually
        if (distance(c.position, player.position) < 2.0) {
          score += 10;
          scene.remove(c);
          collectibles.splice(i, 1);
          updateHud();
          continue;
        }

        // if fallen below ground
        // (no vertical falling behavior for now)
      }

      // projectiles update & collision
      const now = performance.now();
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        // move
        const v = p.userData.v;
        p.position.x += v.x * dt;
        p.position.y += v.y * dt;
        p.position.z += v.z * dt;

        // lifetime
        if (now - p.userData.born > p.userData.life) {
          scene.remove(p);
          projectiles.splice(i, 1);
          continue;
        }

        // collision with collectibles
        for (let j = collectibles.length - 1; j >= 0; j--) {
          const c = collectibles[j];
          if (distance(c.position, p.position) < 1.0) {
            // hit
            score += 8;
            scene.remove(c);
            collectibles.splice(j, 1);
            scene.remove(p);
            projectiles.splice(i, 1);
            updateHud();
            break;
          }
        }
      }

      // camera follow (smooth)
      const camTarget = new THREE.Vector3(player.position.x, player.position.y + 6, player.position.z + 12);
      camera.position.lerp(camTarget, 0.05);
      camera.lookAt(player.position);
    }

    renderer.render(scene, camera);
  }

  // init on load
  init();
})();
