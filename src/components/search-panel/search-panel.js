import { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

   constructor(props) {
      super(props);
      this.state = {
         term: ''
      }
   }

   onInputChange = (e) => {
      const term = e.target.value;
      this.setState({ term });
      this.props.onInputChange(term);
   }

   render() {
      return (
         <input type="text" 
                className="form-control search-input"
                placeholder="Найти сотрудника"
                onChange={ this.onInputChange }
                value={ this.state.term }/>
      );
   }
}