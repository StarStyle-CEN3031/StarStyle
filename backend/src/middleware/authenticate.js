import firebaseAdmin from "../services/firebase.js";

// validates firebase tokens sent from frontend


async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;

    if(!idToken) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decodedToken = await firebaseAdmin.auth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch(error) {
        // unauthorized
        return res.status(401).send("Unauthorized");
    }
}

export default verifyToken;