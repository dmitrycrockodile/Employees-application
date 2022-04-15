import { Component } from 'react';

import './app-filter.css';

export default class AppFilter extends Component {

   constructor(props) {
      super(props);
      this.state = {
         filter: 'all'
      }
   }

   buttonsData = [
      {name: 'all', label: 'Все сотрудники'},
      {name: 'rise', label: 'На повышение'},
      {name: 'rich', label: 'ЗП больше 1000$'},
   ]

   onFilter = (e) => {
      const filter = e.currentTarget.getAttribute('name');
      this.setState({filter});
      this.props.onFilter(filter);
   }

   render() {
      const {filter} = this.state;

      const buttons = this.buttonsData.map(({label, name}) => {
         const isActive = filter === name;
         const clazz = isActive ? " btn-light" : " btn-outline-light"

         return ( <button 
            className={`btn ${clazz}`}
            type="button"
            name={name}
            onClick={ this.onFilter }
            key={name}>
               {label}
         </button>
      )});

      return (
         <div className="btn-group">
            {buttons}
         </div>
      );
   }
}