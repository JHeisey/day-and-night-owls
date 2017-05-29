// Much credit to CodePen user Yakudoo
// his 'chill the lion' pen was my inspiration
// and template for this pen

//Pen by John Heisey
//Using Three JS and a little jQuery

// Variables for Three JS related items
var scene, camera, controls, fieldOfView, aspectRatio, nearPlane, farPlane, shadowLight, backLight, light, renderer, container;

// Variables for items in the scene
var floor, dayOwl, nightOwl, branch, butterfly, firefly, isNight = false;
playerIsMoving = false;

// Window parameter variables
var HEIGHT,
    WIDTH,
    windowHalfX,
    windowHalfY,
    mousePos = {x:0,y:0};

// Setting up Three JS scene and mouse/touch events

function init(){
    scene = new THREE.Scene();
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH/HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 2000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane);
    camera.position.z = 900;
    camera.position.y =70;
    camera.lookAt(new THREE.Vector3(0,0,0));
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
}

function onWindowResize() {
    
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    
}

function handleMouseMove(event) {
    
    mousePos = {x:event.clientX, y:event.clientY};
    
}

function handleMouseUp(event) {
    
    if(isNight) {
        isNight = false;
        console.log("its day");
        nightLight.intensity = 0;
        nightShadowLight.intensity = 0;
        nightBackLight.intensity = 0;
        light.intensity = 0.6;
        shadowLight.intensity = 0.4;
        backLight.intensity = 0.4;
        
    } else {
        isNight = true;
        console.log("its night");
        light.intensity = 0;
        shadowLight.intensity = 0;
        backLight.intensity = 0;
        nightLight.intensity = 0.2;
        nightShadowLight.intensity = 0.2;
        nightBackLight.intensity = 0.2;
    };
}

function handleTouchStart(event) {
    
    if (event.touches.length > 1) {
        event.preventDefault();
        if(isNight) {
        isNight = false;
        console.log("its day");
        nightLight.intensity = 0;
        nightShadowLight.intensity = 0;
        nightBackLight.intensity = 0;
        light.intensity = 0.6;
        shadowLight.intensity = 0.4;
        backLight.intensity = 0.4;
        
    } else {
        isNight = true;
        console.log("its night");
        light.intensity = 0;
        shadowLight.intensity = 0;
        backLight.intensity = 0;
        nightLight.intensity = 0.2;
        nightShadowLight.intensity = 0.2;
        nightBackLight.intensity = 0.2;
    };
        mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
    }
    
}

function handleTouchEnd(event) {
    
    mousePos = {x:windowHalfX, y:windowHalfY};
    
}

// rule3() from Yakudoo's 'chill the lion'
function rule3(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
  
} 

function createDayLights() {
    
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    shadowLight = new THREE.DirectionalLight(0xffffff, .2);
    shadowLight.position.set(200, 200, 200);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = .2;
    
    backLight = new THREE.DirectionalLight(0xffffff, .2);
    backLight.position.set(-100, 200, 50);
    backLight.castShadow = true;
    backLight.shadowDarkness = .1;
    
    scene.add(backLight);
    scene.add(light);
    scene.add(shadowLight);
    
}

function createNightLights() {
    
    nightLight = new THREE.HemisphereLight(0xe6f0ff, 0xe6f0ff, 0.2); //0.4
    nightShadowLight = new THREE.DirectionalLight(0xe6f0ff, 0.2); //0.6
    nightShadowLight.position.set(200, 200, 200);
    nightShadowLight.castShadow = true;
    nightShadowLight.shadowDarkness = .2;
    
    nightBackLight = new THREE.DirectionalLight(0xe6f0ff, 0.2); //0.4
    nightBackLight.position.set(-100, 200, 50);
    nightBackLight.castShadow = true;
    nightBackLight.shadowDarkness = .1;
    
    scene.add(nightBackLight);
    scene.add(nightLight);
    scene.add(nightShadowLight);
    
}

function createBranch() {
    branch = new Branch();
    scene.add(branch.threegroup);
}

function createDayOwl() {
    
    dayOwl = new DayOwl();
    dayOwl.threegroup.position.x = -230;
    dayOwl.threegroup.position.y = 90;
    scene.add(dayOwl.threegroup);
    
}

function createNightOwl() {
    
    nightOwl = new NightOwl();
    nightOwl.threegroup.position.x = 110;
    nightOwl.threegroup.position.y = 48;
    scene.add(nightOwl.threegroup);
    
}

function createButterfly() {
    
    butterfly = new Butterfly();
    butterfly.threegroup.position.z = 450;
    scene.add(butterfly.threegroup);
    
}

