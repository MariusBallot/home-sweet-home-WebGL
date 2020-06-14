/*
    this is the documentation of all Websocket messages

    example message:
    message = { 
        id: "id", is set automatically from localStorage in Vue and from GameManager in Unity, example: "SnowFlakeSmasher86"
        type: "type", example: "sound"
        message: {
            value: "value" example: soundName: "notif"
        }
    }

    all messages:
{
    "messages": {
        "readyToSwipe": "object from to",
        "hasSlidUp": " "
        "readyForNextScene": "object from to",
        "orientation": "objVector3",
        "changeScene": "object from to",
        "interaction": "object scene interactionIndex",
        "dropPhone": "null",
        "liftPhone": "null",
        "jump": "int, total jumps",
        "startCredit": "null",
        "sound": "Object soundName"
    }
}
*/


// Envoyer l'access code à partir d'Unity
    
    message = { 
        id: "SnowFlakeSmasher86", // is set automatically from GameManager
        type: "sendAccessKey",
        message: {
            "accesskey": "SnowFlakeSmasher86" // same as id
        }
    }

// Envoyer l'access code à partir du mobile
    
    // Fait automatiquement à chaque envoi de message à travers la propriété id
    // Le premier se fait lors de l'envoie de l'orientation, ce qui declenche le matching cote serveur

// Débuter la transition entre scènes
    // FROM VUEJS:

    message = {
        id: "SnowFlakeSmasher86",
        type: "changeScene",
        message: {
            from:"0",
            to:"1"
        }
    }

// Finaliser la transition de scène
    // FROM UNITY:
    
    message = {
        id: "SnowFlakeSmasher86",
        type: "readyForNextScene",
        message: {
            from:"0",
            to:"1"
        }
    }


