import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CorporateThreeCanvas({
    className = '',
    activeIndex = 0,
    nodeCount = 4,
    primaryHex = '#0f4c3a',
    accentHex = '#9ee5c3',
    lineHex = '#e2e8f0',
}) {
    const containerRef = useRef(null);
    const activeIndexRef = useRef(activeIndex);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        let renderer;

        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            });
        } catch {
            return undefined;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            38,
            width / height,
            0.1,
            100,
        );
        camera.position.set(0, 2.25, 6.4);
        camera.lookAt(0, 0, 0);

        const stageGroup = new THREE.Group();
        scene.add(stageGroup);

        // Subtle Architectural Grid Floor
        const gridHelper = new THREE.GridHelper(9, 18, 0x2f3b38, 0x202725);
        gridHelper.position.y = -1.35;
        stageGroup.add(gridHelper);

        // Central Architectural Monolith Wireframe + Inner Prism
        const monolithGeo = new THREE.IcosahedronGeometry(1.05, 0);
        const monolithEdges = new THREE.EdgesGeometry(monolithGeo);
        const monolithMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(accentHex),
            transparent: true,
            opacity: 0.85,
        });
        const monolithWire = new THREE.LineSegments(monolithEdges, monolithMat);
        stageGroup.add(monolithWire);

        const coreGeo = new THREE.OctahedronGeometry(0.56, 0);
        const coreMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(primaryHex),
            wireframe: false,
            transparent: true,
            opacity: 0.78,
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        stageGroup.add(coreMesh);

        // Equatorial Latitude Track Ring
        const ringGeo = new THREE.RingGeometry(2.35, 2.37, 96);
        const ringMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(lineHex),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.24,
        });
        const orbitRing = new THREE.Mesh(ringGeo, ringMat);
        orbitRing.rotation.x = Math.PI / 2;
        stageGroup.add(orbitRing);

        // Sector Satellite Nodes Distributed Around the Hub
        const count = Math.max(nodeCount, 2);
        const satGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
        const satWireGeo = new THREE.EdgesGeometry(satGeo);

        const satellites = Array.from({ length: count }, (_, idx) => {
            const angle = (idx / count) * Math.PI * 2;
            const radius = 2.35;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = idx % 2 === 0 ? 0.28 : -0.22;

            const mat = new THREE.LineBasicMaterial({
                color: new THREE.Color(lineHex),
                transparent: true,
                opacity: 0.75,
            });
            const box = new THREE.LineSegments(satWireGeo, mat);
            box.position.set(x, y, z);

            const vectorGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(x, y, z),
            ]);
            const vectorMat = new THREE.LineBasicMaterial({
                color: new THREE.Color(lineHex),
                transparent: true,
                opacity: 0.25,
            });
            const connector = new THREE.Line(vectorGeo, vectorMat);

            stageGroup.add(box);
            stageGroup.add(connector);

            return { idx, angle, mat, box, vectorGeo, vectorMat };
        });

        let pointerX = 0;
        let pointerY = 0;

        const handlePointerMove = (event) => {
            const rect = container.getBoundingClientRect();

            if (rect.width === 0 || rect.height === 0) {
                return;
            }

            const nx = (event.clientX - rect.left) / rect.width - 0.5;
            const ny = (event.clientY - rect.top) / rect.height - 0.5;
            pointerY = nx * 0.42;
            pointerX = ny * 0.22;
        };

        container.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const w = entry.contentRect.width;
                const h = entry.contentRect.height;

                if (w > 0 && h > 0) {
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                }
            }
        });
        resizeObserver.observe(container);

        const accentColor = new THREE.Color(accentHex);
        const idleColor = new THREE.Color(lineHex);

        let frameId = 0;
        let currentSpin = 0;
        let ambientDrift = 0;

        const renderFrame = () => {
            const targetIdx = activeIndexRef.current % count;
            const targetSpin = -((targetIdx / count) * Math.PI * 2);

            if (!reducedMotion) {
                ambientDrift += 0.0022;
                currentSpin += (targetSpin - currentSpin) * 0.06;
                stageGroup.rotation.y = currentSpin + ambientDrift + pointerY;
                stageGroup.rotation.x +=
                    (pointerX - stageGroup.rotation.x) * 0.06;
                monolithWire.rotation.y += 0.003;
                coreMesh.rotation.y -= 0.004;
            } else {
                stageGroup.rotation.y = targetSpin;
            }

            for (const sat of satellites) {
                const isSelected = sat.idx === targetIdx;
                sat.mat.color.copy(isSelected ? accentColor : idleColor);
                sat.mat.opacity = isSelected ? 1 : 0.45;
                sat.vectorMat.color.copy(isSelected ? accentColor : idleColor);
                sat.vectorMat.opacity = isSelected ? 0.72 : 0.16;

                const targetScale = isSelected ? 1.38 : 0.92;
                sat.box.scale.lerp(
                    new THREE.Vector3(targetScale, targetScale, targetScale),
                    0.12,
                );

                if (!reducedMotion) {
                    sat.box.rotation.y += isSelected ? 0.018 : 0.005;
                    sat.box.rotation.x += isSelected ? 0.01 : 0.002;
                }
            }

            renderer.render(scene, camera);

            if (!reducedMotion) {
                frameId = window.requestAnimationFrame(renderFrame);
            }
        };

        renderFrame();

        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }

            container.removeEventListener('pointermove', handlePointerMove);
            resizeObserver.disconnect();

            monolithGeo.dispose();
            monolithEdges.dispose();
            monolithMat.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            satGeo.dispose();
            satWireGeo.dispose();
            gridHelper.geometry.dispose();

            if (Array.isArray(gridHelper.material)) {
                gridHelper.material.forEach((m) => m.dispose());
            } else {
                gridHelper.material.dispose();
            }

            for (const sat of satellites) {
                sat.mat.dispose();
                sat.vectorGeo.dispose();
                sat.vectorMat.dispose();
            }

            renderer.dispose();

            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [accentHex, lineHex, nodeCount, primaryHex]);

    return <div ref={containerRef} className={className} />;
}
