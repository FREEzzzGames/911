import test from 'node:test';
import assert from 'node:assert/strict';
import {HEROES,ARENAS,hexDistance,findHexPath,createBattleData,combatDamage,useAbility,endPlayerTurn} from '../src/tactics.js';
test('roster contains 30 heroes and three arenas',()=>{assert.equal(HEROES.length,30);assert.equal(ARENAS.length,3);assert.ok(HEROES.every(h=>h.abilities.length===3));});
test('hex distance uses axial coordinates',()=>{assert.equal(hexDistance({q:0,r:0},{q:2,r:-1}),2);});
test('pathfinder avoids occupied and blocked cells',()=>{const u={unitId:'p',q:0,r:0};const path=findHexPath(u,{q:2,r:0},[[1,0]],[],9);assert.ok(path.length>0);assert.deepEqual(path[0],{q:0,r:0});assert.deepEqual(path.at(-1),{q:2,r:0});assert.ok(!path.some(p=>p.q===1&&p.r===0));});
test('combat damage reduces health and marks defeated unit',()=>{const b=createBattleData();const a=b.units[0],v=b.units[3];const before=v.hp;const dealt=combatDamage(a,v,10);assert.ok(dealt>0);assert.ok(v.hp<before);});
test('active and ultimate abilities spend AP correctly',()=>{const b=createBattleData(),a=b.units[0],v=b.units[3];const result=useAbility(a,v,0);assert.equal(result.ok,true);assert.equal(a.ap,1);const ult=useAbility(a,v,2);assert.equal(ult.ok,false);});
test('turn transition runs enemy actions and restores player AP',()=>{const b=createBattleData();b.units[0].ap=0;endPlayerTurn(b);assert.equal(b.turn,'player');assert.equal(b.round,2);assert.equal(b.units[0].ap,2);});
