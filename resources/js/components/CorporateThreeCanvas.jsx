import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CorporateThreeCanvas({
    className = '',
    primaryHex = '#3b82f6',
    secondaryHex = '#93c5fd',
    nodeHex = '#ffffff',
}) {
    const containerRef = useRef(null);

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
            40,
            width / height,
            0.1,
            100,
        );
        camera.position.set(0, 0.4, 6.2);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        // Central Parent Conglomerate Hub
        const hubGeo = new THREE.OctahedronGeometry(0.95, 1);
        const hubWireGeo = new THREE.WireframeGeometry(hubGeo);
        const hubWireMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(secondaryHex),
            transparent: true,
            opacity: 0.55,
        });
        const hubWire = new THREE.LineSegments(hubWireGeo, hubWireMat);
        rootGroup.add(hubWire);

        const hubCoreGeo = new THREE.OctahedronGeometry(0.45, 0);
        const hubCoreMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(primaryHex),
            wireframe: true,
            transparent: true,
            opacity: 0.9,
        });
        const hubCore = new THREE.Mesh(hubCoreGeo, hubCoreMat);
        rootGroup.add(hubCore);

        // Dual Tilted Architectural Orbital Rings
        const outerRingGeo = new THREE.RingGeometry(2.15, 2.165, 96);
        const outerRingMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(secondaryHex),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.25,
        });
        const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
        outerRing.rotation.x = Math.PI * 0.38;
        outerRing.rotation.y = Math.PI * 0.12;
        rootGroup.add(outerRing);

        const innerRingGeo = new THREE.RingGeometry(1.55, 1.56, 72);
        const innerRingMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(nodeHex),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.16,
        });
        const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
        innerRing.rotation.x = -Math.PI * 0.32;
        innerRing.rotation.z = Math.PI * 0.18;
        rootGroup.add(innerRing);

        // 4 Connected Venture Nodes + Connector Vector Lines
        const nodeConfigs = [
            { radius: 2.15, angle: 0.3, yOffset: 0.45, speed: 0.35 },
            { radius: 2.15, angle: 1.85, yOffset: -0.35, speed: 0.35 },
            { radius: 2.15, angle: 3.4, yOffset: 0.3, speed: 0.35 },
            { radius: 2.15, angle: 5.0, yOffset: -0.45, speed: 0.35 },
        ];

        const satGeo = new THREE.IcosahedronGeometry(0.2, 0);
        const satMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(nodeHex),
            wireframe: true,
            transparent: true,
            opacity: 0.85,
        });

        const dotGeo = new THREE.SphereGeometry(0.075, 12, 12);
        const dotMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(primaryHex),
        });

        const lineMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(secondaryHex),
            transparent: true,
            opacity: 0.32,
        });

        const satellites = nodeConfigs.map((cfg) => {
            const mesh = new THREE.Mesh(satGeo, satMat);
            const dot = new THREE.Mesh(dotGeo, dotMat);
            const group = new THREE.Group();
            group.add(mesh);
            group.add(dot);

            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(1, 0, 0),
            ]);
            const line = new THREE.Line(lineGeo, lineMat);

            rootGroup.add(group);
            rootGroup.add(line);

            return { ...cfg, group, mesh, line, lineGeo };
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
            pointerY = nx * 0.45;
            pointerX = ny * 0.32;
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

        let frameId = 0;
        let elapsed = 0;

        const renderFrame = () => {
            if (!reducedMotion) {
                elapsed += 0.012;
                hubWire.rotation.y += 0.0025;
                hubWire.rotation.x += 0.001;
                hubCore.rotation.y -= 0.004;
                outerRing.rotation.z += 0.0012;
                innerRing.rotation.z -= 0.0015;
                rootGroup.rotation.x +=
                    (pointerX - rootGroup.rotation.x) * 0.05;
                rootGroup.rotation.y +=
                    (pointerY - rootGroup.rotation.y) * 0.05;
            }

            for (const sat of satellites) {
                const theta = sat.angle + elapsed * sat.speed;
                const x = Math.cos(theta) * sat.radius;
                const z = Math.sin(theta) * sat.radius * 0.65;
                const y = sat.yOffset + Math.sin(theta * 1.5) * 0.18;

                sat.group.position.set(x, y, z);

                if (!reducedMotion) {
                    sat.mesh.rotation.y += 0.01;
                    sat.mesh.rotation.x += 0.006;
                }

                const positions = sat.lineGeo.attributes.position;
                positions.setXYZ(1, x, y, z);
                positions.needsUpdate = true;
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

            hubGeo.dispose();
            hubWireGeo.dispose();
            hubWireMat.dispose();
            hubCoreGeo.dispose();
            hubCoreMat.dispose();
            outerRingGeo.dispose();
            outerRingMat.dispose();
            innerRingGeo.dispose();
            innerRingMat.dispose();
            satGeo.dispose();
            satMat.dispose();
            dotGeo.dispose();
            dotMat.dispose();
            lineMat.dispose();

            for (const sat of satellites) {
                sat.lineGeo.dispose();
            }

            renderer.dispose();

            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [nodeHex, primaryHex, secondaryHex]);

    return <div ref={containerRef} className={className} />;
}
