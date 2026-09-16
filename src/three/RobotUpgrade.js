import * as THREE from 'three';
import { AIWorld } from './World.js';

const CYAN = 0x35efff;
const VIOLET = 0x7657ff;
const PINK = 0xff4fc8;

const physical = (color, metalness = 0.35, roughness = 0.2) =>
  new THREE.MeshPhysicalMaterial({
    color,
    metalness,
    roughness,
    clearcoat: 1,
    clearcoatRoughness: 0.12
  });

const glow = (color, intensity = 4) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.18,
    metalness: 0.25
  });

AIWorld.prototype.createRobot = function createPremiumRobot(scale = 1) {
  const bot = new THREE.Group();
  bot.name = 'NOVA AI Guide';

  // Animate an inner rig so positioning from World.js is never overwritten.
  const floatRig = new THREE.Group();
  bot.add(floatRig);

  const shell = physical(0xeefaff, 0.42, 0.16);
  const trim = physical(0x7c83a8, 0.7, 0.2);
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x071426,
    metalness: 0.28,
    roughness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.04
  });
  const cyanMat = glow(CYAN, 5);
  const violetMat = glow(VIOLET, 3.5);
  const pinkMat = glow(PINK, 3);

  // Body
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.72, 40, 30), shell);
  body.scale.set(1, 0.9, 0.72);
  body.position.y = -0.1;
  body.castShadow = true;
  floatRig.add(body);

  const waist = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.055, 12, 48), trim);
  waist.rotation.x = Math.PI / 2;
  waist.position.y = -0.58;
  floatRig.add(waist);

  const chestGlass = new THREE.Mesh(new THREE.CircleGeometry(0.22, 40), glass);
  chestGlass.position.set(0, 0.02, 0.535);
  floatRig.add(chestGlass);

  const core = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.165, 40), cyanMat);
  core.position.set(0, 0.02, 0.548);
  floatRig.add(core);

  const coreDot = new THREE.Mesh(new THREE.CircleGeometry(0.055, 32), violetMat);
  coreDot.position.set(0, 0.02, 0.552);
  floatRig.add(coreDot);

  // Head
  const head = new THREE.Group();
  head.position.y = 0.94;
  floatRig.add(head);

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.72, 40, 30), shell);
  skull.scale.set(1.08, 0.8, 0.8);
  skull.castShadow = true;
  head.add(skull);

  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.615, 40, 30), glass);
  visor.scale.set(1.08, 0.68, 0.72);
  visor.position.set(0, -0.03, 0.16);
  head.add(visor);

  // Cute expressive eyes
  const eyeGeo = new THREE.SphereGeometry(0.09, 24, 18);
  const eyeL = new THREE.Mesh(eyeGeo, cyanMat);
  const eyeR = new THREE.Mesh(eyeGeo, cyanMat);
  eyeL.scale.set(0.72, 1.18, 0.46);
  eyeR.scale.copy(eyeL.scale);
  eyeL.position.set(-0.22, -0.015, 0.56);
  eyeR.position.set(0.22, -0.015, 0.56);
  head.add(eyeL, eyeR);

  const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const highlightL = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 10), highlightMat);
  const highlightR = highlightL.clone();
  highlightL.position.set(-0.195, 0.025, 0.625);
  highlightR.position.set(0.245, 0.025, 0.625);
  head.add(highlightL, highlightR);

  const browGeo = new THREE.BoxGeometry(0.22, 0.035, 0.035);
  const browL = new THREE.Mesh(browGeo, cyanMat);
  const browR = new THREE.Mesh(browGeo, cyanMat);
  browL.position.set(-0.22, 0.16, 0.55);
  browR.position.set(0.22, 0.16, 0.55);
  browL.rotation.z = -0.08;
  browR.rotation.z = 0.08;
  head.add(browL, browR);

  const cheekL = new THREE.Mesh(new THREE.CircleGeometry(0.045, 24), pinkMat);
  const cheekR = cheekL.clone();
  cheekL.position.set(-0.39, -0.15, 0.53);
  cheekR.position.set(0.39, -0.15, 0.53);
  head.add(cheekL, cheekR);

  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.018, 8, 28, Math.PI),
    cyanMat
  );
  smile.position.set(0, -0.18, 0.57);
  smile.rotation.z = Math.PI;
  head.add(smile);

  // Side ear modules
  const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 28);
  const earL = new THREE.Mesh(earGeo, trim);
  const earR = earL.clone();
  earL.rotation.z = Math.PI / 2;
  earR.rotation.z = Math.PI / 2;
  earL.position.x = -0.73;
  earR.position.x = 0.73;
  head.add(earL, earR);

  const earGlowL = new THREE.Mesh(new THREE.CircleGeometry(0.085, 24), violetMat);
  const earGlowR = earGlowL.clone();
  earGlowL.rotation.y = -Math.PI / 2;
  earGlowR.rotation.y = Math.PI / 2;
  earGlowL.position.set(-0.797, 0, 0);
  earGlowR.position.set(0.797, 0, 0);
  head.add(earGlowL, earGlowR);

  // Antenna
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 16), trim);
  antenna.position.set(0, 0.68, 0);
  head.add(antenna);

  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), pinkMat);
  antennaTip.position.set(0, 0.85, 0);
  head.add(antennaTip);

  // Arms built only from core Three.js primitives for maximum compatibility.
  const makeArm = (side) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.69, 0.08, 0);

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 18), shell);
    arm.add(shoulder);

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.105, 0.48, 20), shell);
    upper.position.set(side * 0.13, -0.3, 0);
    upper.rotation.z = side * -0.38;
    arm.add(upper);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.145, 24, 18), shell);
    hand.scale.set(0.86, 1.08, 0.76);
    hand.position.set(side * 0.27, -0.57, 0.02);
    arm.add(hand);

    const palmGlow = new THREE.Mesh(new THREE.CircleGeometry(0.055, 20), cyanMat);
    palmGlow.position.set(side * 0.27, -0.57, 0.145);
    arm.add(palmGlow);

    return arm;
  };

  const armL = makeArm(-1);
  const armR = makeArm(1);
  floatRig.add(armL, armR);

  // Hover rings
  const hover = new THREE.Mesh(
    new THREE.TorusGeometry(0.46, 0.035, 10, 56),
    new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.48 })
  );
  hover.rotation.x = Math.PI / 2;
  hover.position.y = -0.84;
  floatRig.add(hover);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.94, 0.018, 8, 72),
    new THREE.MeshBasicMaterial({ color: VIOLET, transparent: true, opacity: 0.22 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.94;
  floatRig.add(halo);

  bot.scale.setScalar(scale);
  bot.userData.parts = { floatRig, head, eyeL, eyeR, browL, browR, armL, armR, core, hover, halo };

  this.effects.push((t) => {
    floatRig.position.y = Math.sin(t * 1.65) * 0.045;
    floatRig.rotation.z = Math.sin(t * 0.8) * 0.015;
    core.scale.setScalar(1 + Math.sin(t * 3.4) * 0.12);
    hover.rotation.z = t * 0.55;
    halo.rotation.z = -t * 0.24;
    armL.rotation.z = Math.sin(t * 1.4) * 0.045;
    armR.rotation.z = -Math.sin(t * 1.4) * 0.045;

    const blink = Math.sin(t * 0.63) > 0.985 ? 0.12 : 1;
    eyeL.scale.y = 1.18 * blink;
    eyeR.scale.y = 1.18 * blink;
    antennaTip.scale.setScalar(1 + Math.sin(t * 2.8) * 0.1);
  });

  this.robotHead = head;
  return bot;
};