function createFirefly() {
    firefly = new Firefly();
    firefly.threegroup.position.z = 450;
    firefly.threegroup.position.x = -2000;
    firefly.threegroup.position.y = -2000;
    scene.add(firefly.threegroup);
}

Branch = function() {
    
    // branch colors
    this.brownMat = new THREE.MeshLambertMaterial({
        color: 0x5C4429, 
        shading:THREE.FlatShading
    });
    
    this.greenMat = new THREE.MeshLambertMaterial({
        color: 0x33cc33, 
        shading:THREE.FlatShading
    });
    
    // branch geometry
    var veryLongBranchGeom = new THREE.BoxGeometry(1000,12,12);
    var longBranchGeom = new THREE.BoxGeometry(270,12,12);
    var mediumBranchGeom = new THREE.BoxGeometry(100,12,12);
    var smallBranchGeom = new THREE.BoxGeometry(30,12,12);
    var leafGeom = new THREE.BoxGeometry(40,60,3);
    
    this.branchOne = new THREE.Mesh(longBranchGeom, this.brownMat);
    this.branchOne.position.x = -270;
    this.branchTwo = new THREE.Mesh(mediumBranchGeom, this.brownMat);
    this.branchTwo.position.x = -92;
    this.branchTwo.position.y = -23;
    this.branchTwo.rotation.z = -0.5;
    this.branchThree = new THREE.Mesh(longBranchGeom, this.brownMat);
    this.branchThree.position.y = -46;
    this.branchThree.position.x = 81;
    this.branchFour = new THREE.Mesh(mediumBranchGeom, this.brownMat);
    this.branchFour.position.x = 250;
    this.branchFour.position.y = -20;
    this.branchFour.rotation.z = 0.6;
    this.branchFive = new THREE.Mesh(smallBranchGeom, this.brownMat);
    this.branchFive.position.x = 230;
    this.branchFive.position.y = -55;
    this.branchFive.rotation.z = -0.37;
    this.branchSix = new THREE.Mesh(longBranchGeom, this.brownMat);
    this.branchSix.position.x = -410;
    this.branchSix.rotation.z = -0.7;
    this.branchSeven = new THREE.Mesh(veryLongBranchGeom, this.brownMat);
    this.branchSeven.position.x = -1010;
    this.branchSeven.position.y = 86;
    
    this.leafOne = new THREE.Mesh(leafGeom, this.greenMat);
    this.leafOne.position.x = -310;
    this.leafOne.position.y = -115;
    this.leafOne.position.z = 12;
    this.leafOne.rotation.z = 0.9;
    this.leafOne.rotation.x = -0.5;
    this.leafOne.rotation.y = 1.4;
    
    this.leafTwo = new THREE.Mesh(leafGeom, this.greenMat);
    this.leafTwo.position.x = 315;
    this.leafTwo.position.y = -4;
    this.leafTwo.rotation.x = -1.4;
    this.leafTwo.rotation.z = -0.3;
    
    this.leafThree = new THREE.Mesh(leafGeom, this.greenMat);
    this.leafThree.position.x = 312;
    this.leafThree.position.y = 25;
    this.leafThree.rotation.x = 1;
    this.leafThree.rotation.y = 0.2;
    this.leafThree.rotation.z = 0.2;
    
    
    this.threegroup = new THREE.Group();
    this.threegroup.add(this.branchOne);
    this.threegroup.add(this.branchTwo);
    this.threegroup.add(this.branchThree);
    this.threegroup.add(this.branchFour);
    this.threegroup.add(this.branchFive);
    this.threegroup.add(this.branchSix);
    this.threegroup.add(this.branchSeven);
    this.threegroup.add(this.leafOne);
    this.threegroup.add(this.leafTwo);
    this.threegroup.add(this.leafThree);
}

