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
         filter: 'all',
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

   searchEmp = (items, term) => {
      if (term.length === 0) {
         return items;
      }

      return items.filter(item => {
         return item.name.toLowerCase().indexOf(term) > -1;
      });
   }

   onUpdateSearch = (term) => {
      this.setState({term});
   }

   filterItems = (items) => {
      switch (this.state.filter) {
         case 'all':
            return items;
         case 'major':
            return items.filter(item => item.major);
         case 'rich':
            return items.filter(item => item.salary > 1000);
         default: 
            return items;
      }
   }

   onFilterChange = (filter) => {
      this.setState({filter});
   }

   render() {
      const {data, term, filter} = this.state;

      const employees = data.length;
      const majors = data.filter(item => item.major).length;

      const visibleData = this.filterItems(this.searchEmp(data, term), filter);

      return (
         <div className="app">
            <AppInfo employees={employees} majors={majors}/>
   
            <div className="search-panel">
               <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
               <AppFilter onFilterChange={this.onFilterChange} filter={filter}/>
            </div>
   
            <EmployeesList data={visibleData} 
                           onDelete={this.deleteItem}
                           onToggleProp={this.onToggleProp}/>
            <EmployeesAddForm onAdd={this.addItem}/>
         </div>
      )
   }
}