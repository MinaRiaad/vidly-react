import React from "react";
import joi from "joi-browser";
import Form from "./form";
import { getMovie, saveMovie} from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: joi.string(),
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genre"),
    numberInStock: joi
      .number()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: joi.number().min(0).max(10).required().label("Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/notfound");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {

    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>MovieForm</h1>
        {this.renderInput("title","Title", "text")}
        {this.renderSelectMenu("genreId","Genre","text", genres)}
        {this.renderInput("numberInStock", "Number In Stock", "Number")}
        {this.renderInput("dailyRentalRate", "Rate", "Number")}
        {this.renderButton("Save")}
      </form>
    )
  }
}

export default MovieForm;