Butterfly = function() {
    
    // butterfly colors
    this.orangeMat = new THREE.MeshLambertMaterial ({
        color: 0xff9500, 
        shading:THREE.FlatShading
    });
    
    this.blackMat = new THREE.MeshLambertMaterial ({
        color: 0x3d3d3d, 
        shading:THREE.FlatShading
    });
    
    // butterfly geometry
    var thoraxGeom = new THREE.BoxGeometry(3,14,3);
    var antennaGeom = new THREE.BoxGeometry(1,5,1);
    var upperWingGeom = new THREE.BoxGeometry(10,10,2);
    upperWingGeom.applyMatrix(new THREE.Matrix4().makeTranslation(8,0,0));
    var lowerWingGeom = new THREE.BoxGeometry(9,9,2);
    lowerWingGeom.applyMatrix(new THREE.Matrix4().makeTranslation(8,0,0));
    
    this.thorax = new THREE.Mesh(thoraxGeom, this.blackMat);
    var wing1 = new THREE.Mesh(upperWingGeom, this.orangeMat);
    wing1.position.y = -2;
    wing1.position.x = 0.2;
    wing1.rotation.z = Math.PI/4;
    var wing2 = wing1.clone();
    wing2.rotation.y = Math.PI;
    var wing3 = new THREE.Mesh(lowerWingGeom, this.orangeMat);
    wing3.position.y = -9;
    wing3.position.x = 0.1;
    wing3.rotation.z = Math.PI/4;
    var wing4 = wing3.clone();
    wing4.rotation.y = Math.PI;
    this.leftAntenna = new THREE.Mesh(antennaGeom, this.blackMat);
    this.leftAntenna.position.y = 8;
    this.leftAntenna.rotation.z = Math.PI/4;
    this.rightAntenna = new THREE.Mesh(antennaGeom, this.blackMat);
    this.rightAntenna.position.y = 8;
    this.rightAntenna.rotation.z = -Math.PI/4;
    
    this.rightWing = new THREE.Group();
    this.rightWing.add(wing1);
    this.rightWing.add(wing3);
    
    this.leftWing = new THREE.Group();
    this.leftWing.add(wing2);
    this.leftWing.add(wing4);
    
    this.threegroup = new THREE.Group();
    this.threegroup.add(this.leftAntenna);
    this.threegroup.add(this.rightAntenna);
    this.threegroup.add(this.rightWing);
    this.threegroup.add(this.leftWing);
    this.threegroup.add(this.thorax);
    
}

// flies the butterfly around the owls
Butterfly.prototype.fly = function(xTarget, yTarget) {
    
    this.threegroup.lookAt(new THREE.Vector3(0,50,50));
    
    this.tPosX = rule3(xTarget,-200,200,-250,250);
    this.tPosY = rule3(yTarget,-200,200,250,-200);
    this.threegroup.position.x += (this.tPosX - this.threegroup.position.x) /10;
    this.threegroup.position.y += (this.tPosY - this.threegroup.position.y) /10;
    
    this.rightWing.rotation.y += 0.5;
    this.leftWing.rotation.y -= 0.5;
    this.threegroup.rotation.x = Math.PI/1.4;
    
    }

// flies the butterfly off the screen
Butterfly.prototype.flyAway = function(xTarget, yTarget) {
    
    this.threegroup.lookAt(new THREE.Vector3(0,50,50));
    
    this.tPosX = 2000
    this.tPosY = 2000
    this.threegroup.position.x += (this.tPosX - this.threegroup.position.x) /100;
    this.threegroup.position.y += (this.tPosY - this.threegroup.position.y) /100;
    
    this.rightWing.rotation.y += 0.5;
    this.leftWing.rotation.y -= 0.5;
    this.threegroup.rotation.x = Math.PI/1.4;  
    
}

Firefly = function() {
    
    // firefly colors
    this.blueMat = new THREE.MeshLambertMaterial({
        color: 0xA3F0FF, 
        shading:THREE.FlatShading
    });
    
    this.blackMat = new THREE.MeshLambertMaterial ({
        color: 0x3d3d3d, 
        shading:THREE.FlatShading
    });
    
    this.yellowMat = new THREE.MeshBasicMaterial({
        color: 0xffff66,
        shading:THREE.FlatShading
    })
    
    // geometries
    var thoraxGeom = new THREE.BoxGeometry(3,14,3);
    var antennaGeom = new THREE.BoxGeometry(1,5,1);
    var upperWingGeom = new THREE.BoxGeometry(10,3,2);
    upperWingGeom.applyMatrix(new THREE.Matrix4().makeTranslation(8,0,0));
    var lowerWingGeom = new THREE.BoxGeometry(9,3,2);
    lowerWingGeom.applyMatrix(new THREE.Matrix4().makeTranslation(8,0,0));
    var lightBoxGeom = new THREE.BoxGeometry(3,6,3);
    
    this.thorax = new THREE.Mesh(thoraxGeom, this.blackMat);
    var wing1 = new THREE.Mesh(upperWingGeom, this.blueMat);
    wing1.position.y = -2;
    wing1.position.x = 0.2;
    wing1.rotation.z = Math.PI/4;
    var wing2 = wing1.clone();
    wing2.rotation.y = Math.PI;
    
    this.rightWing = new THREE.Group();
    this.rightWing.add(wing1);
    
    this.leftWing = new THREE.Group();
    this.leftWing.add(wing2);
    
    this.fireFlyLight = new THREE.PointLight(0xffff66, 1, 700)
    this.fireFlyLight.position.y = -9;
    
    this.fireFlyLightBox = new THREE.Mesh(lightBoxGeom, this.yellowMat);
    this.fireFlyLightBox.position.y = -12;
    
    this.threegroup = new THREE.Group();
    this.threegroup.add(this.leftAntenna);
    this.threegroup.add(this.rightAntenna);
    this.threegroup.add(this.rightWing);
    this.threegroup.add(this.leftWing);
    this.threegroup.add(this.thorax);
    this.threegroup.add(this.fireFlyLight);
    this.threegroup.add(this.fireFlyLightBox);
    
}

