import React from "react";
import "./App.css";
import Button from "./Button.js";
import Radio from "./Radio.js";
import Api from "./api.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      weight: 0,
      height: 0,
      genderSelectedOption: "",
      unitSelectedOption: "",
      bmi: 0,
      meals: "",
    };

    //Binding Handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleBmiChange = this.handleBmiChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
  }

  //Handlers
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAgeChange(event) {
    this.setState({ age: event.target.value });
  }

  handleWeightChange(event) {
    this.setState({ weight: event.target.value });
  }

  handleHeightChange(event) {
    this.setState({ height: event.target.value });
  }

  handleGenderChange(event) {
    this.setState({
      genderSelectedOption: event.currentTarget.value,
    });
  }

  handleUnitChange(e) {
    this.setState({
      unitSelectedOption: e.currentTarget.value,
      //get value: this.state.unitSelectedOption
    });
  }

  handleBmiChange() {
    this.setState = this.calculateBMI();
  }

  handleSubmit(event) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (typeof data === "object") {
          //console.log({ data });
          this.setState({
            meals: data.meals[0].strMeal + "\n" + data.meals[0].strSource,
          });
        }
      });
    //Printing the state values

    window.alert(
      "A name was submitted: " +
        this.state.name +
        "\nA age was submitted: " +
        this.state.age +
        "\nA weight was submitted: " +
        this.state.weight +
        "\nA height was submitted: " +
        this.state.height +
        "\nA Gender was submitted: " +
        this.state.genderSelectedOption +
        "\nHere's a meal we think you'll enjoy! If there's nothing here, hit the submit button again.\n" +
        "Recipe: " +
        this.state.meals
    );
    event.preventDefault();
  }

  handleClear() {
    this.setState({ name: "" });
    this.setState({ age: "" });
    this.setState({ weight: "" });
    this.setState({ height: "" });
    this.setState({ unitSelectedOption: "" });
    this.setState({ genderSelectedOption: "" });
  }

  //Calculating functions:
  calculateBMI() {
    if (this.state.unitSelectedOption === "Standard")
      this.state.bmi =
        703 * (this.state.weight / Math.pow(this.state.height, 2));
    //Metric
    else this.state.bmi = this.state.weight / Math.pow(this.state.height, 2);
  }

  calculateBMICategory() {
    if (this.state.bmi < 18.5) {
      this.state.bmiCategory = "Underweight";
    } else if (this.state.bmi >= 18.5 && this.state.bmi <= 24.9) {
      this.state.bmiCategory = "Normal Weight";
    } else if (this.state.bmi >= 25 && this.state.bmi <= 29.9) {
      this.state.bmiCategory = "Overweight";
    } else {
      this.state.bmiCategory = "Obese";
    }
  }

  calculateRMR() {
    if (this.state.unitSelectedOption === "Standard")
      if (this.state.genderSelectedOption === "Male")
        return (
          9.99 * (this.state.weight * 0.453592) +
          6.25 * (this.state.height * 0.0254 * 100) -
          (4.92 * this.state.age + 5)
        );
      else
        return (
          9.99 * (this.state.weight * 0.453592) +
          6.25 * (this.state.height * 0.0254 * 100) -
          (4.92 * this.state.age + 161)
        );
    //Metric
    else if (this.state.genderSelectedOption === "Male")
      return (
        9.99 * this.state.weight +
        6.25 * (this.state.height * 100) -
        (4.92 * this.state.age + 5)
      );
    else
      return (
        9.99 * this.state.weight +
        6.25 * (this.state.height * 100) -
        (4.92 * this.state.age + 161)
      );
  }

  //Rendering the App:

  render() {
    return (
      <div>
        <h1>Welcome to the Health and Fitness Calculator!</h1>
        <p>
          Please enter some information about yourself to find out your BMI and
          more.
        </p>
        <form onSubmit={this.handleSubmit}>
          <table>
            <label>
              Name:
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <br />
            </label>

            <label>
              Age:
              <input
                type="text"
                value={this.state.age}
                onChange={this.handleAgeChange}
              />
              <br />
            </label>

            <label>
              Weight (Pounds / KiloGrams):
              <input
                type="text"
                value={this.state.weight}
                onChange={this.handleWeightChange}
              />
              <br />
            </label>

            <label>
              Height (Inches / Meters):
              <input
                type="text"
                value={this.state.height}
                onChange={this.handleHeightChange}
              />
            </label>
          </table>
          <div>
            <Radio
              value="Male"
              label="Male"
              id="1"
              checked={this.state.genderSelectedOption === "Male"}
              onChange={this.handleGenderChange}
            >
              Male
            </Radio>
            <Radio
              value="Female"
              label="Female"
              id="2"
              checked={this.state.genderSelectedOption === "Female"}
              onChange={this.handleGenderChange}
            >
              Female
            </Radio>
          </div>

          <div>
            <Radio
              value="Metric"
              label="Metric"
              id="1"
              checked={this.state.unitSelectedOption === "Metric"}
              onChange={this.handleUnitChange}
            >
              Metric
            </Radio>
            <Radio
              value="Standard"
              label="Standard"
              id="2"
              checked={this.state.unitSelectedOption === "Standard"}
              onChange={this.handleUnitChange}
            >
              Standard
            </Radio>
          </div>

          <input type="submit" value="Submit" />
        </form>

        <Button text="Clear" onClick={this.handleClear}>
          My Button
        </Button>

        <br />

        <label>
          Body Mass Index:
          <input
            type="button"
            onChange={(this.calculateBMI(), this.calculateBMICategory())}
            value={this.state.bmi}
          />
          <p>You are {this.state.bmiCategory}</p>
        </label>

        <label>
          RMR:
          <input
            type="button"
            onChange={this.calculateRMR()}
            value={this.calculateRMR()}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          <br></br>
          <br></br>
          Here are some previews of meals we think you'd enjoy. Follow the link
          to get the full recipe!
        </label>
        <Api />
      </div>
    );
  }
}

export default App;
