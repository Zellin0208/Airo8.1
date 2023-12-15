import PropTypes from "prop-types";

export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["text", "image", "location"]),
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
});

let messageid = 0; 

function getNextid() {
    messageid += 1; 
    return messageid;
}

export function createTextMessage(text) {
    return {
        type: 'text', 
        id: getNextid(), 
        text,
    };
} 

export function createImageMessage(uri) {
    return {
        type: 'image', 
        id: getNextid(), 
        uri,
    };
}

export function createLocationMessage(coordinate) {
    return {
        type: 'location', 
        id: getNextid(), 
        coordinate,
    };
}