Firefly.prototype.fly = function(xTarget, yTarget) {
    
    // flies the firefly around the owls
    this.threegroup.lookAt(new THREE.Vector3(0,50,50));
    
    this.tPosX = rule3(xTarget,-200,200,-250,250);
    this.tPosY = rule3(yTarget,-200,200,250,-200);
    this.threegroup.position.x += (this.tPosX - this.threegroup.position.x) /10;
    this.threegroup.position.y += (this.tPosY - this.threegroup.position.y) /10;
    
    this.rightWing.rotation.y += 0.5;
    this.leftWing.rotation.y -= 0.5;
    this.threegroup.rotation.x = Math.PI/1.4;
    
    }

Firefly.prototype.flyAway = function(xTarget, yTarget) {
    
    // flies the firefly off screen during day
    this.threegroup.lookAt(new THREE.Vector3(0,50,50));
    
    this.tPosX = -2000
    this.tPosY = -2000
    this.threegroup.position.x += (this.tPosX - this.threegroup.position.x) /100;
    this.threegroup.position.y += (this.tPosY - this.threegroup.position.y) /100;
    
    this.rightWing.rotation.y += 0.5;
    this.leftWing.rotation.y -= 0.5;
    this.threegroup.rotation.x = Math.PI/1.4;  
    
}



