// setting up the renderer
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        var container = document.createElement('div');
        document.body.appendChild( container );
        container.appendChild( renderer.domElement );
        // creating a new scene
            // SCENE
        scene = new THREE.Scene();
        // CAMERA
        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 100, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.target = new THREE.Vector3(0, 0, 0);

        camera.position.set(0,150,400);
        camera.lookAt(scene.position);  

        scene.add(camera);

        var video = document.getElementById( 'myVideo' );

        //sorry, not 100% sure why this is necessary -eg why the renderer doesn't automatically update the video texture in render()
        videoImageContext = videoImage.getContext( '2d' );
        // background color if no video present
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

        videoTexture = new THREE.Texture( video );
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture,overdraw: true } );

        // the geometry on which the movie will be displayed;
        //      movie image will be scaled to fit these dimensions.
        var sphere = new THREE.SphereGeometry(100, 100, 40);
        sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
        var movieScreen = new THREE.Mesh( sphere, movieMaterial );
        scene.add(movieScreen);


           render();



        function render(){

            requestAnimationFrame(render);
            if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
            {
                videoImageContext.drawImage( video, 0, 0 );
                if ( videoTexture ) 
                    videoTexture.needsUpdate = true;
            }
            // calling again render function
            renderer.render(scene, camera);

        }