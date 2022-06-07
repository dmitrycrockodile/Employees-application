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
            this.createItem("Andrew B.", "12", false, true, 1),
            this.createItem("Veniamin L.", "1300", true, false, 2),
            this.createItem("Alex M.", "2350", false, false, 3),
         ],
         term: '',
      }
      this.maxId = 4;
   }

   createItem = (name, salary, demobilizated, major, id) => {
      return {name, salary, demobilizated, major, id};
   }

   addItem = (name, salary) => {
      this.setState(({data}) => {
         const newItem = this.createItem(name, salary, false, false, this.maxId++);
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

   onToggleProp = (id, prop) => {
      this.setState(({data}) => ({
         data: data.map(item => {
            if (item.id === id) {
               return {...item, [prop]: !item[prop]};
            }
            return item;
         })
      }))
   }

   

   render() {
      const {data, term} = this.state;

      const employees = data.length;
      const majors = data.filter(item => item.major).length;

      return (
         <div className="app">
            <AppInfo employees={employees} majors={majors}/>
   
            <div className="search-panel">
               <SearchPanel/>
               <AppFilter/>
            </div>
   
            <EmployeesList data={data} 
                           onDelete={this.deleteItem}
                           onToggleProp={this.onToggleProp}/>
            <EmployeesAddForm onAdd={this.addItem}/>
         </div>
      )
   }
}