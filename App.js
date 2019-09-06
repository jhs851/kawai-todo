import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from "./ToDo";

const { width } = Dimensions.get('window');

export default class extends React.Component {
    state = {
        toDo: ''
    };

    setTodo = (text) => {
        this.setState({
            toDo: text
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Text style={styles.title}>Kawai To Do</Text>

                <View style={styles.card}>
                    <TextInput style={styles.input}
                               placeholder="New To Do"
                               value={this.state.toDo}
                               onChangeText={this.setTodo}
                               placeholderTextColor="#999"
                               returnKeyType="done"
                               autoCorrect={false}
                    />

                    <ScrollView contentContainerStyle={styles.toDos}>
                        <ToDo />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f23567',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 50,
        fontWeight: '200',
        marginBottom: 30
    },
    card: {
        backgroundColor: 'white',
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#323232',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    width: 0,
                    height: -1
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 25
    },
    toDos: {
        alignItems: 'center'
    }
});
