import React from "react";
import {StyleSheet, TextInput} from "react-native";
import PropTypes from "prop-types";
import Validator from "./Validator";

export default class NewToDo extends React.Component {
    state = {
        toDo: '',
    };

    /**
     * 주어진 text를 To Do에 저장합니다.
     *
     * @param {string} text
     */
    setTodo = (text) => {
        this.setState({
            toDo: text
        });
    };

    /**
     * 주어진 text로 새로운 To Do를 추가하고 Storage에 저장합니다.
     *
     * @param {string} text
     */
    submit = ({ nativeEvent: { text } }) => {
        if (! Validator.validateRequired(text)) {
            return;
        }

        this.props.add(text);

        this.setTodo('');
    };

    render() {
        return (
            <TextInput style={styles.input}
                       placeholder="New To Do"
                       value={this.state.toDo}
                       onChangeText={this.setTodo}
                       placeholderTextColor="#999"
                       returnKeyType="done"
                       autoCorrect={false}
                       onSubmitEditing={this.submit}
                       underlineColorAndroid="transparent"
            />
        );
    }
}

NewToDo.propTypes = {
    add: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    input: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 25
    }
});