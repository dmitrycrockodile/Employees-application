import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [
            this.createItem("Andrew B.", "12", false, 1),
            this.createItem("Veniamin L.", "1300", true, 2),
            this.createItem("Alex M.", "2350", false, 3),
         ]
      }
      this.maxId = 4;
   }

   createItem = (name, salary, increase, id) => {
      return {name, salary, increase, id};
   }

   addItem = (name, salary) => {
      this.setState(({data}) => {
         const newItem = this.createItem(name, salary, false, this.maxId++);
         return {
            data: data.concat(newItem)
         }
      });
   }

   deleteItem = (id) => {
      this.setState(({data}) => ({
            data: data.filter(item => item.id !== id)
      }));
   }

   render() {
      const {data} = this.state;

      return (
         <div className="app">
            <AppInfo/>
   
            <div className="search-panel">
               <SearchPanel/>
               <AppFilter/>
            </div>
   
            <EmployeesList data={data} onDelete={this.deleteItem}/>
            <EmployeesAddForm onAdd={this.addItem}/>
         </div>
      )
   }
}