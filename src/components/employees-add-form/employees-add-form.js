import { Component } from 'react';

import './employees-add-form.css';

export default class EmployeesAddForm extends Component {
   
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         salary: ''
      }
   }

   onItemAdd = (e) => {
      e.preventDefault();
      this.props.onItemAdd(this.state.name, this.state.salary);
      this.setState({
         name: '',
         salary: '',
      })
   }

   onInputChange = (e) => {
      this.setState(({ 
         [e.target.name]: e.target.value
      }));
   }

   render() {
      const { name, salary } = this.state;

      return (
         <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form onSubmit={ this.onItemAdd } className="add-form d-flex">
               <input type="text"
                      required
                      className="form-control new-post-label"
                      placeholder="Как его зовут?" 
                      name="name"
                      value={ name }
                      onChange={ this.onInputChange }/>
               <input type="number"
                      required
                      className="form-control new-post-label"
                      placeholder="З/П в $?" 
                      name="salary"
                      value={ salary }
                      onChange={ this.onInputChange }/>
               <button type="submit"
                       className="btn btn-outline-light">Добавить</button>
            </form>
         </div>
      )
   }
}