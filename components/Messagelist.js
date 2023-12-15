import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, View, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { MessageShape } from './utils/MessageUtils'; 

const keyExtractor = item=> item.id.toString();

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired, 
        onPressMessage: PropTypes.func,
    } ;

    static defaultProps = { 
        onPressMessage: () => {},
    } ;

    renderMessageContent = ({ item }) => {
        const { onPressMessage } = this.props;

        switch (item.type) {
            case 'text': return(
                <View style={styles.messageRow}>
                  <TouchableHighlight onPress={() => onPressMessage(item)}>
                    <View style={styles.messageBubble}> 
                      <Text style={styles.text}>{item.text}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              );

            case 'image':
                return (
                    <View style={styles.messageRow}>
                        <TouchableHighlight onPress={() => onPressMessage(item)}>
                            <Image style={styles.image} source={{ uri: item.uri }}/>
                        </TouchableHighlight>
                    </View>
                
                );
            
            case 'location':
                if (item.coordinate){
                    return(
                        <View style={styles.messageRow}>
                            <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        ...item.coordinate,
                                        latitudeDelta: 0.08,
                                        longitudeDelta: 0.04,
                                    }}
                                >
                                    <Marker coordinate={item.coordinate}/>
                                </MapView>
                            </View>
                        </View>
                    );
                } else {
                    return <Text style={styles.locationText}>Location data is missing</Text>;
                }

            default:
                return null;
        }
    }
    
    render() {
        const { messages } = this.props; 
        return ( 
            <FlatList
                style={styles.container} 
                inverted 
                data={messages}
                renderItem={this.renderMessageContent} 
                keyExtractor={keyExtractor} 
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.contentContainer}
            />
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        overflow: 'visible', //Prevents clipping on resize!
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 100,
        marginBottom: 10, 
    },
    messageBubble: {
        backgroundColor: 'blue',
        padding: 10, 
        borderRadius: 20, 
    },
    text: {
        color: 'white', 
        fontSize: 16, 
    },
    image: {
        width: 120,
        height: 120, 
        borderRadius: 10, 
    },
    map: {
        width: 200,
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    locationText: {
        fontSize: 16,
        color: 'gray',
        padding: 10,
        textAlign: 'center',
    },
    mapContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5,
    },
});
