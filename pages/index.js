import React, { Component } from 'react';
import lottery from '../lottery';
import web3 from '../web3';

class Lottery extends Component {
  state = {
    manager: '',
    participateAmount: '0.01',
    message: '',
    totalAmount: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const totalAmount = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, totalAmount });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.participateAmount, 'ether')
    });

    this.setState({ message: 'You have been entered!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Picking a winner...' });
    await lottery.methods.pickWinner().send({ from: accounts[0] });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.participantsCount} people entered,
          competing to win {web3.utils.fromWei(this.state.totalAmount, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter: </label>
            <input
              value={this.state.participateAmount}
              onChange={event => this.setState({ participateAmount: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a Winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Lottery;
