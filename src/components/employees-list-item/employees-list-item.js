import { Component } from 'react';
import './employees-list-item.css'

export default class EmployeesListItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         increase: false,
         major: false,
      }
   }

   onIncrease = () => {
      this.setState(({increase}) => ({
         increase: !increase
      }))
   } 

   onMajor = () => {
      this.setState(({major}) => ({
         major: !major
      }))
   }

   render() {
      const {name, salary} = this.props;
      const {increase, major} = this.state;
      let classNames = "list-group-item d-flex justify-content-between";
      if (increase) {
         classNames += " increase";
      } 
      if (major) {
         classNames += " major";
      }

      return (
         <li className={classNames}>
            <span className="list-group-item-label"
                  onClick={this.onMajor}>{name}</span>
            <input type="text"
               className="list-group-item-input"
               defaultValue={salary + '$'} />
            <div className="d-flex justify-content-center align-items-center">
               <button type="button"
                  className="btn-cookie btn-sm"
                  onClick={this.onIncrease}>
                     <i className="fas fa-cookie"></i>
               </button>
   
               <button type="button"
                  className="btn-trash btn-sm">
                     <i className="fas fa-trash"></i>
               </button>
   
               <i className="fas fa-star"></i>
            </div>
         </li>
      )
   }
};