import * as THREE from 'three';
import { AIWorld } from './World.js';

const cyan=0x35efff,violet=0x7657ff,pink=0xff4fc8;
const physical=(color,metalness=.35,roughness=.2)=>new THREE.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:1,clearcoatRoughness:.12});
const glow=(color,intensity=4)=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:intensity,roughness:.18,metalness:.25});

AIWorld.prototype.createRobot=function(scale=1){
 const bot=new THREE.Group(); bot.name='NOVA AI Guide';
 const shell=physical(0xeefaff,.42,.16), trim=physical(0x7c83a8,.7,.2), glass=new THREE.MeshPhysicalMaterial({color:0x071426,metalness:.3,roughness:.08,clearcoat:1,clearcoatRoughness:.04}), cyanMat=glow(cyan,5), violetMat=glow(violet,3.5);
 const body=new THREE.Mesh(new THREE.SphereGeometry(.72,48,36),shell);body.scale.set(1,.88,.72);body.position.y=-.08;body.castShadow=true;bot.add(body);
 const waist=new THREE.Mesh(new THREE.TorusGeometry(.48,.055,12,48),trim);waist.rotation.x=Math.PI/2;waist.position.y=-.57;bot.add(waist);
 const chest=new THREE.Mesh(new THREE.CircleGeometry(.23,40),glass);chest.position.set(0,.02,.535);bot.add(chest);
 const core=new THREE.Mesh(new THREE.RingGeometry(.09,.165,40),cyanMat);core.position.set(0,.02,.548);bot.add(core);
 const coreDot=new THREE.Mesh(new THREE.CircleGeometry(.055,32),violetMat);coreDot.position.set(0,.02,.552);bot.add(coreDot);
 const head=new THREE.Group();head.position.y=.92;bot.add(head);
 const skull=new THREE.Mesh(new THREE.SphereGeometry(.72,48,36),shell);skull.scale.set(1.08,.78,.8);skull.castShadow=true;head.add(skull);
 const face=new THREE.Mesh(new THREE.SphereGeometry(.61,48,32,0,Math.PI*2,.4,Math.PI*.58),glass);face.scale.set(1.08,.72,.72);face.position.z=.17;face.rotation.x=-.12;head.add(face);
 const browL=new THREE.Mesh(new THREE.CapsuleGeometry(.025,.18,5,12),cyanMat),browR=browL.clone();browL.position.set(-.22,.12,.53);browR.position.set(.22,.12,.53);browL.rotation.z=1.42;browR.rotation.z=1.72;head.add(browL,browR);
 const eyeGeo=new THREE.CapsuleGeometry(.065,.13,8,20),eyeL=new THREE.Mesh(eyeGeo,cyanMat),eyeR=new THREE.Mesh(eyeGeo,cyanMat);eyeL.position.set(-.22,-.015,.555);eyeR.position.set(.22,-.015,.555);head.add(eyeL,eyeR);
 const cheekL=new THREE.Mesh(new THREE.CircleGeometry(.045,24),glow(pink,2)),cheekR=cheekL.clone();cheekL.position.set(-.39,-.14,.52);cheekR.position.set(.39,-.14,.52);head.add(cheekL,cheekR);
 const smile=new THREE.Mesh(new THREE.TorusGeometry(.12,.018,8,30,Math.PI),cyanMat);smile.position.set(0,-.16,.57);smile.rotation.z=Math.PI;head.add(smile);
 const earGeo=new THREE.CylinderGeometry(.16,.16,.12,32),earL=new THREE.Mesh(earGeo,trim),earR=earL.clone();earL.rotation.z=Math.PI/2;earR.rotation.z=Math.PI/2;earL.position.x=-.73;earR.position.x=.73;head.add(earL,earR);const earGlowL=new THREE.Mesh(new THREE.CircleGeometry(.085,24),violetMat),earGlowR=earGlowL.clone();earGlowL.rotation.y=-Math.PI/2;earGlowR.rotation.y=Math.PI/2;earGlowL.position.set(-.797,0,0);earGlowR.position.set(.797,0,0);head.add(earGlowL,earGlowR);
 const antenna=new THREE.Mesh(new THREE.CapsuleGeometry(.025,.24,5,12),trim);antenna.position.set(0,.65,0);head.add(antenna);const antennaTip=new THREE.Mesh(new THREE.SphereGeometry(.075,24,18),glow(pink,5));antennaTip.position.set(0,.81,0);head.add(antennaTip);
 const makeArm=(side)=>{const a=new THREE.Group();a.position.set(side*.69,.08,0);const shoulder=new THREE.Mesh(new THREE.SphereGeometry(.17,28,20),shell);a.add(shoulder);const upper=new THREE.Mesh(new THREE.CapsuleGeometry(.095,.38,8,18),shell);upper.position.set(side*.14,-.3,0);upper.rotation.z=side*-.38;a.add(upper);const hand=new THREE.Mesh(new THREE.SphereGeometry(.145,28,20),shell);hand.scale.set(.82,1.05,.72);hand.position.set(side*.28,-.57,.02);a.add(hand);return a};
 const armL=makeArm(-1),armR=makeArm(1);bot.add(armL,armR);
 const hover=new THREE.Mesh(new THREE.TorusGeometry(.46,.035,12,64),new THREE.MeshBasicMaterial({color:cyan,transparent:true,opacity:.45}));hover.rotation.x=Math.PI/2;hover.position.y=-.82;bot.add(hover);
 const halo=new THREE.Mesh(new THREE.TorusGeometry(.93,.018,8,80),new THREE.MeshBasicMaterial({color:violet,transparent:true,opacity:.2}));halo.rotation.x=Math.PI/2;halo.position.y=.92;bot.add(halo);
 bot.scale.setScalar(scale);bot.userData.parts={head,eyeL,eyeR,browL,browR,armL,armR,core,hover,halo};
 let lastY=bot.position.y;this.effects.push(t=>{const p=bot.userData.parts;if(!p)return;const base=lastY;bot.position.y=base+Math.sin(t*1.65)*.045*scale;p.core.scale.setScalar(1+Math.sin(t*3.4)*.12);p.hover.rotation.z=t*.55;p.halo.rotation.z=-t*.24;p.armL.rotation.z=Math.sin(t*1.4)*.05;p.armR.rotation.z=-Math.sin(t*1.4)*.05;const blink=Math.sin(t*.63)>.985?.08:1;p.eyeL.scale.y=blink;p.eyeR.scale.y=blink;antennaTip.scale.setScalar(1+Math.sin(t*2.8)*.1)});
 this.robotHead=head;return bot;
};
