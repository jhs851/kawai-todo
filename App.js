import React from "react";
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import ToDos from "./ToDos";

export default class extends React.Component {
    state = {
        loading: true,
        toDos: []
    };

    /**
     * Storage에서 To Do 들을 읽어옵니다.
     *
     * @returns {Promise<void>}
     */
    loadToDos = async () => {
        AsyncStorage.getItem('toDos')
            .then(toDos => {
                this.setState({
                    toDos: JSON.parse(toDos) || [],
                    loading: false
                });
            })
            .catch(e => console.log(e));
    };

    componentDidMount() {
        this.loadToDos();
    }

    render() {
        const { loading, toDos } = this.state;

        if (loading) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Text style={styles.title}>Kawai To Do</Text>

                <ToDos toDos={toDos} />
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
    }
});