DayOwl = function() {
    
    this.whiteMat = new THREE.MeshLambertMaterial ({ 
        color: 0xC2C2C2,
        shading:THREE.FlatShading
    });
    
    this.orangeMat = new THREE.MeshLambertMaterial ({
        color: 0xff9500,
        shading:THREE.FlatShading
    });
    
    this.blackMat = new THREE.MeshLambertMaterial ({
        color: 0x3d3d3d,
        shading:THREE.FlatShading
    });
    
    this.purpleMat = new THREE.MeshLambertMaterial ({
        color: 0x661b49,
        shading:THREE.FlatShading
    });
    
    this.yellowMat = new THREE.MeshLambertMaterial ({
        color: 0xffcc00, 
        shading:THREE.FlatShading
    });
    
    this.brownMat = new THREE.MeshLambertMaterial ({
        color: 0x5C4429,
        shading:THREE.FlatShading
    });
    
    this.beigeMat = new THREE.MeshLambertMaterial ({
        color: 0xE8C297,
        shading:THREE.FlatShading
    });
    
    this.lightYellowMat = new THREE.MeshLambertMaterial({
        color: 0xF0E381,
        shading:THREE.FlatShading
    });
    
    // body geometries
    var bodyGeom = new THREE.BoxGeometry(110,90,90);

    var outerFaceGeom = new THREE.BoxGeometry(130,110,90);
    
    var innerFaceGeom = new THREE.BoxGeometry(110,90,80);
    
    var legGeom = new THREE.BoxGeometry(12,45,10);
    
    var beakGeom = new THREE.BoxGeometry(11,19,8);
    
    var bigTalonGeom = new THREE.BoxGeometry(9,26,9);
    
    var smallTalonGeom = new THREE.BoxGeometry(9, 11, 9);
    
    var eyeGeom = new THREE.BoxGeometry(42,42,10);
    
    var pupilGeom = new THREE.BoxGeometry(29,29,10);
    
    var wingGeom = new THREE.BoxGeometry(15,70,10);
    
    // body
    
    this.body = new THREE.Mesh(bodyGeom, this.brownMat);
    this.body.position.z = -18;
    this.body.position.y = -13;
    
    //talons
    
    this.leftFootLeftBigTalon = new THREE.Mesh(bigTalonGeom, this.yellowMat);
    this.leftFootLeftBigTalon.position.x = -40;
    this.leftFootLeftBigTalon.position.y = -91;
    this.leftFootLeftBigTalon.position.z = 2;
    
    this.leftFootRightBigTalon = new THREE.Mesh(bigTalonGeom, this.yellowMat);
    this.leftFootRightBigTalon.position.x = -20;
    this.leftFootRightBigTalon.position.y = -91;    this.leftFootRightBigTalon.position.z = 2;
    
    this.leftFootSmallTalon = new THREE.Mesh(smallTalonGeom, this.yellowMat);
    this.leftFootSmallTalon.position.x = -30;
    this.leftFootSmallTalon.position.y = -100;
    this.leftFootSmallTalon.position.z = 2;
    
    this.rightFootLeftBigTalon = new THREE.Mesh(bigTalonGeom, this.yellowMat);
    this.rightFootLeftBigTalon.position.x = 40;
    this.rightFootLeftBigTalon.position.y = -91;
    this.rightFootLeftBigTalon.position.z = 2;
    
    this.rightFootRightBigTalon = new THREE.Mesh(bigTalonGeom, this.yellowMat);
    this.rightFootRightBigTalon.position.x = 20;
    this.rightFootRightBigTalon.position.y = -91;
    this.rightFootRightBigTalon.position.z = 2;
    
    this.rightFootSmallTalon = new THREE.Mesh(smallTalonGeom, this.yellowMat);
    this.rightFootSmallTalon.position.x = 30;
    this.rightFootSmallTalon.position.y = -100;
    this.rightFootSmallTalon.position.z = 2;
    
    // legs
    
    this.leftLeg = new THREE.Mesh(legGeom, this.yellowMat);
    this.leftLeg.position.x = -28;
    this.leftLeg.position.y = -62;
    this.leftLeg.position.z = 2;
    
    this.rightLeg = new THREE.Mesh(legGeom, this.yellowMat);
    this.rightLeg.position.x = 30;
    this.rightLeg.position.y = -62;
    this.rightLeg.position.z = 2;
    
    // wings
    
    this.leftWing = new THREE.Mesh(wingGeom, this.brownMat);
    this.leftWing.position.x = -65;
    this.leftWing.position.y = -9;
    this.leftWing.position.z = -10;
    
    this.rightWing = new THREE.Mesh(wingGeom, this.brownMat);
    this.rightWing.position.x = 65;
    this.rightWing.position.y = -9;
    this.rightWing.position.z = -10;
    
    // face
    
    this.outerFace = new THREE.Mesh(outerFaceGeom, this.brownMat);
    this.outerFace.position.y = 85;
    this.outerFace.position.z = 30;
    
    this.innerFace = new THREE.Mesh(innerFaceGeom, this.beigeMat);
    this.innerFace.position.y = 85;
    this.innerFace.position.z = 45;
    
    // beak
    
    this.beak = new THREE.Mesh(beakGeom, this.blackMat);
    this.beak.position.y = 55;
    this.beak.position.z = 94;
    
    // eyes
    
    this.leftEye = new THREE.Mesh(eyeGeom, this.lightYellowMat);
    this.leftEye.position.x = -29;
    this.leftEye.position.y = 90;
    this.leftEye.position.z = 85;
    
    this.rightEye = new THREE.Mesh(eyeGeom, this.lightYellowMat);
    this.rightEye.position.x = 29;
    this.rightEye.position.y = 90;
    this.rightEye.position.z = 85;
    
    this.leftPupil = new THREE.Mesh(pupilGeom, this.blackMat);
    this.leftPupil.position.x = -29;
    this.leftPupil.position.y = 90;
    this.leftPupil.position.z = 90;
    this.rightPupil = new THREE.Mesh(pupilGeom, this.blackMat);
    this.rightPupil.position.x = 29;
    this.rightPupil.position.y = 90;
    this.rightPupil.position.z = 90;
    
    // grouping the parts
    
    this.leftTalons = new THREE.Group();
    this.leftTalons.add(this.leftFootLeftBigTalon);
    this.leftTalons.add(this.leftFootRightBigTalon);
    this.leftTalons.add(this.leftFootSmallTalon);
    
    
    this.rightTalons = new THREE.Group();
    this.rightTalons.add(this.rightFootLeftBigTalon);
    this.rightTalons.add(this.rightFootRightBigTalon);
    this.rightTalons.add(this.rightFootSmallTalon);
    
    
    this.head = new THREE.Group();
    this.head.add(this.outerFace);
    this.head.add(this.innerFace);
    this.head.add(this.beak);
    this.head.add(this.leftEye);
    this.head.add(this.rightEye);
    this.head.add(this.leftPupil);
    this.head.add(this.rightPupil);
    
    this.threegroup = new THREE.Group();
    this.threegroup.add(this.body);
    this.threegroup.add(this.head);
    this.threegroup.add(this.leftLeg);
    this.threegroup.add(this.rightLeg);
    this.threegroup.add(this.leftWing);
    this.threegroup.add(this.rightWing);
    this.threegroup.add(this.rightTalons);
    this.threegroup.add(this.leftTalons);
    
    this.threegroup.traverse( function(object) {
        
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
        }
    });
    
}

