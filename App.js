import React from 'react';
import { Text, View, ScrollView, Image, StatusBar, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    loading: false,
    page: 0,
    movies: [],
  }
  fetch = () => {
    this.setState({ loading: true });
    fetch("https://movie-demo-api.now.sh/3/movie/popular?page=" + (this.state.page + 1))
      .then(res => res.json())
      .then(res => this.setState({ movies: [...this.state.movies, ...res.results], page: (this.state.page + 1), loading: false }))
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <ScrollView style={{ height: "100%" }}>
          {this.state.movies.map((movie, i) =>
            <Movie key={i} movie={movie} />
          )}
          <Button 
            disabled={this.state.loading}
            onPress={this.fetch}
            title={this.state.loading ? "Loading..." : "Load more!"}
          />
        </ScrollView>
      </View>
    );
  }
}

class Movie extends React.Component {

  render() {
    const uri = "https://image.tmdb.org/t/p/w500/" + this.props.movie.poster_path;
    return (
      <View style={{ display: "flex", flexDirection: "row", paddingBottom: 5 }}>
        <Image style={{ width: 70, height: 105 }} source={{ uri }} />
        <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
          <Text style={{ fontSize: 18 }}>{this.props.movie.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{String(this.props.movie.release_date).slice(0, 4)}</Text>
            <Text style={{ fontSize: 14, paddingLeft: 5, fontWeight: "bold", color: "rgb(79, 176, 0)" }}>{this.props.movie.vote_average}</Text>
          </View>
        </View>
      </View>
    );
  }
}
