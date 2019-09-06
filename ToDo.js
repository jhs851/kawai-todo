import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default class extends React.Component {
    state = {
        editing: false,
        completed: false
    };

    toggleComplete = () => {
        this.setState(current => Object({
            completed: ! current.completed
        }))
    };

    edit = () => {
        this.setState({
            editing: true
        })  ;
    };

    update = () => {
        this.setState({
            editing: false
        });
    };

    delete = () => {

    };

    render() {
        const { editing, completed } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this.toggleComplete}>
                        <View style={[styles.circle, completed ? styles.completedCircle : styles.uncompletedCircle]}/>
                    </TouchableOpacity>

                    <Text style={[styles.text, completed ? styles.completedText : styles.uncompletedText]}>
                        Hello I'm a To Do
                    </Text>
                </View>

                <View style={styles.column}>
                    {editing
                        ? (
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={this.update}>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText }>✅</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                        : (
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={this.edit}>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText }>✏️</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText }>🗑️</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    },
    completedCircle: {
        borderColor: '#bbb',
    },
    uncompletedCircle: {
        borderColor: '#f23657',
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353839'
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        margin: 10
    }
});