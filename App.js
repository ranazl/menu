import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Button,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  NativeModules,
  Animated,
  Easing
} from "react-native";

// const { UIManager } = NativeModules;

// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.animatedValue1 = new Animated.Value(0);
    this.state = {
      filteredData: [],
      lastData: [],
      loading: false,
      count: 0,
      changeColor: false
    };
  }

  animate() {
    this.animatedValue1.setValue(0);
    const createAnimation = function(value, duration, easing, delay = 0) {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay
      });
    };
    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.ease)
    ]).start();
  }

  componentDidMount() {
    this.fetchData();
    this.animate();
  }

  fetchData = () => {
    let lastData = this.state.lastData;
    fetch("https://randomuser.me/api/?results=10")
      .then(response => response.json())
      .then(data => {
        this.setState(
          { lastData: [...lastData, ...data.results], loading: true },
          () => this.setState({ filteredData: this.state.lastData })
        );
      });
  };

  onDecrease = () => {
    this.setState({ count: this.state.count - 1 });
  };
  onIncrease = () => {
    this.setState({ count: this.state.count + 1 });
  };

  searchFilterFunction = text => {
    let result = this.state.lastData.filter(contact =>
      `${contact.name.first.toUpperCase()} ${contact.location.city.toUpperCase()} ${contact.name.last.toUpperCase()}`.includes(
        text.toUpperCase()
      )
    );
    this.setState({
      filteredData: result
    });
  };

  changeColor() {
    this.setState({ changeColor: !this.state.changeColor });
  }

  render() {
    const scaleText = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    });
    return (
      <View style={styles.container}>
        <View
          style={!this.state.changeColor ? styles.container : styles.change}
        >
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.header}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={styles.food}>
                    <Image
                      source={require("./picture/map.png")}
                      style={{ width: 55, height: 55 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 40,
                        color: "#444243"
                      }}
                    >
                      Food
                    </Text>
                  </View>
                  <View>
                    <Animated.View
                      style={{ transform: [{ scale: scaleText }] }}
                    >
                      <View style={styles.search}>
                        <TextInput
                          style={{ color: "black", marginLeft: 15 }}
                          placeholder={"What food you want?"}
                          onChangeText={this.searchFilterFunction.bind(this)}
                        />
                        {/* <Text style={{ marginLeft: 15, }}>What food you want?</Text> */}
                        <Image
                          source={require("./picture/search.png")}
                          style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                      </View>
                    </Animated.View>
                  </View>
                </View>
              </View>
              <View style={styles.main}>
                <View>
                  <Image
                    source={require("./picture/pizza.png")}
                    style={{
                      width: 480,
                      height: 280,
                      marginTop: 80,
                      marginLeft: 90
                    }}
                  />
                </View>
                <View>
                  <View style={{ marginTop: 60, paddingLeft: 30 }}>
                    <Text
                      style={{
                        fontSize: 45,
                        fontWeight: "bold",
                        color: "black"
                      }}
                    >
                      Tomato Pomadoro
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 10,
                        marginTop: 20
                      }}
                    >
                      <Image source={require("./picture/chilli.png")} />
                      <Image source={require("./picture/chilli.png")} />
                      <Image source={require("./picture/chilli.png")} />
                      <Image source={require("./picture/chilli.png")} />
                      <Text style={{ color: "black", paddingLeft: 10 }}>
                        Hot as Hell!
                      </Text>
                    </View>
                    <Text>
                      There’s nothing like Homemade Pizza, especially when it is
                      made with fresh tomatoes.
                    </Text>
                    <Text>
                      {" "}
                      A delicious pizza made with homemade pizza dough or even
                      store bought dough.{" "}
                    </Text>
                    <Text>
                      {" "}
                      Top it with shredded mozzarella and some sliced black
                      olives.
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly"
                    }}
                  >
                    <View style={styles.box}>
                      <View>
                        {/* <Button style={{fontSize: 30,fontWeight: "bold",color: "black"}} onPress={this.onPress} title={'Desc'}/> */}
                        <TouchableHighlight
                          style={styles.button}
                          onPress={this.onDecrease}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "black"
                            }}
                          >
                            {" "}
                            -{" "}
                          </Text>
                        </TouchableHighlight>
                      </View>
                      <View>
                        <Text style={{ fontWeight: "bold", color: "black" }}>
                          {this.state.count}
                        </Text>
                      </View>
                      <TouchableHighlight
                        style={styles.button}
                        onPress={this.onIncrease}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "black"
                          }}
                        >
                          +
                        </Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.box}>
                      <Text style={{ fontSize: 20 }}>Price:$14</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.cart}>
                    <Text
                      style={{ color: "white", fontSize: 16 }}
                      onPress={this.changeColor.bind(this)}
                    >
                      ADD TO CART
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footer}>
                <View>
                  <Text
                    style={{
                      paddingLeft: 50,
                      fontWeight: "bold",
                      paddingTop: 50
                    }}
                  >
                    Find Food > Recive Food
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingRight: 500,
                      justifyContent: "space-between",
                      marginTop: 30
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        paddingLeft: 80
                      }}
                    >
                      Tastes good with
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Feedbacks
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Detailed info
                    </Text>
                  </View>
                </View>

                <FlatList
                  // extraData={this.state.lastData}
                  data={this.state.filteredData}
                  keyExtractor={item => item.email}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <View style={styles.cadr}>
                      <View style={styles.menu}>
                        <Image
                          source={require("./picture/1.jpg")}
                          style={styles.picture}
                        />
                        <View style={styles.details}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              color: "black"
                            }}
                          >
                            {item.name.first}
                          </Text>
                          <Text style={{ color: "#c2bcbf" }}>
                          {item.name.last}
                          </Text>
                          <Text  style={{paddingTop:20,fontWeight:'bold',color:'black'}}>$14</Text>
                          <Image source={require("./picture/plus.png")} style={{height:60, width:60, marginTop:20}}/>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
              <View style={styles.cart1}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Image
                    source={require("./picture/cheese.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.pm}>cheese</Text>
                  <Image
                    source={require("./picture/bacon.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.pm}>Bacon</Text>
                  <Image
                    source={require("./picture/ham.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.pm}>Ham</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Image
                    source={require("./picture/hot-dog.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.pm}>Hot-dog</Text>
                  <Image
                    source={require("./picture/chicken-leg.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.pm}>Chiken</Text>
                  <Image
                    source={require("./picture/pizzas.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.pm}>Pizza</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 120,
    backgroundColor: "white"
  },
  food: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 60,
    marginTop: 25
  },
  details: {
    alignItems: "center",
    marginTop: 100
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: 360,
    height: 45,
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    marginRight: 100
  },
  box: {
    backgroundColor: "white",
    width: 130,
    height: 35,
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  menu: {
    backgroundColor: "white",
    width: 230,
    height: 230,
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 30,
    zIndex: -1
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 80,
    position: "absolute",
    zIndex: 1,
    bottom: 150
  },
  cart: {
    backgroundColor: "#e23380",
    width: 350,
    height: 60,
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
    marginLeft: 108
  },
  cart1: {
    backgroundColor: "white",
    width: 500,
    height: 160,
    borderRadius: 15,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-evenly",
    position: "absolute",
    zIndex: 1,
    top: 500,
    right: 200
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 80
  },
  pm: {
    paddingRight: 80,
    fontWeight: "bold",
    alignItems: "center"
  },
  main: {
    height: 500,
    // backgroundColor: "#f7f5f6",
    flexDirection: "row"
  },
  cadr: {
    height: 130,
    backgroundColor: "#f7f5f6",
    marginTop: 50
  },
  footer: {
    height: 550,
    backgroundColor: "white",
    zIndex: -1
  },
  change: {
    flex: 1,
    backgroundColor: "rgba(189,230,233,0.8)"
  }
});