DayOwl.prototype.updateBody = function(speed) {
    this.head.rotation.y += (this.tHeadRotY - this.head.rotation.y) / speed;
    this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
    this.head.position.x += (this.tHeadPosX - this.head.position.x) / speed;
    this.head.position.y += (this.tHeadPosY - this.head.position.y) / speed;
    this.head.position.z += (this.tHeadPosZ - this.head.position.z) / speed;
    
    this.leftEye.scale.y += (this.tEyeScale - this.leftEye.scale.y) / (speed*2);
    this.rightEye.scale.y = this.leftEye.scale.y;
    
    this.leftPupil.scale.y += (this.tPupilYScale - this.leftPupil.scale.y) / (speed*2);
    this.rightPupil.scale.y = this.leftPupil.scale.y;
    
    this.leftPupil.scale.x += (this.tPupilXScale - this.leftPupil.scale.x) / (speed*2);
    this.rightPupil.scale.x = this.leftPupil.scale.x;
    
    this.leftPupil.position.y += (this.tPupilPosY - this.leftPupil.position.y) / speed;
    this.rightPupil.position.y = this.leftPupil.position.y;
    this.leftPupil.position.x += (this.tLeftPupilPosX - this.leftPupil.position.x) / speed;
    this.rightPupil.position.x += (this.tRightPupilPosX - this.rightPupil.position.x) / speed

    
}

DayOwl.prototype.look = function(xTarget, yTarget)  {
    this.tHeadRotY = rule3(xTarget, -200, 200, -Math.PI/4.5, Math.PI/2.5);
    this.tHeadRotX = rule3(yTarget, -200, 200, -Math.PI/12, Math.PI/8);
    this.tHeadPosX = 0;
    this.tHeadPosY = 0;
    this.tHeadPosZ = 0;
    
    this.tEyeScale = 1;
    this.tPupilYScale = 1;
    this.tPupilXScale = 1;
    this.tPupilPosY = rule3(yTarget, -200, 200,105,75);
    this.tLeftPupilPosX = rule3(xTarget, -250, 150, -43, -19);
    this.tRightPupilPosX = rule3(xTarget, -250, 150, 15, 39);
    
    this.updateBody(10);
}

DayOwl.prototype.sleep = function() {
    
    // tilts the head down and closes the eyes
    this.tHeadPosX = 0;
    this.tHeadPosY = 0;
    this.tHeadPosZ = 0;
    
    this.tHeadRotX = 0.2;
    this.tHeadRotY = 0;
    this.tPupilYScale = 0;
    this.tEyeScale = 0.1;
    
    this.updateBody(10);
}

