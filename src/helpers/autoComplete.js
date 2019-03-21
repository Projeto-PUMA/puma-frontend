import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class Autocomplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    let filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    const { changeOccupation } = this.props;
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    changeOccupation(e.currentTarget.innerText);
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { changeOccupation } = this.props;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      changeOccupation(filteredSuggestions[activeSuggestion]);
    }
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className='suggestions'>
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion) {
                className = 'suggestion-active';
              }
              if (index > 4) return null;
              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className='no-suggestions'>
            <p>Profissão não cadastrada no banco de dados!</p>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <Input
          type='text'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

Autocomplete.propTypes = {
  suggestions: PropTypes.array,
  changeOccupation: PropTypes.func.isRequired,
};

Autocomplete.defaultProps = {
  suggestions: [],
};


export default Autocomplete;