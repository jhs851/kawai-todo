import React from "react";
import {AsyncStorage, Dimensions, Platform, ScrollView, StyleSheet, View} from "react-native";
import uuidv1 from "uuid/v1";
import PropTypes from "prop-types";
import NewToDo from "./NewToDo";
import ToDo from "./ToDo";

const { width } = Dimensions.get('window');

export default class ToDos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toDos: props.toDos
        };
    }

    /**
     * 새로운 To Do 를 추가하고 Storage에 저장합니다.
     *
     * @param {string} text
     */
    add = (text) => {
        this.setState(current => {
            current.toDos.unshift({
                id: uuidv1(),
                text: text,
                completed: false,
                createdAt: Date.now()
            });

            return {
                toDos: current.toDos
            };
        });
    };

    /**
     * 주어진 To Do 를 변경하고 Storage에 저장합니다.
     *
     * @param {object} toDo
     */
    update = (toDo) => {
        this.setState(current => {
            current.toDos.splice(this.find(toDo.id), 1, toDo);

            return {
                toDos: current.toDos
            }
        });
    };

    /**
     * 주어진 To Do 를 삭제하고 Storage에 저장합니다.
     *
     * @param {object} toDo
     */
    delete = (toDo) => {
        this.setState(current => {
            current.toDos.splice(this.find(toDo.id), 1);

            return {
                toDos: current.toDos
            }
        });
    };

    /**
     * 현재 ToDos에서 주어진 id에 해당하는 To Do의 index를 반환합니다.
     *
     * @param {string<uuidv1>} id
     * @returns {number}
     */
    find(id) {
        return this.state.toDos.map(toDo => toDo.id).indexOf(id);
    }

    /**
     * Storage에 ToDos를 저장합니다.
     */
    save(toDos) {
        AsyncStorage.setItem('toDos', JSON.stringify(toDos));
    };

    componentDidUpdate(prevProps, prevState) {
        this.save(prevState.toDos);
    }

    render() {
        return (
            <View style={styles.card}>
                <NewToDo add={this.add} />

                <ScrollView contentContainerStyle={styles.toDos}>
                    {this.state.toDos.map(toDo =>
                        <ToDo key={toDo.id} toDo={toDo}
                              update={this.update}
                              delete={this.delete}
                        />)}
                </ScrollView>
            </View>
        );
    }
}

ToDos.propTypes = {
   toDos: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
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
    toDos: {
        alignItems: 'center'
    }
});