NightOwl = function() {
    
    // colors
    this.whiteMat = new THREE.MeshLambertMaterial ({ 
        color: 0xC2C2C2,
        shading:THREE.FlatShading
    });
    
    this.orangeMat = new THREE.MeshLambertMaterial ({
        color: 0xff9500,
        shading:THREE.FlatShading
    });
    
    this.blackMat = new THREE.MeshLambertMaterial ({
        color: 0x3d3d3d,
        shading:THREE.FlatShading
    });
    
    this.purpleMat = new THREE.MeshLambertMaterial ({
        color: 0x661b49,
        shading:THREE.FlatShading
    });
    
    this.yellowMat = new THREE.MeshLambertMaterial ({
        color: 0xffcc00, 
        shading:THREE.FlatShading
    });
    
    this.brownMat = new THREE.MeshLambertMaterial ({
        color: 0x2E2407, 
        shading:THREE.FlatShading
    });
    
    this.beigeMat = new THREE.MeshLambertMaterial ({
        color: 0xE8C297, 
        shading:THREE.FlatShading
    });
    
    this.lightYellowMat = new THREE.MeshLambertMaterial({
        color: 0xF0E381, 
        shading:THREE.FlatShading
    });
    
    this.creamMat = new THREE.MeshLambertMaterial({
        color: 0xFCF0CF, 
        shading:THREE.FlatShading
    });
    
    this.blueMat = new THREE.MeshLambertMaterial({
        color: 0xA3F0FF, 
        shading:THREE.FlatShading
    });
    
    this.greyMat = new THREE.MeshLambertMaterial({
        color: 0xF0F0F0, 
        shading:THREE.FlatShading
    });
    
    // body geometries
    var bodyGeom = new THREE.BoxGeometry(110,90,90);

    var outerFaceGeom = new THREE.BoxGeometry(130,110,90);
    
    var innerFaceGeom = new THREE.BoxGeometry(110,90,80);
    
    var legGeom = new THREE.BoxGeometry(12,45,10);
    
    var beakGeom = new THREE.BoxGeometry(11,19,8);
    
    var bigTalonGeom = new THREE.BoxGeometry(9,26,9);
    
    var smallTalonGeom = new THREE.BoxGeometry(9, 11, 9);
    
    var eyeGeom = new THREE.BoxGeometry(42,42,10);
    
    var pupilGeom = new THREE.BoxGeometry(29,29,10);
    
    var wingGeom = new THREE.BoxGeometry(15,70,10);
    
    // body
    
    this.body = new THREE.Mesh(bodyGeom, this.creamMat);
    this.body.position.z = -18;
    this.body.position.y = -13;
    
    //talons
    
    this.leftFootLeftBigTalon = new THREE.Mesh(bigTalonGeom, this.brownMat);
    this.leftFootLeftBigTalon.position.x = -40;
    this.leftFootLeftBigTalon.position.y = -93;
    this.leftFootLeftBigTalon.position.z = 2;
    
    this.leftFootRightBigTalon = new THREE.Mesh(bigTalonGeom, this.brownMat);
    this.leftFootRightBigTalon.position.x = -20;
    this.leftFootRightBigTalon.position.y = -93;
    this.leftFootRightBigTalon.position.z = 2;
    
    this.leftFootSmallTalon = new THREE.Mesh(smallTalonGeom, this.brownMat);
    this.leftFootSmallTalon.position.x = -30;
    this.leftFootSmallTalon.position.y = -102;
    this.leftFootSmallTalon.position.z = 2;
    
    this.rightFootLeftBigTalon = new THREE.Mesh(bigTalonGeom, this.brownMat);
    this.rightFootLeftBigTalon.position.x = 40;
    this.rightFootLeftBigTalon.position.y = -93;
    this.rightFootLeftBigTalon.position.z = 2;
    
    this.rightFootRightBigTalon = new THREE.Mesh(bigTalonGeom, this.brownMat);
    this.rightFootRightBigTalon.position.x = 20;
    this.rightFootRightBigTalon.position.y = -93;
    this.rightFootRightBigTalon.position.z = 2;
    
    this.rightFootSmallTalon = new THREE.Mesh(smallTalonGeom, this.brownMat);
    this.rightFootSmallTalon.position.x = 30;
    this.rightFootSmallTalon.position.y = -102;
    this.rightFootSmallTalon.position.z = 2;
    
    // legs
    
    this.leftLeg = new THREE.Mesh(legGeom, this.brownMat);
    this.leftLeg.position.x = -30;
    this.leftLeg.position.y = -64;
    this.leftLeg.position.z = 2;
    
    this.rightLeg = new THREE.Mesh(legGeom, this.brownMat);
    this.rightLeg.position.x = 28;
    this.rightLeg.position.y = -64;
    this.rightLeg.position.z = 2;
    
    // wings
    
    this.leftWing = new THREE.Mesh(wingGeom, this.creamMat);
    this.leftWing.position.x = -65;
    this.leftWing.position.y = -9;
    this.leftWing.position.z = -10;
    
    this.rightWing = new THREE.Mesh(wingGeom, this.creamMat);
    this.rightWing.position.x = 65;
    this.rightWing.position.y = -9;
    this.rightWing.position.z = -10;
    
    // face
    
    this.outerFace = new THREE.Mesh(outerFaceGeom, this.creamMat);
    this.outerFace.position.y = 85;
    this.outerFace.position.z = 30;
    
    this.innerFace = new THREE.Mesh(innerFaceGeom, this.greyMat);
    this.innerFace.position.y = 85;
    this.innerFace.position.z = 45;
    
    // beak
    
    this.beak = new THREE.Mesh(beakGeom, this.blackMat);
    this.beak.position.y = 55;
    this.beak.position.z = 94;
    
    // eyes
    
    this.leftEye = new THREE.Mesh(eyeGeom, this.blueMat);
    this.leftEye.position.x = -29;
    this.leftEye.position.y = 90;
    this.leftEye.position.z = 85;
    
    this.rightEye = new THREE.Mesh(eyeGeom, this.blueMat);
    this.rightEye.position.x = 29;
    this.rightEye.position.y = 90;
    this.rightEye.position.z = 85;
    
    this.leftPupil = new THREE.Mesh(pupilGeom, this.blackMat);
    this.leftPupil.position.x = -29;
    this.leftPupil.position.y = 90;
    this.leftPupil.position.z = 90;
    this.rightPupil = new THREE.Mesh(pupilGeom, this.blackMat);
    this.rightPupil.position.x = 29;
    this.rightPupil.position.y = 90;
    this.rightPupil.position.z = 90;
    
    // grouping the parts
    
    this.leftTalons = new THREE.Group();
    this.leftTalons.add(this.leftFootLeftBigTalon);
    this.leftTalons.add(this.leftFootRightBigTalon);
    this.leftTalons.add(this.leftFootSmallTalon);
    
    
    this.rightTalons = new THREE.Group();
    this.rightTalons.add(this.rightFootLeftBigTalon);
    this.rightTalons.add(this.rightFootRightBigTalon);
    this.rightTalons.add(this.rightFootSmallTalon);
    
    
    this.head = new THREE.Group();
    this.head.add(this.outerFace);
    this.head.add(this.innerFace);
    this.head.add(this.beak);
    this.head.add(this.leftEye);
    this.head.add(this.rightEye);
    this.head.add(this.leftPupil);
    this.head.add(this.rightPupil);
    
    this.threegroup = new THREE.Group();
    this.threegroup.add(this.body);
    this.threegroup.add(this.head);
    this.threegroup.add(this.leftLeg);
    this.threegroup.add(this.rightLeg);
    this.threegroup.add(this.leftWing);
    this.threegroup.add(this.rightWing);
    this.threegroup.add(this.rightTalons);
    this.threegroup.add(this.leftTalons);
    
    this.threegroup.traverse( function(object) {
        
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
        }
    });
}

