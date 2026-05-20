import { ProductComponent } from "../../components/product/index.js";
import { EditButtonComponent } from "../../components/edit-btn/index.js";
import { MainPage } from "../main/index.js";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class ProductPage {
    constructor(parent, id, data) {
        this.parent = parent;
        this.id = id;
        this.data = data;

        this.model = null;
        this.controls = null;
        this.camera = null;

        this.isEditing = false;
        this.editButton = null;
    }

    getData() {
        return this.data.find(item => item.id == this.id);
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getHTML() {
        return `
        <div style="background:black; min-height:100vh; color:white; padding:20px;">

            <div id="product-page"></div>

            <div id="model-container"
                 style="width:500px;height:500px;background:#111;margin-top:10px;">
            </div>

        </div>`;
    }

    init3DModel() {
        const container = document.getElementById("model-container");
        if (!container) return console.error("No container");

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);

        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1, 3);

    const updateSize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    updateSize();
    container.appendChild(renderer.domElement);

    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 0);

    const loader = new GLTFLoader();
    loader.load(
        "./models/Jupiter.glb",
        (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());

            model.position.sub(center);
            scene.add(model);

            const distance = size * 2;
            this.camera.position.z = distance;
            this.controls.target.copy(center);
            this.controls.update();

            console.log("Model loaded, size:", size);
        },
        (progress) => console.log("Loading:", (progress.loaded / progress.total * 100) + '%'),
        (error) => console.error("Load error:", error)
    );

    window.addEventListener('resize', updateSize);

    const animate = () => {
        requestAnimationFrame(animate);
        this.controls.update();
        renderer.render(scene, this.camera);
    };
    animate();
}

    render() {
        this.parent.innerHTML = this.getHTML();

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);


        this.init3DModel();
    }
}
