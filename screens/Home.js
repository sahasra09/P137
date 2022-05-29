import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, FlatList, SafeAreaView } from 'react-native'
import axios from 'axios'
import { ListItem } from 'react-native-elements'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            url: "http://428d-136-185-111-176.ngrok.io"
        }
    }
    componentDidMount() {
        this.getStars()
    }
    getStars = () => {
        const { url } = this.state
        axios.get(url)
            .then(response => {
                return this.setState({
                    listData: response.data.data
                })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    renderItem = ({ item, index }) => (
        <ListItem key={index} bottomDivider
            onPress={() => this.props.navigation.navigate('Details', { star_name: item.name })}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.distance}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
    keyExtractor=(item,index)=>index.toString()
    render() {
        const {listData}=this.state
        if(listData.length===0){
            return(
                <View style={styles.emptyContainer}>
                    <Text>Loading...</Text>
                    </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView/>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>Stars World</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edc988"
    },
    upperContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#132743"
    },
    lowerContainer: {
      flex: 0.9
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    emptyContainerText: {
      fontSize: 20
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#d7385e"
    },
    listContainer: {
      backgroundColor: "#eeecda"
    }
  });