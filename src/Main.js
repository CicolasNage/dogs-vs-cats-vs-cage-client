import React, { Component } from 'react'

export default class Main extends Component {
  
  state ={
    urls: {},
    score: [0, 0, 0]
  }

  fetchUrls = async () => {
    await fetch('https://secure-stream-21402.herokuapp.com/')
      .then(res=>res.json())
      .then(res => this.setState({urls: res}))
  }

  randomCageDimensions = () => {
    return (Math.floor(Math.random()*10)+1)*100;
  }

  

  voteDog = () => {
    fetch('https://secure-stream-21402.herokuapp.com/dog-point')
      .then(res=>res.json())
      .then(res=>this.setState({score: res}))
      .then(res=>this.fetchUrls())
  }

  voteCat = () => {
    fetch('https://secure-stream-21402.herokuapp.com/cat-point')
      .then(res=>res.json())
      .then(res=>this.setState({score: res}))
      .then(res=>window.location.reload(false))
  }

  voteCage = () => {
    fetch('https://secure-stream-21402.herokuapp.com/cage-point')
      .then(res=>res.json())
      .then(res=>this.setState({score: res}))
      .then(res=>window.location.reload(false))
  }

  getScore = () => {
    fetch('https://secure-stream-21402.herokuapp.com/score')
      .then(res=>res.json())
      .then(res=>this.setState({score: res}))
  }

  getWinner = () => {
    
  }

  componentDidMount() {
    this.fetchUrls()
    this.getScore()
  }
  

  cageDimensions = this.randomCageDimensions()
  render() {
    console.log(this.state)
    return (
      <>
      <div className="score-outer-container">
        <h3>
          Global Scoreboard:
        </h3>  
        <div className="score-container">
          <div className="pup-score">
            Pups: {this.state.score[0] || 'loading'}
          </div>
          <div className="cat-score">
            Cats: {this.state.score[1] || 'loading'}
          </div>
          <div className="cage-score">
            Cage: {this.state.score[2] || 'loading'}
          </div>
        </div>          
      </div>
      <div className="main-outer-container">
        <div className="image-container">
          <img className="pup-pic" src={this.state.urls.dogUrl} alt="A dog"/>
          <img src={`${this.state.urls.catUrl}/${this.cageDimensions}/${this.cageDimensions}`} alt="A cat" className="kitty-pic"/>
          <img src={`${this.state.urls.cageUrl}/${this.cageDimensions}/${this.cageDimensions}`} alt="Nic Cage" className="cage-pic"/>
        </div>
        <div className="button-container">
          <button onClick={this.voteDog} className="choose-dog">
            The Pup!
          </button>
          <button onClick={this.voteCat} className="choose-cat">
            The Kitty!
          </button>
          <button onClick={this.voteCage} className="choose-cage">
            The Cage!
          </button>
        </div>            
      </div>
      </>
    )
  }
}