NightOwl.prototype.updateBody = function(speed) {
    
    this.head.rotation.y += (this.tHeadRotY - this.head.rotation.y) / speed;
    this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
    this.head.position.x += (this.tHeadPosX - this.head.position.x) / speed;
    this.head.position.y += (this.tHeadPosY - this.head.position.y) / speed;
    this.head.position.z += (this.tHeadPosZ - this.head.position.z) / speed;
    
    this.leftEye.scale.y += (this.tEyeScale - this.leftEye.scale.y) / (speed*2);
    this.rightEye.scale.y = this.leftEye.scale.y;
    
    this.leftPupil.scale.y += (this.tPupilYScale - this.leftPupil.scale.y) / (speed*2);
    this.rightPupil.scale.y = this.leftPupil.scale.y;
    
    this.leftPupil.scale.x += (this.tPupilXScale - this.leftPupil.scale.x) / (speed*2);
    this.rightPupil.scale.x = this.leftPupil.scale.x;
    
    this.leftPupil.position.y += (this.tPupilPosY - this.leftPupil.position.y) / speed;
    this.rightPupil.position.y = this.leftPupil.position.y;
    this.leftPupil.position.x += (this.tLeftPupilPosX - this.leftPupil.position.x) / speed;
    this.rightPupil.position.x += (this.tRightPupilPosX - this.rightPupil.position.x) / speed;
}

NightOwl.prototype.look = function(xTarget, yTarget)  {
    this.tHeadRotY = rule3(xTarget, -200, 200, -Math.PI/2.5, Math.PI/2.5);
    this.tHeadRotX = rule3(yTarget, -200, 200, -Math.PI/12, Math.PI/8);
    this.tHeadPosX = 0;
    this.tHeadPosY = 0;
    this.tHeadPosZ = 0;
    
    this.tEyeScale = 1;
    this.tPupilYScale = 1;
    this.tPupilXScale = 1;
    this.tPupilPosY = rule3(yTarget, -200, 200,105,73);
    this.tLeftPupilPosX = rule3(xTarget, -150, 250, -40, -16);
    this.tRightPupilPosX = rule3(xTarget, -150, 250, 18, 42);
    
    this.updateBody(10);
}

NightOwl.prototype.sleep = function() {
    
    // tilts the head down and closes the eyes
    this.tHeadPosX = 0;
    this.tHeadPosY = 0;
    this.tHeadPosZ = 0;

    this.tHeadRotX = 0.2;
    this.tHeadRotY = 0;
    this.tPupilYScale = 0;
    this.tEyeScale = 0.1;
    this.updateBody(10);
    
}

function loop() {
    render();
    var xTarget = (mousePos.x-windowHalfX);
    var yTarget = (mousePos.y-windowHalfY);
    
    // switch to change between day and night on click
    if(isNight) {
        nightOwl.look(xTarget/8,yTarget/8);
        dayOwl.sleep();
        butterfly.flyAway(xTarget,yTarget);
        firefly.fly(xTarget,yTarget);
    } else {
        nightOwl.sleep();
        dayOwl.look(xTarget/8,yTarget/8);
        butterfly.fly(xTarget, yTarget);
        firefly.flyAway(xTarget,yTarget);
    }
    
    requestAnimationFrame(loop);
}

function render() {
    if (controls) controls.update();
	renderer.render( scene, camera );
}

init();
createDayLights();
createNightLights();
createBranch();
createDayOwl();
createNightOwl();
// need to call the nightOwl look function once to produce pupils
nightOwl.look(0,0);
createButterfly();
createFirefly();
loop();     
    