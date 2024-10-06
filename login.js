//accessToken => LocalStorage
//refreshToken => Cookie
//401 Not Authorized
// cookie: {refreshToken}

export async function log() {
    try {

    } catch (error) {
        response.status(500).json({message: "Server error while login.", error: error.message});
    } 
}