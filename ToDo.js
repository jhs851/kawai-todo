import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, TextInput} from "react-native";
import PropTypes from "prop-types";
import Validator from "./Validator";

const { width } = Dimensions.get('window');

export default class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            toDo: props.toDo
        };
    }

    /**
     * 주어진 text로 state.toDo 객체의 text를 변경합니다.
     *
     * @param {string} text
     */
    setTodo = (text) => {
        this.setState(current => Object({
            toDo: {
                ...current.toDo,
                text
            }
        }));
    };

    /**
     * state.toDo의 completed를 토글하고 Storage에 저장합니다.
     */
    toggleComplete = (event) => {
        event.stopPropagation();

        this.setState(current => Object({
            toDo: {
                ...current.toDo,
                completed: ! current.toDo.completed
            }
        }), () => this.props.update(this.state.toDo));
    };

    /**
     * 변경모드로 설정합니다.
     */
    edit = (event) => {
        event.stopPropagation();

        this.setState({
            editing: true
        }, () => this.input.focus());
    };

    /**
     * 현재 state.toDo 를 변경하고 Storage에 저장합니다.
     */
    update = (event) => {
        event.stopPropagation();

        if (! Validator.validateRequired(this.state.toDo.text)) {
            return;
        }

        this.props.update(this.state.toDo);

        this.setState({
            editing: false
        });
    };

    /**
     * 정말 삭제할건지 confirm 한 뒤에 삭제합니다.
     */
    delete = (event) => {
        event.stopPropagation();

        Alert.alert(
            'Delete',
            "Are you sure you want to delete it?\nDeleted content cannot be recovered.",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed.')},
                {text: 'OK', onPress: () => this.props.delete(this.props.toDo)},
            ],
            {cancelable: false}
        )
    };

    render() {
        const { editing } = this.state;
        const { text, completed } = this.state.toDo;

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this.toggleComplete}>
                        <View style={[styles.circle, completed ? styles.completedCircle : styles.uncompletedCircle]}/>
                    </TouchableOpacity>

                    {editing
                        ? (
                            <TextInput style={[
                                           styles.text,
                                           styles.input,
                                           completed ? styles.completedText : styles.uncompletedText,
                                       ]}
                                       placeholder="Change To Do"
                                       value={text}
                                       onChangeText={this.setTodo}
                                       placeholderTextColor="#999"
                                       returnKeyType="done"
                                       autoCorrect={false}
                                       onSubmitEditing={this.update}
                                       underlineColorAndroid="transparent"
                                       onBlur={this.update}
                                       multiline={true}
                                       ref={(input) => this.input = input}
                            />
                        )
                        : (
                            <Text style={[styles.text, completed ? styles.completedText : styles.uncompletedText]}>
                                {text}
                            </Text>
                        )
                    }
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

                                <TouchableOpacity onPress={this.delete}>
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

ToDo.propTypes = {
    toDo: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
};

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
    input: {
        paddingTop: 0,
        width: width / 2
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