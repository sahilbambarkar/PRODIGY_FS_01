

             
              import {initializeApp} from "firebase/app";
              import {getAuth} from "firebase/auth";
             
            
              const firebaseConfig = {
                apiKey: "AIzaSyDVRZOdK-zJrvCVv6kaqgYY8r7oMWe-eOk",
              authDomain: "ai-trip-planner-40b66.firebaseapp.com",
              projectId: "ai-trip-planner-40b66",
              storageBucket: "ai-trip-planner-40b66.appspot.com",
              messagingSenderId: "458700712552",
              appId: "1:458700712552:web:91049aaf085c0d11a369dd",
              measurementId: "G-78QLP59M96"
};

              // Initialize Firebase
              const app = initializeApp(firebaseConfig);
              export const auth = getAuth(app);
              export default app;